import Http from "./kit";
import { Save, Fetch } from "../services/deviceStorage";

// Request interceptor to add the auth token header to requests
Http.interceptors.request.use(
  async (config) => {
    const signToken = await Fetch("signToken");
    if (signToken) {
      console.log("SignToken at request interceptor:", signToken);
      config.headers["Authorization"] = `Bearer ${signToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to refresh token on token expired error
Http.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Error at response interceptor:", error);
    const originalReq = error.config;
    let refToken = await Fetch("refToken");
    console.log("refToken at response interceptor:", refToken);

    if (refToken && error.response.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      const res = await Http.post("/api/auth/refresh-token", {
        refreshToken: refToken,
      });
      if (res.status === 200) {
        await Save("signToken", res.data.result.signToken);
        await Save("refToken", res.data.result.refToken);
        return Http(originalReq);
      }
    }
    return Promise.reject(error);
  }
);

const api = {
  // Post
  uploadImage: (body) => (config) => Http.post("/image/add", body, config),
  uploadImages: (body) => (config) => Http.post("/images/add", body, config),
  uploadVideos: (body) => (config) => Http.post("/videos/add", body, config),
  signup: (body) => Http.post("/api/auth/signup", body),
  signin: (body) => Http.post("/api/auth/signin", body),
  refreshToken: (body) => Http.post("/api/auth/refresh-token", body),
  activateProfile: (body) => Http.post("/api/auth/activate", body),
  createMemo: (body) => Http.post("/api/memories/new", body),
  requestBond: (body) => Http.put("/api/profile/req/new", body),
  // Get
  getInterests: () => Http.get("/api/interests"),
  getCurrentUser: (userId) => Http.get(`/api/profile/my/${userId}`),
  getOwnMemories: (userId) => Http.get(`/api/memories/fetch/${userId}`),
  getNomadSuggestions: (userId) => Http.get(`/api/sug/i/nomads/${userId}`),
  getCaravanSuggestions: (userId) => Http.get(`/api/sug/i/caravans/${userId}`),
  getIncomingBonds: (userId) => Http.get(`/api/profile/req/in/${userId}`),
  getOutgoingBonds: (userId) => Http.get(`/api/profile/req/out/${userId}`),
  getBondsList: (userId) => Http.get(`/api/profile/tribe/bonds/${userId}`),
  // PUT
  updateProfile: (body) => Http.put("/api/profile/setup", body),
  // Patch
  postComment: (body) => Http.patch("/api/memories/comment", body),
  postHeat: (body) => Http.patch("/api/memories/heat", body),
  acceptBond: (body) => Http.patch("/api/profile/req/confirm", body),
  // Delete
  rejectBond: (requestId) => Http.delete(`/api/profile/req/rm/${requestId}`),
};

export default api;

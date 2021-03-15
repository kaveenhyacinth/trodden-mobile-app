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
  refreshToken: (body) => Http.post("/api/auth/refresh-token", body),
  signup: (body) => Http.post("/api/auth/signup", body),
  activateProfile: (body) => Http.post("/api/auth/activate", body),
  updateProfile: (body) => Http.put("/api/profile/setup", body),
  uploadImage: (body) => (config) => Http.post("/image/add", body, config),
  uploadImages: (body) => (config) => Http.post("/images/add", body, config),
  uploadVideos: (body) => (config) => Http.post("/videos/add", body, config),
  createMemo: (body) => Http.post("/api/memories/new", body),
  getInterests: () => Http.get("/api/interests"),
  getCurrentUser: (userId) => Http.get(`/api/profile/my/${userId}`),
  getOwnMemories: (userId) => Http.get(`/api/memories/fetch/${userId}`),
};

export default api;

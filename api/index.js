import Constants from "expo-constants";
import axios from "axios";
import { Save, Fetch } from "../helpers/deviceStorageHandler";

const Http = axios.create({
  baseURL: Constants.manifest.extra.BASE_URL,
  timeout: 10000,
});

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
  post: {
    uploadImages: (body) => (config) => Http.post("/images/add", body, config),
    uploadVideos: (body) => (config) => Http.post("/videos/add", body, config),
    uploadImage: (body) => (config) => Http.post("/image/add", body, config),
    refreshToken: (body) => Http.post("/api/auth/refresh-token", body),
    activateProfile: (body) => Http.post("/api/auth/activate", body),
    createCaravan: (body) => Http.post("/api/caravan/new", body),
    createMemo: (body) => Http.post("/api/memories/new", body),
    createBlaze: (body) => Http.post("/api/blaze/new", body),
    createTrip: (body) => Http.post("/api/trip/new", body),
    signup: (body) => Http.post("/api/auth/signup", body),
    signin: (body) => Http.post("/api/auth/signin", body),
  },
  get: {
    getInterests: () => Http.get("/api/interests"),
    getFeed: (userId) => Http.get(`/api/feed/${userId}`),
    getBlazeById: (blazeId) => Http.get(`/api/blaze/i/${blazeId}`),
    getJoinedBlazes: (userId) => Http.get(`/api/blaze/j/${userId}`),
    getTripsByUserId: (userId) => Http.get(`/api/trip/n/${userId}`),
    getMemoriesByHashtag: (tag) => Http.get(`/api/feed/tags/${tag}`),
    getCurrentUser: (userId) => Http.get(`/api/profile/my/${userId}`),
    getNomadById: (userId) => Http.get(`/api/profile/user/${userId}`),
    getOwnMemories: (userId) => Http.get(`/api/memories/my/${userId}`),
    getUserCaravans: (userId) => Http.get(`/api/caravan/my/${userId}`),
    getMemoriesByUser: (userId) => Http.get(`/api/memories/fetch/${userId}`),
    getNomadSuggestions: (userId) => Http.get(`/api/sug/i/nomads/${userId}`),
    getIncomingBonds: (userId) => Http.get(`/api/profile/req/in/${userId}`),
    getOutgoingBonds: (userId) => Http.get(`/api/profile/req/out/${userId}`),
    getBondsList: (userId) => Http.get(`/api/profile/tribe/bonds/${userId}`),
    getcaravanById: (caravanId) => Http.get(`/api/caravan/fetch/${caravanId}`),
    getBlazesbyCaravan: (caravanId) => Http.get(`/api/blaze/c/${caravanId}`),
    getCaravanSuggestions: (userId) =>
      Http.get(`/api/sug/i/caravans/${userId}`),
  },
  put: {
    requestJoinCaravan: (body) => Http.put("/api/caravan/join", body),
    updateProfile: (body) => Http.put("/api/profile/setup", body),
    requestBond: (body) => Http.put("/api/profile/req/new", body),
  },
  patch: {
    joinBlaze: (body) => Http.patch("/api/blaze/p", body),
    postHeat: (body) => Http.patch("/api/memories/heat", body),
    postComment: (body) => Http.patch("/api/memories/comment", body),
    acceptBond: (body) => Http.patch("/api/profile/req/confirm", body),
  },
  delete: {
    rejectBond: (requestId) => Http.delete(`/api/profile/req/rm/${requestId}`),
  },
};

export default api;

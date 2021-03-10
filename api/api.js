import Http from "./kit";
import { Save, Fetch } from "../services/deviceStorage";

// Request interceptor to add the auth token header to requests
Http.interceptors.request.use(
  async (config) => {
    const signToken = await Fetch("signToken");
    if (signToken) {
      console.log("SignToken at api:", signToken);
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
    const originalReq = error.config;
    let refToken = await Fetch("refToken");
    console.log("refToken at api:", refToken);

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
  getInterests: () => Http.get("/api/interests"),
  updateProfile: (body) => Http.put("/api/profile/setup", body),
  uploadImage: (body) => (config) => Http.post("/image/add", body, config),
};

export default api;

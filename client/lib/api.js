import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("refresh-token") // ✅ Bug 2 fix
    ) {
      originalRequest._retry = true;

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`, // ✅ Bug 1 fix
        {},
        { withCredentials: true }
      );

      originalRequest.withCredentials = true; // ✅ Bug 3 fix
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default api;
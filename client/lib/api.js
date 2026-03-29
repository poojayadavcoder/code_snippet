import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );

      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);
export default api;
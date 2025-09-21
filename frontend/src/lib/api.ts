// src/lib/api.ts
import { API_URL } from "@/config/config";
import axios, { type AxiosInstance,type  InternalAxiosRequestConfig ,type  AxiosError } from "axios";

interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean; 
}
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add accessToken
api.interceptors.request.use((config: AxiosRequestConfigWithRetry) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers["Authorization"] = `${token}`;
  }
  return config;
});

// Response interceptor to handle 401 and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest : AxiosRequestConfigWithRetry = error.config as AxiosRequestConfigWithRetry;

    if (originalRequest && error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh token endpoint
        const res = await axios.post(`${API_URL}/auth/refresh`, null, {
          withCredentials: true, // send refresh cookie
        });

        const newToken = res.data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `${newToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or clear tokens
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

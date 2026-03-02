import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://loreez.duckdns.org/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

const getAccessToken = () => localStorage.getItem("accessToken");
const getRefreshToken = () => localStorage.getItem("refreshToken");

const isRefreshRequest = (url = "") => url.includes("/token/refresh/");

const clearAuthState = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

// Attach access token automatically
api.interceptors.request.use((config) => {
  if (isRefreshRequest(config?.url)) {
    return config;
  }

  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let pendingRequests = [];

const processQueue = (error, token = null) => {
  pendingRequests.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve(token);
    }
  });
  pendingRequests = [];
};

// Handle automatic refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();

    if (
      error.response?.status !== 401 ||
      originalRequest?._retry ||
      !refreshToken ||
      isRefreshRequest(originalRequest?.url)
    ) {
      // If 401 and not refresh request → clear auth
      if (
        error.response?.status === 401 &&
        !isRefreshRequest(originalRequest?.url)
      ) {
        clearAuthState();
      }
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await axios.post(
        `${API_BASE_URL}/token/refresh/`,
        { refresh: refreshToken }
      );

      const newAccessToken = refreshResponse.data?.access;

      if (!newAccessToken) {
        throw new Error("No access token returned from refresh");
      }

      localStorage.setItem("accessToken", newAccessToken);
      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      clearAuthState();
      processQueue(refreshError, null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
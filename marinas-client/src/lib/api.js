import axios from "axios";

// Shared axios instance for all API calls
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Attach the saved token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On 401 (missing/expired token), clear the session and send the user to sign in.
// Login failures are left to the sign-in page to show its own error.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLogin = error.config?.url?.endsWith("/login");
    if (error.response?.status === 401 && !isLogin) {
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      localStorage.removeItem("type");
      if (window.location.pathname !== "/auth/signin") {
        window.location.assign("/auth/signin");
      }
    }
    return Promise.reject(error);
  },
);

export default api;

import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
if (!baseURL) {
  throw new Error("API URL not found");
}
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // If token is stored in localStorage add it to the request header
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !error.config._retry) {
      error.config._retry = true;
      // Check if refresh token is stored in localStorage
      try {
        const refreshToken = localStorage.getItem("refresh");
        if (!refreshToken) {
          // TODO: Should redirect to login page
          console.log("No refresh token");
          return Promise.reject(error);
        }
        console.log("Refreshing token");
        const response = await axios.post(`${baseURL}/auth/jwt/refresh/`, {refresh: refreshToken});
        if (response.status === 200) {
          console.log("Token refreshed");
          localStorage.setItem('token', response.data.access);
          originalRequest.headers.Authorization = `Token ${response.data.access}`;
          return axios(originalRequest);
        }
        if (response.status === 401) {
          throw new Error("Refresh token expired");
        }
      } catch (err) {
        // TODO: Should redirect to login page
        localStorage.removeItem("token");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
)
export default api;

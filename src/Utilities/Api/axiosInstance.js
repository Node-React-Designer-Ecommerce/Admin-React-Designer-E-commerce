import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://react-node-designer.glitch.me/api/v1",
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    let token = Cookies.get("adminadminToken");
    // console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Cookies.remove("token");
      // Cookies.remove("isLoggedIn");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

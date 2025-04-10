import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DEPLOYED_URL,
  withCredentials: true, // Enable cookies for all requests
});

export default axiosInstance;

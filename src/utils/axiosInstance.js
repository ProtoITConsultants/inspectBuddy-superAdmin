import axios from "axios";

// If node env is production, use the production URL, otherwise use the development URL
const BASE_URL =
  import.meta.env.NODE_ENV === "production"
    ? import.meta.env.VITE_DEPLOYED_URL
    : import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Enable cookies for all requests
});

export default axiosInstance;

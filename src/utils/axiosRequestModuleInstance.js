import axios from "axios";

const axiosInstanceForRequests = axios.create({
  baseURL: import.meta.env.VITE_DEPLOYED_URL_FOR_USER_REQUESTS,
  withCredentials: true, // Enable cookies for all requests
});

export default axiosInstanceForRequests;

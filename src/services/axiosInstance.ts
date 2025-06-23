import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://cada098223b17ac7900d.free.beeceptor.com/todo/",
  headers: { "Content-Type": "application/json" },
});

export default axiosInstance;

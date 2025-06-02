import axios from "axios";

const API = axios.create({
  baseURL: "https://cada098223b17ac7900d.free.beeceptor.com/todo/",
  headers: { "Content-Type": "application/json" },
});

export default API;

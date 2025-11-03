// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",//change to your backend URL in production
  withCredentials: true, // IMPORTANT: send & receive cookies (JSESSIONID)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

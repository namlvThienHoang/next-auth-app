import axios from "axios";
const baseUrl = "https://localhost:7248/api";

export const http = axios.create({
  baseURL: baseUrl,
});

http.interceptors.request.use(
  async (config) => {
    const session = await axios.get('http://localhost:3000/api/auth/session');
    console.log(session);
    console.log(session.data.accessToken);
    if (session && session.data && session.data.accessToken) {
      config.headers.Authorization = `Bearer ${session.data.accessToken}`;
    }
    return config;
  },
  (err) => {
    throw new Error(err);
  }
);
import axios, { InternalAxiosRequestConfig } from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:3005/wallet/",
  headers: {
    "Content-Type": "application/json",
    timeout: 30000,
  },
});

baseApi.interceptors.request.use((config: InternalAxiosRequestConfig<any>) => {
  const bearerToken = sessionStorage.getItem("token");
  if (bearerToken) {
    config.headers.Authorization = `${bearerToken}`;
    config.headers["x-access-token"] = `${bearerToken}`;
  }
  return config;
});

export default baseApi;

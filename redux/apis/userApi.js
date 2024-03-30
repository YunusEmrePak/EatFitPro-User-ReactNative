import axios from "axios";
import * as SecureStore from "expo-secure-store";

const userApi = axios.create({
  baseURL: "http://10.101.20.11:8081/api/v1/user",
  headers: {
    "Content-Type": "application/json",
  },
});

userApi.interceptors.request.use(
  (config) => {
    const token = SecureStore.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default userApi;

import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { API_URL } from "../../constants/constants";

const userApi = axios.create({
  baseURL: API_URL + "/api/v1/user",
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

import axios from "axios";
import * as SecureStore from "expo-secure-store";

import { API_URL } from "../../constants/constants";

const foodAndActivityApi = axios.create({
  baseURL: API_URL + "/info",
  headers: {
    "Content-Type": "application/json",
  },
});

foodAndActivityApi.interceptors.request.use(
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
  
  export default foodAndActivityApi;
  

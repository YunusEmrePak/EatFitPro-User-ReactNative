import axios from "axios";

const signApi = axios.create({
  baseURL: "http://10.101.20.11:8081/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

export default signApi;
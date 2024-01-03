import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5500",
  timeout: 2000,
});

export { instance };

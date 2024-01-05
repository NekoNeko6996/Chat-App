import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.62:5500",
});

export { instance };

import axios from "axios";

// login service
const instance = axios.create({
  baseURL: "http://192.168.1.63:5500",
});

// send and receive message service
const socketURL = "http://192.168.1.63:4000";

export { instance, socketURL };

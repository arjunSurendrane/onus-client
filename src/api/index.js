import axios from "axios";

export const url = "https://onus-api.onrender.com/api";

const instance = axios.create({
  baseURL: url,
});

export default instance;

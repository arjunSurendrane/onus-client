import axios from "axios";

export const url = "http://3.95.188.107:4000/api";

const instance = axios.create({
  baseURL: url,
});

export default instance;

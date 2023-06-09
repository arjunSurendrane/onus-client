import axios from "axios";

// export const url = "http://localhost:4000";
export const url = "https://onus-api.onrender.com";

const instance = axios.create({
  baseURL: `${url}/api`,
});

export default instance;

import axios from "axios";
import { parseCookies } from "nookies";

const { token } = parseCookies();

export const api = axios.create({
  // baseURL: "http://192.168.0.105:3333/",
  baseURL: "http://localhost:3333/",
});

if (token) {
  api.defaults.headers["authorization"] = `Bearer ${token}`;
}

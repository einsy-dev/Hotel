import axios from "axios";
import Cookies from "js-cookie";

console.log(process.env)

export const $host = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API || 'http://localhost:8080',
});

export const $authHost = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API || 'http://localhost:8080',
  headers: {
    authorization: `Bearer ${Cookies.get("token")}`,
  },
});
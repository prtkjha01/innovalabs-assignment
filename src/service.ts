import axios, { AxiosInstance } from "axios";

export const service: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

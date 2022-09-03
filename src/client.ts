import axios, { AxiosInstance } from "axios";

export function createClient(token: string): AxiosInstance {
  return axios.create({
    baseURL: "https://api.vercel.com/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

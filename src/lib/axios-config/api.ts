import axios from "axios";

const createAPI = () => {
  let token = "";
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token") as string;
  }

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
};


export const api = createAPI();
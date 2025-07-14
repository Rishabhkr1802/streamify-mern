import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_URL

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`,
  },
    withCredentials: true,  //Send cookies with requests
})
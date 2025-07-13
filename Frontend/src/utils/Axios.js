import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_URL

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,  //Send cookies with requests
})
import axios, { AxiosInstance } from "axios";

const api:AxiosInstance = axios.create({
    baseURL: "https://viacep.com.br/ws/",
    headers: {
        "Content-Type":"application/json"
    }
});

export default api;
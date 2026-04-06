import axios from 'axios'
import { getToken } from "./getToken"

export const api = axios.create({
    baseURL: "https://save-work-utr-project.onrender.com",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use(
    async (config) => {
        try {
            const token = await getToken('JWTToken')
            if (token !== null){
                config.headers.Authorization = `Bearer ${token}`

            }
            return config;
        } catch (error) {
            return Promise.reject(error)
        }
    },
        (error) => {
            return Promise.reject(error)
    }
)
export default api;
import axios from "axios";
import { API_URL } from ".";


const $api = axios.create({
    withCredentials: true,
    baseURL: `${API_URL}/api`
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`
    return config
})


export default $api


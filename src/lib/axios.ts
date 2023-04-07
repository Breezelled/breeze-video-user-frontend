import axios from "axios";
import {BASE_URL} from "@/constants/const";
export default axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
});
export const axiosAuth = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: { "Content-Type": "application/json; charset=UTF-8;" },
});
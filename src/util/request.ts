import axios from "axios";
import { baseURL } from "@/config/baseURL";

const instance = axios.create({
    baseURL,
    timeout: 5000,
});

instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export const $get = async (url: string, params?: any) => {
    return await instance.get(url, { params });
}

export const $post = async (url: string, data: any) => {
    return await instance.post(url, data);
}

export const $put = async (url: string, data: any) => {
    return await instance.put(url, data);
}

export const $delete = async (url: string) => {
    return await instance.delete(url);
}
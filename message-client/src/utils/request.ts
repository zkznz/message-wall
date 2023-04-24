import axios from "axios"
import { message } from 'ant-design-vue';
import router from "@/router";

const service = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 5000
})
//请求拦截器
service.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token)
        config.headers.Authorization = token;
    return config;
},
    err => {
        return Promise.reject(err);
    })

//响应拦截器
service.interceptors.response.use(res => {
    if (res.status === 200)
        return res.data;


}, err => {
    message.error(err.response.data.msg);
    if (err.response.status === 401) {
        localStorage.removeItem("token");
        router.push('/');
    }
    return Promise.reject(err);
})

export default service;
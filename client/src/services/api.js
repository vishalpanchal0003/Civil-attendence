import axios from 'axios';
// const authUrl = 'http://localhost:4000/api/users/'
const authUrl = 'http://10.170.76.92:4000/api/users/'

const authApi = axios.create({
    baseURL: authUrl
})

authApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});


const attendanceUrl = "http://localhost:4000/api/attendance/";

const attendanceApi = axios.create({
    baseURL: attendanceUrl,
});

attendanceApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export  {attendanceApi,authApi};
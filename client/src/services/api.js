import axios from 'axios';
const authUrl = `${process.env.REACT_APP_API_URL}/users`;
const attendanceUrl = `${process.env.REACT_APP_API_URL}/attendance`;



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



const attendanceApi = axios.create({
    baseURL: attendanceUrl
});

attendanceApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export { attendanceApi, authApi };
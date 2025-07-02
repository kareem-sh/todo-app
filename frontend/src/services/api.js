
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});


api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, err => Promise.reject(err));


api.interceptors.response.use(r => r, err => {
    if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(err);
});

export default api;

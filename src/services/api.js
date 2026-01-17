import axios from 'axios';
import { store } from '../app/store';
import { setUser } from '../features/auth/authSlice';
import { logOut } from '../features/auth/authAction';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; 

            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, {}, { withCredentials: true });
                

                const newUserDto = res.data;

                store.dispatch(setUser(newUserDto)); 

                return api(originalRequest);
                
            } catch (refreshError) {
                console.error("Refresh token expired");
                store.dispatch(logOut()); 
                window.location.href = '/auth'; 
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
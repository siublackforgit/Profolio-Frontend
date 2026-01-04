import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Unauthorized - Redirecting to Auth Page");
            
            // Optional: Clear local user state from Redux if needed
            // store.dispatch(logout()); 

            // Immediate redirect to login/register page
            window.location.href = '/auth'; 
        }
        return Promise.reject(error);
    }
);
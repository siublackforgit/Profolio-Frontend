import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/register/email`, null, {
                params: {
                    email: userData.email,
                    password: userData.password,
                    displayName: userData.displayName,
                    avaterUrl: userData.avatarUrl
                }
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Registration failed");
        }
    }
)

export const loginEmail = createAsyncThunk(
    'auth/loginEmail',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post(`/auth/loginEmail`, {
                email: userData.email,
                password: userData.password
            });
            
            // Typically you store the token in localStorage here or in the extraReducers
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);


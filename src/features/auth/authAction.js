import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/auth/register/email', null, {
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


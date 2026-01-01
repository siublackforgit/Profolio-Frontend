import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginEmail } from './authAction';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoading: false,
        isSuccess: false,
        error: null,
        message: ''
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = action.payload;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(loginEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Login successful!";
                // Save token or user info here
            })
            .addCase(loginEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})

export default authSlice.reducer;
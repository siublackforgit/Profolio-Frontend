import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginEmail, logOut } from './authAction';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
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
            // logInEmail
            .addCase(loginEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "Login successful!";
                // Save user info here
                state.user = action.payload;
            })
            .addCase(loginEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            //LogOut
            .addCase(logOut.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logOut.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "LogOut successful!";
                state.user = null;
            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
})

export default authSlice.reducer;
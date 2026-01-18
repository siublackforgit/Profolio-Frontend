import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginEmail, logOut, getUserFromToken } from './authAction';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: localStorage.getItem('userDto') 
            ? JSON.parse(localStorage.getItem('userDto')) 
            : null,
        isLoading: false,
        isSuccess: false,
        error: null,
        message: ''
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;  
            state.isSuccess = true;
            state.error = null;
        },
        clearAuth: (state) => {
            state.user = null;
            state.isSuccess = false;
        }
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
                localStorage.setItem('userDto', JSON.stringify(action.payload));
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
                state.isSuccess = false;
                state.message = "LogOut successful!";
                state.user = null;
                localStorage.removeItem('userDto'); 
            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            //getUserByToken
            .addCase(getUserFromToken.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUserFromToken.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = "getUserFromToken successful!";
                // Save user info here
                state.user = action.payload;
            })
            .addCase(getUserFromToken.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
})

export const { setUser, clearAuth } = authSlice.actions;

export default authSlice.reducer;
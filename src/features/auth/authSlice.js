import createSlice from '@reduxjs/toolkit';
import { registerUser } from './authAction';

const authSlice = createSlice({
    name:'auth',
    initialState: {
        isLoading: false,
        isSuccess: false,
        error: null,
        message: ''
    },

    extraReducers: ( builder) => {
        builder
                .addCase(registerUser.pending, (state) => {
                    state.isLoading = true;
                } )
                .addCase(registerUser.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.isSuccess = true;
                    state.message = action.payload;
                })
                .addCase(registerUser.rejected, (state, action) => {
                    state.isLoading = false;
                    state.error = action.payload;
                })
    }
})
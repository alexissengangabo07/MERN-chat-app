import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import * as api from '../api/user';

// Get user from local storage
export const saveUser = createAsyncThunk('auth/register', async (newUser, rejectWithValue) => {
    try {
        const response = await api.createUser(newUser);
        if (response.status === 201) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const logIn = createAsyncThunk('auth/logIn', async (userInfos, { rejectWithValue }) => {
    try {
        const response = await api.logInUser(userInfos);
        if (response.status === 201 || response.status === 200) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const logOut = createAsyncThunk('auth/logout', async (newUser) => {
    await localStorage.removeItem('user');
});

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder.addCase(saveUser.pending, (state, { payload }) => {
            state.isLoading = true;
            state.message = payload;
        });
        builder.addCase(saveUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = payload;
        });
        builder.addCase(saveUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.user = null;
        });
        builder.addCase(logIn.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logIn.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.user = payload;
            state.isError = false;
            toast.success('connection success', {
                position: "top-left",
                autoClose: 2000
            });
        });
        builder.addCase(logIn.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload;
            state.user = null;
            console.log(state.message)
            toast.error(state.message, {
                position: "top-right",
                autoClose: 5000
            });
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.user = null;
        });
    }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
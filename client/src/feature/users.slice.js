import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api/user';

export const fetchUsers = createAsyncThunk('users/fetchUserData', async (token) => {
    const { data } = await api.fetchUsers(token);
    return data;
});

const getUserSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        userIsConnected: false
    },
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            // console.log(state.users);
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
});


// export const { fetchUserData } = getUserSlice.actions;
export default getUserSlice.reducer;
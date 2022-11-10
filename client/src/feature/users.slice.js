import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const fetchUsers = createAsyncThunk('users/fetchUserData', async () => {
    const { data } = await api.fetchUsers();
    return data;
});

const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false
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
        })
    }
    //  {
    //     [fetchUsers.pending]: (state) => {
    //         state.isLoading = true;
    //     },
    //     [fetchUsers.fulfilled]: (state, action) => {
    //         state.userInfos = action.payload;
    //     },
    //     [fetchUsers.rejected]: (state) => {
    //         state.isLoading = false;
    //     }
    // },
    // reducers: {
    //     fetchUserData: (state, { payload }) => {
    //         state.userInfos = payload;
    //     },
    //     addUser: (state, { payload }) => {
    //         state.userInfos.push(payload);
    //     }
    // }
});

export const { fetchUserData } = userSlice.actions;
export default userSlice.reducer;
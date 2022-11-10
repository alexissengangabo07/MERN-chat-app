import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';

export const fetchUsers = createAsyncThunk('users/fetchUserData', async () => {
    const { data } = await api.fetchUsers();
    return data;
});

export const saveUser = createAsyncThunk('users/saveUser', async (newUser, { rejectWithValue }) => {
    try {
        const { data } = await api.createUser(newUser);
        return data;
    } catch (error) {
        // return (rejectWithValue(error.response.message));
        return error.response.data.message;
    }
});

const getUserSlice = createSlice({
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
        builder.addCase(saveUser.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(saveUser.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            // state.data = payload;
            console.log(payload);
            // console.log(state.users);
        });
        builder.addCase(saveUser.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
});


// export const { fetchUserData } = getUserSlice.actions;
export default getUserSlice.reducer;
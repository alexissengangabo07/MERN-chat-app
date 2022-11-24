import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api/user';

export const fetchUsersMessages = createAsyncThunk('users/fetchUserData', async () => {
    const { data } = await api.fetchUsers();
    return data;
});

export const saveMessage = createAsyncThunk('users/register', async (newUser, { rejectWithValue }) => {
    try {
        console.log(newUser);
        const { data } = await api.createUser(newUser);
        // console.log(data);
        return data;
    } catch (error) {
        // return (rejectWithValue(error.response.message));
        return error.response.data.message;
    }
});


const messagesSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        userIsConnected: false
    },
    extraReducers: builder => {
        builder.addCase(fetchUsersMessages.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(fetchUsersMessages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            // console.log(state.users);
        });
        builder.addCase(fetchUsersMessages.rejected, (state, action) => {
            state.isLoading = false;
        });

        builder.addCase(saveMessage.pending, state => {
            state.isLoading = true;
        });
        builder.addCase(saveMessage.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            // state.data = payload;
            console.log(payload);
            // console.log(state.users);
        });
        builder.addCase(saveMessage.rejected, (state, action) => {
            state.isLoading = false;
        });
    }
});


// export const { fetchUserData } = getUserSlice.actions;
export default messagesSlice.reducer;
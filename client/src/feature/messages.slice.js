import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api/message';

export const fetchUsersMessages = createAsyncThunk('messages/fetchMessages', async (users) => {
    const { expediteur, destinateur } = users;
    try {
        const { data } = await api.fetchMessages(expediteur, destinateur);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const sendMessage = createAsyncThunk('messages/sendMessage', async (messageInfos) => {
    const { expediteur, destinateur, messageContent } = messageInfos;

    try {
        const { data } = await api.sendMessage(expediteur, destinateur, messageContent);
        return data;
    } catch (err) {
        console.log(err);
    }
});


const messagesSlice = createSlice({
    name: 'messages',
    initialState: {
        messagesData: [],
        isMessageLoading: false
    },
    extraReducers: builder => {
        builder.addCase(fetchUsersMessages.pending, state => {
            state.isMessageLoading = true;
        });
        builder.addCase(fetchUsersMessages.fulfilled, (state, action) => {
            state.isMessageLoading = false;
            state.messagesData = action.payload;
        });
        builder.addCase(fetchUsersMessages.rejected, (state, action) => {
            state.isMessageLoading = false;
        });

        builder.addCase(sendMessage.pending, state => {
            state.isMessageLoading = true;
        });
        builder.addCase(sendMessage.fulfilled, (state, action) => {
            state.isMessageLoading = false;
            state.messagesData.push(action.payload);
        });
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.isMessageLoading = false;
        });
    }
});


// export const { fetchUserData } = getUserSlice.actions;
export default messagesSlice.reducer;
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/users.slice";
import messagesReducer from "../feature/messages.slice";
import authReducer from "../feature/auth.slice";

export default configureStore({
    reducer: {
        usersInfos: userReducer,
        messagesReducer,
        auth: authReducer
    }
});
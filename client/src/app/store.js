import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/users.slice";

export default configureStore({
    reducer: {
        connectedUserInfos: userReducer
    }
});
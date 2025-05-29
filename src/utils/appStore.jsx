import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice";
import requestReducer from "./requestSlice";
import editorReducer from "./editorSlice";

const appStore = configureStore({
    reducer:{
        user : userReducer,
        feed : feedReducer,
        connections : connectionReducer,
        request: requestReducer,
        editor : editorReducer,
        
    }
})

export default appStore;
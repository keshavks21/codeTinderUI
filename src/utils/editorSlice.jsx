import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
    name : "editor",
    initialState : null,

    reducers :{
        addUser:(state,action)=>{
            return action.payload;
        }

    }
    
})

export const {addUser} = editorSlice.actions;
export default editorSlice.reducer;
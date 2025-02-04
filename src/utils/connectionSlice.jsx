import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({

    name:"connections",
    initialState :null,
    reducers:{
        addConncection:(state,action)=>{
            return action.payload;
        },
        // removeConnection : (state, action)=>{
            
        // }
    }

})

export const {addConncection} = connectionSlice.actions;

export default connectionSlice.reducer;
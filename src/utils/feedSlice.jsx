import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : "feed",
    initialState : null,
    reducers :{
        addFeed:(state, action)=>{
            // const newArray = action.payload);
            return action.payload;
        },
        removeFeedUser :(state, action)=>{
            const newArray = state.filter(e=>e._id!==action.payload);
            return newArray;
        }
    }
})

export const {addFeed , removeFeedUser} = feedSlice.actions;

export default feedSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const CourseSlice=createSlice({
    name:"studentcourse",
    initialState:{
        data:[]
    },

    reducers:{
        setCourse:(state,action)=>{
            state.data = action.payload;
        }
    }

})

export const{setCourse}=CourseSlice.actions;
export default CourseSlice.reducer;
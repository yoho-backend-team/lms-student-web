import { createSlice } from "@reduxjs/toolkit";

const CourseSlice=createSlice({
    name:"studentcourse",
    initialState:{
        data:[],
        // task:[],
    },

    reducers:{
        setCourse:(state,action)=>{
            state.data = action.payload;
        },
    //      getcousetask:(state,action)=>{
	// 	state.task=action.payload
	//    },
    }

})

export const{setCourse}=CourseSlice.actions;
export default CourseSlice.reducer;
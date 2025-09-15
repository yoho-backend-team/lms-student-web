import { createSlice } from "@reduxjs/toolkit";

const certificateSlice =createSlice({
    name:'certificateSlice',
    initialState:{
        data:[],
        loading: true,
    },
    reducers:{
       setcertificate: (state, action) => {
      state.data = action.payload;
    },
        setLoading: (state, action) => {
      state.loading = action.payload;
    },
       }
    })

export const {setcertificate,setLoading} =certificateSlice.actions;   
export default certificateSlice.reducer; 
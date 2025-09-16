import { createSlice } from "@reduxjs/toolkit";


const communitySlice = createSlice({
  name: 'communities',
  initialState: {
    data: [],
    loading: true,
    selectedMsg: {}
  },
  reducers: {
    setCommunities: (state, action) => {
      state.data = action.payload;
    },
    setMessage: (state, action) => {
      state.data = action.payload;
    },
    setSelctedMsg: (state, action) => {
      state.selectedMsg = action.payload
    }
  }
});

export const { setCommunities, setMessage, setSelctedMsg } = communitySlice.actions;
export default communitySlice.reducer;

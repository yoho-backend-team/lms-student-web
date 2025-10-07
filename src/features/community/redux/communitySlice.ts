/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const data: any[] = []
const communitySlice = createSlice({
  name: 'communities',
  initialState: {
    data: [],
    loading: true,
    selectedMsg: {},
    messages: data
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
    },
    setMsgList: (state, action) => {
      state.messages = action.payload
      state.messages.reverse()
    },
    updateMsgList: (state, action) => {
      state.messages.push(action.payload)
    }
  }
});

export const { setCommunities, setMessage, setSelctedMsg, setMsgList, updateMsgList } = communitySlice.actions;
export default communitySlice.reducer;

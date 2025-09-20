import { createSlice } from '@reduxjs/toolkit';

const ProfileSlice = createSlice({
    name: 'ProfileSlice',
    initialState: {
        data: [],
        engscore: {},
    },
    reducers: {
        getProfile: (state, action) => {
            state.data = action.payload;
            state.engscore = action.payload?.spoken_english
        },
        updateProfile: (state, action) => {
            state.data = action.payload;
        },
        updateEngSpeak: (state, action) => {
            state.engscore = { ...state.engscore, ...action.payload }
        }
    },
});

export const { getProfile, updateProfile, updateEngSpeak } = ProfileSlice.actions;
export default ProfileSlice.reducer;

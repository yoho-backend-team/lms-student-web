import { createSlice } from '@reduxjs/toolkit';

const ProfileSlice = createSlice({
    name: 'ProfileSlice',
    initialState: {
        data: [],
    },
    reducers: {
        getProfile: (state, action) => {
            state.data = action.payload;
        },
        updateProfile: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { getProfile, updateProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const HelpSlice = createSlice({
    name: 'HelpSlice',
    initialState: {
        data: [],
    },
    reducers: {
        getHelp: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { getHelp } = HelpSlice.actions;
export default HelpSlice.reducer;

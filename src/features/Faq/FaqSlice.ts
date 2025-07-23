import { createSlice } from '@reduxjs/toolkit';

const FaqSlice = createSlice({
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

export const { getHelp } = FaqSlice.actions;
export default FaqSlice.reducer;

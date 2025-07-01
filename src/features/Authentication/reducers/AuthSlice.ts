import { createSlice } from '@reduxjs/toolkit';

const AuthSlice = createSlice({
	name: 'AuthSlice',
	initialState: {
		data: [],
	},
	reducers: {
		token: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { token } = AuthSlice.actions;
export default AuthSlice.reducer;

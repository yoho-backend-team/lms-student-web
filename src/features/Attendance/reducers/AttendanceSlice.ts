import { createSlice } from '@reduxjs/toolkit';

const AttendanceSlice = createSlice({
	name: 'AttendanceSlice',
	initialState: {
		data: [],
	},
	reducers: {
		Attendancetoken: (state, action) => {
			state.data = action.payload;
		},
	},
});

export const { Attendancetoken } = AttendanceSlice.actions;
export default AttendanceSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const CourseSlice = createSlice({
	name: 'CourseSlice',
	initialState: {
		data: [],
		task: [],
		selectedCourse: {},
		selectedBatch: {},
	},
	reducers: {
		getcoursedetails: (state, action) => {
			state.data = action.payload;

		},
		getcousetask: (state, action) => {
			state.task = action.payload
		},
		selectedCourse: (state, action) => {
			state.selectedCourse = action.payload
		},
		selectedBatch: (state, action) => {
			state.selectedBatch = action.payload
		}

	},
});

export const { getcoursedetails, getcousetask, selectedCourse, selectedBatch } = CourseSlice.actions;
export default CourseSlice.reducer;

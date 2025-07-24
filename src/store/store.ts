import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import communityReducer from '../features/community/redux/communitySlice';
import StudentCourseReducer from "../features/courses/reducers/courseSlice"

const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
        community: communityReducer,
		studentcourse:StudentCourseReducer,
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



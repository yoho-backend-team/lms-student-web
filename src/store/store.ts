import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import AttendanceSlice from '../features/Attendance/reducers/AttendanceSlice';

const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
		AttendanceSlice: AttendanceSlice,
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

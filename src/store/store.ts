import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import ActivityLogsSlice from '../features/ActivityLog/reducers/ActivitySlice'
const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
		ActivityLogsSlice:ActivityLogsSlice,

	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

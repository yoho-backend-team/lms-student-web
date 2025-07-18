import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import communityReducer from '../features/community/redux/communitySlice';
import DashBoardSlice from '../features/Dashboard/reducers/slices'

const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
		community: communityReducer,
		dashboard: DashBoardSlice
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;



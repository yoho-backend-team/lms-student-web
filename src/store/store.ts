import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import ClassSlice from '../features/classes/reducers/classslice'
import ClassIdSlice from '../features/Classid/reducers/classidslice'

const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
		ClassSlice: ClassSlice,
		ClassIdSlice: ClassIdSlice,
		
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
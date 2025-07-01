import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import PaymentSlice from '../features/Payment/reducers/PaymentSlice'

const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
		PaymentSlice:PaymentSlice,
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import PaymentSlice from '../features/Payment/reducers/PaymentSlice';
import NotificationSlice from '../features/Notifications/reducers/NotificationSlice';
import ProfileSlice from '../features/Profile/reducers/ProfileSlice'

const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
		PaymentSlice:PaymentSlice,
		NotificationSlice:NotificationSlice,
		ProfileSlice:ProfileSlice,
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import TicketSlice from "../features/Tickets/reducer/TicketSlice";

const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
		TicketSlice: TicketSlice,
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

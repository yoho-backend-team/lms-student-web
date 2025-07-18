import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import TicketSlice from "../features/Tickets/reducer/TicketSlice";
import ClassSlice from '../features/classes/reducers/classslice'
import ClassIdSlice from '../features/Classid/reducers/classidslice'

const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
		TicketSlice: TicketSlice,
		ClassSlice: ClassSlice,
		ClassIdSlice: ClassIdSlice,
		
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
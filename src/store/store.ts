import { configureStore } from '@reduxjs/toolkit';
import AuthSlice from '../features/Authentication/reducers/AuthSlice';
import TicketSlice from "../features/Tickets/reducer/TicketSlice";
import ClassSlice from '../features/classes/reducers/classslice'
import ClassIdSlice from '../features/Classid/reducers/classidslice'
import PaymentSlice from '../features/Payment/reducers/PaymentSlice';
import NotificationSlice from '../features/Notifications/reducers/NotificationSlice';
import ProfileSlice from '../features/Profile/reducers/ProfileSlice';
import ActivityLogsSlice from '../features/ActivityLog/reducers/ActivitySlice';
import communityReducer from '../features/community/redux/communitySlice';
import DashBoardSlice from '../features/Dashboard/reducers/slices'
const store = configureStore({
	reducer: {
		AuthSlice: AuthSlice,
		TicketSlice: TicketSlice,
		ClassSlice: ClassSlice,
		ClassIdSlice: ClassIdSlice,
		PaymentSlice:PaymentSlice,
		NotificationSlice:NotificationSlice,
		ProfileSlice: ProfileSlice,
		ActivityLogsSlice: ActivityLogsSlice,
        community: communityReducer,
		dashboard: DashBoardSlice,
	},
});

export default store;

// store.ts
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

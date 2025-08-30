/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllNotifications } from '../services';
import { getNotifications } from './NotificationSlice';

export const getAllNotificationsThunk =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getAllNotifications(params);
            dispatch(getNotifications(response.data));
        } catch (error) {
            console.log(error);
        }
    };

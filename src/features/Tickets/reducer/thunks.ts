/* eslint-disable @typescript-eslint/no-explicit-any */
import { getticketdata } from '../services/Tickets';
import { getticketdetails } from './TicketSlice';


export const getStudentticket =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getticketdata(params);
            dispatch(getticketdetails(response));
        } catch (error) {
            console.log(error);
        }
    };


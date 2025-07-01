import { getticketdata } from '../services/Tickets';
import { getticketdetails } from './TicketSlice';


export const getStudentLogin =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getticketdata(params);
            console.log(response, 'login response');
            dispatch(getticketdetails(response?.data?.token));
        } catch (error) {
            console.log(error);
        }
    };

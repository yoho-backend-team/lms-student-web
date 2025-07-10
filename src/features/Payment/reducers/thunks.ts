import { getStudentPayment } from '../services'; 
import { getPayment } from './PaymentSlice';

export const getStudentPaymentThunk =
    (params:any) => async (dispatch: any) => {
        try {
            const response = await getStudentPayment(params);
            dispatch(getPayment(response.data));
        } catch (error) {
            console.log(error);
        }
    };

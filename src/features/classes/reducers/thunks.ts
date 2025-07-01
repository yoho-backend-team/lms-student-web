import { getLiveClassDetails } from '../services';
import { getclassdetails } from './ClassSlice';

export const getStudentLogin =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getLiveClassDetails(params);
            console.log(response, 'login response');
            dispatch(getclassdetails(response?.data?.token));
        } catch (error) {
            console.log(error);
        }
    };

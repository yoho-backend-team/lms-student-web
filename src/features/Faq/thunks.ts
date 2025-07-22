/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHelp } from './FaqSlice';
import { getStudentFaq } from './service/index';

export const getFaqThunk = async (dispatch: any) => {
    try {
        const response = await getStudentFaq();
        dispatch(getHelp(response.data));
    } catch (error) {
        console.log(error);
    }
};
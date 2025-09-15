/* eslint-disable @typescript-eslint/no-explicit-any */
import { getHelp } from './HelpSlice';
import { getStudentHelp } from './services';

export const getHelpThunk =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getStudentHelp(params);
            dispatch(getHelp(response.data));
        } catch (error) {
            console.log(error);
        }
    };
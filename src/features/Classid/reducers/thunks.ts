/* eslint-disable @typescript-eslint/no-explicit-any */
import { getClassDetailsId } from "../services"
import { getClassIdDetails } from "../reducers/classidslice";


export const getClassIdDetail = (params: any) => async (dispatch: any) => {
    try {
        const response = await getClassDetailsId(params);
        dispatch(getClassIdDetails(response))
    }
    catch (error) {
        console.log(error);

    }
}
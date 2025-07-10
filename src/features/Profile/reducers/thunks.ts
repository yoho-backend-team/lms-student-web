import { getStudentProfile } from '../services'; 
import { getProfile } from './ProfileSlice';

export const getStudentProfileThunk =
    (params:any) => async (dispatch: any) => {
        try {
            const response = await getStudentProfile(params);
            console.log(response.data,"Profile Inform Thunks")
            dispatch(getProfile(response.data));
        } catch (error) {
            console.log(error);
        }
    };

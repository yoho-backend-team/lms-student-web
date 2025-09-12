import { getStudentProfile } from '../services';
import { getProfile } from '../reducers/profileSlice';

export const getStudentProfileThunk =
	(params: any) => async (dispatch: any) => {
		try {
			const response = await getStudentProfile(params);
			dispatch(getProfile(response?.data));
		} catch (error) {
			console.log(error);
		}
	};

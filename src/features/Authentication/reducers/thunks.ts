import { getStudentLoginClient } from '../services';
import { token } from './AuthSlice';

export const getStudentLogin =
	(data: any, params: any) => async (dispatch: any) => {
		try {
			const response = await getStudentLoginClient(data, params);
			dispatch(token(response?.data?.token));
			return response?.data?.token;
		} catch (error) {
			console.log(error);
		}
	};

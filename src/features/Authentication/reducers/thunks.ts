import { getStudentLoginClient } from '../services';
import { token } from './AuthSlice';

export const getStudentLogin =
	(data: any, params: any) => async (dispatch: any) => {
		try {
			const response = await getStudentLoginClient(data, params);
			//console.log(response, 'login response');
			dispatch(token(response?.data?.token));
		} catch (error) {
			console.log(error);
		}
	};

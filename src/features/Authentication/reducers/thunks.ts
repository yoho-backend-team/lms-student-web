import { getStudentLoginClient } from '../services';
import { token, user } from './AuthSlice';

export const getStudentLogin =
	(data: any, params: any) => async (dispatch: any) => {
		try {
			const response = await getStudentLoginClient(data, params);
			console.log('getStudentLogin response', response);
			dispatch(token(response?.data?.token));
			dispatch(user(response?.data?.user));
			localStorage.setItem('user', JSON.stringify(response?.data?.user));
			return response?.data?.token;
		} catch (error) {
			console.log(error);
		}
	};

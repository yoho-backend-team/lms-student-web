/* eslint-disable @typescript-eslint/no-explicit-any */
import { getStudentProfile, updateStudentProfile } from '../services';
import { getProfile, updateProfile } from './ProfileSlice';

export const getStudentProfileThunk =
	(params: any) => async (dispatch: any) => {

		try {
			const response = await getStudentProfile(params);
			dispatch(getProfile(response?.data));

		} catch (error) {
			console.log(error);
		}
	};

export const updateStudentProfileThunk =
	(data: any) => async (dispatch: any) => {
		try {
			const response = await updateStudentProfile(data);
			dispatch(updateProfile(response?.data));
			return response;
		} catch (error) {
			console.log(error);
			throw error;
		}
	};

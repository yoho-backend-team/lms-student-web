import Client from '../../../api/index';

export const getStudentLoginClient = async (data: any, params: any) => {
	const response = await Client.student.login(data, params);
	if (response) {
		return response;
	}
};

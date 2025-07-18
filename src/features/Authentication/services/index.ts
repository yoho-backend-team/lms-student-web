import Client from '../../../api/index';

export const getStudentLoginClient = async (data: any) => {
	const response = await Client.student.login(data);
	if (response) {
		return response;
	}
};

export const getStudentLogoutClient = async (params: any) => {
	const response = await Client.student.logout(params);
	if (response) {
		return response;
	}
};

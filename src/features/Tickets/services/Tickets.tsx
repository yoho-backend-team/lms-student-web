import Client from '../../../api/index';

export const getticketdata = async (params: any) => {
	const response = await Client.student.ticket.get(params);
	if (response) {
		return response;
	}
};

export const createticketdata = async (data: any, params: any) => {
	const response = await Client.student.ticket.create(data, params);
	if (response) {
		return response;
	}
};

import { GetLocalStorage } from '@/utils/helper';
import Client from '../../../api/index';

export const getStudentFaq = async () => {
	const instituteId = GetLocalStorage('instituteId');
	const user = GetLocalStorage('user');
	const branchid = user?.branch_id?.uuid;
	const response = await Client.student.faq.get({ instituteId, branchid });
	if (response) {
		return response;
	}
};

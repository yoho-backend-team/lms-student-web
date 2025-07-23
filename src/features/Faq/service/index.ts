import { GetLocalStorage } from '@/utils/helper';
import Client from '../../../api/index';

export const getStudentFaq = async () => {

    const instituteId = GetLocalStorage("instituteId")
    const branchid = GetLocalStorage("branchId")

    const response = await Client.student.faq.get({ instituteId, branchid });
    if (response) {
        return response;
    }
};
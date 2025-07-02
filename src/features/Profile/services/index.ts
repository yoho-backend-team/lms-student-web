import Client from '../../../api/index';

export const getStudentProfile = async (params:any) => {
    const response = await Client.student.profile.get(params);
    if (response) {
        return response;
    }
};

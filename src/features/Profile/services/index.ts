/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index';

export const getStudentProfile = async (params: any) => {
    const response = await Client.student.profile.get(params);
    if (response) {
        return response;
    }
};

export const updateStudentProfile = async (data: any) => {
    const response = await Client.student.profile.update(data);
    if (response) {
        return response;
    }
};

export const ImageUpload = async (data: any) => {
    const response = await Client.common.file.upload(data);
    if (response) {
        return response;
    }
};

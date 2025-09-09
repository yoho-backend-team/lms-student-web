/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index';

export const getStudentHelp = async (data: any) => {
    const response = await Client.student.help.get(data);
    if (response) {
        return response;
    }
};

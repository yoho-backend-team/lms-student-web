/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../api/index'

export const getLiveClassDetails = async (params: any) => {
        const response = await Client.student.class.get(params);
        console.log(response,"data in sevices")
        if (response)
                return response;
}

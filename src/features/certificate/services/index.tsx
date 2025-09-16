import Client from '../../../api/index'


export const getAllcertificate=async(params:any)=>{
    const response = await Client.student.certificate.getAll(params);
    if(response){
        return response;
    }
}


import Client from '../../../api/index'


export const getAllActivity=async(params:any)=>{
    const response = await Client.student.activity.get(params);
    if(response){
        return response;
    }
}


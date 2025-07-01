import Client from "../../../api/index"

export const getticketdata = async (params:any) => {
    
      const response = await Client.student.ticket.get(params)
      if(response){
    return response;
      }
    
}
    

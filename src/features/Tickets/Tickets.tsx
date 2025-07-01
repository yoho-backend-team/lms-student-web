import Client from "../../api/index"

export const getticketdata = async (params:any) => {
    try{
      const response = await Client.student.ticket.get(params)
      console.log(response)
    }
    catch(error){
        console.log(error)
}
    
}
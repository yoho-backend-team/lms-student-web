import Client from "../../../api/index"

export const getCourseDetails = async (data:any) => {
  try {
    const response = await Client.student.course.get(data);
  
    return response?.data;
   
  } catch (error) {
    return error;
  }
};

// export const taskdataget =async (params:any)=>{
//   try{
//     const response =await Client.student.course.gettask(params)
//        console.log(response,'services course')
//     return response?.data;
//   }
//   catch(error){
//     console.log('Error in taskdata',error);
//   }
// }

// export const updatetaskdata = async (data:any)=>{
//   try{
//     const response = await Client.student.course.updatetask(data)
//     return response?.data;
//   }
//   catch(error){
//     console.log (' Failed updated task is error',error)
//   }
// }
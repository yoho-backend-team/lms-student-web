// import HttpClient from '../../../api/httpclients';
import Client from '../../../api/index';


export const getAllCommunities = async (params:any) => {
  try {
    const response = await Client.student.community.get(params);
    return response.params; 
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error; 
  }
};

// export const getAllCommunities = async (searchParam: string) => {
//   try {
//     const response = await HttpClient.get(`/communities?search=${searchParam}`);
//     if (!response || !response.data) {
//       throw new Error('Invalid response');
//     }
//     return response.data;
//   } catch (err) {
//     console.error('Error fetching communities:', err);
//     throw err;
//   }
// };



export const sendMessage = async (params:any) => {
  try {
    const response = await Client.student.community.get(params);
    return response.params;
  } catch (error) {
    console.error("Message send error:", error);
    throw error;
  }
};

export const deleteMessage = async (params:any) => {
  try {
    const response = await Client.student.community.get(params);
    return response.params;
  } catch (error) {
    console.error('Delete error', error);
    throw error;
  }
};


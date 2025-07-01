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


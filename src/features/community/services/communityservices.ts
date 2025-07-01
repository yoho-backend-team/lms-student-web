import Client from '../../../api/index';


export const getAllCommunities = async (data:string) => {
  try {
    const response = await Client.student.community.get(data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching communities:', error);
    throw error; 
  }
};

export const sendMessage = async (data: string) => {
  try {
    const response = await Client.student.community.get(data);
    return response.data;
  } catch (error) {
    console.error("Message send error:", error);
    throw error;
  }
};

export const deleteMessage = async (data: string) => {
  try {
    const response = await Client.student.community.get(data);
    return response.data;
  } catch (error) {
    console.error('Delete error', error);
    throw error;
  }
};


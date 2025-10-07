/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../api/index"

export const getcoursedata = async (params: any) => {
  try {
    const response = await Client.student.course.get(params);
    return response?.data;
  } catch (error) {
    console.error('Error in getcoursedata:', error);
    throw error;
  }
}
export const getcoursedataUUID = async (params: any) => {
  try {
    const response = await Client.student.course.getById(params);
    return response?.data;
  } catch (error) {
    console.error('Error in getcoursedata:', error);
    throw error;
  }
}
export const getCourseTrackData = async (params: any) => {
  try {
    const response = await Client.student.course.coursetrack(params);
    return response?.data;
  } catch (error) {
    console.error('Error in getcoursedata:', error);
    throw error;
  }
}

export const taskdataget = async (params: any) => {
  try {
    const response = await Client.student.course.gettask(params)
    console.log(response, 'services course')
    return response?.data;
  }
  catch (error) {
    console.log('Error in taskdata', error);
  }
}

export const updatetaskdata = async (data: any) => {
  try {
    const response = await Client.student.course.updatetask(data)
    return response;
  }
  catch (error) {
    console.log(' Failed updated task is error', error)
  }
}


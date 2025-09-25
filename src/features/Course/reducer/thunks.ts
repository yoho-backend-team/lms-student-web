/* eslint-disable @typescript-eslint/no-explicit-any */

import { getBatchDataUUID, getcoursedata, getcoursedataUUID, taskdataget } from '../services/Course';
import { getcoursedetails, getcousetask, selectedCourse } from '../reducer/CourseSlice';


export const getStudentcourse = (params: any = {}) => async (dispatch: any) => {
  try {
    const response = await getcoursedata(params);
    dispatch(getcoursedetails(response));
    return response;
  } catch (error) {
    console.error('Error in getStudentcourse:', error);
    throw error;
  }
};

export const getcourseUUIDThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await getcoursedataUUID(params);
    dispatch(selectedCourse(response));
    return response;
  } catch (error) {
    console.error('Error in getStudentcourse:', error);
    throw error;
  }
};
export const getBatchUUIDThunks = (params: any) => async (dispatch: any) => {
  try {
    const response = await getBatchDataUUID(params);
    dispatch(selectedCourse(response));
    return response;
  } catch (error) {
    console.error('Error in getStudentcourse:', error);
    throw error;
  }
};

export const getStudentTask = (params: any) => async (dispatch: any) => {
  try {
    const response = await taskdataget(params)
    dispatch(getcousetask(response))
    console.log(response, 'thunks course data')
    return response;
  }
  catch (error) {
    console.log('error fetching course data task', error)
  }
}
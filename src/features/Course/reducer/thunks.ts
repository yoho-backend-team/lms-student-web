/* eslint-disable @typescript-eslint/no-explicit-any */
import { getcoursedata } from '../services/Course';
import { getcoursedetails } from './CourseSlice';


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

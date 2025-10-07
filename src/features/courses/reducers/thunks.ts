/* eslint-disable @typescript-eslint/no-explicit-any */
import { setCourse } from "./courseSlice";
import { getCourseDetails } from "../services";

const getAndUpdateCourseDetails = (data: any) => async (dispatch: any) => {
  try {

    const response = await getCourseDetails(data);
    dispatch(setCourse(response));
  } catch (error) {
    return error;
  }
};

export default getAndUpdateCourseDetails;


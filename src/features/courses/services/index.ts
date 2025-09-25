/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from "../../../api/index"

export const getCourseDetails = async (data: any) => {
  try {
    const response = await Client.student.course.get(data);

    return response?.data;

  } catch (error) {
    return error;
  }
};
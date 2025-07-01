import { getAttendanceDataClient } from '../services';
import { setAttendanceData } from './AttendanceSlice';

export const getAttendanceData =
  (params: any) => async (dispatch: any) => {
    try {
      const response = await getAttendanceDataClient(params);
      console.log(response, 'attendance response');
      dispatch(
        setAttendanceData({
          summary: response?.data?.summary,
          overview: response?.data?.overview,
          chart: response?.data?.chart,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

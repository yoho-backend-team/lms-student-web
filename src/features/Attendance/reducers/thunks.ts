import { getAttendanceDataClient } from '../services/index';
import { Attendancetoken } from './AttendanceSlice';

export const getAttendanceData =
    ( params: any) => async (dispatch: any) => {
        try {
            const response = await getAttendanceDataClient(params);
            console.log('attedance response' , response)
            dispatch(Attendancetoken(response));
        } catch (error) {
            console.log(error);
        }
    };
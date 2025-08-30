import { getattendancedata, getattendancedatabyDate } from '../services/Attendace';
import { getAttendanceByDate, getattendancedetails } from './AttendanceSlice';


export const getStudentattendance =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getattendancedata(params);
            dispatch(getattendancedetails(response));
        } catch (error) {
            console.log(error);
        }
    };


export const getattendanceByDate =
    (params: any) => async (dispatch: any) => {
        try {
            const response = await getattendancedatabyDate(params);
            dispatch(getAttendanceByDate(response.data));
        } catch (error) {
            console.log(error);
        }
    };
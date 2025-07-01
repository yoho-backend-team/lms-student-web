import Client from '@/api/index';

export const getAttendanceDataClient = async (params: any) => {
  const response = await Client.student.attendance.get(params);
  if (response) {
    return response;
  }
};

import { type RootState } from '@/store/store';

export const selectAttendanceSummary = (state: RootState) =>
  state.AttendanceSlice.summary;

export const selectAttendanceChart = (state: RootState) =>
  state.AttendanceSlice.chart;

export const selectAttendanceOverview = (state: RootState) =>
  state.AttendanceSlice.overview;


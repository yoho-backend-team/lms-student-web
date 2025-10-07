/* eslint-disable @typescript-eslint/no-explicit-any */
export const selectActivityLogs = (state: any) => state.ActivityLogsSlice.data;
export const selectLoading = (state: any) => state.ActivityLogsSlice.loading;

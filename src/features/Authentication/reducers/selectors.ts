/* eslint-disable @typescript-eslint/no-explicit-any */
export const selectToken = (state: any) => state.AuthSlice.data;
export const selectUser = (state: any) => state.AuthSlice.user;

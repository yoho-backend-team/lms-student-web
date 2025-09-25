/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "@/store/store";

export const selectCourse = (state: any) => state.CourseSlice.data;
export const selectcoursetask = (state: RootState) => state.CourseSlice.task;

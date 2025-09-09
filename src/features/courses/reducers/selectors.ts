import type { RootState } from "@/store/store";

export const selectStudentCourse = (state:RootState)=> state.CourseSlice.data;
// export const selectcoursetask=(state:RootState)=>state.CourseSlice;

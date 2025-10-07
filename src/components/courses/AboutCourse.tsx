/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseCard from './CourseCard';
import navigationicon from "../../assets/courses icons/navigation arrow.svg"
import CourseButton from './coursebutton';
import { FONTS } from '@/constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { GetLocalStorage } from '@/utils/helper';
import { getcourseUUIDThunks } from '@/features/Course/reducer/thunks';

const AboutCourse: React.FC = () => {
  const { course } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()

  const coursedata: any = useSelector((state: RootState) => state.CourseSlice.selectedCourse);

  useEffect(() => {
    (async () => {
      const params = {
        instituteuuid: GetLocalStorage("instituteId"),
        branchuuid: GetLocalStorage("branchId"),
        courseid: course,
      }
      dispatch(getcourseUUIDThunks(params))
    })()
  }, [course, dispatch]);



  return (
    <div className="w-full mx-auto 
                    p-3 xs:p-3
                    sm:p-4
                    md:p-5
                    lg:p-6
                    xl:p-6
                    2xl:p-8">
      <div className="flex items-center mb-4 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-7 2xl:mb-8
                      gap-2 xs:gap-2 sm:gap-2.5 md:gap-3 lg:gap-3 xl:gap-3.5 2xl:gap-4">
        <Button
          onClick={() => {
            navigate(-1)
          }}
          className="bg-[#EBEFF3] cursor-pointer text-[#333] hover:bg-[#e0e0e0] rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]
                     px-0.5 py-0.5 xs:px-0.5 xs:py-0.5
                     sm:px-1 sm:py-1
                     md:px-1 md:py-1
                     lg:px-1 lg:py-1
                     xl:px-1.5 xl:py-1.5
                     2xl:px-2 2xl:py-2"
        >
          <img src={navigationicon} className="w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 2xl:w-9 2xl:h-9" />
        </Button>
        <h1 className="text-lg xs:text-lg sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl" style={FONTS.heading_02}>About</h1>
      </div>
      
      <div className="mb-4 xs:mb-4 sm:mb-5 md:mb-6 lg:mb-6 xl:mb-7 2xl:mb-8">
        <CourseButton activeTabs="track" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-6 xl:gap-7 2xl:gap-8 
                      max-w-full xs:max-w-full sm:max-w-full md:max-w-screen-md lg:max-w-screen-xl xl:max-w-screen-xl 2xl:max-w-screen-2xl 
                      mx-auto items-start">
        <CourseCard
          title={coursedata?.course_name ?? ''}
          description={coursedata?.description ?? ''}
          image={coursedata?.image ?? ''}
          modules={coursedata?.coursemodules?.length ?? 0}
          duration={coursedata?.duration ?? ''}
        />

        <div className="bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] rounded-lg w-full
                        p-4 xs:p-4
                        sm:p-5
                        md:p-6
                        lg:p-6
                        xl:p-7
                        2xl:p-8">
          <div className="space-y-4 xs:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-6 xl:space-y-7 2xl:space-y-8">
            <div>
              <h3 className="mb-1.5 xs:mb-1.5 sm:mb-2 md:mb-2 lg:mb-2.5 xl:mb-2.5 2xl:mb-3
                             text-sm xs:text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl" 
                  style={FONTS.heading_02}>
                Course Name
              </h3>
              <Button className="w-full bg-[#EBEFF3] hover:bg-[#EBEFF3] text-left justify-start rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]
                                 py-2 px-3 xs:py-2 xs:px-3
                                 sm:py-2.5 sm:px-3.5
                                 md:py-3 md:px-4
                                 lg:py-3 lg:px-4
                                 xl:py-3.5 xl:px-5
                                 2xl:py-4 2xl:px-6
                                 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg" 
                      style={FONTS.para_02}>
                {coursedata?.course_name ?? ''}
              </Button>
            </div>
            <div>
              <h3 className="mb-1.5 xs:mb-1.5 sm:mb-2 md:mb-2 lg:mb-2.5 xl:mb-2.5 2xl:mb-3
                             text-sm xs:text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl" 
                  style={FONTS.heading_02}>
                Course Durations
              </h3>
              <Button className="w-full bg-[#EBEFF3] hover:bg-[#EBEFF3] text-left justify-start rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]
                                 py-2 px-3 xs:py-2 xs:px-3
                                 sm:py-2.5 sm:px-3.5
                                 md:py-3 md:px-4
                                 lg:py-3 lg:px-4
                                 xl:py-3.5 xl:px-5
                                 2xl:py-4 2xl:px-6
                                 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg" 
                      style={FONTS.para_02}>
                {coursedata?.duration ?? ''}
              </Button>
            </div>
            <div>
              <h3 className="mb-1.5 xs:mb-1.5 sm:mb-2 md:mb-2 lg:mb-2.5 xl:mb-2.5 2xl:mb-3
                             text-sm xs:text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl" 
                  style={FONTS.heading_02}>
                Total Hours
              </h3>
              <Button className="w-full bg-[#EBEFF3] hover:bg-[#EBEFF3] text-left justify-start rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] truncate
                                 py-2 px-3 xs:py-2 xs:px-3
                                 sm:py-2.5 sm:px-3.5
                                 md:py-3 md:px-4
                                 lg:py-3 lg:px-4
                                 xl:py-3.5 xl:px-5
                                 2xl:py-4 2xl:px-6
                                 text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base xl:text-base 2xl:text-lg" 
                      style={FONTS.para_02}>
                {coursedata?.duration ?? ''}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCourse;
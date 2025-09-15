import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CourseCard from './CourseCard';
import navigationicon from "../../assets/courses icons/navigation arrow.svg"
import CourseButton from './coursebutton';
import { FONTS } from '@/constants/uiConstants';
import { useSelector } from 'react-redux';
import { selectCourse } from '@/features/Course/reducer/selector';

interface Course {
  course_name: string;
  description: string;
  image: string;
  slug: string;
  coursemodules: string;
  duration: string;
}
const AboutCourse: React.FC = () => {
  // const { course } = useParams<{ course: string }>();
  const navigate = useNavigate();
  // const selected = courseData[course?.toLowerCase() as keyof typeof courseData];

  const [courses, setCourses] = useState<Course | null>(null);

  const coursedata = useSelector(selectCourse);

  useEffect(() => {
    setCourses(coursedata)
  }, [coursedata])

  return (
    <div className="w-full mx-auto p-4">
      <div className="flex items-center gap-3 mb-6">
        <Button
          onClick={() => {
            navigate(-1)
          }}
          className="bg-[#EBEFF3] cursor-pointer text-[#333] hover:bg-[#e0e0e0] px-1 py-1 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
        >
          <img src={navigationicon} />
        </Button>
        <h1 className="" style={FONTS.heading_02}>About</h1>
      </div>
      <CourseButton activeTabs="track" />



      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-screen-xl mx-auto items-start">
        <CourseCard
          title={courses?.course_name ?? ''}
          description={courses?.description ?? ''}
          image={courses?.image ?? ''}
          modules={courses?.coursemodules.length ?? 0}
          duration={courses?.duration ?? ''}
        />

        <div className="bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg w-full">
          <div className="space-y-6">
            <div>
              <h3 className=" mb-2" style={FONTS.heading_02}>Course Name</h3>
              <Button className="w-full bg-[#EBEFF3] hover:bg-[#EBEFF3] text-left justify-start  py-3 px-4 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={FONTS.para_02}>
                {courses?.course_name ?? ''}
              </Button>
            </div>
            <div>
              <h3 className=" mb-2" style={FONTS.heading_02}>Course Durations</h3>
              <Button className="w-full bg-[#EBEFF3] hover:bg-[#EBEFF3] text-left justify-start  py-3 px-4 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]" style={FONTS.para_02}>
                {courses?.duration ?? ''}
              </Button>
            </div>
            <div>
              <h3 className=" mb-2" style={FONTS.heading_02}>Total Hours</h3>
              <Button className="w-full bg-[#EBEFF3] hover:bg-[#EBEFF3] text-left justify-start  py-3 px-4 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] truncate" style={FONTS.para_02}>
                {courses?.duration ?? ''}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutCourse;

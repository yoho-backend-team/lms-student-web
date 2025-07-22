import MainCourse from '@/components/courses/MainCourse';
import { selectCourse } from '@/features/Course/reducer/selector';
import { getStudentcourse } from '@/features/Course/reducer/thunks';
import { useInstituteData } from '@/hooks/DashboardData/useInstitute';
import type { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Courses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coursedata = useSelector(selectCourse); // Remove .data here
  console.log('Redux course data:', coursedata);

  const instituteuuid = useInstituteData();
      console.log('institue details',instituteuuid);

  useEffect(() => {
    const fetchData = async () => {
      try { 
      const params = {
        instituteuuid : useInstituteData().instituteDetails,
        branchuuid : '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
        courseId : '67a0bd83a0af9570a36c499d'
      }
        await dispatch(getStudentcourse(params)); 
      } catch (error) {
        console.error('Course fetch error:', error);
      }
    };

    fetchData();
  }, [dispatch]);

	return (

		<div>
			<MainCourse />
		</div>

	)

};

export default Courses;

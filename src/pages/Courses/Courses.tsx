import MainCourse from '@/components/courses/MainCourse';
import { selectCourse } from '@/features/Course/reducer/selector';
import { getStudentcourse } from '@/features/Course/reducer/thunks';
import type { AppDispatch } from '@/store/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Courses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coursedata = useSelector(selectCourse); // Remove .data here
  console.log('Redux course data:', coursedata);

  useEffect(() => {
    const fetchData = async () => {
      try { 
      
        await dispatch(getStudentcourse({         })); 
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

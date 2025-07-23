import MainCourse from '@/components/courses/MainCourse';
import { selectCourse } from '@/features/Course/reducer/selector';
import { getStudentcourse } from '@/features/Course/reducer/thunks';
import { useInstituteData } from '@/hooks/DashboardData/useInstitute';
import type { AppDispatch } from '@/store/store';
import { GetLocalStorage } from '@/utils/helper';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Courses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const coursedata = useSelector(selectCourse);
  console.log('Redux course data:', coursedata);

  const instituteuuid = useInstituteData();
  console.log('institue details', instituteuuid);

  useEffect(() => {
    const fetchData = async () => {
      const instituteId = GetLocalStorage('instituteId')
      const branchId = GetLocalStorage('branchId')
      try {
        const params = {
          instituteuuid: instituteId,
          branchuuid: branchId,
          courseId: '67a0bd83a0af9570a36c499d'
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

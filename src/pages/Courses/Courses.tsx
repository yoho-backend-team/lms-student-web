import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { getStudentcourse } from '@/features/Course/reducer/thunks';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { GetLocalStorage } from '@/utils/helper';
import type { AppDispatch } from '@/store/store';
import { useLoader } from '@/context/LoadingContext/Loader';
import MainCourse from '@/components/courses/MainCourse';

const Courses = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { showLoader, hideLoader } = useLoader();
  const location = useLocation(); 

  useEffect(() => {
    const fetchData = async () => {
      const instituteId = GetLocalStorage('instituteId');
      const branchId = GetLocalStorage('branchId');
      try {
        const params = { instituteuuid: instituteId, branchuuid: branchId };
        await dispatch(getStudentcourse(params));
      } catch (error) {
        console.error('Course fetch error:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      try {
        showLoader();
        const timeoutId = setTimeout(() => hideLoader(), 5000);
        const response = await dispatch(getDashBoardReports());
        if (response) clearTimeout(timeoutId);
      } finally {
        hideLoader();
      }
    })();
  }, [dispatch, hideLoader, showLoader]);

  // ✅ Show MainCourse only if we are on /courses exactly
  const isMainCourseVisible = location.pathname === '/courses';

  return (
    <div>
      {isMainCourseVisible && <MainCourse />}
      <Outlet /> {/* nested route will always render */}
    </div>
  );
};

export default Courses;

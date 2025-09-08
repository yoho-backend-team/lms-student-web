/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectDashBoard } from '@/features/Dashboard/reducers/selectors';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCourses = () => {
  const dispatch = useDispatch<any>()
  useEffect(() => {
    (async () => {
      await dispatch(getDashBoardReports())
    })()
  }, [dispatch]);
  const courseDetails = useSelector(selectDashBoard)
  return courseDetails.courses;
};

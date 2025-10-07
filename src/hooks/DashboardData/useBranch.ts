/* eslint-disable @typescript-eslint/no-explicit-any */
import { selectDashBoard } from '@/features/Dashboard/reducers/selectors';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useBranchData = () => {
  const dispatch = useDispatch<any>()
  useEffect(() => {
    const func = async () => {
      await dispatch(getDashBoardReports())
    }
    func()
  }, [dispatch]);
  const branchDetails = useSelector(selectDashBoard)
  return branchDetails.branch;
};

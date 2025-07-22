import { selectDashBoard } from '@/features/Dashboard/reducers/selectors';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useBatches = () => {
  const dispatch = useDispatch<any>()
    const func = async ()=>{
       await dispatch(getDashBoardReports())
    }
    useEffect(() => {
        func()
  }, [dispatch]);
  const batchDetails = useSelector(selectDashBoard)
  return batchDetails.batches;
};

import { useEffect } from 'react';
import HelpCentre from '../../components/Helpcenter/helpcenter';
import { getHelpThunk } from '@/features/HelpCenter/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { selectHelpCenter } from '@/features/HelpCenter/selectors';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';
import { GetLocalStorage } from '@/utils/helper';

const HelpCenter = () => {

  const dispatch = useDispatch<any>();
  const HelpDetails = useSelector(selectHelpCenter)
  const userDetail = GetLocalStorage('user');

  useEffect(() => {
    dispatch(getStudentProfileThunk({}));
    dispatch(getHelpThunk({instituteid: userDetail?.institute_id?.uuid}));
    console.log(HelpDetails)
  }, [dispatch]);

  return <HelpCentre />;
};

export default HelpCenter;

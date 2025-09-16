/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import HelpCentre from '../../components/Helpcenter/helpcenter';
import { getHelpThunk } from '@/features/HelpCenter/thunks';
import { useDispatch } from 'react-redux';
import { GetLocalStorage } from '@/utils/helper';

const HelpCenter = () => {

  const dispatch = useDispatch<any>();
  const userDetail: any = GetLocalStorage('user');

  useEffect(() => {
    dispatch(getHelpThunk({ instituteid: userDetail?.institute_id?.uuid }));
  }, [dispatch, userDetail?.institute_id?.uuid]);

  return <HelpCentre />;
};

export default HelpCenter;

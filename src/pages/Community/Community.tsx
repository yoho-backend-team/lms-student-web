import { useEffect } from 'react';
import Communityside from '../../components/community/communityside';
import {getAllCommunities } from '../../features/community/redux/commuityThunk'; // Fixed filename
import { useAppDispatch } from '../../features/community/redux/hooks';
import { useSelector } from 'react-redux';
import { selectCommunities } from '@/features/community/redux/communitySelector';



const Community = () => {
  const dispatch = useAppDispatch();

  const Data = useSelector(selectCommunities);
  console.log('final data',Data)

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const data = "";
        dispatch(getAllCommunities(data)); 
      } catch (error) {
        console.error('Community fetch error:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  

  return (
    <>
      <div className="w-[260px] ml-14 mt-2">
        <p className="text-2xl font-semibold">Community</p>
      </div>  
      <Communityside />
    </>
  );
};

export default Community;
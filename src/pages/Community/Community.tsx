import { useEffect } from 'react';
import Communityside from '../../components/community/communityside';
import {getAllCommunities } from '../../features/community/redux/commuityThunk'; // Fixed filename
import { Dispatch } from '@reduxjs/toolkit';
const Community = () => {
  const dispatch = useDispatch();


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

  // if (loading) return <div>Loading communities...</div>;

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

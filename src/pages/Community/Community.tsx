import { useEffect } from 'react';
import Communityside from '../../components/community/communityside';// Fixed filename
import { useAppDispatch } from '../../features/community/redux/hooks';
import { getAllCommunitiesData} from '@/features/community/redux/commuityThunk';


const Community = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {

    const fetchData = async () => {
      try { 
        dispatch(getAllCommunitiesData('')); 
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
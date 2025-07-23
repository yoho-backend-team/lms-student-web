import { useEffect, useState } from 'react';
import Communityside from '../../components/community/communityside';// Fixed filename
import { useAppDispatch } from '../../features/community/redux/hooks';
import { getAllCommunitiesData } from '@/features/community/redux/commuityThunk';
import { useSelector } from 'react-redux';
import { selectCommunities } from '@/features/community/redux/communitySelector';
import { StudentSocketProvider, useStudentSocket } from '@/context/socketContext';


const Community = () => {
  const [messages, setMessages] = useState([])
  const dispatch = useAppDispatch();
  const socket = useStudentSocket();

  const Data = useSelector(selectCommunities);
  console.log('final data',Data)

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
  
 useEffect(()=>{
  if(!socket) return null;

  const handleMessage = (data:any) =>{
    console.log("Message Receieved", data)
    setMessages((prev)=> [data, ...prev])
  }

  socket.emit('newMessage', handleMessage)

  return ()=>{
    socket.off('Socket Disconnected', handleMessage)
  }
 })
  

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
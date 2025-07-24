import { useEffect, useState } from 'react';
import Communityside from '../../components/community/communityside'; // Fixed filename
import { useAppDispatch } from '../../features/community/redux/hooks';
import { getAllCommunitiesData } from '@/features/community/redux/commuityThunk';
import { useSelector } from 'react-redux';
import { selectCommunities } from '@/features/community/redux/communitySelector';
import {
	useStudentSocket,
} from '@/context/socketContext';
import { io } from 'socket.io-client';

const Community = () => {
	const dispatch = useAppDispatch();
	// const socket = useStudentSocket();
	const [socket, setSocket] = useState(null)
	const communities = useSelector(selectCommunities);
	console.log('final data', communities);

	useEffect(()=>{
         const SocketConnection = io("http://localhost:3000")
		 setSocket(SocketConnection)

		 return ()=>{
			SocketConnection.disconnect()
		 }
	},[])

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
			<div className='w-[260px] sticky ml-6 mt-2'>
				<p className='text-2xl font-semibold'>Community</p>
			</div>
			<Communityside
				socket={socket}
				communities={communities}

			/>
		</>
	);
};

export default Community;

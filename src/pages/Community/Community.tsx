import { useEffect, useState } from 'react';
import Communityside from '../../components/community/communityside'; // Fixed filename
import { useAppDispatch } from '../../features/community/redux/hooks';
import { getAllCommunitiesData } from '@/features/community/redux/commuityThunk';
import { useSelector } from 'react-redux';
import { selectCommunities } from '@/features/community/redux/communitySelector';
import {
	StudentSocketProvider,
	useStudentSocket,
} from '@/context/socketContext';
import { getMessage } from '@/features/community/services/communityservices';
import { toast } from 'react-toastify';

const Community = () => {
	const [currentChat, setCurrentChat] = useState();
	const dispatch = useAppDispatch();
	const socket = useStudentSocket();
	const communities = useSelector(selectCommunities);
	console.log('final data', communities);

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
				currentChat={currentChat}
				setCurrentChat={setCurrentChat}
			/>
		</>
	);
};

export default Community;

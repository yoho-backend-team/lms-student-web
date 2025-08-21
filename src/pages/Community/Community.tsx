import { useEffect } from 'react';
import Communityside from '../../components/community/communityside';
// import { useAppDispatch } from '../../features/community/redux/hooks';
import { getAllCommunitiesData } from '@/features/community/redux/commuityThunk';
import { useSelector } from 'react-redux';
import { selectCommunities } from '@/features/community/redux/communitySelector';
import Loader from '@/components/Loader/Loader';
import { useLoader } from '@/context/LoadingContext/Loader';
import { useDispatch } from 'react-redux';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';

const Community = () => {
	const communities = useSelector(selectCommunities);
	const dispatch = useDispatch<any>();
	const { showLoader, hideLoader, IsLoading } = useLoader();

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


	useEffect(() => {
					(async () => {
						try {
							showLoader();
							const timeoutId = setTimeout(() => {
								hideLoader();
							}, 5000);
							const response = await dispatch(getDashBoardReports());
							if (response) {
								clearTimeout(timeoutId);
							}
						} finally {
							hideLoader();
						}
					})();
				}, [dispatch, hideLoader, showLoader]);
		
	
	return (
		<>
			<div className=' sticky ml-2 mt-2'>
			{IsLoading && (
				<div className='w-full h-[100vh] absolute z-10 bg-transparent backdrop-blur-sm transition-all duration-500 ease-in-out'>
					<Loader />
				</div>
			)}
			<p className='text-2xl font-semibold'>Community</p>
			<Communityside communities={communities} />
		</div>

		</>
	);
};

export default Community;

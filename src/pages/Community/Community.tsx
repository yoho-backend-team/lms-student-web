/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type { AppDispatch } from '@/store/store';
import { GetLocalStorage } from '@/utils/helper';

const Community = () => {
	const communities: any = useSelector(selectCommunities);
	const dispatch = useDispatch<AppDispatch>();
	const { showLoader, hideLoader, IsLoading } = useLoader();
	const user = GetLocalStorage("user")

	useEffect(() => {
		const fetchData = async () => {
			try {
				dispatch(getAllCommunitiesData(''));
			} catch (error) {
				console.error('Community fetch error:', error);
			}
		};

		fetchData();
	}, [dispatch, user?._id]);


	const data: any = { data: [] }
	communities?.data?.forEach((item: any) => {
		if (item?.batch?.student?.includes(user?._id)) {
			data?.data?.push(item)
		}
	})

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
				<Communityside communities={data} />
			</div>

		</>
	);
};

export default Community;

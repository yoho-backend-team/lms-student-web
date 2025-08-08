import React, { useEffect } from 'react';
import SpokenEnglishLearning from '@/components/SpokenEnglish/SpokenEnglishLearning';
import Loader from '@/components/Loader/Loader';
import { useLoader } from '@/context/LoadingContext/Loader';
import { useDispatch } from 'react-redux';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';



const SpokenEnglish: React.FC = () => {
			 const dispatch = useDispatch<any>();
			const { showLoader, hideLoader, IsLoading } = useLoader();
			
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
		{IsLoading && (
				<div className='w-full h-[100vh] absolute z-10 bg-transparent backdrop-blur-sm transition-all duration-500 ease-in-out '>
					<Loader />
				</div>
			)}
		<div className='w-full h-full relative'>
			<SpokenEnglishLearning />
		</div>
		</>
	);
};

export default SpokenEnglish;
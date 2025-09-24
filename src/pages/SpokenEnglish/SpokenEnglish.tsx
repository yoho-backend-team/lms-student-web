/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import SpokenEnglishLearning from '@/components/SpokenEnglish/SpokenEnglishLearning';
import { useLoader } from '@/context/LoadingContext/Loader';
import { useDispatch } from 'react-redux';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';



const SpokenEnglish: React.FC = () => {
	const dispatch = useDispatch<any>();
	const { showLoader, hideLoader } = useLoader();

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
			<div className='w-full h-full relative'>
				<SpokenEnglishLearning />
			</div>
		</>
	);
};

export default SpokenEnglish;
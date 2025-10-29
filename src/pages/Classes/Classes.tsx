/* eslint-disable @typescript-eslint/no-explicit-any */
import Completedclass from '@/components/classes/Completedclass';
import Liveclass from '@/components/classes/Liveclass';
import Upcomingclass from '@/components/classes/Upcomingclass';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { FONTS, COLORS } from '@/constants/uiConstants';
import { getClassDetails } from '@/features/classes/reducers/thunks';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@/store/store';
import { selectClass } from '@/features/classes/reducers/selectors';
import { useCourses } from '@/hooks/DashboardData/useCourses';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';

const Classes = () => {
	const [activeTab, setActiveTab] = useState<'live' | 'upcoming' | 'completed'>(
		'completed'
	);
	const dispatch = useDispatch<AppDispatch>();
	const classData = useSelector(selectClass)?.data || [];
	const coursesDetails = useCourses();
	const { showLoader, hideLoader } = useLoader();

	const fetchClassData = (tab: 'live' | 'upcoming' | 'completed') => {
		setActiveTab(tab);
		dispatch(
			getClassDetails({
				courseId: coursesDetails?.map((id: any) => id?.course?._id)[0],
				userType: 'online',
				classType: tab,
				page: 1,
			})
		);
	};

	useEffect(() => {
		(async (tab: 'live' | 'upcoming' | 'completed') => {
			setActiveTab(tab);
			showLoader();
			await dispatch(
				getClassDetails({
					courseId: coursesDetails?.map((id: any) => id?.course?._id)[0],
					userType: 'online',
					classType: tab,
					page: 1,
				})
			);
			hideLoader();
		})(activeTab);
	}, [activeTab, coursesDetails, dispatch, hideLoader, showLoader]);

	useEffect(() => {
		(async () => {
			try {
				dispatch(getDashBoardReports());
			} finally {
				hideLoader();
			}
		})();
	}, [dispatch, hideLoader, showLoader]);

	return (
		<>
			<div
				style={{ backgroundColor: COLORS.bg_Colour }}
				className='mt-2 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'
			>
				<h1
					style={{ ...FONTS.heading_01 }}
					className='mb-4 text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl'
				>
					Classes
				</h1>

				<Card
					style={{ backgroundColor: COLORS.bg_Colour }}
					className='p-3 xs:p-4 sm:p-6 lg:p-8'
				>
					<h2
						style={{ ...FONTS.heading_02 }}
						className='mb-4 text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl'
					>
						Online Classes
					</h2>
					<div className='flex flex-row flex-wrap gap-2 xs:gap-3 sm:gap-4 lg:gap-6 xl:gap-8 justify-start'>
						{['live', 'upcoming', 'completed'].map((tab) => (
							<Button
								key={tab}
								style={{
									...FONTS.heading_07,
									color: activeTab === tab ? COLORS.white : undefined,
								}}
								onClick={() =>
									fetchClassData(tab as 'live' | 'upcoming' | 'completed')
								}
								className={`w-full sm:w-auto px-3 xs:px-4 sm:px-5 lg:px-6 xl:px-8 min-w-[100px] xs:min-w-[120px] sm:min-w-[140px] lg:min-w-[160px] xl:min-w-[180px] 2xl:min-w-[200px] rounded-xl btnshadow text-[#716F6F] text-xs xs:text-sm sm:text-[14px] lg:text-base xl:text-lg hover:text-white btnhovershadow cursor-pointer transition-all duration-300 ${
									activeTab === tab
										? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]'
										: 'bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] hover:shadow-[3px_3px_6px_rgba(255,255,255,0.8),4px_4px_8px_rgba(189,194,199,0.6)_inset]'
								}`}
								variant={activeTab === tab ? 'default' : 'outline'}
							>
								{tab === 'live'
									? 'Live Class'
									: tab === 'upcoming'
									? 'Upcoming Classes'
									: 'Completed Classes'}
							</Button>
						))}
					</div>
				</Card>

				<div className='mt-4 xs:mt-5 sm:mt-6 lg:mt-8 xl:mt-10 2xl:mt-12 w-full'>
					{activeTab === 'live' && <Liveclass data={classData} />}
					{activeTab === 'upcoming' && <Upcomingclass data={classData} />}
					{activeTab === 'completed' && <Completedclass data={classData} />}
				</div>
			</div>
		</>
	);
};

export default Classes;

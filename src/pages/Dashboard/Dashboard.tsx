import React from 'react';
// import style from './style.module.css'
import InstituteDetails from '@/components/dashboard/InstituteDetails';
import ProfileCard from '@/components/dashboard/ProfileCard';
import CourseProgress from '@/components/dashboard/CourseProgress';

const Dashboard: React.FC = () => {
	return (
		<>
			<div className='flex flex-col h-full w-full p-5 overflow-x-hidden'>
				<div className="grid grid-cols-7 gap-5 justify-between">
					<div className='col-span-2 col-start-1'>
						<InstituteDetails />
					</div>
					<div className='col-span-3 col-start-3'>
						<ProfileCard />
					</div>
					<div className="col-span-2 col-start-6">
						<CourseProgress />
					</div>
				</div>

				<div className='flex flex-row justify-between'>

				</div>

				<div className='flex flex-row justify-between'>

				</div>
			</div>
		</>
	);
};

export default Dashboard;

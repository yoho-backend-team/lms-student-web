import React from 'react';
// import style from './style.module.css'
import InstituteDetails from '@/components/dashboard/InstituteDetails';
import ProfileCard from '@/components/dashboard/ProfileCard';
import CourseProgress from '@/components/dashboard/CourseProgress';

const Dashboard: React.FC = () => {
	return (
		<>
			<div className='flex flex-col h-full w-full p-5 bg-white overflow-x-hidden'>
				<div className="flex flex-row justify-between">
					<InstituteDetails />
					<ProfileCard />
					<CourseProgress />
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

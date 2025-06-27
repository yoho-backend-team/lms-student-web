import React from 'react';
// import style from './style.module.css'
import InstituteDetails from '@/components/dashboard/InstituteDetails';
import ProfileCard from '@/components/dashboard/ProfileCard';
import CourseProgress from '@/components/dashboard/CourseProgress';
import Attendance from '@/components/dashboard/Attendance';
import Payment from '@/components/dashboard/Payment';
import Assesments from '@/components/dashboard/Assesments';
import Updates from '@/components/dashboard/Updates';
import Calendar from '@/components/dashboard/Calendar';

const Dashboard: React.FC = () => {
	return (
		<>
			<div className='flex flex-col h-full w-full p-5 gap-5 overflow-x-hidden' style={{ scrollbarWidth: "none" }}>
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

				<div className='grid grid-cols-3 gap-5'>
					<div>
						<Attendance />
					</div>
					<div>
						<Payment />
					</div>
					<div>
						<Assesments />
					</div>
				</div>

				<div className='grid grid-cols-3 gap-5'>
					<div className="col-span-2">
						<Updates />
					</div>
					<div>
						<Calendar />
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;

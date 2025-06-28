import React from 'react';
// import style from './style.module.css'
import InstituteDetails from '@/components/dashboard/InstituteDetails';
import ProfileCard from '@/components/dashboard/ProfileCard';
import CourseProgress from '@/components/dashboard/CourseProgress';
import Attendance from '@/components/dashboard/Attendance';
import Payment from '@/components/dashboard/Payment';
import Assesments from '@/components/dashboard/Assesments';
import Updates from '@/components/dashboard/Updates';
import CalendarDash from '@/components/dashboard/Calendar';
import { FONTS } from '@/constants/uiConstants';

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
						<CalendarDash />
					</div>
				</div>

				<div className="flex flex-row justify-between">
					<div className='divshadow p-2 rounded-xl'>
						<p style={{ ...FONTS.heading_06 }}>Course Name: <span style={{ ...FONTS.heading_04 }}>MEARN STACK 2024</span></p>
					</div>
					<div className='divshadow p-2 rounded-xl'>
						<p style={{ ...FONTS.heading_06 }}>Projects: <span style={{ ...FONTS.heading_04 }}>Web Development</span></p>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;

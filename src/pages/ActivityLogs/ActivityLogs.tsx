import { COLORS, FONTS } from '@/constants/uiConstants';
import backBtn from '../../assets/icons/common/back_arrow.png';
import vector_H from '../../assets/icons/activitylog/Vector-H.png';
import User from '../../assets/icons/activitylog/User.png';
import filter from '../../assets/icons/common/filter.png';
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useNavigate } from 'react-router-dom';

const ActivityLogs = () => {
	const [handleFilter, setHandleFilter] = useState(false);
	const [date, setDate] = useState<Date | undefined>(undefined);
	const [showFromCalendar, setShowFromCalendar] = useState(false);
	const [showToCalendar, setShowToCalendar] = useState(false);
	const navigate = useNavigate();
	const activityLogs = [
		{
			id: 1,
			title: 'Dashboard Logout Successfully',
			date: '25 June 2025 9:40 AM',
			description:
				'Dashboard Logout Successfully musk@gmail.com 25 June 2025 9:40 AM',
		},
		{
			id: 2,
			title: 'Dashboard Logout Successfully',
			date: '25 June 2025 9:40 AM',
			description:
				'Dashboard Logout Successfully musk@gmail.com 25 June 2025 9:40 AM',
		},
		{
			id: 3,
			title: 'Dashboard Logout Successfully',
			date: '25 June 2025 9:40 AM',
			description:
				'Dashboard Logout Successfully musk@gmail.com 25 June 2025 9:40 AM',
		},
		{
			id: 4,
			title: 'Dashboard Logout Successfully',
			date: '25 June 2025 9:40 AM',
			description:
				'Dashboard Logout Successfully musk@gmail.com 25 June 2025 9:40 AM',
		},
	];

	return (
		<div className='py-6 flex gap-6'>
			<div className='w-3/4'>
				<nav className='flex items-center gap-6'>
					<div
						className='p-2 rounded-lg cursor-pointer'
						style={{
							boxShadow: `
      							rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      							rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
						}}
						onClick={() => navigate(-1)}
					>
						<img src={backBtn} alt='BackBtn' />
					</div>
					<h1 style={{ ...FONTS.heading_01 }}>Activity Log</h1>
				</nav>

				<div className='mt-10 relative'>
					<div className='btnshadow h-[100%] w-3 rounded-2xl  absolute left-[29%] text-transparent'>
						{' '}
						l
					</div>

					{activityLogs.map((data) => (
						<section
							key={data.id}
							className='flex justify-between items-start py-6 gap-12 my-8'
						>
							<div className='w-[240px]'>
								<p style={{ ...FONTS.para_01 }}>{data.date}</p>
							</div>

							<div className='grid gap-6 w-3/4'>
								<h3
									className='pl-14'
									style={{ ...FONTS.para_01, color: COLORS.text_title }}
								>
									{data.title}
								</h3>

								<section className='flex items-center gap-8'>
									<div className='relative'>
										<img src={vector_H} alt='Vector-H' />
										<div
											className='h-8 w-8 rounded-full absolute right-0 top-[-5px]'
											style={{
												background: COLORS.green_text,
												boxShadow:
													'rgba(189, 194, 199, 0.7) 2px 5px 4px,rgba(255, 255, 255, 0.4) 3px 2px 2px inset',
											}}
										></div>

										<div
											className='h-8 w-8 rounded-full flex p-1 absolute left-[-8px] top-[-5px]'
											style={{
												background: COLORS.blue_user,
												boxShadow:
													'rgba(189, 194, 199, 0.7) 2px 5px 4px,rgba(255, 255, 255, 0.4) 3px 2px 2px inset',
											}}
										>
											<img src={User} alt='User-icon' />
										</div>
									</div>

									<div className='p-3 custom-inset-shadow'>
										<p
											style={{ ...FONTS.heading_05, color: COLORS.green_text }}
										>
											{data.description}
										</p>
									</div>
								</section>
							</div>
						</section>
					))}
				</div>
			</div>

			<div className='w-1/4'>
				<div className='flex justify-end cursor-pointer'>
					<img
						src={filter}
						alt=''
						className='h-8 text-end'
						onClick={() => {
							setHandleFilter(!handleFilter);
							setShowFromCalendar(false);
							setShowToCalendar(false);
						}}
					/>
				</div>

				{handleFilter && (
					<div>
						<section className='flex gap-6 justify-end mt-4'>
							<div>
								<p style={{ ...FONTS.heading_07 }}>From</p>
								<button
									className='p-2 rounded-lg'
									onClick={() => {
										setShowFromCalendar(!showFromCalendar);
										setShowToCalendar(false); // close 'To' calendar if open
									}}
									style={{
										...FONTS.heading_07,
										boxShadow: `
      							rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      							rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
									}}
								>
									DD-MM-YYYY
								</button>
							</div>

							<div>
								<p style={{ ...FONTS.heading_07 }}>To</p>
								<button
									className='p-2 rounded-lg'
									onClick={() => {
										setShowToCalendar(!showToCalendar);
										setShowFromCalendar(false); // close 'From' calendar if open
									}}
									style={{
										...FONTS.heading_07,
										boxShadow: `
      							rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      							rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
									}}
								>
									DD-MM-YYYY
								</button>
							</div>
						</section>
					</div>
				)}

				{showFromCalendar && (
					<div
						className=' mt-6 p-1 rounded-lg absolute'
						style={{
							boxShadow:
								'rgba(189, 194, 199, 0.7) 2px 5px 4px,rgba(255, 255, 255, 0.4) 3px 2px 2px inset',
						}}
					>
						<h2
							className='text-xl font-semibold px-3 mt-4'
							style={{ ...FONTS.heading_02 }}
						>
							From Calendar
						</h2>
						<Calendar
							mode='single'
							selected={date}
							onSelect={(selectedDate) => {
								setDate(selectedDate);
								setShowFromCalendar(false);
							}}
							className='rounded-lg bg-gray-100 w-full **:gap-1'
							style={{ backgroundColor: COLORS.bg_Colour }}
							captionLayout='dropdown'
						/>
					</div>
				)}

				{showToCalendar && (
					<div
						className=' mt-6 p-1 rounded-lg absolute'
						style={{
							boxShadow:
								'rgba(189, 194, 199, 0.7) 2px 5px 4px,rgba(255, 255, 255, 0.4) 3px 2px 2px inset',
						}}
					>
						<h2
							className='text-xl font-semibold px-3 mt-4'
							style={{ ...FONTS.heading_02 }}
						>
							To Calendar
						</h2>
						<Calendar
							mode='single'
							selected={date}
							onSelect={(selectedDate) => {
								setDate(selectedDate);
								setShowToCalendar(false); // hide after selection
							}}
							className='rounded-lg bg-gray-100 w-full **:gap-1'
							style={{ backgroundColor: COLORS.bg_Colour }}
							captionLayout='dropdown'
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default ActivityLogs;

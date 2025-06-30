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
	const [fromDate, setFromDate] = useState<any | undefined>(undefined);
	const [toDate, setToDate] = useState<any | undefined>(undefined);
	const [showFromCalendar, setShowFromCalendar] = useState(false);
	const [showToCalendar, setShowToCalendar] = useState(false);
	const navigate = useNavigate();

	const formatDate = (date: Date | undefined) => {
		if (!date) return 'DD-MM-YYYY';
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	};

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
		<div>
			<div className='flex items-center gap-6 py-6'>
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
				<h1 style={{ ...FONTS.heading_02 }}>Activity Log</h1>
			</div>
			<div className=' flex lg:flex-row gap-5 md:flex-col-reverse'>
				<div className=' lg:w-3/4 md:w-full relative'>
					{activityLogs.map((data) => (
						<section
							key={data.id}
							className='flex justify-between items-start py-6 gap-12 my-4 relative'
						>
							<div className='lg:w-[170px] md:w-[150px]'>
								<p style={{ ...FONTS.heading_07 }}>{data.date}</p>
							</div>

							<div className='grid gap-6 w-3/4 relative pb-10'>
								<div className='btnshadow h-[100%] w-3 rounded-2xl  absolute left-0 text-transparent'>
									{' '}
								</div>
								<h3
									className='pl-14'
									style={{ ...FONTS.heading_05, color: COLORS.text_title }}
								>
									{data.title}
								</h3>

								<section className='flex items-center gap-6 relative'>
									<div className='relative'>
										<div
											className='h-8 w-8 rounded-full flex p-1 absolute left-[-10px] top-[-5px]'
											style={{
												background: COLORS.blue_user,
												boxShadow:
													'rgba(189, 194, 199, 0.7) 2px 5px 4px,rgba(255, 255, 255, 0.4) 3px 2px 2px inset',
											}}
										>
											<img src={User} alt='User-icon' />
										</div>
										<img src={vector_H} alt='Vector-H' />
										<div
											className='h-8 w-8 rounded-full absolute right-0 top-[-5px]'
											style={{
												background: COLORS.green_text,
												boxShadow:
													'rgba(189, 194, 199, 0.7) 2px 5px 4px,rgba(255, 255, 255, 0.4) 3px 2px 2px inset',
											}}
										></div>
									</div>

									<div className='p-3 custom-inset-shadow md:w-[380px]'>
										<p
											style={{ ...FONTS.heading_07, color: COLORS.green_text }}
										>
											{data.description}
										</p>
									</div>
								</section>
							</div>
						</section>
					))}
				</div>

				<div className='lg:w-[500px] md:w-fit'>
					<div className='flex lg:justify-end md:items-start cursor-pointer'>
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
						<div className='lg:grid md:flex lg:gap-0 md:gap-12 lg:grid-cols-1'>
							<section className='flex gap-6 lg:justify-end mt-4'>
								<div>
									<p style={{ ...FONTS.heading_07 }}>From</p>
									<button
										className='p-2 rounded-lg'
										onClick={() => {
											setShowFromCalendar(!showFromCalendar);
											setShowToCalendar(false);
										}}
										style={{
											...FONTS.heading_07,
											boxShadow: `
      							rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      							rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
										}}
									>
										{fromDate || 'DD-MM-YYYY'}
									</button>
								</div>

								<div>
									<p style={{ ...FONTS.heading_07 }}>To</p>
									<button
										className='p-2 rounded-lg'
										onClick={() => {
											setShowToCalendar(!showToCalendar);
											setShowFromCalendar(false);
										}}
										style={{
											...FONTS.heading_07,
											boxShadow: `
      							rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      							rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
										}}
									>
										{toDate || 'DD-MM-YYYY'}
									</button>
								</div>
							</section>

							{showFromCalendar && (
								<div
									className='mt-6 p-1 rounded-lg '
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
										selected={fromDate}
										onSelect={(selectedDate) => {
											const fromDate = formatDate(selectedDate);
											setFromDate(fromDate);
											setShowFromCalendar(false);
										}}
										className='rounded-lg bg-gray-100 w-full sm:**:gap-2 md:**:gap-1'
										style={{ backgroundColor: COLORS.bg_Colour }}
										captionLayout='dropdown'
									/>
								</div>
							)}

							{showToCalendar && (
								<div
									className=' mt-6 p-1 rounded-lg '
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
										selected={toDate}
										onSelect={(selectedDate) => {
											const toDate = formatDate(selectedDate);
											setToDate(toDate);
											setShowToCalendar(false);
										}}
										className='rounded-lg bg-gray-100 w-full sm:**:gap-2 md:**:gap-1'
										style={{ backgroundColor: COLORS.bg_Colour }}
										captionLayout='dropdown'
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ActivityLogs;

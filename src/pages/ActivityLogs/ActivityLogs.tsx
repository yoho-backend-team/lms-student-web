import { COLORS, FONTS } from '@/constants/uiConstants';
import backBtn from '../../assets/icons/common/back_arrow.png';
import vector_H from '../../assets/icons/activitylog/Vector-H.png';
import User from '../../assets/icons/activitylog/User.png';
import filter from '../../assets/icons/common/filter.png';
import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectActivityLogs } from '@/features/ActivityLog/reducers/selectors';
import { getAllActivityLogs } from '@/features/ActivityLog/reducers/thunks';
import type { AppDispatch } from '@/store/store';
import updatesimg from '../../assets/dashboard/updates.png';
 
const ActivityLogs = () => {
	const [handleFilter, setHandleFilter] = useState(false);
	const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
	const [toDate, setToDate] = useState<Date | undefined>(undefined);
	const [showFromCalendar, setShowFromCalendar] = useState(false);
	const [showToCalendar, setShowToCalendar] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const activityLogs1 = useSelector(selectActivityLogs);

	useEffect(() => {
		dispatch(getAllActivityLogs({ page: currentPage }));
	}, [dispatch, currentPage]);

	const formatFullDate = (dateStr: string) => {
		if (!dateStr) return 'Invalid Date';
		const date = new Date(dateStr);
		const options: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: 'long',
			year: 'numeric',
			hour: 'numeric',
			minute: '2-digit',
			hour12: true,
		};
		return date.toLocaleString('en-GB', options);
	};

	const formatDate = (date: Date) => {
		const day = String(date.getDate()).padStart(2, '0');
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const year = date.getFullYear();
		return `${day}-${month}-${year}`;
	};

	const allLogs = activityLogs1?.data ?? [];

	const filteredLogs = allLogs.filter((log: any) => {
		const logDate = new Date(log.createdAt);
		if (fromDate && logDate < fromDate) return false;
		if (toDate && logDate > toDate) return false;
		return true;
	});

	const totalPages = activityLogs1?.pagination?.totalPages ?? 1;

	return (
		<div>
			<div className="flex items-center gap-6 py-6">
				<div
					className="p-2 rounded-lg cursor-pointer"
					style={{
						boxShadow: `rgba(255, 255, 255, 0.7) 5px 5px 4px, rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
					}}
					onClick={() => navigate(-1)}
				>
					<img src={backBtn} alt="BackBtn" />
				</div>
				<h1 style={{ ...FONTS.heading_02 }}>Activity Log</h1>
			</div>

			<div className="flex lg:flex-row gap-5 md:flex-col-reverse">
				{/* Main Content */}
				<div className="lg:w-3/4 md:w-full relative">
					{filteredLogs.length > 0 ? (
						filteredLogs.map((data: any) => (
							<section key={data.id} className="flex justify-between items-start py-6 gap-12 my-4 relative">
								<div className="lg:w-[170px] md:w-[150px]">
									<p style={{ ...FONTS.heading_07 }}>{formatFullDate(data?.createdAt)}</p>
								</div>
								<div className="grid gap-6 w-3/4 relative pb-10">
									<div className="btnshadow h-full w-3 rounded-2xl absolute left-0 text-transparent"></div>
									<h3 className="pl-14" style={{ ...FONTS.heading_05, color: COLORS.text_title }}>
										{data?.title}
									</h3>
									<section className="flex items-center gap-6 relative">
										<div className="relative">
											<div
												className="h-8 w-8 rounded-full flex p-1 absolute left-[-10px] top-[-5px]"
												style={{
													background: COLORS.blue_user,
													boxShadow:
														'rgba(189, 194, 199, 0.7) 2px 5px 4px, rgba(255, 255, 255, 0.4) 3px 2px 2px inset',
												}}
											>
												<img src={User} alt="User-icon" />
											</div>
											<img src={vector_H} alt="Vector-H" />
											<div
												className="h-8 w-8 rounded-full absolute right-0 top-[-5px]"
												style={{
													background: COLORS.green_text,
													boxShadow:
														'rgba(189, 194, 199, 0.7) 2px 5px 4px, rgba(255, 255, 255, 0.4) 3px 2px 2px inset',
												}}
											></div>
										</div>
										<div className="p-3 custom-inset-shadow md:w-[380px]">
											<p style={{ ...FONTS.heading_07, color: COLORS.green_text }}>{data?.details}</p>
										</div>
									</section>
								</div>
							</section>
						))
					) :  (
            <div className="flex flex-col w-full items-center gap-3 py-10">
              <img src={updatesimg} alt="No logs" className="w-[646px] h-[200px]" />
              <h1 style={{ ...FONTS.heading_04 }} className="pt-10  !text-2xl">No Logs Found</h1>
              <p style={{ ...FONTS.para_02 }}>Try adjusting your filters or date range.</p>
            </div>
          )}

					{/* Pagination (only if no filter) */}
					{!fromDate && !toDate && filteredLogs.length > 0 && (
						<div className="flex justify-center items-center mt-10 pb-10 gap-2 pt-10">
							<button
								onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className="rounded-full w-10 h-10 flex items-center justify-center bg-[#ebeff3] text-black shadow-md disabled:opacity-40"
							>
								‹
							</button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
								<button
									key={page}
									onClick={() => setCurrentPage(page)}
									className={`rounded-full w-10 h-10 flex items-center justify-center font-semibold text-sm transition-all duration-200 ${
										currentPage === page
											? 'bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white shadow-md scale-105'
											: 'bg-[#ebeff3] text-black hover:bg-gradient-to-r hover:from-[#7B00FF] hover:to-[#B200FF] hover:text-white'
									}`}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
								disabled={currentPage === totalPages}
								className="rounded-full w-10 h-10 flex items-center justify-center bg-[#ebeff3] text-black shadow-md disabled:opacity-40"
							>
								›
							</button>
						</div>
					)}
				</div>

				{/* Filter Panel */}
				<div className="lg:w-[500px] md:w-fit">
					<div className="flex lg:justify-end md:items-start cursor-pointer">
						<img
							src={filter}
							alt="Filter"
							className="h-8 text-end"
							onClick={() => {
								setHandleFilter(!handleFilter);
								setShowFromCalendar(false);
								setShowToCalendar(false);
							}}
						/>
					</div>

					{handleFilter && (
						<div className="lg:grid md:flex lg:gap-0 md:gap-12 lg:grid-cols-1">
							<section className="flex gap-6 lg:justify-end mt-4">
								<div>
									<p style={{ ...FONTS.heading_07 }}>From</p>
									<button
										className="p-2 rounded-lg"
										onClick={() => {
											setShowFromCalendar(!showFromCalendar);
											setShowToCalendar(false);
										}}
										style={{
											...FONTS.heading_07,
											boxShadow: `rgba(255, 255, 255, 0.7) 5px 5px 4px, rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
										}}
									>
										{fromDate ? formatDate(fromDate) : 'DD-MM-YYYY'}
										{fromDate && (
											<span
												title='Clear From Date'
												className='ml-1 text-gray-500 hover:text-blue-600 cursor-pointer'
												onClick={(e) => {
													e.stopPropagation();
													setFromDate(undefined);
													setCurrentPage(1);
												}}
											>
												↻
											</span>
										)}
									</button>
								</div>

								<div>
									<p style={{ ...FONTS.heading_07 }}>To</p>
									<button
										className="p-2 rounded-lg"
										onClick={() => {
											setShowToCalendar(!showToCalendar);
											setShowFromCalendar(false);
										}}
										style={{
											...FONTS.heading_07,
											boxShadow: `rgba(255, 255, 255, 0.7) 5px 5px 4px, rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
										}}
									>
										{toDate ? formatDate(toDate) : 'DD-MM-YYYY'}
										{toDate && (
											<span
												title='Clear To Date'
												className='ml-1 text-gray-500 hover:text-blue-600 cursor-pointer'
												onClick={(e) => {
													e.stopPropagation();
													setToDate(undefined);
													setCurrentPage(1);
												}}
											>
												↻
											</span>
										)}
									</button>
								</div>
							</section>

							{showFromCalendar && (
								<div className="mt-6 p-1 rounded-lg" style={{ boxShadow: 'rgba(189, 194, 199, 0.7) 2px 5px 4px, rgba(255, 255, 255, 0.4) 3px 2px 2px inset' }}>
									<h2 className="text-xl font-semibold px-3 mt-4" style={{ ...FONTS.heading_02 }}>
										From Calendar
									</h2>
									<Calendar
										mode="single"
										selected={fromDate}
										onSelect={(selectedDate) => {
											if (selectedDate) {
												setFromDate(selectedDate);
												setShowFromCalendar(false);
												setCurrentPage(1);
											}
										}}
										className="rounded-lg bg-gray-100 w-full"
										style={{ backgroundColor: COLORS.bg_Colour }}
										captionLayout="dropdown"
									/>
								</div>
							)}

							{showToCalendar && (
								<div className="mt-6 p-1 rounded-lg" style={{ boxShadow: 'rgba(189, 194, 199, 0.7) 2px 5px 4px, rgba(255, 255, 255, 0.4) 3px 2px 2px inset' }}>
									<h2 className="text-xl font-semibold px-3 mt-4" style={{ ...FONTS.heading_02 }}>
										To Calendar
									</h2>
									<Calendar
										mode="single"
										selected={toDate}
										onSelect={(selectedDate) => {
											if (selectedDate) {
												setToDate(selectedDate);
												setShowToCalendar(false);
												setCurrentPage(1);
											}
										}}
										className="rounded-lg bg-gray-100 w-full"
										style={{ backgroundColor: COLORS.bg_Colour }}
										captionLayout="dropdown"
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS, FONTS } from '@/constants/uiConstants';
import { Line, LineChart, XAxis } from 'recharts';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Calendar } from '@/components/ui/calendar';
import filter from '../../assets/icons/common/Mask group.png';
import { startOfMonth, setMonth, setYear } from 'date-fns';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectAttendance,
	// selectAttendanceByDate,
} from '@/features/Attendance/reducer/selectors';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { selectDashBoard } from '@/features/Dashboard/reducers/selectors';
import { useLoader } from '@/context/LoadingContext/Loader';
import {
	getattendanceByDate,
	getStudentattendance,
} from '@/features/Attendance/reducer/thunks';
import { getClassDetails } from '@/features/classes/reducers/thunks';
import { selectClass } from '@/features/classes/reducers/selectors';
import { useCourses } from '@/hooks/DashboardData/useCourses';

const chartConfig = {
	desktop: {
		label: 'Day',
		color: 'var(--chart-1)',
	},
} satisfies ChartConfig;

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
] as const;

const Attendance = () => {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [selectedMonth, setSelectedMonth] = useState<string>(
		months[selectedDate.getMonth()]
	);
	const [selectedYear, setSelectedYear] = useState<number>(
		selectedDate.getFullYear()
	);
	const [showFilters, setShowFilters] = useState<boolean>(false);

	const dispatch = useDispatch<any>();
	const { showLoader, hideLoader } = useLoader();

	const attendancedata = useSelector(selectAttendance);
	const dashData = useSelector(selectDashBoard);
	const classData = useSelector(selectClass)?.data || [];
	// const attendanceByDate = useSelector(selectAttendanceByDate);
	const coursesDetails = useCourses();

	/** Calendar modifiers */
	const presentDates =
		attendancedata?.data?.formattedAttendance?.attendance
			?.filter((att: any) => att.status === 'present')
			.map((att: any) => new Date(att.date)) || [];

	const absentDates =
		attendancedata?.data?.formattedAttendance?.attendance
			?.filter((att: any) => att.status === 'absent')
			.map((att: any) => new Date(att.date)) || [];

	/** Chart data */
	const generateChartData = useCallback(() => {
		if (!attendancedata?.data?.formattedAttendance) return [];
		return Object.entries(attendancedata.data.formattedAttendance).map(
			([month, attendance]) => {
				const att = attendance as { presentDays?: number };
				return { month, desktop: att.presentDays || 0 };
			}
		);
	}, [attendancedata?.data?.formattedAttendance]);
	const chartData = generateChartData();

	/** Cards */
	const attendanceCards = [
		{
			label: 'Classes Attend',
			type: 'totalOnly',
			current: attendancedata?.data?.attendedClassCount || 0,
			total: attendancedata?.data?.attendedClassCount || 0,
			color: COLORS.light_blue,
		},
		{
			label: 'Present Days',
			type: 'currentAndTotal',
			current: attendancedata?.data?.totalPresentDays || 0,
			total: attendancedata?.data?.totalWorkingDays || 0,
			color: COLORS.light_pink,
		},
		{
			label: 'Absent Days',
			type: 'currentAndTotal',
			current: attendancedata?.data?.totalAbsentDays || 0,
			total: attendancedata?.data?.totalWorkingDays || 0,
			color: COLORS.light_green_02,
		},
	];

	const getBadgeColor = (color: string) => {
		if (color === COLORS.light_blue) return 'bg-purple-600';
		if (color === COLORS.light_pink) return 'bg-pink-600';
		return 'bg-cyan-500';
	};

	/** Wave Path Generator */
	const generateWavePath = (index: number) => {
		const amplitude = 20;
		const frequency = 0.015;
		const offset = index * 2;
		let path = 'M 0,50 ';
		for (let x = 0; x <= 400; x += 5) {
			const y = 50 + Math.sin((x + offset) * frequency) * amplitude;
			path += `L ${x},${y} `;
		}
		return path;
	};

	/** Month & Year change */
	const handleMonthChange = (newMonth: (typeof months)[number]) => {
		const monthIndex = months.indexOf(newMonth);
		const updatedDate = startOfMonth(setMonth(selectedDate, monthIndex));
		setSelectedMonth(newMonth);
		setSelectedDate(updatedDate);
	};
	const handleYearChange = (newYear: string) => {
		const numericYear = parseInt(newYear, 10);
		const updatedDate = startOfMonth(setYear(selectedDate, numericYear));
		setSelectedYear(numericYear);
		setSelectedDate(updatedDate);
	};
	const handleCalendarMonthChange = (newMonth: Date) => {
		setSelectedDate(newMonth);
		setSelectedMonth(months[newMonth.getMonth()]);
		setSelectedYear(newMonth.getFullYear());
	};
	const currentYear = new Date().getFullYear();
	const years = Array.from(
		{ length: currentYear - 1990 + 1 },
		(_, i) => 1990 + i
	);

	/** Fetch Dashboard + Attendance */
	useEffect(() => {
		(async () => {
			showLoader();
			try {
				await dispatch(getDashBoardReports());
			} finally {
				hideLoader();
			}
		})();
	}, [dispatch, showLoader, hideLoader]);

	/** Fetch attendance data */
	useEffect(() => {
		if (!dashData?.user?.uuid || !dashData?.institute?.uuid) return;
		const payload = {
			userId: dashData.user.uuid,
			month: selectedDate.getMonth(),
			year: selectedDate.getFullYear(),
			instituteId: dashData.institute.uuid,
		};
		dispatch(getStudentattendance(payload));
	}, [dispatch, dashData, selectedDate]);

	/** Fetch attendance by date */
	useEffect(() => {
		if (!selectedDate) return;
		dispatch(
			getattendanceByDate({
				date: selectedDate.toISOString().split('T')[0],
			})
		);
	}, [dispatch, selectedDate]);

	/** Fetch class details */
	useEffect(() => {
		if (!coursesDetails?.length) return;
		dispatch(
			getClassDetails({
				courseId: coursesDetails?.map((id: any) => id?.course?._id)[0],
				userType: 'online',
				classType: 'completed',
				page: 1,
			})
		);
	}, [dispatch, coursesDetails]);

	/** Filtered class data based on selected date */
	const selectedDayClasses = useMemo(() => {
		if (!selectedDate || !classData?.length) return [];

		// Convert selected date to local date string (not UTC)
		const selectedDateStr = selectedDate.toLocaleDateString('en-CA'); // e.g. "2025-10-29"

		return classData.filter((c: any) => {
			const classDate = new Date(c?.start_date).toLocaleDateString('en-CA');
			return classDate === selectedDateStr;
		});
	}, [classData, selectedDate]);

	/** ✅ Render */
	return (
		<div className='p-4 w-full'>
			{/* Header */}
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-semibold' style={FONTS.heading_01}>
					Attendance
				</h2>

				{/* Filter Button */}
				<div className='relative flex items-center'>
					<button
						onClick={() => setShowFilters(!showFilters)}
						className='p-2 rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:scale-105 transition z-10'
						style={{ backgroundColor: COLORS.bg_Colour }}
					>
						<img src={filter} alt='Filter' className='w-6 h-6' />
					</button>

					{showFilters && (
						<div className='absolute right-full top-1/2 transform -translate-y-1/2 mr-4 flex gap-4 max-w-[400px]'>
							<Select value={selectedMonth} onValueChange={handleMonthChange}>
								<SelectTrigger
									style={{
										...FONTS.para_02,
										backgroundColor: COLORS.bg_Colour,
									}}
									className='w-max-sm rounded-sm border-0 px-2 py-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
								>
									<SelectValue placeholder='Select month' />
								</SelectTrigger>
								<SelectContent className='bg-[#ebeff3] rounded-sm shadow'>
									{months.map((month) => (
										<SelectItem key={month} value={month}>
											{month}
										</SelectItem>
									))}
								</SelectContent>
							</Select>

							<Select
								value={selectedYear.toString()}
								onValueChange={handleYearChange}
							>
								<SelectTrigger
									className='w-max-sm rounded-sm border-0 px-2 py-3 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
									style={{
										...FONTS.para_02,
										backgroundColor: COLORS.bg_Colour,
									}}
								>
									<SelectValue placeholder='Select year' />
								</SelectTrigger>
								<SelectContent className='bg-[#ebeff3] rounded-sm shadow'>
									{years.map((year) => (
										<SelectItem key={year} value={year.toString()}>
											{year}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
					)}
				</div>
			</div>

			{/* Summary Cards */}
			<div className='flex flex-col md:flex-row gap-4 justify-center pt-6'>
				{attendanceCards.map((card, index) => {
					const percentage =
						card.total > 0 ? (card.current / card.total) * 100 : 0;
					const markerX = 80 + percentage * 2.2;
					const markerY = 50 + Math.sin((markerX + index * 2) * 0.015) * 20;

					return (
						<Card
							key={card.label}
							className='relative w-full md:max-w-full h-56 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)] overflow-hidden'
							style={{ backgroundColor: COLORS.bg_Colour }}
						>
							<CardHeader className='h-full'>
								<div className='flex justify-between'>
									<span style={FONTS.heading_04}>{card.label}</span>
									<span className='text-2xl font-bold' style={FONTS.heading_01}>
										{card.type === 'totalOnly' ? (
											<span style={{ color: card.color }}>{card.total}</span>
										) : (
											<>
												<span style={{ color: card.color }}>
													{card.current}
												</span>
												<span className='text-2xl text-gray-500'>
													/{card.total}
												</span>
											</>
										)}
									</span>
								</div>
							</CardHeader>

							<CardContent className='h-full pb-2'>
								<ChartContainer config={chartConfig}>
									<LineChart data={chartData} width={500} height={70}>
										<XAxis dataKey='month' hide />
										<ChartTooltip
											cursor={false}
											content={<ChartTooltipContent hideLabel />}
										/>
										<Line
											dataKey='desktop'
											type='monotone'
											stroke={card.color}
											strokeWidth={2.5}
											dot
										/>
									</LineChart>
								</ChartContainer>
							</CardContent>

							<div className='absolute bottom-0 left-0 right-0 h-28'>
								<svg viewBox='0 0 400 100' className='w-full h-full'>
									<path
										d={generateWavePath(index)}
										fill='none'
										stroke={card.color}
										strokeWidth='5'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<circle cx={markerX} cy={markerY} r='7' fill={card.color} />
								</svg>

								<div
									className='absolute pointer-events-none'
									style={{
										left: (markerX / 400) * 100 + '%',
										bottom: ((100 - markerY) / 100) * 100 + '%',
										transform: 'translate(-50%, -120%)',
									}}
								>
									<div
										className={`${getBadgeColor(
											card.color
										)} text-white rounded-lg px-3 py-2 shadow-lg font-bold text-sm`}
									>
										{card.current}
									</div>
									<div
										className={`${getBadgeColor(
											card.color
										)} w-2.5 h-2.5 rotate-45 mx-auto -mt-1.5`}
									/>
								</div>
							</div>
						</Card>
					);
				})}
			</div>

			{/* Calendar + Day Overview */}
			<div className='flex flex-col lg:flex-row gap-6 pt-6'>
				{/* Calendar */}
				<div className='flex flex-col w-full lg:w-1/3'>
					<h2
						className='text-xl font-semibold mb-4 mt-2'
						style={FONTS.heading_02}
					>
						Calendar
					</h2>
					<Calendar
						mode='single'
						required
						selected={selectedDate}
						onSelect={setSelectedDate}
						month={selectedDate}
						onMonthChange={handleCalendarMonthChange}
						modifiers={{ present: presentDates, absent: absentDates }}
						modifiersClassNames={{
							present: 'bg-gray-300 text-green-700 font-semibold',
							absent: 'bg-red-100 text-red-700 font-semibold',
						}}
						className='border rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]'
						style={{ backgroundColor: COLORS.bg_Colour }}
						showOutsideDays={false}
					/>
				</div>

				{/* Day Overview */}
				<div className='flex flex-col w-full'>
					<h3
						className='text-lg font-semibold mb-4 mt-2'
						style={FONTS.heading_02}
					>
						Day Overview
					</h3>
					<div
						className='flex flex-col justify-between rounded-md p-6 shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),5px_5px_4px_rgba(189,194,199,0.75)]'
						style={{ backgroundColor: COLORS.bg_Colour }}
					>
						<p className='text-sm mb-4 text-gray-700' style={FONTS.para_01}>
							{selectedDate ? selectedDate.toDateString() : 'Select a date'}
						</p>

						<ul
							className='space-y-2 overflow-y-auto max-h-72 pr-2 text-gray-700 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent'
							style={FONTS.heading_06}
						>
							{selectedDayClasses.length > 0 ? (
								selectedDayClasses.map((data: any, index: number) => (
									<li
										key={index}
										className='p-4 flex flex-col gap-2 rounded-lg shadow-inner bg-[#f6f8fa]'
									>
										<p>Class Name: {data?.class_name}</p>
										<p>Start Date: {data?.start_date?.split('T')[0]}</p>
										<p>Duration: {data?.duration}</p>
									</li>
								))
							) : (
								<li className='p-4 text-gray-500 text-center italic'>
									No classes scheduled for this date
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Attendance;

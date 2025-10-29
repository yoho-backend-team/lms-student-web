/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { motion, AnimatePresence } from 'framer-motion';

interface LiveclassProps {
	data: any[];
}

const Liveclass: React.FC<LiveclassProps> = ({ data }) => {
	const headers = ['Day', 'Topic', 'Join Link', 'Duration', 'Action'];
	const [showModal, setShowModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState<string | null>(null);

	const handleJoin = (link: string, createdAt: string) => {
		const today = new Date();
		const classDate = new Date(createdAt);

		// Normalize to midnight for date-only comparison
		const todayOnly = new Date(
			today.getFullYear(),
			today.getMonth(),
			today.getDate()
		);
		const classOnly = new Date(
			classDate.getFullYear(),
			classDate.getMonth(),
			classDate.getDate()
		);

		// Compare date-only
		const isSameDay = todayOnly.getTime() === classOnly.getTime();
		const isFuture = classOnly.getTime() > todayOnly.getTime();

		if (isFuture && !isSameDay) {
			setSelectedDate(classOnly.toDateString());
			setShowModal(true);
			return;
		}

		// If same date or past → allow navigation
		if (link) window.open(link, '_blank', 'noopener,noreferrer');
	};

	return (
		<div className='mt-2 w-full'>
			<Card
				style={{ backgroundColor: COLORS.bg_Colour }}
				className='p-3 md:p-4 w-full overflow-x-auto'
			>
				{/* Desktop Header */}
				<div
					className='hidden md:grid w-full grid-cols-[80px_1fr_2fr_1fr_1fr]
                     bg-gradient-to-r from-[#7B00FF] to-[#B200FF]
                     text-white font-semibold text-xs sm:text-sm md:text-base
                     rounded-xl py-3 px-4 mb-2'
					style={FONTS.heading_03}
				>
					{headers.map((header, index) => (
						<div
							key={index}
							className='text-center whitespace-nowrap !text-white'
						>
							{header}
						</div>
					))}
				</div>

				{/* Data Rows */}
				<div className='flex flex-col gap-3'>
					{data.map((classItem, index) => {
						const joinUrl = classItem.joinLink || classItem.video_url;
						const createdAt = classItem.start_date;

						return (
							<Card
								key={index}
								className='bg-[#ebeff3]
								 shadow-[5px_5px_4px_rgba(255,255,255,0.7),
								 2px_2px_3px_rgba(189,194,199,0.75)_inset]
								 p-3 md:p-4 rounded-2xl cursor-pointer
								 transition-all duration-300 ease-in-out
								 hover:-translate-y-1 hover:shadow-[6px_6px_8px_rgba(0,0,0,0.1),
								 -2px_-2px_6px_rgba(255,255,255,0.8)]'
								style={FONTS.heading_06}
							>
								{/* Desktop Layout */}
								<div className='hidden md:grid grid-cols-[80px_1fr_2fr_1fr_1fr] items-center text-center gap-2'>
									<div className='font-semibold'>{index + 1}</div>
									<div className='truncate'>
										{classItem.courseDetails.course_name}
									</div>
									<div
										className='truncate text-[#0400ff] cursor-pointer hover:underline'
										onClick={() => handleJoin(joinUrl, createdAt)}
									>
										{classItem?.video_url
											? `${classItem.video_url.slice(0, 40)}...`
											: 'nill'}
									</div>
									<div>{classItem.duration}</div>
									<div>
										<Button
											onClick={() => handleJoin(joinUrl, createdAt)}
											className='bg-[#ebeff3] rounded-xl btnshadow text-[#716F6F]
											 text-[13px] sm:text-[14px] hover:!text-white
											 btnhovershadow shadow-[5px_5px_4px_rgba(255,255,255,0.7),
											 2px_2px_3px_rgba(189,194,199,0.75)_inset]
											 focus:!text-white'
											variant='outline'
										>
											Upcoming
										</Button>
									</div>
								</div>

								{/* Mobile Layout */}
								<div className='flex flex-col md:hidden gap-2 text-sm'>
									<div className='flex justify-between'>
										<span className='font-semibold text-gray-600'>Day:</span>
										<span>{index + 1}</span>
									</div>

									<div className='flex justify-between'>
										<span className='font-semibold text-gray-600'>Topic:</span>
										<span className='truncate max-w-[180px] text-right'>
											{classItem.courseDetails.course_name}
										</span>
									</div>

									<div
										className='flex justify-between cursor-pointer'
										onClick={() => handleJoin(joinUrl, createdAt)}
									>
										<span className='font-semibold text-gray-600'>
											Join Link:
										</span>
										<a
											href={joinUrl}
											target='_blank'
											rel='noopener noreferrer'
											className='text-[#0400ff] hover:underline text-right truncate max-w-[180px]'
										>
											{classItem?.video_url
												? `${classItem.video_url.slice(0, 25)}...`
												: 'nill'}
										</a>
									</div>

									<div className='flex justify-between'>
										<span className='font-semibold text-gray-600'>
											Duration:
										</span>
										<span>{classItem.duration}</span>
									</div>

									<div className='flex justify-between items-center'>
										<span className='font-semibold text-gray-600'>Action:</span>
										<Button
											onClick={() => handleJoin(joinUrl, createdAt)}
											className='bg-[#ebeff3] rounded-xl btnshadow text-[#716F6F]
											 text-[13px] hover:!text-white
											 btnhovershadow shadow-[5px_5px_4px_rgba(255,255,255,0.7),
											 2px_2px_3px_rgba(189,194,199,0.75)_inset]
											 focus:!text-white'
											variant='outline'
										>
											Upcoming
										</Button>
									</div>
								</div>
							</Card>
						);
					})}
				</div>
			</Card>

			{/* ✅ Blur Modal Popup */}
			<AnimatePresence>
				{showModal && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className='fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50'
					>
						<motion.div
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							className='bg-white rounded-2xl p-6 shadow-xl border border-white/30 text-center max-w-sm mx-4'
						>
							<h2 className='text-lg font-semibold mb-2'>
								Class Not Yet Available
							</h2>
							<p className='text-sm mb-4'>
								This class will be available on{' '}
								<span className='font-medium'>{selectedDate}</span>.
								<br />
								Please try again on the scheduled date.
							</p>
							<Button
								onClick={() => setShowModal(false)}
								className='bg-[#ebeff3] rounded-xl btnshadow text-[#716F6F]
											 text-[13px] hover:!text-white
											 btnhovershadow shadow-[5px_5px_4px_rgba(255,255,255,0.7),
											 2px_2px_3px_rgba(189,194,199,0.75)_inset]
											 focus:!text-white cursor-pointer'
							>
								Okay
							</Button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Liveclass;

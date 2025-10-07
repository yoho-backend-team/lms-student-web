/* eslint-disable @typescript-eslint/no-explicit-any */
import { COLORS, FONTS } from '@/constants/uiConstants';
import backImg from '../../assets/icons/common/back_arrow.png';
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import bellImg from '../../assets/icons/notifications/image 90.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllNotificationsThunk } from '@/features/Notifications/reducers/thunks';
import { selectNotifications } from '@/features/Notifications/reducers/selectors';
import { deleteNotification, updateNotificationStatus } from '@/features/Notifications/services';
import updatedimg from '../../assets/dashboard/notification.png';
import { toast } from 'react-toastify';

interface Notification {
	id: string;
	createdAt: string;
	title: string;
	body: string;
	status: 'read' | 'unread';
}

const Notifications = () => {
	const dispatch = useDispatch<any>();
	const Notifications = useSelector(selectNotifications)
	const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
	const [isMobileView, setIsMobileView] = useState(false);
	const navigate = useNavigate();

	// Check screen size
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobileView(window.innerWidth < 1024); // lg breakpoint
		};

		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		
		return () => {
			window.removeEventListener('resize', checkScreenSize);
		};
	}, []);

	useEffect(() => {
		dispatch(getAllNotificationsThunk({}));
	}, [dispatch, selectedNotification]);

	const filteredNotifications = Notifications
		.filter((notification: any) => {
			if (filter === 'all') return true;
			return notification.status === filter;
		})
		.filter((notification: any) => {
			if (!searchTerm) return true;
			return (
				notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				notification.body
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				formatDateToNormal(notification.createdAt).toLowerCase().includes(searchTerm.toLowerCase())
			);
		});

	const totalMessages = Notifications.length;
	const unreadMessages = Notifications.filter(
		(n: any) => n.status === 'unread'
	).length;

	const handleClearSearch = () => {
		setSearchTerm('');
	};

	const handleNotificationClick = async (notification: any) => {
		setSelectedNotification(notification);
		try {
			await updateNotificationStatus({
				uuid: notification?.uuid, status: 'read'
			})
		}
		catch (error) {
			console.error('Error updating notification status:', error);
		}
	};

	const handleBackToList = () => {
		setSelectedNotification(null);
	};

	const handleDeleteNotification = async (notification: any) => {
		try {
			await deleteNotification({
				uuid: notification?.uuid
			})

			toast.success('Notification deleted successfully!', { style: { backgroundColor: 'green', color: 'white' } });
			setSelectedNotification(null);
		}
		catch (error) {
			console.error('Error deleting notification:', error);
			toast.error('Failed to delete notification.',
				{ style: { backgroundColor: 'green', color: 'white' } }
			);
		}
	}

	function formatDateToNormal(isoString: any) {
		const date = new Date(isoString);

		const day = String(date.getUTCDate()).padStart(2, '0');
		const month = String(date.getUTCMonth() + 1).padStart(2, '0');
		const year = date.getUTCFullYear();

		return `${day}-${month}-${year}`;
	}

	// Mobile Detail View (hides list, shows only detail)
	if (isMobileView && selectedNotification) {
		return (
			<div className='py-4 px-3 xs:px-4 sm:px-5 h-full bg-[#ebeff3]'>
				{/* Mobile Detail Header */}
				<div className='flex items-center gap-3 xs:gap-4 mb-4'>
					<div
						className='cursor-pointer p-2 rounded-md flex-shrink-0'
						style={{
							boxShadow: `
								rgba(255, 255, 255, 0.7) 5px 5px 4px, 
								rgba(189, 194, 199, 0.75) 2px 2px 3px inset
							`,
						}}
					>
						<img 
							src={backImg} 
							alt='back' 
							onClick={handleBackToList} 
							className='w-5 h-5 xs:w-6 xs:h-6' 
						/>
					</div>
					<p className='text-xl xs:text-2xl' style={{ ...FONTS.heading_01 }}>Notification Details</p>
				</div>

				{/* Mobile Detail Content */}
				<Card
					className='relative bg-[#ebeff3] h-[calc(100vh-120px)]'
					style={{
						boxShadow: `
							rgba(255, 255, 255, 0.7) -4px -4px 4px, 
							rgba(189, 194, 199, 0.75) 5px 5px 4px
						`,
					}}
				>
					<div className='p-4 xs:p-5 h-full flex flex-col'>
						<div className='flex-1 overflow-hidden'>
							<div className='flex justify-between gap-3 xs:gap-4 mb-4 xs:mb-5'>
								<h4 className='text-lg xs:text-xl sm:text-2xl break-words overflow-wrap-anywhere' style={{ ...FONTS.heading_02 }}>
									{selectedNotification?.title}
								</h4>
								<Button
									className='bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-xs xs:text-sm py-2 h-auto w-fit'
									variant='outline'
								>
									{formatDateToNormal(selectedNotification?.createdAt)}
								</Button>
							</div>
							<div className='mb-6 xs:mb-8 overflow-y-auto'>
								<p className='text-sm xs:text-base sm:text-lg break-words overflow-wrap-anywhere whitespace-pre-wrap leading-relaxed max-w-full' style={{ ...FONTS.heading_06 }}>
									{selectedNotification?.body}
								</p>
							</div>
						</div>
						<div className='flex justify-end pt-4 border-t border-gray-300'>
							<Button
								className='bg-gradient-to-l from-[#ff0000] to-[#ff3300] text-white rounded-lg shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#ff0000_inset,-4px_-8px_10px_0px_#ff0000_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white cursor-pointer text-sm xs:text-base py-2 px-4 xs:px-6'
								variant='outline'
								style={{ color: COLORS.white }}
								onClick={() => handleDeleteNotification(selectedNotification)}
							>
								Delete Notification
							</Button>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	// Main List View (shows both list and detail on desktop, only list on mobile)
	return (
		<div className='py-4 px-3 xs:px-4 sm:px-5 lg:px-6'>
			{/* Header Section */}
			<div className='flex flex-col xs:flex-row xs:items-center gap-3 xs:gap-4 sm:gap-6'>
				<div className='flex items-center gap-3 xs:gap-4 sm:gap-6'>
					<div
						className='cursor-pointer p-2 rounded-md flex-shrink-0'
						style={{
							boxShadow: `
								rgba(255, 255, 255, 0.7) 5px 5px 4px, 
								rgba(189, 194, 199, 0.75) 2px 2px 3px inset
							`,
						}}
					>
						<img src={backImg} alt='back' onClick={() => navigate(-1)} className='w-5 h-5 xs:w-6 xs:h-6' />
					</div>
					<p className='text-xl xs:text-2xl sm:text-3xl' style={{ ...FONTS.heading_01 }}>Notification</p>
				</div>
				<span className='text-sm xs:text-base sm:text-lg mt-2 xs:mt-0 xs:ml-auto' style={{ ...FONTS.heading_06 }}>
					{totalMessages} Message{totalMessages !== 1 ? 's' : ''} /{' '}
					{unreadMessages} Unread
				</span>
			</div>

			{/* Main Content Grid */}
			<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 w-full mt-4 xs:mt-5 sm:mt-6'>
				{/* Left Panel - Notifications List */}
				<Card
					className={`relative bg-[#ebeff3] px-3 xs:px-4 sm:px-5 h-[60vh] xs:h-[65vh] sm:h-[70vh] ${
						isMobileView && selectedNotification ? 'hidden' : 'block'
					}`}
					style={{
						boxShadow: `
							rgba(255, 255, 255, 0.7) -4px -4px 4px, 
							rgba(189, 194, 199, 0.75) 5px 5px 4px
						`,
					}}
				>
					<div className='relative mt-3 xs:mt-4'>
						<Input
							type='text'
							style={{
								boxShadow: `
									rgba(255, 255, 255, 0.7) 5px 5px 4px, 
									rgba(189, 194, 199, 0.75) 2px 2px 3px inset
								`,
								...FONTS.heading_05,
							}}
							className='px-3 h-10 xs:h-12 rounded-md pr-10 text-sm xs:text-base'
							placeholder='Search notifications...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						{searchTerm && (
							<button
								onClick={handleClearSearch}
								className='absolute right-3 top-1/2 transform -translate-y-1/2'
								aria-label='Clear search'
							>
								<X className='h-4 w-4 xs:h-5 xs:w-5 text-gray-500 cursor-pointer' />
							</button>
						)}
					</div>

					{/* Filter Buttons */}
					<div className='flex flex-row gap-2 xs:gap-3 mt-3 xs:mt-4'>
						{['all', 'read', 'unread'].map((label) => (
							<Button
								key={label}
								className={`w-[60px] xs:w-[70px] sm:w-[75px] text-xs xs:text-sm
									${filter === label
										? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white rounded-lg shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white'
										: 'bg-[#ebeff3] text-black hover:bg-[#ebeff3] hover:text-black'
									} 
									shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]
									cursor-pointer py-1 xs:py-2
								`}
								variant='outline'
								onClick={() => setFilter(label as 'all' | 'read' | 'unread')}
							>
								{label.charAt(0).toUpperCase() + label.slice(1)}
							</Button>
						))}
					</div>

					{/* Notifications List - Fixed height with proper scrolling */}
					<div className='flex flex-col w-full h-[calc(100%-120px)] gap-2 xs:gap-3 px-1 xs:px-2 py-2 xs:py-3 overflow-y-auto scrollbar-hide mt-2 xs:mt-3'>
						{filteredNotifications?.length > 0 ? (
							filteredNotifications?.map((notification: any) => (
								<Card
									key={notification?.id}
									className={`relative bg-[#ebeff3] min-h-[120px] xs:min-h-[140px] sm:min-h-[165px] cursor-pointer shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] ${notification?.status === 'unread'
										? 'border-l-4 border-[#7b00ff]'
										: 'border-l-4 border-[#ebeff3]'
										}`}
									onClick={() => handleNotificationClick(notification)}
								>
									<CardHeader className='pl-3 xs:pl-4'>
										<div className='flex xs:flex-row xs:justify-between xs:items-start gap-2 xs:gap-3'>
											<div className='flex-1 min-w-0'>
												<CardTitle className='text-base xs:text-lg sm:text-xl break-words overflow-wrap-anywhere' style={{ ...FONTS.heading_02 }}>
													{notification?.title}
												</CardTitle>
												<CardDescription />
											</div>
											<CardAction className='flex-shrink-0'>
												<Dialog>
													<DialogTrigger>
														<Button
															className='bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-xs xs:text-sm py-1 xs:py-2 h-auto'
															variant='outline'
														>
															{formatDateToNormal(notification?.createdAt)}
														</Button>
													</DialogTrigger>
												</Dialog>	
											</CardAction>
										</div>
									</CardHeader>
									<CardContent className='p-3 pt-0 xs:pt-0'>
										<p className='text-sm xs:text-base line-clamp-1 xs:line-clamp-3 break-words overflow-wrap-anywhere max-w-full' style={{ ...FONTS.heading_07 }}>
											{notification?.body}
										</p>
									</CardContent>
								</Card>
							))
						) : (
							<div className='flex flex-col items-center justify-center h-full py-8' style={{ ...FONTS.para_01 }}>
								<img src={updatedimg} alt="" className='h-[120px] xs:h-[150px] sm:h-[180px] w-auto max-w-full' />
								<p className='mt-4 xs:mt-5 text-sm xs:text-base text-center'>No available notifications data</p>
							</div>
						)}
					</div>
				</Card>

				{/* Right Panel - Notification Details (Desktop only or mobile when no selection) */}
				<Card
					className={`relative bg-[#ebeff3] h-[60vh] xs:h-[65vh] sm:h-[70vh] ${
						isMobileView && !selectedNotification ? 'hidden' : 'block'
					}`}
					style={{
						boxShadow: `
							rgba(255, 255, 255, 0.7) -4px -4px 4px, 
							rgba(189, 194, 199, 0.75) 5px 5px 4px
						`,
					}}
				>
					<div className='p-3 xs:p-4 sm:p-5 h-full flex flex-col'>
						{selectedNotification ? (
							<div className='flex-1 flex flex-col overflow-hidden'>
								{/* Back button for mobile when in side panel mode */}
								{isMobileView && (
									<div className='flex items-center gap-3 mb-4 flex-shrink-0'>
										<div
											className='cursor-pointer p-2 rounded-md flex-shrink-0'
											style={{
												boxShadow: `
													rgba(255, 255, 255, 0.7) 5px 5px 4px, 
													rgba(189, 194, 199, 0.75) 2px 2px 3px inset
												`,
											}}
										>
											<img 
												src={backImg} 
												alt='back' 
												onClick={handleBackToList} 
												className='w-5 h-5 xs:w-6 xs:h-6' 
											/>
										</div>
										<p className='text-lg xs:text-xl' style={{ ...FONTS.heading_02 }}>Back to List</p>
									</div>
								)}
								
								<div className='flex xs:flex-row xs:items-start xs:justify-between gap-2 xs:gap-3 mb-3 xs:mb-4 flex-shrink-0'>
									<h4 className='text-lg xs:text-xl sm:text-2xl break-words overflow-wrap-anywhere flex-1' style={{ ...FONTS.heading_02 }}>
										{selectedNotification?.title}
									</h4>
									<Button
										className='bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] text-xs xs:text-sm py-1 xs:py-2 h-auto flex-shrink-0 mt-1 xs:mt-0'
										variant='outline'
									>
										{formatDateToNormal(selectedNotification?.createdAt)}
									</Button>
								</div>
								<div className='flex-1 overflow-y-auto mb-3 xs:mb-4'>
									<p className='text-sm xs:text-base sm:text-lg break-words overflow-wrap-anywhere whitespace-pre-wrap leading-relaxed max-w-full' style={{ ...FONTS.heading_06 }}>
										{selectedNotification?.body}
									</p>
								</div>
								<div className='flex justify-end pt-3 border-t border-gray-300 flex-shrink-0'>
									<Button
										className='bg-gradient-to-l from-[#ff0000] to-[#ff3300] text-white rounded-lg shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#ff0000_inset,-4px_-8px_10px_0px_#ff0000_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white cursor-pointer text-sm xs:text-base py-2 px-3 xs:px-4'
										variant='outline'
										style={{ color: COLORS.white }}
										onClick={() => handleDeleteNotification(selectedNotification)}
									>
										Delete
									</Button>
								</div>
							</div>
						) : filteredNotifications?.length > 0 ? (
							<div className='flex-1 flex flex-col justify-center items-center text-center'>
								<p className='text-sm xs:text-base mb-4 xs:mb-6' style={{ ...FONTS.para_01 }}>
									Select a notification to view details
								</p>
								<div className='flex justify-center items-center'>
									<img src={bellImg} alt='notifications' className='w-32 h-32 xs:w-40 xs:h-40 sm:w-48 sm:h-48' />
								</div>
							</div>
						) : (
							<div className='flex-1 flex items-center justify-center'>
								<p className='text-sm xs:text-base text-center' style={{ ...FONTS.para_01 }}>
									No notifications available to display
								</p>
							</div>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Notifications;
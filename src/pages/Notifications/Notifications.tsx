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
import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import bellImg from '../../assets/icons/notifications/image 90.png';
import { useNavigate } from 'react-router-dom';

interface Notification {
	id: string;
	date: string;
	title: string;
	description: string;
	status: 'read' | 'unread';
}

const notificationData: Notification[] = [
	{
		id: '1',
		date: '28 April',
		title: 'Notification title 1',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
		status: 'read',
	},
	{
		id: '2',
		date: '30 June',
		title: 'Notification title 2',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
		status: 'unread',
	},
	{
		id: '3',
		date: '2 July',
		title: 'Notification title 3',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
		status: 'unread',
	},
	{
		id: '4',
		date: '14 July',
		title: 'Notification title 4',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
		status: 'read',
	},
	{
		id: '5',
		date: '14 July',
		title: 'Notification title 5',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
		status: 'read',
	},
	{
		id: '6',
		date: '14 July',
		title: 'Notification title 6',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad',
		status: 'read',
	},
];

const Notifications = () => {
	const [filter, setFilter] = useState<'all' | 'read' | 'unread'>('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedNotification, setSelectedNotification] =
		useState<Notification | null>(null);
	const navigate = useNavigate();

	const filteredNotifications = notificationData
		.filter((notification) => {
			if (filter === 'all') return true;
			return notification.status === filter;
		})
		.filter((notification) => {
			if (!searchTerm) return true;
			return (
				notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				notification.description
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
				notification.date.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});

	const totalMessages = notificationData.length;
	const unreadMessages = notificationData.filter(
		(n) => n.status === 'unread'
	).length;

	const handleClearSearch = () => {
		setSearchTerm('');
	};

	const handleNotificationClick = (notification: Notification) => {
		setSelectedNotification(notification);
	};

	return (
		<div className='py-4'>
			<div className='flex items-center gap-6'>
				<div
					className='cursor-pointer p-2 rounded-md'
					style={{
						boxShadow: `
              rgba(255, 255, 255, 0.7) 5px 5px 4px, 
              rgba(189, 194, 199, 0.75) 2px 2px 3px inset
            `,
					}}
				>
					<img src={backImg} alt='back' onClick={() => navigate(-1)} />
				</div>
				<p style={{ ...FONTS.heading_01 }}>Notification</p>
				<span style={{ ...FONTS.heading_06, marginLeft: 'auto' }}>
					{totalMessages} Message{totalMessages !== 1 ? 's' : ''} /{' '}
					{unreadMessages} Unread
				</span>
			</div>

			<div className='grid md:grid-cols-2 gap-6 w-full mt-4'>
				<Card
					className='relative bg-[#ebeff3] px-5 h-[510px]'
					style={{
						boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
					}}
				>
					<div className='relative'>
						<Input
							type='text'
							style={{
								boxShadow: `
                  rgba(255, 255, 255, 0.7) 5px 5px 4px, 
                  rgba(189, 194, 199, 0.75) 2px 2px 3px inset
                `,
								...FONTS.heading_05,
							}}
							className='px-3 h-12 rounded-md pr-10'
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
								<X className='h-5 w-5 text-gray-500 cursor-pointer' />
							</button>
						)}
					</div>

					<div className='flex flex-row gap-3'>
						{['all', 'read', 'unread'].map((label) => (
							<Button
								key={label}
								className={`w-[75px]
                  ${
										filter === label
											? 'bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white rounded-lg shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white'
											: 'bg-[#ebeff3] text-black hover:bg-[#ebeff3] hover:text-black'
									} 
                  shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]
                  cursor-pointer
                `}
								variant='outline'
								onClick={() => setFilter(label as 'all' | 'read' | 'unread')}
							>
								{label.charAt(0).toUpperCase() + label.slice(1)}
							</Button>
						))}
					</div>

					<div className='flex flex-col w-full gap-3 px-2 py-3 scrollbar-hide'>
						{filteredNotifications?.length > 0 ? (
							filteredNotifications?.map((notification) => (
								<Card
									key={notification?.id}
									className={`relative bg-[#ebeff3] lg:h-[165px] cursor-pointer shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] ${
										notification?.status === 'unread'
											? 'border-l-4 border-[#7b00ff]'
											: 'border-l-4 border-[#ebeff3]'
									}`}
									onClick={() => handleNotificationClick(notification)}
								>
									<CardHeader>
										<div className='flex lg:flex-row md:flex-col-reverse lg:justify-between md:items-start md:gap-4 lg:items-center'>
											<div>
												<CardTitle style={{ ...FONTS.heading_02 }}>
													{notification?.title}
												</CardTitle>
												<CardDescription />
											</div>
											<CardAction>
												<Dialog>
													<DialogTrigger>
														<Button
															className='bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
															variant='outline'
														>
															{notification?.date}
														</Button>
													</DialogTrigger>
												</Dialog>
											</CardAction>
										</div>
									</CardHeader>
									<CardContent>
										<p style={{ ...FONTS.heading_07 }} className=''>
											{notification?.description}
										</p>
									</CardContent>
								</Card>
							))
						) : (
							<div className='text-center py-8' style={{ ...FONTS.para_01 }}>
								No notifications found
							</div>
						)}
					</div>
				</Card>

				<Card
					className='relative bg-[#ebeff3] h-[510px]'
					style={{
						boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
					}}
				>
					<div className='p-4'>
						{selectedNotification ? (
							<div>
								<div className='flex items-center justify-between'>
									<h4 style={{ ...FONTS.heading_02 }} className='mb-2'>
										{selectedNotification?.title}
									</h4>
									<Button
										className='bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
										variant='outline'
									>
										{selectedNotification?.date}
									</Button>
								</div>
								<div className='my-3'>
									<p style={{ ...FONTS.heading_06 }}>
										{selectedNotification?.description}
									</p>
								</div>
								<div className='flex justify-end mt-5'>
									<Button
										className='bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white rounded-lg shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] hover:text-white'
										variant='outline'
										style={{ color: COLORS.white }}
									>
										Status: {selectedNotification?.status}
									</Button>
								</div>
							</div>
						) : filteredNotifications?.length > 0 ? (
							<div className='relative'>
								<p style={{ ...FONTS.para_01 }}>
									Select a notification to view details
								</p>
								<div className='absolute top-32 left-44'>
									<img src={bellImg} alt='notifications' />
								</div>
							</div>
						) : (
							<p style={{ ...FONTS.para_01 }}>
								No notifications available to display
							</p>
						)}
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Notifications;

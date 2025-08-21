import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../ui/card';
import { NavbarIcons } from '@/assets/icons/navbar';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { getStudentLogoutClient } from '@/features/Authentication/services';
import { toast } from 'react-toastify';
import { GetImageUrl } from '@/utils/helper';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';
import type { AppDispatch } from '@/store/store';
import { useInstituteData } from '@/hooks/DashboardData/useInstitute';
import { FaMicrophone } from 'react-icons/fa';

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [showProfileSection, setshowProfileSection] = useState(false);
	const { logout } = useAuth();
	const [showLogoutModal, setShowLogoutModal] = useState(false);

	const onLogoutClick = () => {
		setShowLogoutModal(true);
	};

	const dispatch = useDispatch<AppDispatch>();
	const profileDetails = useSelector(selectProfile);
	const instituteData = useInstituteData();

	useEffect(() => {
		dispatch(getStudentProfileThunk({}));
	}, [dispatch]);

	const navItems = [
		{
			path: '',
			name: 'Dashboard',
			iconActive: NavbarIcons.DashboardActiveImg,
			iconInactive: NavbarIcons.DashboardInActiveImg,
		},
		{
			path: 'classes',
			name: 'Classes',
			iconActive: NavbarIcons.ClassActiveImg,
			iconInactive: NavbarIcons.ClassInActiveImg,
		},
		{
			path: 'courses',
			name: 'Courses',
			iconActive: NavbarIcons.CourseActiveImg,
			iconInactive: NavbarIcons.CourseInActiveImg,
		},
		{
			path: 'attendance',
			name: 'Attendance',
			iconActive: NavbarIcons.AttendanceActiveImg,
			iconInactive: NavbarIcons.AttendanceInActiveImg,
		},
		{
			path: 'payment',
			name: 'Payment',
			iconActive: NavbarIcons.PaymentActiveImg,
			iconInactive: NavbarIcons.PaymentInActiveImg,
		},
		{
			path: 'community',
			name: 'Community',
			iconActive: NavbarIcons.CommunityActiveImg,
			iconInactive: NavbarIcons.CommunityInActiveImg,
		},
		{
			path: 'placement',
			name: 'Placement',
			iconActive: NavbarIcons.PlacementActiveImg,
			iconInactive: NavbarIcons.PlacementInActiveImg,
		},
		{
			path: 'spoken-english',
			name: 'Spoken English',
			iconActive: NavbarIcons.CommunityActiveImg,
			iconInactive: NavbarIcons.CommunityInActiveImg,
		},
	];

	const handleLogout = async () => {
		try {
			const response = await getStudentLogoutClient({});
			if (response) {
				toast.success('Logout successful!', {
					style: { backgroundColor: 'green', color: 'white' },
				});
				setshowProfileSection(false);
				setShowLogoutModal(false);
				logout();
				navigate('/login');
			}
		} catch (error: any) {
			console.log(error.message);
			toast.error('Logout failed. Please try again.', {
				style: { backgroundColor: 'red', color: 'white' },
			});
			setShowLogoutModal(false);
		}
	};

	const cancelLogout = () => {
		setShowLogoutModal(false);
	};

	return (
		<nav>
			<div className='flex justify-between gap-3 px-6'>
				{/* <Card
					className='bg-[#ebeff3] min-w-[72px] h-[48px] rounded-sm flex items-center justify-center cursor-pointer'
					style={{
						boxShadow: `
					  rgba(255, 255, 255, 0.7) -4px -4px 4px,
					  rgba(189, 194, 199, 0.75) 5px 5px 4px
					`,
					}}
					onClick={() => {
						navigate('/');
						setshowProfileSection(false);
					}}
				> */}
				<img
					data-tour="logo"
					src={GetImageUrl(instituteData?.logo) ?? undefined}
					alt={instituteData?.institute_name}
					title={instituteData?.institute_name}
					className='w-14 h-12 rounded-full p-1'
				/>
				{/* </Card> */}

				<div className='flex lg:gap-10 md:gap-5'>
					{navItems?.map((item, index) => (
						<Link to={item.path} onClick={() => setshowProfileSection(false)}>
							<Card
								key={item.path || index}
								data-tour={`nav-${item.path || 'dashboard'}`}
								className='bg-[#ebeff3] w-[48px] h-[48px] flex items-center justify-center shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
								style={{
									boxShadow:
										location.pathname === `/${item.path}`
											? `
					  rgba(255, 255, 255, 0.7) -4px -4px 4px,
					  rgba(189, 194, 199, 0.75) 5px 5px 4px
					`
											: undefined,
								}}
							>
								<img
									src={
										location.pathname === `/${item.path}`
											? item.iconActive
											: item.iconInactive
									}
									alt='nav-icon'
									title={item.name}
									style={{ width: 24, height: 24 }}
								/>
							</Card>
						</Link>
					))}
				</div>

				<div className='flex gap-6'>
					<Link to='notifications'>
						<Card
							data-tour="notifications"
							className='bg-[#ebeff3] w-[48px] h-[48px] rounded-full flex items-center justify-center'
							style={{
								boxShadow: `
                rgba(255, 255, 255, 0.7) -4px -4px 4px, 
                rgba(189, 194, 199, 0.75) 5px 5px 4px
              `,
							}}
						>
							<img
								src={NavbarIcons.NotificationImg}
								alt='notification-bell'
								className='cursor-pointer'
								style={{ width: 24, height: 24 }}
							/>
						</Card>
					</Link>
					<div
						data-tour="profile"
						className='cursor-pointer'
						onClick={() => setshowProfileSection(!showProfileSection)}
					>
						<img
							src={GetImageUrl(profileDetails?.image) ?? undefined}
							alt={profileDetails?.fullName}
							className='w-12 h-12 rounded-full'
							title={profileDetails?.fullName}
						/>
					</div>

					{showProfileSection && (
						<Card
							className='absolute z-50 right-6 top-20 bg-[#ebeff3] px-5 w-[200px] h-[156px] '
							style={{
								boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px, 
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
							}}
						>
							<Card className='bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] h-[48px] w-[160px] cursor-pointer flex gap-2 justify-center'>
								<Link
									className=' flex justify-center gap-2'
									to='profile'
									onClick={() => setshowProfileSection(false)}
								>
									<img
										src={NavbarIcons.CommunityInActiveImg}
										alt='profile-icon'
										style={{ width: 28, height: 28 }}
									/>
									<p style={{ ...FONTS.para_01 }}>Profile</p>
								</Link>
							</Card>
							<Button
								className='h-[48px] w-[160px] flex justify-center cursor-pointer
									  bg-gradient-to-l from-[#7B00FF] to-[#B200FF]
									  rounded-xl  
									  shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)]
									'
							>
								<div className='flex gap-2' onClick={() => onLogoutClick()}>
									<img
										src={NavbarIcons.LoginImg}
										alt='profile-icon'
										style={{ width: 28, height: 28 }}
									/>
									<p style={{ ...FONTS.para_01, color: COLORS.white }}>
										Logout
									</p>
								</div>
							</Button>
						</Card>
					)}
				</div>
			</div>

			{showLogoutModal && (
				<div className='fixed inset-0 flex items-center justify-center bg-black opacity-90 z-100'>
					<div className='bg-white w-96 rounded-lg shadow-lg p-6 text-center relative -top-5'>
						<h2 className='text-lg font-semibold mb-4 text-gray-800'>
							Are you sure you want to logout?
						</h2>
						<div className='flex justify-center gap-4'>
							<button
								onClick={cancelLogout}
								className='px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition'
							>
								Cancel
							</button>
							<button
								onClick={handleLogout}
								className='px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
};

export default Navbar;

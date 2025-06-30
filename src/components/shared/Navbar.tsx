import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from '../../assets/icons/navbar/icons8-ionic-50.png';
import { Card } from '../ui/card';
import { NavbarIcons } from '@/assets/icons/navbar';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { Button } from '../ui/button';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext/AuthContext';

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [showProfileSection, setshowProfileSection] = useState(false);
	const { logout } = useAuth();

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
	];

	return (
		<nav>
			<div className='flex justify-between gap-3 px-6'>
				<Card
					className='bg-[#ebeff3] min-w-[48px] h-[48px] rounded-full flex items-center justify-center cursor-pointer'
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
				>
					<img src={Logo} alt='logo' />
				</Card>

				<div className='flex lg:gap-10 md:gap-5'>
					{navItems.map((item) => (
						<Link to={item.path} onClick={() => setshowProfileSection(false)}>
							<Card
								key={item.path}
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
						className='cursor-pointer'
						onClick={() => setshowProfileSection(!showProfileSection)}
					>
						<img src={NavbarIcons.UserProfile} alt='profile-image' />
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
								<div
									className='flex gap-2'
									onClick={() => {
										setshowProfileSection(false);
										logout();
										navigate('/login');
									}}
								>
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
		</nav>
	);
};

export default Navbar;

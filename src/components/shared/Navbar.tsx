import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/icons/navbar/icons8-ionic-50.png';

const Navbar = () => {
	const navigate = useNavigate();
	return (
		<nav>
			<div className='flex justify-between gap-3 px-6'>
				<div onClick={() => navigate('/')}>
					<img src={Logo} alt='logo' className='cursor-pointer' />
				</div>
				<div className='flex gap-10'>
					<Link to='/'>Dashboard</Link>
					<Link to='classes'>Classes</Link>
					<Link to='courses'>Courses</Link>
					<Link to='attendance'>Attendance</Link>
					<Link to='community'>Communities</Link>
					<Link to='payment'>Payment</Link>
				</div>
				<div className='flex gap-3'>
					<Link to='notifications'>Notifications</Link>
					<Link to='profile'>Profile</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

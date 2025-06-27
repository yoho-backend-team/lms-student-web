import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
	return (
		<>
			<div className='flex flex-col h-[100vh]'>
				<div className='flex flex-col justify-center h-[90px]'>
					<Navbar />
				</div>
				<div className='relative h-[100vh] overflow-y-auto px-6 bg-[#ebeff3]'>
					<Outlet />
				</div>
				<div className='h-[70px]'>
					<Footer />
				</div>
			</div>
		</>
	);
};

export default MainLayout;

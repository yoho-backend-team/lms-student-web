import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<>
			<footer className='flex justify-between px-6'>
				<div className='flex gap-4'>
					<Link to='help-center'>Help Center</Link>
					<Link to='faqs'>FAQ</Link>
				</div>
				<div className='flex gap-4'>
					<Link to='activity-logs'>Activity Log</Link>
					<Link to='tickets'>Ticket</Link>
				</div>
			</footer>
		</>
	);
};

export default Footer;

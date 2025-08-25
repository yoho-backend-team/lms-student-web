import React, { useEffect } from 'react';
import Loader from '@/components/Loader/Loader';
import { useLoader } from '@/context/LoadingContext/Loader';
import { useDispatch } from 'react-redux';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { FONTS } from '@/constants/uiConstants';
import img from '../../../src/assets/classes/Group 197.png'


const Placement: React.FC = () => {
	const dispatch = useDispatch<any>();
	const { showLoader, hideLoader, IsLoading } = useLoader();

	useEffect(() => {
		(async () => {
			try {
				showLoader();
				const timeoutId = setTimeout(() => {
					hideLoader();
				}, 5000);
				const response = await dispatch(getDashBoardReports());
				if (response) {
					clearTimeout(timeoutId);
				}
			} finally {
				hideLoader();
			}
		})();
	}, [dispatch, hideLoader, showLoader]);



	return (
		<>
			{IsLoading && (
				<div className='w-full h-[100vh] absolute z-10 bg-transparent backdrop-blur-sm transition-all duration-500 ease-in-out'>
					<Loader />
				</div>
			)}
			<div className='p-5'>
				<div>
					<h1 className='text-black text-2xl font-semibold mb-6' style={{ ...FONTS.heading_01 }}>Placement</h1>
				</div>
				<div className=''>
					<div className='cursor-pointer grid grid-cols-1 md:grid-cols-[1fr_2fr] bg-[#EBEFF3] text-[#444447] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg'>
						<div className='bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] rounded-md max-w-[400px] col-start-1 flex items-center justify-center'>
							<img src={img} className='object-fill' ></img>
						</div>
						<div className='grid gap-6'>
							<div className='grid grid-cols-2 gap-6'>
								<div className='cursor-pointer  bg-[#EBEFF3] text-[rgb(68,68,71)] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg grid gap-4'>
									<h3 className='font-semibold' style={{ ...FONTS.heading_04 }}>Company Details</h3>
									<ul className="grid gap-2">
										<li className="grid grid-cols-[150px_10px_1fr] gap-8">
											<span style={{ ...FONTS.heading_07 }}>Company Name</span>
											<span>:</span>
											<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
										</li>
										<li className="grid grid-cols-[150px_10px_1fr] gap-8">
											<span style={{ ...FONTS.heading_07 }}>Company Address</span>
											<span>:</span>
											<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
										</li>
										<li className="grid grid-cols-[150px_10px_1fr] gap-8">
											<span style={{ ...FONTS.heading_07 }}>Contact Email</span>
											<span>:</span>
											<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
										</li>
										<li className="grid grid-cols-[150px_10px_1fr] gap-8">
											<span style={{ ...FONTS.heading_07 }}>Contact Number</span>
											<span>:</span>
											<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
										</li>
									</ul>
								</div>
								<div className='cursor-pointer  bg-[#EBEFF3] text-[rgb(68,68,71)] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg grid gap-4'>
									<h3 className='font-semibold' style={{ ...FONTS.heading_04 }}>Company Details</h3>
									<ul className="grid gap-2">
										<li className="grid grid-cols-[150px_10px_1fr] gap-8">
											<span style={{ ...FONTS.heading_07 }}>Job Name</span>
											<span>:</span>
											<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
										</li>
										<li className="grid grid-cols-[150px_10px_1fr] gap-8">
											<span style={{ ...FONTS.heading_07 }}>Job Description</span>
											<span>:</span>
											<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
										</li>
										<li className="grid grid-cols-[150px_10px_1fr] gap-8">
											<span style={{ ...FONTS.heading_07 }}>Skills</span>
											<span>:</span>
											<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
										</li>

									</ul>
								</div>

							</div>
							<div className='cursor-pointer  bg-[#EBEFF3] text-[rgb(68,68,71)] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] p-6 rounded-lg grid gap-4'>
								<h3 className='font-semibold' style={{ ...FONTS.heading_04 }}>Company Details</h3>
								<ul className="grid grid-cols-3 gap-2">
									<li className="">
										<span style={{ ...FONTS.heading_07 }}>Job Name</span>
										<span className='p-2'>:</span>
										<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
									</li>
									<li className=" ">
										<span style={{ ...FONTS.heading_07 }}>Job Description</span>
										<span className='p-2'>:</span>
										<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
									</li>
									<li className="">
										<span style={{ ...FONTS.heading_07 }}>Skills</span>
										<span className='p-2'>:</span>
										<span style={{ ...FONTS.heading_04 }}>Yoho Tech</span>
									</li>

								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Placement;

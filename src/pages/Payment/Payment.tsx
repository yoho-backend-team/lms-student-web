import Profile1 from '../../assets/icons/payments/profile-1.png';
import Profile2 from '../../assets/icons/payments/profile-2.png';
import Profile3 from '../../assets/icons/payments/profile-3.png';
import Profile4 from '../../assets/icons/payments/profile-4.png';
import Profile5 from '../../assets/icons/payments/profile-5.png';
import Group from '../../assets/icons/payments/Group.png';
import Frame from '../../assets/icons/payments/Frame.png';
import Star from '../../assets/icons/payments/Star.png';
import { COLORS, FONTS } from '@/constants/uiConstants';

const Payment = () => {
	return (
		<div className=' flex gap-8 mb-2'>
			<div className='w-1/4'>
				<h1
					className='font-semibold text-2xl py-6'
					style={{ ...FONTS.heading_01 }}
				>
					Payment
				</h1>
				<div className='p-5 grid gap-6 custom-inset-shadow'>
					<section className='custom-inset-shadow p-3 grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile1} alt='Profile' />
							<p style={{ ...FONTS.para_03 }}>Course Fees</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_05, color: COLORS.light_green_01 }}
						>
							&#8377; 100000
						</p>
					</section>

					<section className='custom-inset-shadow p-3 grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile2} alt='Profile' />
							<p style={{ ...FONTS.para_03 }}>Amount Paid</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_05, color: COLORS.light_green }}
						>
							&#8377; 100000
						</p>
					</section>

					<section className='custom-inset-shadow p-3 grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile3} alt='Profile' />
							<p style={{ ...FONTS.para_03 }}>Pending Amount</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_05, color: COLORS.light_red }}
						>
							&#8377; 100000
						</p>
					</section>

					<section className='custom-inset-shadow p-3 grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile4} alt='Profile' />
							<p style={{ ...FONTS.para_03 }}>Status</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_05, color: COLORS.purple_01 }}
						>
							Payment Empty
						</p>
					</section>

					<section className='custom-inset-shadow p-3 grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile5} alt='Profile' />
							<p style={{ ...FONTS.para_03 }}>Payment Method</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_05, color: COLORS.light_orange }}
						>
							&#8377; 100000
						</p>
					</section>
				</div>
			</div>

			<div className='w-3/4 flex gap-8'>
				<div className='w-1/2'>
					<div>
						<h1
							className='font-semibold text-2xl py-6'
							style={{ ...FONTS.heading_01 }}
						>
							Courses Details
						</h1>
						<div className='p-5 grid gap-2 custom-inset-shadow'>
							<section className='custom-inset-shadow'>
								<img src={Group} alt='Group' className='m-auto' />
							</section>
							<h1
								className='font-semibold mt-4'
								style={{ ...FONTS.heading_05 }}
							>
								MERN STACK
							</h1>
							<p style={{ ...FONTS.heading_06 }}>
								Anna University RO Tiruchirappali
							</p>
							<div className='flex justify-between mt-2'>
								<section className='flex items-center gap-3 '>
									<div
										className='p-3 rounded-lg'
										style={{
											boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
										}}
									>
										<img src={Frame} alt='Frame' className='' />
									</div>
									<h2
										className='font-semibold '
										style={{ ...FONTS.heading_06 }}
									>
										6 Modules
									</h2>
								</section>
								<section className='mt-5 flex flex-col justify-center'>
									<div className=' flex items-center gap-1'>
										<div className=' flex justify-end items-center '>
											<img src={Star} alt='Star' className='' />
											<img src={Star} alt='Star' className='' />
											<img src={Star} alt='Star' className='' />
											<img src={Star} alt='Star' className='' />
											<img src={Star} alt='Star' className='' />
										</div>
										<p style={{ ...FONTS.heading_06 }}>4.5</p>
									</div>
									<p
										className='text-end font-semibold mt-1'
										style={{ ...FONTS.heading_05, color: COLORS.light_green }}
									>
										&#8377; 500000
									</p>
								</section>
							</div>
						</div>
					</div>

					<div className='mt-3'>
						<section className='flex justify-between items-center py-6'>
							<h1
								className='font-semibold text-2xl'
								style={{ ...FONTS.heading_01 }}
							>
								Fees Details
							</h1>
							<button
								className='p-2 px-4 rounded-lg cursor-pointer'
								style={{
									...FONTS.heading_06,
									boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
								}}
							>
								Download Receipt
							</button>
						</section>
						<div className='p-5 grid gap-2 custom-inset-shadow'>
							<div className='flex justify-between'>
								<section>
									<h1 style={{ ...FONTS.heading_07 }}>Student :</h1>
									<p style={{ ...FONTS.heading_05 }}>Elon Musk</p>
								</section>
								<section>
									<h1 style={{ ...FONTS.heading_07 }}>Category :</h1>
									<p style={{ ...FONTS.heading_05 }}>MERN Stack 2024</p>
								</section>
								<section>
									<h1 style={{ ...FONTS.heading_07 }}>Enrolled Date :</h1>
									<p style={{ ...FONTS.heading_05 }}>12 June 2025</p>
								</section>
							</div>

							<section
								className='custom-inset-shadow flex justify-between p-3 my-3'
								style={{
									...FONTS.heading_05,
									background: 'linear-gradient(90deg, #7B00FF, #B200FF)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
								}}
							>
								<h1>Description</h1>
								<h1>Amount (INR)</h1>
							</section>

							<div className='flex flex-col gap-1'>
								<section
									className='flex justify-between'
									style={{ ...FONTS.heading_06 }}
								>
									<p>Tuition Amount</p>
									<p>&#8377; 100000 INR</p>
								</section>

								<section
									className='flex justify-between'
									style={{ ...FONTS.heading_06 }}
								>
									<p>Software Cost</p>
									<p>&#8377; 13,000.00 INR</p>
								</section>

								<section
									className='flex justify-between'
									style={{ ...FONTS.heading_06 }}
								>
									<p>GST Tax</p>
									<p>&#8377; 1,800.00 INR</p>
								</section>

								<section
									className='flex justify-between'
									style={{ ...FONTS.heading_06 }}
								>
									<p>Paid Amount</p>
									<p>&#8377; 10000 INR</p>
								</section>

								<section
									className='flex justify-between'
									style={{ ...FONTS.heading_06, color: COLORS.light_red }}
								>
									<p>Pending</p>
									<p>&#8377; 90000 INR</p>
								</section>
							</div>
						</div>
					</div>
				</div>

				<div className='w-1/2'>
					<h1
						className='font-semibold text-2xl py-6'
						style={{ ...FONTS.heading_01 }}
					>
						Payment History
					</h1>
					<div className='p-5 flex flex-col gap-2 custom-inset-shadow min-h-[100vh]'>
						<h1 className='font-semibold' style={{ ...FONTS.heading_05 }}>
							View PDF
						</h1>

						<section className='custom-inset-shadow flex justify-between items-center p-3 my-3'>
							<h1
								style={{
									...FONTS.heading_06,
								}}
							>
								21 June 2025
							</h1>
							<button
								className='p-2 px-4 rounded-lg cursor-pointer'
								style={{
									...FONTS.heading_06,
									boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
								}}
							>
								View PDF
							</button>
						</section>

						<div className='flex justify-between'>
							<h1 style={{ ...FONTS.heading_05 }}>Pay Due</h1>
							<p style={{ ...FONTS.heading_06 }}>No Pending Payments</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;

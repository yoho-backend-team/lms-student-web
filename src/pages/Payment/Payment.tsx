import Profile1 from '../../assets/icons/payments/profile-1.png';
import Profile2 from '../../assets/icons/payments/profile-2.png';
import Profile3 from '../../assets/icons/payments/profile-3.png';
import Profile4 from '../../assets/icons/payments/profile-4.png';
import Profile5 from '../../assets/icons/payments/profile-5.png';
import Group from '../../assets/icons/payments/Group.png';
import Frame from '../../assets/icons/payments/Frame.png';
import Star from '../../assets/icons/payments/Star.png';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectPayment } from '@/features/Payment/reducers/selectors';
import { useEffect } from 'react';
import { getStudentPaymentThunk } from '@/features/Payment/reducers/thunks';

const Payment = () => {

	const dispatch = useDispatch<any>();
	const paymentDetails = useSelector(selectPayment)


	useEffect(() => {
		dispatch(getStudentPaymentThunk({ paymentId: '67f3b8feb8d2634300cc8819' }));
	}, [dispatch]);

	const rating = paymentDetails.length !==0 ? paymentDetails?.fees[0]?.course_id?.rating:0
	const fullStars = Math.floor(rating);

	return (
		
		<div className=' lg:flex md:grid gap-8 mb-2'>
			<div className='lg:w-1/4 md'>
				<h1
					className='font-semibold text-2xl py-6'
					style={{ ...FONTS.heading_02 }}
				>
					Payment
				</h1>
				<div className='p-5 lg:grid lg:grid-cols-1 md:flex md:flex-wrap md:justify-evenly sm:grid sm:grid-cols-2  gap-6 custom-inset-shadow'>
					<section className='custom-inset-shadow p-3 md:w-1/4 grow lg:w-full grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile1} alt='Profile' />
							<p style={{ ...FONTS.heading_07 }}>Course Fees</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_03, color: COLORS.light_green_01 }}
						>
							{paymentDetails.length !==0 ? paymentDetails?.course_fees : 0}
						</p>
					</section>

					<section className='custom-inset-shadow p-3 md:w-1/4 grow lg:w-full grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile2} alt='Profile' />
							<p style={{ ...FONTS.heading_07 }}>Amount Paid</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_03, color: COLORS.light_green }}
						>
							&#8377;{paymentDetails.length !==0 ? paymentDetails?.payment_history[0]?.paid_amount:0}
						</p>
					</section>

					<section className='custom-inset-shadow p-3 md:w-1/4 grow lg:w-full grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile3} alt='Profile' />
							<p style={{ ...FONTS.heading_07 }}>Pending Amount</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_03, color: COLORS.light_red }}
						>
							{paymentDetails.length !==0 ?paymentDetails?.pending_payment:0}

						</p>
					</section>

					<section className='custom-inset-shadow p-3 md:w-1/4 grow lg:w-full grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile4} alt='Profile' />
							<p style={{ ...FONTS.heading_07 }}>Status</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_03, color: COLORS.purple_01 }}
						>
							{paymentDetails.length !==0 ?paymentDetails?.payment_status:"NA"}
						</p>
					</section>

					<section className='custom-inset-shadow p-3 md:w-1/4 grow lg:w-full grid gap-4'>
						<div className='flex gap-3'>
							<img src={Profile5} alt='Profile' />
							<p style={{ ...FONTS.heading_07 }}>Payment Method</p>
						</div>
						<p
							className='text-end'
							style={{ ...FONTS.heading_03, color: COLORS.light_orange }}
						>
							{paymentDetails.length !==0 ?paymentDetails?.payment_history[0]?.payment_method:"NA"}
						</p>
					</section>
				</div>
			</div>

			<div className='lg:w-3/4 flex gap-8'>
				<div className='w-1/2 sm:w-2/3'>
					<div>
						<h1
							className='font-semibold text-2xl py-6'
							style={{ ...FONTS.heading_02 }}
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
								{paymentDetails.length !==0 ?paymentDetails?.fees[0]?.course_id?.course_name:"NA"}
							</h1>
							<p style={{ ...FONTS.para_02 }}>
								{paymentDetails.length !==0 ?paymentDetails?.fees[0]?.institute_id?.institute_name:"NA"}
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
										{paymentDetails.length !==0 ?paymentDetails?.fees[0]?.course_id?.coursemodules.length:0} Modules
									</h2>
								</section>
								<section className='mt-5'>
									<div className="flex items-center justify-between gap-2">
										<div className="flex justify-end items-center">
											{Array.from({ length: fullStars }).map((_, i) => (
												<img key={`full-${i}`} src={Star} alt="Star" />
											))}
										</div>
										<p style={{ ...FONTS.heading_06 }}>{paymentDetails.length !==0 ?paymentDetails?.fees[0]?.course_id?.rating:0}</p>
									</div>
									<p
										className='text-end font-semibold'
										style={{ ...FONTS.heading_05, color: COLORS.light_green }}
									>
										&#8377; {paymentDetails.length !==0 ?paymentDetails?.course?.actual_price:0}
									</p>
								</section>
							</div>
						</div>
					</div>

					<div className='mt-3 sm:w-full'>
						<section className='flex justify-between items-center py-6'>
							<h1
								className='font-semibold text-2xl'
								style={{ ...FONTS.heading_02 }}
							>
								Fees Details
							</h1>
							<button
								className='p-2 px-4 rounded-lg cursor-pointer'
								style={{
									...FONTS.para_02,
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
									<p style={{ ...FONTS.para_03 }}>{paymentDetails.length !==0 ?paymentDetails?.fees[0]?.student?.full_name:"NA"}</p>
								</section>
								<section>
									<h1 style={{ ...FONTS.heading_07 }}>Category :</h1>
									<p style={{ ...FONTS.para_03 }}>{paymentDetails.length !==0 ?paymentDetails?.fees[0]?.course_id?.course_name:"NA"}</p>
								</section>
								<section>
									<h1 style={{ ...FONTS.heading_07 }}>Enrolled Date :</h1>
									<p style={{ ...FONTS.para_03 }}>{new Date(paymentDetails.length !==0 ?paymentDetails?.course?.createdAt:"NA").toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "long",
										year: "numeric",
									})}</p>
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
								<h1>Amount</h1>
							</section>

							<div>
								<section className='flex justify-between'>
									<p style={{ ...FONTS.para_02 }}>Tuition Amount</p>
									<p style={{ ...FONTS.para_03 }}>{paymentDetails.length !==0 ?paymentDetails?.course_fees:0} INR</p>
								</section>

								<section className='flex justify-between'>
									<p style={{ ...FONTS.para_02 }}>Gst Cost</p>
									<p style={{ ...FONTS.para_03 }}>&#8377; {paymentDetails.length !==0 ?paymentDetails?.fees[0]?.gst:0} INR</p>
								</section>

								<section className='flex justify-between'>
									<p style={{ ...FONTS.para_02 }}>Other Tax</p>
									<p style={{ ...FONTS.para_03 }}>&#8377; {paymentDetails.length !==0 ?paymentDetails?.fees[0]?.other_taxes:0} INR</p>
								</section>

								<section className='flex justify-between'>
									<p style={{ ...FONTS.para_02 }}>Paid Amount</p>
									<p style={{ ...FONTS.para_03 }}>&#8377; {paymentDetails.length !==0 ?paymentDetails?.payment_history[0]?.paid_amount:0} INR</p>
								</section>

								<section
									className='flex justify-between'
									style={{ ...FONTS.para_02, color: COLORS.light_red }}
								>
									<p>Pending</p>
									<p>{paymentDetails.length !==0 ?paymentDetails?.pending_payment:0} INR</p>
								</section>
							</div>
						</div>
					</div>
				</div>

				<div className='w-1/2'>
					<h1
						className='font-semibold text-2xl py-6'
						style={{ ...FONTS.heading_02 }}
					>
						Payment History
					</h1>
					<div className='p-5 flex flex-col gap-2 custom-inset-shadow'>
						<h1 className='font-semibold' style={{ ...FONTS.heading_05 }}>
							View PDF
						</h1>

						<section className='custom-inset-shadow flex justify-between items-center p-3 my-3'>
							<h1
								style={{
									...FONTS.heading_05,
								}}
							>
								{new Date(paymentDetails.length !==0 ?paymentDetails?.payment_history[0]?.payment_date:"NA").toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</h1>
							<button
								className='p-2 px-4 rounded-lg cursor-pointer'
								style={{
									...FONTS.para_02,
									boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
								}}
							>
								View PDF
							</button>
						</section>

						<div className='flex justify-between items-center mb-5'>
							<h1 style={{ ...FONTS.heading_05 }}>Pay Due</h1>
							<p style={{ ...FONTS.para_02 }}>{paymentDetails?.pending_payment !=0 ? "Pending Payments" : "No Pending Payments"}</p>
						</div>

						<section className='custom-inset-shadow flex justify-between items-center p-3 my-3'>
							<h1
								style={{
									...FONTS.heading_05,
								}}
							>
								{new Date(paymentDetails.length !==0 ?paymentDetails?.payment_history[0].
									duepaymentdate:"NA"
								).toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</h1>
							<p
								className='p-2 px-4 rounded-lg cursor-pointer'
								style={{
									...FONTS.para_02,
									color:COLORS.light_red,
									boxShadow: `
      										rgba(255, 255, 255, 0.7) 5px 5px 4px, 
      										rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
								}}
							>
								{paymentDetails.length !==0 ?paymentDetails?.pending_payment:0}
							</p>
						</section>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Payment;

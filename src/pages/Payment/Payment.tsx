import Profile1 from '../../assets/icons/payments/profile-1.png';
import Profile2 from '../../assets/icons/payments/profile-2.png';
import Profile3 from '../../assets/icons/payments/profile-3.png';
import Profile4 from '../../assets/icons/payments/profile-4.png';
import Profile5 from '../../assets/icons/payments/profile-5.png';
import Frame from '../../assets/icons/payments/Frame.png';
import Star from '../../assets/icons/payments/Star.png';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectPayment } from '@/features/Payment/reducers/selectors';
import { useEffect, useState, useRef } from 'react';
import { getStudentPaymentThunk } from '@/features/Payment/reducers/thunks';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';
import { Button } from '@/components/ui/button';
import InvoiceReceipt from '../../utils/InvoiceReceipt';
import { useLoader } from '@/context/LoadingContext/Loader';
import { getDashBoardReports } from '@/features/Dashboard/reducers/thunks';
import { GetImageUrl, GetLocalStorage } from '@/utils/helper';

const Payment = () => {
	const dispatch = useDispatch<any>();
	const paymentDetails = useSelector(selectPayment);
	const { showLoader, hideLoader } = useLoader();
	const storedData: any = GetLocalStorage('user');
	const [open, setOpen] = useState(false);
	const [selectedPayment, setSelectedPayment] = useState<any>(null);
	const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
	const [openDropDown, setOpenDropDown] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(getStudentProfileThunk({}));
		dispatch(getStudentPaymentThunk({ paymentId: storedData?.uuid }));
	}, [dispatch, storedData?.uuid]);

	const rating =
		paymentDetails?.length !== 0
			? paymentDetails?.fees[0]?.course_id?.rating
			: 0;
	const fullStars = Math.floor(rating);

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

	// Close dropdown if clicked outside
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpenDropDown(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [dropdownRef]);

	return (
		<>
			<div className='p-3 xs:p-4 sm:p-5 lg:p-6'>
				<div className='flex flex-col xl:flex-row gap-4 xs:gap-5 sm:gap-6 lg:gap-8'>
					{/* Left Side - Payment Cards */}
					<div className='w-full xl:w-1/4'>
						<h1
							className='font-semibold text-xl xs:text-2xl py-4 xs:py-5 sm:py-6'
							style={{ ...FONTS.heading_02 }}
						>
							Payment
						</h1>
						<div className='p-3 xs:p-4 sm:p-5 h-auto xl:h-[75vh] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-3 xs:gap-4 sm:gap-5 custom-inset-shadow overflow-y-auto'>
							<section className='custom-inset-shadow p-3 xs:p-4 grid gap-3 xs:gap-4'>
								<div className='flex gap-2 xs:gap-3'>
									<img
										src={Profile1}
										alt='Profile'
										className='w-6 h-6 xs:w-7 xs:h-7'
									/>
									<p
										className='text-sm xs:text-base'
										style={{ ...FONTS.heading_07 }}
									>
										Course Fees
									</p>
								</div>
								<p
									className='text-end text-base xs:text-lg'
									style={{ ...FONTS.heading_03, color: COLORS.light_green_01 }}
								>
									{paymentDetails.length !== 0
										? paymentDetails?.course_fees
										: 0}
								</p>
							</section>

							<section className='custom-inset-shadow p-3 xs:p-4 grid gap-3 xs:gap-4'>
								<div className='flex gap-2 xs:gap-3'>
									<img
										src={Profile2}
										alt='Profile'
										className='w-6 h-6 xs:w-7 xs:h-7'
									/>
									<p
										className='text-sm xs:text-base'
										style={{ ...FONTS.heading_07 }}
									>
										Amount Paid
									</p>
								</div>
								<p
									className='text-end text-base xs:text-lg'
									style={{ ...FONTS.heading_03, color: COLORS.light_green }}
								>
									&#8377;
									{paymentDetails.length !== 0
										? paymentDetails?.payment_history[0]?.paid_amount
										: 0}
								</p>
							</section>

							<section className='custom-inset-shadow p-3 xs:p-4 grid gap-3 xs:gap-4'>
								<div className='flex gap-2 xs:gap-3'>
									<img
										src={Profile3}
										alt='Profile'
										className='w-6 h-6 xs:w-7 xs:h-7'
									/>
									<p
										className='text-sm xs:text-base'
										style={{ ...FONTS.heading_07 }}
									>
										Pending Amount
									</p>
								</div>
								<p
									className='text-end text-base xs:text-lg'
									style={{ ...FONTS.heading_03, color: COLORS.light_red }}
								>
									{paymentDetails.length !== 0
										? paymentDetails?.pending_payment
										: 0}
								</p>
							</section>

							<section className='custom-inset-shadow p-3 xs:p-4 grid gap-3 xs:gap-4'>
								<div className='flex gap-2 xs:gap-3'>
									<img
										src={Profile4}
										alt='Profile'
										className='w-6 h-6 xs:w-7 xs:h-7'
									/>
									<p
										className='text-sm xs:text-base'
										style={{ ...FONTS.heading_07 }}
									>
										Status
									</p>
								</div>
								<p
									className='text-end text-base xs:text-lg'
									style={{ ...FONTS.heading_03, color: COLORS.purple_01 }}
								>
									{paymentDetails.length !== 0
										? paymentDetails?.payment_status
										: 'NA'}
								</p>
							</section>

							<section className='custom-inset-shadow p-3 xs:p-4 grid gap-3 xs:gap-4'>
								<div className='flex gap-2 xs:gap-3'>
									<img
										src={Profile5}
										alt='Profile'
										className='w-6 h-6 xs:w-7 xs:h-7'
									/>
									<p
										className='text-sm xs:text-base'
										style={{ ...FONTS.heading_07 }}
									>
										Payment Method
									</p>
								</div>
								<p
									className='text-end text-base xs:text-lg'
									style={{ ...FONTS.heading_03, color: COLORS.light_orange }}
								>
									{paymentDetails.length !== 0
										? paymentDetails?.payment_history[0]?.payment_method
										: 'NA'}
								</p>
							</section>
						</div>
					</div>

					{/* Right Side - Main Content */}
					<div className='w-full xl:w-3/4 flex flex-col lg:flex-row gap-4 xs:gap-5 sm:gap-6 lg:gap-8'>
						{/* Course Details and Fees Details */}
						<div className='w-full lg:w-2/3 xl:w-1/2 2xl:w-2/3 flex flex-col gap-4 xs:gap-5 sm:gap-6'>
							{/* Course Details */}
							<div>
								<h1
									className='font-semibold text-xl xs:text-2xl py-4 xs:py-5 sm:py-6'
									style={{ ...FONTS.heading_02 }}
								>
									Courses Details
								</h1>
								<div className='p-3 xs:p-4 sm:p-5 grid gap-2 xs:gap-3 custom-inset-shadow'>
									<section className='custom-inset-shadow'>
										<img
											src={
												GetImageUrl(
													paymentDetails?.fees[0]?.course_id?.image
												) ?? undefined
											}
											alt='Group'
											className='m-auto w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 object-contain'
										/>
									</section>
									<h1
										className='font-semibold mt-3 xs:mt-4 text-base xs:text-lg'
										style={{ ...FONTS.heading_05 }}
									>
										{paymentDetails.length !== 0
											? paymentDetails?.fees[0]?.course_id?.course_name
											: 'NA'}
									</h1>
									<p
										className='text-sm xs:text-base'
										style={{ ...FONTS.para_02 }}
									>
										{paymentDetails.length !== 0
											? paymentDetails?.fees[0]?.institute_id?.institute_name
											: 'NA'}
									</p>
									<div className='flex justify-between mt-2 xs:mt-3'>
										<section className='flex items-center gap-2 xs:gap-3'>
											<div
												className='p-2 xs:p-3 rounded-lg'
												style={{
													boxShadow: `
                          rgba(255, 255, 255, 0.7) 5px 5px 4px, 
                          rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
												}}
											>
												<img
													src={Frame}
													alt='Frame'
													className='w-5 h-5 xs:w-6 xs:h-6'
												/>
											</div>
											<h2
												className='font-semibold text-sm xs:text-base'
												style={{ ...FONTS.heading_06 }}
											>
												{paymentDetails.length !== 0
													? paymentDetails?.fees[0]?.course_id?.coursemodules
															.length
													: 0}{' '}
												Modules
											</h2>
										</section>
										<section className='mt-3 xs:mt-5'>
											<div className='flex items-center justify-between gap-1 xs:gap-2'>
												<div className='flex justify-end items-center'>
													{Array.from({ length: fullStars }).map((_, i) => (
														<img
															key={`full-${i}`}
															src={Star}
															alt='Star'
															className='w-4 h-4 xs:w-5 xs:h-5'
														/>
													))}
												</div>
												<p
													className='text-sm xs:text-base'
													style={{ ...FONTS.heading_06 }}
												>
													{paymentDetails.length !== 0
														? paymentDetails?.fees[0]?.course_id?.rating
														: 0}
												</p>
											</div>
											<p
												className='text-end font-semibold text-sm xs:text-base mt-1'
												style={{
													...FONTS.heading_05,
													color: COLORS.light_green,
												}}
											>
												&#8377;{' '}
												{paymentDetails.length !== 0
													? paymentDetails?.course?.actual_price
													: 0}
											</p>
										</section>
									</div>
								</div>
							</div>

							{/* Fees Details */}
							<div className='w-full'>
								<section className='flex justify-between xs:flex-row xs:justify-between xs:items-center py-4 xs:py-5 sm:py-6 gap-3 xs:gap-0'>
									<h1
										className='font-semibold text-xl xs:text-2xl'
										style={{ ...FONTS.heading_02 }}
									>
										Fees Details
									</h1>
									<Button
										className='p-2 px-3 w-34 xs:px-4 rounded-lg cursor-pointer bg-gradient-to-l from-[#7B00FF] to-[#B200FF] text-white text-sm xs:text-base
                      shadow-[0px_2px_4px_0px_rgba(255,255,255,0.75)_inset,3px_3px_3px_0px_rgba(255,255,255,0.25)_inset,-8px_-8px_12px_0px_#7B00FF_inset,-4px_-8px_10px_0px_#B200FF_inset,4px_4px_8px_0px_rgba(189,194,199,0.75),8px_8px_12px_0px_rgba(189,194,199,0.25),-4px_-4px_12px_0px_rgba(255,255,255,0.75),-8px_-8px_12px_1px_rgba(255,255,255,0.25)] flex'
										style={{
											...FONTS.para_02,
											color: 'white',
										}}
										onClick={() => setOpen(true)}
									>
										Download Receipt
									</Button>
								</section>
								<div className='p-3 xs:p-4 sm:p-5 grid gap-2 xs:gap-3 custom-inset-shadow'>
									<div className='flex xs:flex-row justify-between gap-3 xs:gap-4'>
										<section className='flex-1'>
											<h1
												className='text-sm xs:text-base'
												style={{ ...FONTS.heading_07 }}
											>
												Student :
											</h1>
											<p
												className='text-xs xs:text-sm'
												style={{ ...FONTS.para_03 }}
											>
												{paymentDetails.length !== 0
													? paymentDetails?.fees[0]?.student?.full_name
													: 'NA'}
											</p>
										</section>
										<section className='flex-1'>
											<h1
												className='text-sm xs:text-base'
												style={{ ...FONTS.heading_07 }}
											>
												Category :
											</h1>
											<p
												className='text-xs xs:text-sm'
												style={{ ...FONTS.para_03 }}
											>
												{paymentDetails.length !== 0
													? paymentDetails?.fees[0]?.course_id?.course_name
													: 'NA'}
											</p>
										</section>
										<section className='flex-1'>
											<h1
												className='text-sm xs:text-base'
												style={{ ...FONTS.heading_07 }}
											>
												Enrolled Date :
											</h1>
											<p
												className='text-xs xs:text-sm'
												style={{ ...FONTS.para_03 }}
											>
												{new Date(
													paymentDetails.length !== 0
														? paymentDetails?.course?.createdAt
														: 'NA'
												).toLocaleDateString('en-GB', {
													day: '2-digit',
													month: 'long',
													year: 'numeric',
												})}
											</p>
										</section>
									</div>

									<section
										className='custom-inset-shadow flex justify-between p-2 xs:p-3 my-2 xs:my-3'
										style={{
											...FONTS.heading_05,
											background: 'linear-gradient(90deg, #7B00FF, #B200FF)',
											WebkitBackgroundClip: 'text',
											WebkitTextFillColor: 'transparent',
											fontSize: '14px xs:16px',
										}}
									>
										<h1>Description</h1>
										<h1>Amount</h1>
									</section>

									<div className='space-y-2 xs:space-y-3'>
										<section className='flex justify-between'>
											<p
												className='text-sm xs:text-base'
												style={{ ...FONTS.para_02 }}
											>
												Tuition Amount
											</p>
											<p
												className='text-xs xs:text-sm'
												style={{ ...FONTS.para_03 }}
											>
												{paymentDetails.length !== 0
													? paymentDetails?.course_fees
													: 0}{' '}
												INR
											</p>
										</section>

										<section className='flex justify-between'>
											<p
												className='text-sm xs:text-base'
												style={{ ...FONTS.para_02 }}
											>
												Gst Cost
											</p>
											<p
												className='text-xs xs:text-sm'
												style={{ ...FONTS.para_03 }}
											>
												&#8377;{' '}
												{paymentDetails.length !== 0
													? paymentDetails?.fees[0]?.gst
													: 0}{' '}
												INR
											</p>
										</section>

										<section className='flex justify-between'>
											<p
												className='text-sm xs:text-base'
												style={{ ...FONTS.para_02 }}
											>
												Other Tax
											</p>
											<p
												className='text-xs xs:text-sm'
												style={{ ...FONTS.para_03 }}
											>
												&#8377;{' '}
												{paymentDetails.length !== 0
													? paymentDetails?.fees[0]?.other_taxes
													: 0}{' '}
												INR
											</p>
										</section>

										<section className='flex justify-between'>
											<p
												className='text-sm xs:text-base'
												style={{ ...FONTS.para_02 }}
											>
												Paid Amount
											</p>
											<p
												className='text-xs xs:text-sm'
												style={{ ...FONTS.para_03 }}
											>
												&#8377;{' '}
												{paymentDetails.length !== 0
													? paymentDetails?.payment_history[0]?.paid_amount
													: 0}{' '}
												INR
											</p>
										</section>

										<section
											className='flex justify-between'
											style={{ ...FONTS.para_02, color: COLORS.text_title }}
										>
											<p className='text-sm xs:text-base'>Total Amount</p>
											<p className='text-xs xs:text-sm'>
												{paymentDetails.length !== 0
													? paymentDetails?.totalAmount
													: 0}{' '}
												INR
											</p>
										</section>
										<section
											className='flex justify-between'
											style={{ ...FONTS.para_02, color: COLORS.light_red }}
										>
											<p className='text-sm xs:text-base'>Pending</p>
											<p className='text-xs xs:text-sm'>
												{paymentDetails.length !== 0
													? paymentDetails?.pending_payment
													: 0}{' '}
												INR
											</p>
										</section>
									</div>
								</div>
							</div>
						</div>

						{/* Payment History */}
						<div className='w-full lg:w-1/3 xl:w-1/2 2xl:w-1/3'>
							<h1
								className='font-semibold text-xl xs:text-2xl py-4 xs:py-5 sm:py-6'
								style={{ ...FONTS.heading_02 }}
							>
								Payment History
							</h1>
							<div className='p-3 xs:p-4 sm:p-5 flex flex-col gap-2 xs:gap-3 h-auto xl:h-[84vh] custom-inset-shadow overflow-y-auto'>
								<div ref={dropdownRef} className='relative flex-1'>
									<div className='flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 w-full'>
										<h1
											className='font-semibold text-sm xs:text-base'
											style={{ ...FONTS.heading_05 }}
										>
											View Paid Details
										</h1>

										<button
											className='p-2 px-3 xs:px-4 rounded-lg cursor-pointer w-full text-left text-sm xs:text-base'
											style={{
												...FONTS.para_02,
												color: COLORS.light_red,
												boxShadow: `
                          rgba(255, 255, 255, 0.7) 5px 5px 4px, 
                          rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
											}}
											onClick={() => setOpenDropDown((prev) => !prev)}
										>
											{selectedMonth || 'Select Date'}
										</button>
									</div>

									{openDropDown && (
										<div className='absolute z-50 xs:left-20 top-12 xs:top-10 w-full xs:w-[80%] max-h-48 overflow-y-auto border rounded mt-1 bg-white shadow-lg'>
											{paymentDetails.length !== 0 &&
												[...paymentDetails?.payment_history]
													?.reverse()
													?.map((history: any, i: number) => {
														const month = new Date(
															history?.payment_date
														).toLocaleString('en-GB', {
															day: '2-digit',
															month: 'long',
															year: 'numeric',
														});
														return (
															<div
																key={i}
																className='p-2 hover:bg-gray-100 cursor-pointer text-sm xs:text-base'
																onClick={() => {
																	setSelectedMonth(month);
																	const payment =
																		paymentDetails?.payment_history?.find(
																			(p: any) =>
																				new Date(p.payment_date).toLocaleString(
																					'en-GB'
																				)
																		);
																	setSelectedPayment(payment || null);
																	setOpenDropDown(false);
																}}
															>
																{month}
															</div>
														);
													})}
										</div>
									)}
								</div>

								{selectedPayment && (
									<div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
										<div
											className='absolute inset-0 bg-black/50 backdrop-blur-sm'
											onClick={() => setSelectedPayment(null)}
										></div>
										<div className='relative bg-white p-4 xs:p-6 shadow-lg rounded-lg z-50 w-full max-w-xs xs:max-w-sm sm:max-w-md'>
											<h1 style={{ ...FONTS.heading_05, textAlign: 'center' }}>
												Payment Details
											</h1>
											<div className='mt-3 xs:mt-4 space-y-2 text-sm xs:text-base'>
												<p>
													<strong>Transaction ID:</strong>{' '}
													{selectedPayment.transaction_id}
												</p>
												<p>
													<strong>Paid Amount:</strong> ₹
													{selectedPayment.paid_amount}
												</p>
												<p>
													<strong>Balance:</strong> ₹{selectedPayment.balance}
												</p>
												<p>
													<strong>Payment Method:</strong>{' '}
													{selectedPayment.payment_method}
												</p>
												<p>
													<strong>Payment Date:</strong>{' '}
													{new Date(
														selectedPayment.payment_date
													).toLocaleDateString('en-GB')}
												</p>
												<p>
													<strong>Due Date:</strong>{' '}
													{new Date(
														selectedPayment.duepaymentdate
													).toLocaleDateString('en-GB')}
												</p>
											</div>
											<button
												onClick={() => setSelectedPayment(null)}
												className='mt-3 xs:mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg w-full text-sm xs:text-base'
											>
												Close
											</button>
										</div>
									</div>
								)}

								<div className='flex flex-col xs:flex-row xs:justify-between xs:items-center mb-4 xs:mb-5 gap-2 xs:gap-0 mt-3'>
									<h1
										className='text-sm xs:text-base'
										style={{ ...FONTS.heading_05 }}
									>
										Pay Due
									</h1>
									<p
										className='text-xs xs:text-sm'
										style={{ ...FONTS.para_02 }}
									>
										{paymentDetails?.pending_payment != 0
											? 'Pending Payments'
											: 'No Pending Payments'}
									</p>
								</div>

								{paymentDetails.length !== 0 &&
									[...paymentDetails?.payment_history]
										?.reverse()
										?.map((paidFees: any) => {
											return (
												paidFees.balance !== 0 && (
													<section
														key={paidFees.index}
														className='custom-inset-shadow flex justify-between items-center p-2 xs:p-3 my-2 xs:my-3'
													>
														<h1
															className='text-sm xs:text-base'
															style={{
																...FONTS.heading_05,
															}}
														>
															{new Date(
																paymentDetails?.payment_history?.length !== 0
																	? paidFees?.duepaymentdate
																	: 'NA'
															).toLocaleDateString('en-GB', {
																day: '2-digit',
																month: 'long',
																year: 'numeric',
															})}
														</h1>
														<p
															className='p-2 px-3 xs:px-4 rounded-lg cursor-pointer text-sm xs:text-base'
															style={{
																...FONTS.para_02,
																color: COLORS.light_red,
																boxShadow: `
                            rgba(255, 255, 255, 0.7) 5px 5px 4px, 
                            rgba(189, 194, 199, 0.75) 2px 2px 3px inset`,
															}}
														>
															{paymentDetails.length !== 0
																? paidFees?.balance
																: 0}
														</p>
													</section>
												)
											);
										})}
							</div>
						</div>
					</div>
				</div>
			</div>
			<InvoiceReceipt
				open={open}
				onClose={() => setOpen(false)}
				paymentDetails={paymentDetails}
			/>
		</>
	);
};

export default Payment;

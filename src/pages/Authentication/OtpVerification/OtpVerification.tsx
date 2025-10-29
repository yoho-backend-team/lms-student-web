/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from '@/components/ui/card';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Logo from '../../../assets/icons/navbar/icons8-ionic-50.png';
import {
	forgotPasswordClient,
	updateVerifyOtpClient,
} from '@/features/Authentication/services';
import { toast } from 'react-toastify';
import { RemoveLocalStorage, StoreLocalStorage } from '@/utils/helper';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const OTP_EXPIRY_KEY = 'otp_expiry_time';

const OtpVerification = () => {
	const navigate = useNavigate();
	const [otpDigits, setOtpDigits] = useState(Array(6).fill(''));
	const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
	const [showError, setShowError] = useState(false);
	const location = useLocation();
	const { email, data } = location.state || {};
	const [currentOtp, setCurrentOtp] = useState(data?.otp || '');
	const [currenttoken, setCurrentToken] = useState(data?.token || '');
	const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Timer states
	const [isResending, setIsResending] = useState(false);
	const [resendTimer, setResendTimer] = useState(0);

	// Check device
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobileOrTablet(window.innerWidth < 1024);
		};
		checkScreenSize();
		window.addEventListener('resize', checkScreenSize);
		return () => window.removeEventListener('resize', checkScreenSize);
	}, []);

	// On mount: restore timer if not expired
	useEffect(() => {
		const storedExpiry = localStorage.getItem(OTP_EXPIRY_KEY);
		if (storedExpiry) {
			const expiryTime = parseInt(storedExpiry, 10);
			const now = Date.now();
			if (expiryTime > now) {
				setResendTimer(Math.ceil((expiryTime - now) / 1000));
			} else {
				localStorage.removeItem(OTP_EXPIRY_KEY);
			}
		}
	}, []);

	// Countdown
	useEffect(() => {
		if (resendTimer <= 0) return;
		const interval = setInterval(() => {
			setResendTimer((prev) => {
				if (prev <= 1) {
					localStorage.removeItem(OTP_EXPIRY_KEY);
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
		return () => clearInterval(interval);
	}, [resendTimer]);

	const handleOtpChange = (index: number, value: string) => {
		setShowError(false);
		if (!/^\d?$/.test(value)) return;
		const updated = [...otpDigits];
		updated[index] = value;
		setOtpDigits(updated);
		if (value && index < 5) otpRefs.current[index + 1]?.focus();
	};

	const handleOtpKeyDown = (
		e: React.KeyboardEvent<HTMLInputElement>,
		index: number
	) => {
		if (e.key === 'Backspace') {
			e.preventDefault();
			const updated = [...otpDigits];
			if (otpDigits[index]) {
				updated[index] = '';
			} else if (index > 0) {
				updated[index - 1] = '';
				otpRefs.current[index - 1]?.focus();
			}
			setOtpDigits(updated);
		}
	};

	const handleOtpVerify = async () => {
		const enteredOtp = otpDigits.join('');
		if (enteredOtp.length !== 6) {
			setShowError(true);
			toast.error('Please enter complete OTP', {
				style: { backgroundColor: 'red', color: 'white' },
			});
			return;
		}

		try {
			setIsLoading(true);
			const params_data: any = {
				email,
				token: currenttoken,
				otp: enteredOtp,
			};

			const response = await updateVerifyOtpClient(params_data, {});
			if (response) {
				toast.success('OTP Verified successfully!', {
					style: { backgroundColor: 'green', color: 'white' },
				});

				if (data?.step === 'otp') {
					StoreLocalStorage('userId', response?.data?.userId);
					RemoveLocalStorage('otp');
					RemoveLocalStorage('otptoken');
					RemoveLocalStorage('email');
					navigate('/');
				} else {
					navigate('/reset-password', { state: { email } });
				}
			} else {
				toast.error('Invalid OTP, Please enter a valid one.', {
					style: { backgroundColor: 'red', color: 'white' },
				});
			}
		} catch {
			toast.error('Invalid OTP, Please enter a valid one.', {
				style: { backgroundColor: 'red', color: 'white' },
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleResendOtp = async () => {
		if (!email) return;

		try {
			setIsResending(true);
			const response = await forgotPasswordClient({ email }, {});
			if (response) {
				toast.success('OTP resent successfully!', {
					style: { backgroundColor: 'green', color: 'white' },
				});
				setCurrentOtp(response?.data?.otp);
				setCurrentToken(response?.data?.token);
				setOtpDigits(Array(6).fill(''));
				otpRefs.current[0]?.focus();

				// Start new timer and persist expiry
				const expiryTime = Date.now() + 60 * 1000;
				localStorage.setItem(OTP_EXPIRY_KEY, expiryTime.toString());
				setResendTimer(60);
			}
		} catch (error) {
			console.error('Resend OTP error:', error);
			toast.error('Failed to resend OTP', {
				style: { backgroundColor: 'red', color: 'white' },
			});
		} finally {
			setIsResending(false);
		}
	};

	return (
		<div
			className={`flex bg-[#ebeff3] w-full h-[100vh] p-4 gap-4 ${
				isMobileOrTablet ? 'justify-center' : ''
			}`}
		>
			{/* OTP Form Card */}
			<div
				className={`${isMobileOrTablet ? 'w-full max-w-md' : 'w-1/2'} h-full`}
			>
				<Card
					className='bg-[#ebeff3] w-full h-full px-4 rounded-md flex justify-center cursor-pointer'
					style={{
						boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px,
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
					}}
				>
					<div className='flex flex-col items-center w-full'>
						<Card
							className='bg-[#ebeff3] w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer'
							style={{
								boxShadow: `
                  rgba(255, 255, 255, 0.7) -4px -4px 4px,
                  rgba(189, 194, 199, 0.75) 5px 5px 4px
                `,
							}}
						>
							<img src={Logo} alt='logo' style={{ width: 20, height: 20 }} />
						</Card>
						<p
							className='text-center my-3 mb-5'
							style={{ ...FONTS.heading_02 }}
						>
							OTP Verification
						</p>
						<p style={{ ...FONTS.heading_06 }} className='text-center'>
							Enter the 6 digit OTP sent to your Email Address
						</p>
						<div>
							<p className='my-3 text-red-600 text-md font-semibold text-center'>
								OTP: {currentOtp}
							</p>
						</div>
						<div
							className={`flex ${
								isMobileOrTablet ? 'gap-2' : 'gap-3'
							} justify-center my-3 w-full`}
						>
							{otpDigits.map((digit, idx) => (
								<input
									key={idx}
									type='tel'
									style={{
										...FONTS.heading_02,
										fontSize: isMobileOrTablet
											? '1rem'
											: FONTS.heading_02.fontSize,
									}}
									maxLength={1}
									value={digit}
									onChange={(e) => handleOtpChange(idx, e.target.value)}
									onKeyDown={(e) => handleOtpKeyDown(e, idx)}
									ref={(el) => {
										if (el) otpRefs.current[idx] = el;
									}}
									className={`text-center rounded-md px-4 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none ${
										isMobileOrTablet ? 'w-12 h-12' : 'w-16 h-16'
									}`}
								/>
							))}
						</div>

						{showError && (
							<p
								style={{ ...FONTS.para_03, color: COLORS.light_red }}
								className='my-3 text-center'
							>
								Please enter your OTP
							</p>
						)}

						{/* Verify OTP Button */}
						<div className='relative w-full'>
							<button
								type='submit'
								className={`w-full my-6 mt-8 py-2 rounded-md transition cursor-pointer ${
									isLoading
										? 'bg-gray-400'
										: 'bg-gradient-to-r from-[#7B00FF] to-[#B200FF]'
								}`}
								style={{ ...FONTS.heading_04, color: COLORS.white }}
								onClick={handleOtpVerify}
								disabled={isLoading}
							>
								{isLoading ? 'Verifying...' : 'Verify OTP'}
							</button>

							{/* Timer Display */}
							{resendTimer > 0 && (
								<p
									className='absolute right-0 text-sm font-semibold'
									style={{ color: COLORS.blue_02 }}
								>
									Resend option in {resendTimer}s
								</p>
							)}
						</div>

						{/* Resend OTP */}
						{resendTimer === 0 && (
							<div className='flex justify-center'>
								<p
									style={{ ...FONTS.heading_06, color: COLORS.blue_02 }}
									className={`hover:underline cursor-pointer text-center ${
										isResending ? 'opacity-50 cursor-not-allowed' : ''
									}`}
									onClick={() => {
										if (!isResending) handleResendOtp();
									}}
								>
									{isResending ? 'Resending...' : 'Resend OTP'}
								</p>
							</div>
						)}
					</div>
				</Card>
			</div>

			{/* Right Gradient Section */}
			{!isMobileOrTablet && (
				<div className='w-full md:w-1/2 flex justify-center items-center'>
					<Card
						className='bg-gradient-to-l from-[#B200FF] to-[#7B00FF] w-full h-full rounded-md flex items-center justify-center'
						style={{
							boxShadow: `
              rgba(255, 255, 255, 0.7) -4px -4px 4px,
              rgba(189, 194, 199, 0.75) 5px 5px 4px
            `,
						}}
					>
						<DotLottieReact
							src='https://lottie.host/da5bd43c-0c42-4618-9ddf-f01f243d01ab/ZSX7ZLvOxy.lottie'
							loop
							autoplay
							className='w-full h-60 sm:h-80 md:h-96 lg:h-[500px]'
						/>
					</Card>
				</div>
			)}
		</div>
	);
};

export default OtpVerification;

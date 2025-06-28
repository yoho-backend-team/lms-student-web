import { Card } from '@/components/ui/card';
import Logo from '../../../assets/icons/navbar/icons8-ionic-50.png';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { BsInfoCircle } from 'react-icons/bs';

type LoginData = {
	email: string;
	password: string;
};

const EmailVerification = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({});
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();

	const onSubmit = async (data: LoginData) => {
		try {
			console.log(data, 'login data');
		} catch (error: any) {
			console.log('error', error);
		}
	};

	return (
		<div className='flex bg-[#ebeff3] w-full h-[100vh] p-4 gap-4'>
			<div className='w-1/2 h-full'>
				<Card
					className='bg-[#ebeff3] w-full h-full rounded-md flex items-center justify-center cursor-pointer'
					style={{
						boxShadow: `
					  rgba(255, 255, 255, 0.7) -4px -4px 4px,
					  rgba(189, 194, 199, 0.75) 5px 5px 4px
					`,
					}}
				>
					<div className='flex flex-col items-center'>
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
						<p className='text-center my-3 mb-10' style={{ ...FONTS.heading_02 }}>
							Email Verification
						</p>
						<form onSubmit={handleSubmit(onSubmit)} className='w-full my-4'>
							{/* Email */}
							<div className='w-full'>
								<label style={{ ...FONTS.heading_04 }}>Email Or Username</label>
								<input
									type='email'
									style={{ ...FONTS.heading_03 }}
									{...register('email', { required: 'Email is required' })}
									className='w-full mb-3 mt-2 rounded-md px-4 py-2 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] outline-none'
								/>
								{errors.email && (
									<span className='text-red-500 text-sm'>
										{errors.email.message}
									</span>
								)}
							</div>

							
							
							{/* Submit */}
							<button
								type='submit'
								className={`w-full my-6 mt-8 bg-gradient-to-r from-[#7B00FF] to-[#B200FF] py-2 rounded-md transition`}
								style={{ ...FONTS.heading_04, color: COLORS.white }}
							>
								Verify
							</button>
							
						</form>
					</div>
				</Card>
			</div>
			<div className='w-1/2 h-full'>
				<Card
					className='bg-gradient-to-l from-[#B200FF] to-[#7B00FF] w-full h-full rounded-md flex items-center justify-center cursor-pointer'
					style={{
						boxShadow: `
					  rgba(255, 255, 255, 0.7) -4px -4px 4px,
					  rgba(189, 194, 199, 0.75) 5px 5px 4px
					`,
					}}
				></Card>
			</div>
		</div>
	);
};

export default EmailVerification;

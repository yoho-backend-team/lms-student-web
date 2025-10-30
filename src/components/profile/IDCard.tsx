/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Download, QrCode } from 'lucide-react';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';
import { getStudentProfileThunk } from '@/features/Profile/reducers/thunks';
import { toast } from 'react-toastify';
import { GetImageUrl } from '@/utils/helper';

interface IDCardData {
	studentName: string;
	studentId: string;
	course: string;
	batch: string;
	rollNumber: string;
	validFrom: string;
	validUntil: string;
	institution: string;
	profileImage: any;
	bloodGroup?: string;
	emergencyContact?: string;
}

interface IDCardProps {
	data?: IDCardData;
}

const IDCard: React.FC<IDCardProps> = ({ data }) => {
	const [isFlipped, setIsFlipped] = useState(false);
	const [profileImgBase64, setProfileImgBase64] = useState<string | null>(null);

	const dispatch = useDispatch<any>();
	const profileDetails = useSelector(selectProfile);

	useEffect(() => {
		dispatch(getStudentProfileThunk({}));
	}, [dispatch]);

	// Sample data - replace with actual data from props or API
	const idCardData: IDCardData = data || {
		studentName: profileDetails.length != 0 ? profileDetails.full_name : 'NA',
		studentId:
			profileDetails.length != 0 ? profileDetails.userDetail.studentId : 'NA',
		course: 'Theoretical Physics',
		batch: 'Batch 2024-25',
		rollNumber: profileDetails.length != 0 ? profileDetails.roll_no : 'NA',
		validFrom: '2024-01-01',
		validUntil: '2024-12-31',
		institution: 'Classie',
		profileImage: GetImageUrl(profileDetails?.image),
		bloodGroup: 'O+',
		emergencyContact:
			profileDetails.length != 0
				? profileDetails.contact_info.phone_number
				: 'NA',
	};

	// Convert remote image to Base64 to handle CORS issues
	useEffect(() => {
		const fetchImageAsBase64 = async (url: string) => {
			try {
				const response = await fetch(url, { mode: 'cors' });
				if (!response.ok) throw new Error('Failed to fetch image');
				const blob = await response.blob();
				return await new Promise<string>((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result as string);
					reader.onerror = reject;
					reader.readAsDataURL(blob);
				});
			} catch (err) {
				console.error('Failed to fetch image for Base64:', err);
				return null;
			}
		};

		if (idCardData.profileImage) {
			fetchImageAsBase64(idCardData.profileImage).then((base64) => {
				if (base64) setProfileImgBase64(base64);
			});
		}
	}, [idCardData.profileImage]);

	const handleDownload = async (e: React.MouseEvent) => {
		e.stopPropagation();

		try {
			// Create canvas
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) throw new Error('Could not get canvas context');

			// Card dimensions
			const cardWidth = 560; // 280px * 2 for high DPI
			const cardHeight = 900; // 450px * 2 for high DPI
			const spacing = 40; // 20px * 2 for high DPI

			// Total canvas size
			canvas.width = cardWidth;
			canvas.height = cardHeight * 2 + spacing;

			// Fill background
			ctx.fillStyle = '#ffffff';
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Draw front side card
			await drawCardFront(
				ctx,
				0,
				0,
				cardWidth,
				cardHeight,
				idCardData,
				profileImgBase64
			);

			// Draw back side card
			await drawCardBack(
				ctx,
				0,
				cardHeight + spacing,
				cardWidth,
				cardHeight,
				idCardData
			);

			// Convert to blob and download
			canvas.toBlob((blob) => {
				if (blob) {
					const url = URL.createObjectURL(blob);
					const a = document.createElement('a');
					a.href = url;
					a.download = `${idCardData.studentName || 'IDCard'}_IDCard.png`;
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					URL.revokeObjectURL(url);
				}
			}, 'image/png');
		} catch (err) {
			console.error('Failed to download ID Card:', err);
			toast.error('Failed to download ID Card. Please try again.');
		}
	};

	const drawCardFront = async (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		data: IDCardData,
		profileImage: string | null
	) => {
		const halfHeight = height / 2;

		// Draw top half background (gradient)
		const gradient = ctx.createLinearGradient(x, y, x + width, y + halfHeight);
		gradient.addColorStop(0, COLORS.light_blue);
		gradient.addColorStop(1, COLORS.purple_01);

		ctx.fillStyle = gradient;
		ctx.fillRect(x, y, width, halfHeight);

		// Draw bottom half background (white)
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(x, y + halfHeight, width, halfHeight);

		// Draw border
		ctx.strokeStyle = '#e5e7eb';
		ctx.lineWidth = 4;
		ctx.strokeRect(x + 2, y + 2, width - 4, height - 4);

		// Draw institution name - moved up for more space
		ctx.fillStyle = '#ffffff';
		ctx.font = `bold ${28}px ${FONTS.heading_04.fontFamily}`;
		ctx.textAlign = 'center';
		ctx.fillText(data.institution, x + width / 2, y + 50); // Reduced from 60 to 50

		// Draw "STUDENT ID CARD" - moved up for more space
		ctx.font = `14px ${FONTS.para_01.fontFamily}`;
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fillText('STUDENT ID CARD', x + width / 2, y + 80); // Reduced from 90 to 80

		// Draw line - moved up for more space
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(x + width / 2 - 64, y + 90); // Reduced from 100 to 90
		ctx.lineTo(x + width / 2 + 64, y + 90); // Reduced from 100 to 90
		ctx.stroke();

		// Draw profile image placeholder with more space at top
		// const imgX = x + width / 2 - 80;
		const imgY = y + 150; // Increased from 130 to 150 for more top space
		ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
		ctx.lineWidth = 8;
		ctx.beginPath();
		ctx.arc(x + width / 2, imgY + 40, 80, 0, Math.PI * 2);
		ctx.fill();
		ctx.stroke();

		// If profile image exists, draw it
		if (profileImage) {
			const img = new Image();
			await new Promise((resolve) => {
				img.onload = resolve;
				img.src = profileImage;
			});
			ctx.save();
			ctx.beginPath();
			ctx.arc(x + width / 2, imgY + 40, 76, 0, Math.PI * 2);
			ctx.clip();
			ctx.drawImage(img, x + width / 2 - 76, imgY - 36, 152, 152);
			ctx.restore();
		}

		// Draw student name - moved down for more space below profile image
		ctx.fillStyle = '#ffffff';
		ctx.font = `bold ${28}px ${FONTS.heading_04.fontFamily}`;
		ctx.fillText(data.studentName, x + width / 2, y + 320); // Keep at 320

		// Draw course - moved down for more space
		ctx.font = `14px ${FONTS.para_01.fontFamily}`;
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fillText(data.course, x + width / 2, y + 350); // Keep at 350

		// Draw details in bottom half - adjusted for spacing
		const detailsY = y + halfHeight + 60;
		ctx.fillStyle = COLORS.text_desc;
		ctx.font = `14px ${FONTS.para_01.fontFamily}`;
		ctx.textAlign = 'left';

		// Student ID
		ctx.fillText('Student ID:', x + 40, detailsY);
		ctx.textAlign = 'right';
		ctx.font = `bold 14px ${FONTS.para_01.fontFamily}`;
		ctx.fillText(data.studentId, x + width - 40, detailsY);

		// Roll No
		ctx.textAlign = 'left';
		ctx.font = `14px ${FONTS.para_01.fontFamily}`;
		ctx.fillText('Roll No:', x + 40, detailsY + 40);
		ctx.textAlign = 'right';
		ctx.font = `bold 14px ${FONTS.para_01.fontFamily}`;
		ctx.fillText(data.rollNumber, x + width - 40, detailsY + 40);

		// Batch
		ctx.textAlign = 'left';
		ctx.font = `14px ${FONTS.para_01.fontFamily}`;
		ctx.fillText('Batch:', x + 40, detailsY + 80);
		ctx.textAlign = 'right';
		ctx.font = `bold 14px ${FONTS.para_01.fontFamily}`;
		ctx.fillText(data.batch, x + width - 40, detailsY + 80);

		// Blood Group
		ctx.textAlign = 'left';
		ctx.font = `14px ${FONTS.para_01.fontFamily}`;
		ctx.fillText('Blood Group:', x + 40, detailsY + 120);
		ctx.textAlign = 'right';
		ctx.font = `bold 14px ${FONTS.para_01.fontFamily}`;
		ctx.fillText(data.bloodGroup || 'N/A', x + width - 40, detailsY + 120);

		// Duration
		ctx.textAlign = 'left';
		ctx.font = `12px ${FONTS.para_01.fontFamily}`;
		ctx.fillStyle = 'rgba(107, 114, 128, 0.7)';
		ctx.fillText('Duration:', x + 40, detailsY + 180);
		ctx.font = `bold 12px ${FONTS.para_01.fontFamily}`;
		ctx.fillStyle = COLORS.text_desc;
		ctx.fillText('6 Months', x + 40, detailsY + 200);
	};

	const drawCardBack = async (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		data: IDCardData
	) => {
		// Draw background gradient
		const gradient = ctx.createLinearGradient(x, y, x + width, y + height);
		gradient.addColorStop(0, COLORS.purple_01);
		gradient.addColorStop(1, COLORS.light_blue);

		ctx.fillStyle = gradient;
		ctx.fillRect(x, y, width, height);

		// Draw border
		ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
		ctx.lineWidth = 4;
		ctx.strokeRect(x + 2, y + 2, width - 4, height - 4);

		// Draw header
		ctx.fillStyle = '#ffffff';
		ctx.font = `bold ${28}px ${FONTS.heading_04.fontFamily}`;
		ctx.textAlign = 'center';
		ctx.fillText('QR Code', x + width / 2, y + 80);

		ctx.font = `14px ${FONTS.para_01.fontFamily}`;
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fillText('Scan for verification', x + width / 2, y + 110);

		// Draw QR code placeholder (white box)
		const qrSize = 384; // 192px * 2
		const qrX = x + (width - qrSize) / 2;
		const qrY = y + 160;

		ctx.fillStyle = '#ffffff';
		ctx.fillRect(qrX, qrY, qrSize, qrSize);

		// Draw QR code pattern (more accurate representation)
		ctx.fillStyle = COLORS.text_desc;

		// Position patterns (like real QR code)
		// Top-left position pattern
		ctx.fillRect(qrX + 40, qrY + 40, 120, 120);
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(qrX + 60, qrY + 60, 80, 80);
		ctx.fillStyle = COLORS.text_desc;
		ctx.fillRect(qrX + 80, qrY + 80, 40, 40);

		// Top-right position pattern
		ctx.fillStyle = COLORS.text_desc;
		ctx.fillRect(qrX + qrSize - 160, qrY + 40, 120, 120);
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(qrX + qrSize - 140, qrY + 60, 80, 80);
		ctx.fillStyle = COLORS.text_desc;
		ctx.fillRect(qrX + qrSize - 120, qrY + 80, 40, 40);

		// Bottom-left position pattern
		ctx.fillStyle = COLORS.text_desc;
		ctx.fillRect(qrX + 40, qrY + qrSize - 160, 120, 120);
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(qrX + 60, qrY + qrSize - 140, 80, 80);
		ctx.fillStyle = COLORS.text_desc;
		ctx.fillRect(qrX + 80, qrY + qrSize - 120, 40, 40);

		// Alignment pattern (center)
		ctx.fillStyle = COLORS.text_desc;
		ctx.fillRect(qrX + qrSize / 2 - 60, qrY + qrSize / 2 - 60, 120, 120);
		ctx.fillStyle = '#ffffff';
		ctx.fillRect(qrX + qrSize / 2 - 40, qrY + qrSize / 2 - 40, 80, 80);
		ctx.fillStyle = COLORS.text_desc;
		ctx.fillRect(qrX + qrSize / 2 - 20, qrY + qrSize / 2 - 20, 40, 40);

		// Timing patterns
		ctx.fillStyle = COLORS.text_desc;
		for (let i = 0; i < 8; i++) {
			if (i % 2 === 0) {
				ctx.fillRect(qrX + 160 + i * 20, qrY + 160, 20, 20);
				ctx.fillRect(qrX + 160, qrY + 160 + i * 20, 20, 20);
			}
		}

		// Draw student ID
		ctx.font = `14px ${FONTS.para_01.fontFamily}`;
		ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
		ctx.fillText(`Student ID: ${data.studentId}`, x + width / 2, y + 600);

		// Draw instruction
		ctx.font = `12px ${FONTS.para_01.fontFamily}`;
		ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
		ctx.fillText(
			'Scan this QR code for quick verification',
			x + width / 2,
			y + 630
		);
	};

	const handleCardClick = () => setIsFlipped(!isFlipped);

	return (
		<div className='w-full'>
			<div
				className='rounded-lg shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex flex-col'
				style={{
					width: '100%',
					marginTop: '1rem',
					height: '75vh',
					fontFamily: FONTS.para_01.fontFamily,
				}}
			>
				{/* Header */}
				<div className='p-4 sm:p-6 border-b border-gray-200 flex-shrink-0'>
					<div className='flex justify-between items-center'>
						<h2
							className='font-bold text-2xl leading-none'
							style={{
								color: COLORS.text_title,
								fontFamily: FONTS.heading_01.fontFamily,
								fontWeight: FONTS.heading_01.fontWeight,
							}}
						>
							Student ID Card
						</h2>
					</div>
				</div>

				<div className='p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-hide'>
					{/* ID Card Preview */}
					<div className='mb-8 flex justify-center'>
						<div
							className='relative w-full max-w-80 h-[500px]'
							style={{ perspective: '1000px' }}
						>
							<div
								className='relative w-full h-full transition-transform duration-700 cursor-pointer'
								onClick={handleCardClick}
								style={{
									transformStyle: 'preserve-3d',
									transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
								}}
							>
								{/* Card Front */}
								<div
									className='absolute inset-0 w-full h-full rounded-2xl overflow-hidden'
									style={{ backfaceVisibility: 'hidden' }}
								>
									{/* Half Color Design */}
									<div className='h-full relative'>
										{/* Top Half - Colored */}
										<div
											className='h-1/2 p-6 relative flex flex-col'
											style={{
												background: `linear-gradient(135deg, ${COLORS.light_blue}, ${COLORS.purple_01})`,
												color: COLORS.white,
											}}
										>
											{/* Header */}
											<div className='text-center mb-4'>
												<h3
													className='text-lg font-bold mb-1'
													style={{ fontFamily: FONTS.heading_04.fontFamily }}
												>
													{idCardData.institution}
												</h3>
												<p
													className='text-sm opacity-90'
													style={{ fontFamily: FONTS.para_01.fontFamily }}
												>
													STUDENT ID CARD
												</p>
												<div className='w-16 h-0.5 bg-white/50 mx-auto mt-2'></div>
											</div>

											{/* Profile Image */}
											<div className='flex justify-center mb-4'>
												<div className='w-20 h-20 rounded-full border-4 border-white/30 overflow-hidden bg-white/10'>
													{profileImgBase64 ? (
														<img
															src={profileImgBase64}
															alt={idCardData.studentName}
															className='w-full h-full object-cover'
														/>
													) : (
														<div className='w-full h-full bg-gray-200 animate-pulse' />
													)}
												</div>
											</div>

											{/* Student Info */}
											<div className='text-center'>
												<h4
													className='text-lg font-bold mb-1'
													style={{ fontFamily: FONTS.heading_04.fontFamily }}
												>
													{idCardData.studentName}
												</h4>
												<p
													className='text-sm opacity-90'
													style={{ fontFamily: FONTS.para_01.fontFamily }}
												>
													{idCardData.course}
												</p>
											</div>

											{/* Decorative elements */}
											<div className='absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8'></div>
											<div className='absolute bottom-0 left-0 w-12 h-12 bg-white/10 rounded-full translate-y-6 -translate-x-6'></div>
										</div>

										{/* Bottom Half - White */}
										<div
											className='h-1/2 p-6 bg-white relative flex flex-col'
											style={{ color: COLORS.text_desc }}
										>
											{/* Details */}
											<div
												className='space-y-2 text-sm flex-1'
												style={{ fontFamily: FONTS.para_01.fontFamily }}
											>
												<div className='flex justify-between'>
													<span className='opacity-70'>Student ID:</span>
													<span className='font-semibold'>
														{idCardData.studentId}
													</span>
												</div>
												<div className='flex justify-between'>
													<span className='opacity-70'>Roll No:</span>
													<span className='font-semibold'>
														{idCardData.rollNumber}
													</span>
												</div>
												<div className='flex justify-between'>
													<span className='opacity-70'>Batch:</span>
													<span className='font-semibold'>
														{idCardData.batch}
													</span>
												</div>
												<div className='flex justify-between'>
													<span className='opacity-70'>Blood Group:</span>
													<span className='font-semibold'>
														{idCardData.bloodGroup || 'N/A'}
													</span>
												</div>
											</div>

											{/* Bottom Section */}
											<div className='flex items-end justify-between mt-4'>
												{/* Left side - Course details */}
												<div
													className='text-xs'
													style={{ fontFamily: FONTS.para_01.fontFamily }}
												>
													<div className='mb-1'>
														<span className='opacity-70'>Duration:</span>
														<div className='font-semibold'>6 Months</div>
													</div>
												</div>

												{/* Right side - Download button */}
												<button
													onClick={handleDownload}
													className='w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-all duration-200 shadow-md'
													style={{ backgroundColor: COLORS.bg_Colour }}
													title='Download ID Card'
												>
													<Download
														className='w-5 h-5'
														style={{ color: COLORS.light_blue }}
													/>
												</button>
											</div>

											{/* Click to flip hint */}
											<div
												className='absolute top-2 right-2 text-xs opacity-50'
												style={{ fontFamily: FONTS.para_01.fontFamily }}
											>
												Click to flip
											</div>
										</div>
									</div>
								</div>

								{/* Card Back */}
								<div
									className='absolute inset-0 w-full h-full rounded-2xl overflow-hidden'
									style={{
										backfaceVisibility: 'hidden',
										transform: 'rotateY(180deg)',
									}}
								>
									<div
										className='h-full relative'
										style={{
											background: `linear-gradient(135deg, ${COLORS.purple_01}, ${COLORS.light_blue})`,
											color: COLORS.white,
										}}
									>
										{/* Header */}
										<div className='text-center p-6 border-b border-white/20'>
											<h3
												className='text-lg font-bold mb-1'
												style={{ fontFamily: FONTS.heading_04.fontFamily }}
											>
												QR Code
											</h3>
											<p
												className='text-sm opacity-90'
												style={{ fontFamily: FONTS.para_01.fontFamily }}
											>
												Scan for verification
											</p>
										</div>

										{/* QR Code Section */}
										<div className='flex-1 flex flex-col items-center justify-center p-8'>
											<div className='w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg'>
												<QrCode
													className='w-32 h-32'
													style={{ color: COLORS.text_desc }}
												/>
											</div>

											<div className='text-center'>
												<p
													className='text-sm opacity-90 mb-2'
													style={{ fontFamily: FONTS.para_01.fontFamily }}
												>
													Student ID: {idCardData.studentId}
												</p>
												<p
													className='text-xs opacity-70'
													style={{ fontFamily: FONTS.para_01.fontFamily }}
												>
													Scan this QR code for quick verification
												</p>
											</div>
										</div>

										{/* Decorative elements */}
										<div className='absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 -translate-x-10'></div>
										<div className='absolute bottom-0 right-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 translate-x-8'></div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* ID Card Details */}
					<div className='mb-8'>
						<h3
							className='font-bold mb-6 text-xl leading-none'
							style={{
								color: COLORS.text_title,
								fontFamily: FONTS.heading_02.fontFamily,
								fontWeight: FONTS.heading_02.fontWeight,
							}}
						>
							ID Card Details
						</h3>
						<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6'>
							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Student Name
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.studentName}
								</div>
							</div>

							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Student ID
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.studentId}
								</div>
							</div>

							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Course
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.course}
								</div>
							</div>

							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Batch
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.batch}
								</div>
							</div>

							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Roll Number
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.rollNumber}
								</div>
							</div>

							<div>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Blood Group
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.bloodGroup || 'Not provided'}
								</div>
							</div>

							<div className='md:col-span-2'>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Institution
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.institution}
								</div>
							</div>

							<div className='md:col-span-2'>
								<label
									className='block font-medium mb-2 text-sm leading-relaxed'
									style={{
										color: COLORS.text_desc,
										fontFamily: FONTS.para_01.fontFamily,
									}}
								>
									Emergency Contact
								</label>
								<div
									className='rounded-lg px-4 py-3 text-sm leading-relaxed shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] min-h-[44px] flex items-center'
									style={{
										backgroundColor: COLORS.bg_Colour,
										fontFamily: FONTS.para_01.fontFamily,
										color: COLORS.text_desc,
									}}
								>
									{idCardData.emergencyContact || 'Not provided'}
								</div>
							</div>
						</div>
					</div>

					{/* Card Status */}
					<div className='mb-6'>
						<h3
							className='font-bold mb-4 text-xl leading-none'
							style={{
								color: COLORS.text_title,
								fontFamily: FONTS.heading_02.fontFamily,
								fontWeight: FONTS.heading_02.fontWeight,
							}}
						>
							Card Status
						</h3>
						<div className='bg-green-50 border border-green-200 rounded-lg p-4'>
							<div className='flex items-center gap-3'>
								<div className='w-8 h-8 bg-green-500 rounded-full flex items-center justify-center'>
									<svg
										className='w-5 h-5 text-white'
										fill='none'
										stroke='currentColor'
										viewBox='0 0 24 24'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M5 13l4 4L19 7'
										/>
									</svg>
								</div>
								<div>
									<p
										className='font-semibold text-green-800'
										style={{ fontFamily: FONTS.heading_06.fontFamily }}
									>
										Active ID Card
									</p>
									<p
										className='text-sm text-green-600'
										style={{ fontFamily: FONTS.para_01.fontFamily }}
									>
										Your student ID card is active and valid.
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Digital Features */}
					<div className='mb-6'>
						<h3
							className='font-bold mb-4 text-xl leading-none'
							style={{
								color: COLORS.text_title,
								fontFamily: FONTS.heading_02.fontFamily,
								fontWeight: FONTS.heading_02.fontWeight,
							}}
						>
							Digital Features
						</h3>
						<div className='grid grid-cols-1 gap-4'>
							<div
								className='rounded-lg p-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
								style={{ backgroundColor: COLORS.bg_Colour }}
							>
								<div className='flex items-center gap-3'>
									<QrCode
										className='w-8 h-8'
										style={{ color: COLORS.light_blue }}
									/>
									<div>
										<p
											className='font-semibold'
											style={{
												color: COLORS.text_title,
												fontFamily: FONTS.heading_06.fontFamily,
											}}
										>
											QR Code Access
										</p>
										<p
											className='text-sm'
											style={{
												color: COLORS.text_desc,
												fontFamily: FONTS.para_01.fontFamily,
											}}
										>
											Quick verification and access
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IDCard;

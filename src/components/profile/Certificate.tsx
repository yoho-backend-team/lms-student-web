/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import { Download, X, Eye } from 'lucide-react';
import { COLORS, FONTS } from '@/constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectcertificate } from '@/features/certificate/reducers/selectors';
import { getAllcertificatesstudent } from '@/features/certificate/reducers/thunks';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import patternImg from '../../assets/certificate/pattern.png';
import arrowLeftImg from '../../assets/certificate/arrow left.png';
import arrowRightImg from '../../assets/certificate/arrow right.png';
import bgImg from '../../assets/certificate/cerificate-bg.png';
import courseBgImg from '../../assets/certificate/course button.png';
import certifiedImg from '../../assets/certificate/certified.png';

interface CertificateData {
	studentName: string;
	course: string;
	completionDate: string;
	certificateId: string;
	issueDate: string;
	grade: string;
	duration: string;
	institution: string;
	courseImage?: string;
}

interface CertificateProps {
	data?: CertificateData[];
}

// Create a separate component for the certificate design
const CertificateDesign: React.FC<{
	certificate: any;
	ref?: React.Ref<HTMLDivElement>;
}> = React.forwardRef(({ certificate }, ref) => {
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
	};

	const getEndDate = (startDate: string) => {
		const date = new Date(startDate);
		date.setMonth(date.getMonth() + 6);
		return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
	};

	return (
		<div
			ref={ref}
			style={{
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: '#f3f4f6',
				padding: '1rem',
			}}
		>
			<div style={{ marginBottom: '1rem' }}></div>
			<div
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div style={{ width: '100%', maxWidth: '64rem' }}>
					{/* <div
						style={{
							backgroundColor: '#1BBFCA',
							padding: '0.75rem 1.5rem',
							borderRadius: '0.75rem',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginBottom: '1.5rem',
						}}
					>
						<h2
							style={{ color: 'white', fontSize: '1.125rem', fontWeight: 600 }}
						>
							{certificate?.studentName || 'Student'}'s Certificate
						</h2>
						<button
							onClick={() => navigate(-1)}
							style={{
								backgroundColor: 'white',
								marginLeft: 'auto',
								padding: '0.5rem 1rem',
								borderRadius: '0.5rem',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<HiMiniXMark
								style={{
									height: '1.5rem',
									width: '1.5rem',
									backgroundColor: '#6b7280',
									borderRadius: '50%',
									color: 'white',
								}}
							/>
						</button>
					</div> */}

					<div
						style={{
							position: 'relative',
							overflow: 'hidden',
							backgroundColor: 'white',
						}}
					>
						<div className='certificate-content'>
							<img
								src={bgImg}
								style={{
									position: 'absolute',
									zIndex: -100,
									left: '9rem',
									opacity: 0.5,
									top: '10.5rem',
									objectFit: 'cover',
								}}
							/>
							<img
								src={patternImg}
								alt='pattern top'
								style={{
									position: 'absolute',
									transform: 'rotate(-41deg)',
									top: '-17.5rem',
									left: '-2.5rem',
								}}
							/>
							<img
								src={patternImg}
								alt='pattern bottom'
								style={{
									position: 'absolute',
									transform: 'rotate(139deg)',
									bottom: '-17.5rem',
									right: '-2.5rem',
								}}
							/>
							<img
								src={patternImg}
								alt='pattern left'
								style={{
									position: 'absolute',
									transform: 'rotate(49deg)',
									top: '0',
									left: '-18.75rem',
									opacity: 0.1,
								}}
							/>
							<img
								src={patternImg}
								alt='pattern right'
								style={{
									position: 'absolute',
									transform: 'rotate(-131deg)',
									bottom: '0',
									right: '-18.75rem',
									opacity: 0.1,
								}}
							/>
							<img
								src={patternImg}
								alt='top right 1'
								style={{
									position: 'absolute',
									top: '-3rem',
									right: '-15.5rem',
									transform: 'rotate(180deg)',
									width: '300px',
									height: 'auto',
								}}
							/>
							<img
								src={patternImg}
								alt='top right 2'
								style={{
									position: 'absolute',
									top: '-3rem',
									right: '-11rem',
									transform: 'rotate(180deg)',
									width: '300px',
									height: 'auto',
								}}
							/>
							<img
								src={patternImg}
								alt='top right 3'
								style={{
									position: 'absolute',
									top: '-4.25rem',
									right: '-5rem',
									transform: 'rotate(180deg)',
									width: '300px',
									height: 'auto',
								}}
							/>
							<img
								src={patternImg}
								alt='bottom left 1'
								style={{
									position: 'absolute',
									bottom: '-10rem',
									left: '-12.5rem',
									transform: 'rotate(0deg)',
								}}
							/>
							<img
								src={patternImg}
								alt='bottom left 2'
								style={{
									position: 'absolute',
									bottom: '-7.5rem',
									left: '-22.5rem',
									transform: 'rotate(0deg)',
								}}
							/>
							<img
								src={patternImg}
								alt='bottom left 3'
								style={{
									position: 'absolute',
									bottom: '-6.25rem',
									left: '-30rem',
									transform: 'rotate(0deg)',
								}}
							/>
							<h1 className='certificate-title'>Certificate</h1>

							<div className='completion-subtitle'>
								<img src={arrowRightImg} style={{ width: '2.75rem' }} />
								<span className='completion-text'>OF COMPLETION</span>
								<img src={arrowLeftImg} style={{ width: '2.75rem' }} />
							</div>

							<p className='certify-text'>This is to Certify that</p>

							<div className='recipient-name'>
								{certificate.studentName || 'Student Name'}
							</div>

							<div className='completion-details'>
								<p className='completion-text-main'>
									has Successfully Completed that
								</p>
								<span className='completion-text-main'>Course</span>
								<span style={{ position: 'relative' }}>
									<img
										src={courseBgImg}
										alt='course'
										className='course-badge'
									/>
									<span className='course-title'>{certificate?.course}</span>
								</span>

								<p className='duration-text'>
									during the period of{' '}
									<span className='duration-text1'>
										{formatDate(certificate.issueDate)} -{' '}
										{getEndDate(certificate.issueDate)}
									</span>
								</p>
							</div>

							<div className='signature-section'>
								<div className='signature-left'>
									<div className='signature-name'>Abdul Kalam</div>
									<div className='signature-line'></div>
									<div className='signature-title'>Authorised Signatory</div>
								</div>

								<div className='verification-badge'>
									<img
										src={certifiedImg}
										alt='certified'
										style={{ width: '5.5rem', height: '5.5rem' }}
									/>
								</div>

								<div className='signature-right'>
									<div className='signature-name'>Albert Einstein</div>
									<div className='signature-line'></div>
									<div className='instructor-title'>Course Instructor</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<style>
				{`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Italianno&display=swap');
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Pirata+One&display=swap');
          
          /* Main content area */
          .certificate-content { 
            position: relative;
            z-index: 10;
            background: rgba(255, 255, 255, 1);
            margin: 20px;
            padding: 80px 120px;
            border-radius: 8px;
            text-align: center;
            height: calc(100% - 80px);
            box-sizing: border-box;
          }
          
          .certificate-title {
            font-size: 104px;
            font-weight: 400;
            color: #716F6F;
            letter-spacing: 4px;
            font-family: "Pirata One", system-ui;
          }
          
          .completion-subtitle {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 20px;
            margin-bottom: 20px;
          }
          
          .completion-text {
            font-size: 32px;
            color: #716F6F;
            font-weight: 400;
            letter-spacing: 4px;
            text-transform: uppercase;
            font-family: "Montserrat", sans-serif;
          }
          
          .certify-text {
            font-size: 22px;
            color: #716F6F;
            font-family: "Montserrat", sans-serif;
          }
          
          .recipient-name {
            font-family: 'Italianno', cursive;
            font-size: 106px;
            font-weight: 400;
            color:#2A2A2A;
            position: relative;
            margin-top: 10px;
            margin-bottom: 35px;
            padding-bottom: 10px;
          }
          
          .recipient-name::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 600px;
            height: 1px;
            background: #716F6F;
          }
          
          .completion-details {
            margin: -5px 0px 0px 0px;
          }
          
          .completion-text-main {
            font-size: 18px;
            color: #716F6F;
            font-family: "Montserrat", sans-serif;
          }
          
          .course-badge {
            width: 195px;
            height: 85px;
            display: inline-block;
            margin: 0;
          }
          
          .course-title {
            font-size: 12px;
            color: #fff;
            font-weight: 600;
            font-family: "Montserrat", sans-serif;
            position: absolute;
            left: 32px;
            top: -1px
          }
          
          .duration-text {
            font-size: 20px;
            color: #716F6F;
            font-weight: 400;
            font-family: "Montserrat", sans-serif;
          }

          .duration-text1 {
            font-size: 20px;
            color: #2A2A2A;
            font-weight: 700;
            font-family: "Montserrat", sans-serif;
          }
          
          .signature-section {
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            margin-top: 30px;
          }
          
          .signature-left {
            text-align: center;
            flex: 1;
          }
          
          .signature-name {
            font-size: 25px;
            color: #FF3131;
            font-weight: 500;
            margin-bottom: 5px;
            font-family: "Montserrat", sans-serif;
            font-style: Italic
          }
          
          .signature-title {
            font-size: 18px;
            color: #2A2A2A;
            font-weight: 700;
            font-family: "Montserrat", sans-serif;
          }
          
          .signature-line {
            width: 150px;
            height: 1px;
            background: #d1d5db;
            margin: 10px auto;
          }
          
          .verification-badge {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .signature-right {
            text-align: center;
            flex: 1;
          }
          
          .instructor-title {
              font-size: 18px;
            color: #2A2A2A;
            font-weight: 700;
            font-family: "Montserrat", sans-serif;
          }
        `}
			</style>
		</div>
	);
});

CertificateDesign.displayName = 'CertificateDesign';

const Certificate: React.FC<CertificateProps> = ({ data }) => {
	const [certificatesData, setCertificatesData] = useState<CertificateData[]>(
		[]
	);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedCertificate, setSelectedCertificate] =
		useState<CertificateData | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDownloading, setIsDownloading] = useState(false);
	const dispatch = useDispatch<any>();
	const certificate = useSelector(selectcertificate);
	const certificateRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		dispatch(
			getAllcertificatesstudent({ studentId: '67f3b8feb8d2634300cc8819' })
		);
	}, [dispatch]);

	useEffect(() => {
		if (certificate) {
			if (Array.isArray(certificate) && certificate.length > 0) {
				const mappedCertificates = certificate.map((item: any) => ({
					studentName: item?.student?.[0]?.full_name || 'Student Name',
					course: item?.certificate_name || 'Course Name',
					completionDate:
						item?.updatedAt || item?.createdAt || new Date().toISOString(),
					certificateId: item?._id || 'CERT-UNKNOWN',
					issueDate: item?.createdAt || new Date().toISOString(),
					grade: 'A+',
					duration: '3 Months',
					institution: 'Advanced Learning Institute',
					courseImage:
						'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
				}));
				setCertificatesData(mappedCertificates);
			} else {
				setCertificatesData([
					{
						studentName: 'Albert Einstein',
						course: 'HTML, CSS',
						completionDate: '2024-12-15',
						certificateId: 'CERT-2024-WEB-001',
						issueDate: '2024-12-20',
						grade: 'A+',
						duration: '3 Months',
						institution: 'Advanced Learning Institute',
						courseImage:
							'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
					},
				]);
			}
		} else if (data) {
			setCertificatesData(data);
		}
		setIsLoading(false);
	}, [certificate, data]);

	const handleViewCertificate = (certificate: CertificateData) => {
		setSelectedCertificate(certificate);
		setIsModalOpen(true);
	};

	const handleDownload = async (certificateData: CertificateData) => {
		if (isDownloading) return;

		setIsDownloading(true);
		try {
			if (!certificateRef.current) {
				console.error('Certificate ref not found');
				return;
			}

			// Wait for fonts and images to load
			await document.fonts.ready;
			await new Promise((resolve) => setTimeout(resolve, 1000));

			// Create canvas with higher quality
			const canvas = await html2canvas(certificateRef.current, {
				scale: 3, // Higher scale for better quality
				useCORS: true,
				allowTaint: false,
				backgroundColor: '#f3f4f6',
				logging: false,
				imageTimeout: 0,
				onclone: (clonedDoc) => {
					// Convert all oklch/modern colors to standard formats
					const allElements = clonedDoc.querySelectorAll('*');
					allElements.forEach((el: any) => {
						const styles = window.getComputedStyle(el);

						// Fix background colors
						if (
							styles.backgroundColor &&
							styles.backgroundColor.includes('oklch')
						) {
							el.style.backgroundColor = '#f3f4f6';
						}

						// Fix text colors
						if (styles.color && styles.color.includes('oklch')) {
							el.style.color = '#000000';
						}

						// Fix border colors
						if (styles.borderColor && styles.borderColor.includes('oklch')) {
							el.style.borderColor = '#d1d5db';
						}

						// Convert computed colors to standard format
						if (
							styles.backgroundColor &&
							styles.backgroundColor.startsWith('rgb')
						) {
							el.style.backgroundColor = styles.backgroundColor;
						}
						if (styles.color && styles.color.startsWith('rgb')) {
							el.style.color = styles.color;
						}
					});

					// Ensure the cloned document has all styles applied
					const clonedElement = clonedDoc.querySelector('[ref]') as HTMLElement;
					if (clonedElement) {
						clonedElement.style.transform = 'scale(1)';
					}
				},
			});

			// Create PDF in landscape mode with proper dimensions
			const imgWidth = 297; // A4 landscape width in mm
			const imgHeight = (canvas.height * imgWidth) / canvas.width;

			const pdf = new jsPDF({
				orientation: imgHeight > imgWidth ? 'portrait' : 'landscape',
				unit: 'mm',
				format: 'a4',
			});

			// Add the image to PDF
			const imgData = canvas.toDataURL('image/jpeg', 1.0);

			// Center the image if needed
			const pdfWidth = pdf.internal.pageSize.getWidth();
			const pdfHeight = pdf.internal.pageSize.getHeight();
			const xOffset = imgWidth < pdfWidth ? (pdfWidth - imgWidth) / 2 : 0;
			const yOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 0;

			pdf.addImage(
				imgData,
				'JPEG',
				xOffset,
				yOffset,
				Math.min(imgWidth, pdfWidth),
				Math.min(imgHeight, pdfHeight)
			);

			// Save with meaningful filename
			const filename = `Certificate_${certificateData.studentName.replace(
				/\s+/g,
				'_'
			)}_${certificateData.course.replace(/\s+/g, '_')}.pdf`;
			pdf.save(filename);
		} catch (error) {
			console.error('Error generating PDF:', error);
			alert('Failed to download certificate. Please try again.');
		} finally {
			setIsDownloading(false);
		}
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedCertificate(null);
	};

	if (isLoading) {
		return (
			<div
				className='w-full flex justify-center items-center'
				style={{ height: '75vh' }}
			>
				<div
					className='animate-spin rounded-full h-12 w-12 border-b-2'
					style={{ borderColor: COLORS.light_blue }}
				></div>
			</div>
		);
	}

	return (
		<div className='w-full'>
			{/* Certificate Modal */}
			{isModalOpen && selectedCertificate && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
					<div className='bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[95vh] overflow-hidden flex flex-col'>
						{/* Modal Header */}
						<div className='flex justify-between items-center p-4 border-b'>
							<h3 className='text-lg font-semibold'>Certificate Preview</h3>
							<button
								onClick={closeModal}
								className='text-gray-500 hover:text-gray-700'
							>
								<X size={24} />
							</button>
						</div>

						{/* Modal Content */}
						<div className='overflow-y-auto p-6 flex-1'>
							<CertificateDesign
								certificate={selectedCertificate}
								ref={certificateRef}
							/>
						</div>

						{/* Modal Footer */}
						<div className='flex justify-end p-4 border-t gap-3'>
							<button
								onClick={() => handleDownload(selectedCertificate)}
								disabled={isDownloading}
								className='flex items-center px-4 py-2 rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed'
								style={{ backgroundColor: COLORS.light_blue }}
							>
								{isDownloading ? (
									<>
										<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2'></div>
										Generating PDF...
									</>
								) : (
									<>
										<Download size={18} className='mr-2' />
										Download as PDF
									</>
								)}
							</button>
							<button
								onClick={closeModal}
								className='px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100'
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}

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
							Certificates
						</h2>
					</div>
				</div>

				<div className='p-4 sm:p-6 overflow-y-auto flex-1 scrollbar-hide'>
					{/* Course-wise Certificate Cards */}
					<div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6'>
						{certificatesData.map((certificate, index) => (
							<div
								key={index}
								className='rounded-lg p-6 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] overflow-hidden'
								style={{
									backgroundColor: COLORS.bg_Colour,
									fontFamily: FONTS.para_01.fontFamily,
								}}
							>
								{/* Course Image */}
								<div
									className='h-48 relative overflow-hidden'
									style={{
										background: `linear-gradient(to bottom right, ${COLORS.light_blue}, ${COLORS.purple_01})`,
									}}
								>
									{certificate.courseImage ? (
										<img
											src={certificate.courseImage}
											alt={certificate.course}
											className='w-full h-full object-cover opacity-80'
										/>
									) : (
										<div className='w-full h-full flex items-center justify-center'>
											<div className='text-white text-center'>
												<div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3'>
													<svg
														className='w-8 h-8'
														fill='none'
														stroke='currentColor'
														viewBox='0 0 24 24'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
														/>
													</svg>
												</div>
												<p
													className='font-semibold'
													style={{ fontFamily: FONTS.heading_05.fontFamily }}
												>
													Certificate
												</p>
											</div>
										</div>
									)}

									{/* Decorative elements */}
									<div className='absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10'></div>
									<div className='absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8'></div>

									{/* Grade Badge */}
									<div className='absolute top-4 right-4'>
										<div className='bg-white/20 backdrop-blur-sm rounded-full px-3 py-1'>
											<span
												className='font-bold text-sm'
												style={{
													color: COLORS.white,
													fontFamily: FONTS.heading_06.fontFamily,
												}}
											>
												{certificate.grade}
											</span>
										</div>
									</div>
								</div>

								{/* Card Content */}
								<div className='p-6'>
									{/* Course Title */}
									<div className='mb-4'>
										<h3
											className='font-bold text-lg mb-2'
											style={{
												color: COLORS.text_title,
												fontFamily: FONTS.heading_04.fontFamily,
												fontWeight: FONTS.heading_04.fontWeight,
											}}
										>
											{certificate.course}
										</h3>
										<div
											className='flex items-center justify-between text-sm'
											style={{
												color: COLORS.text_desc,
												fontFamily: FONTS.para_01.fontFamily,
											}}
										>
											<span
												className='px-3 py-1 rounded-lg font-medium text-xs shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
												style={{
													backgroundColor: COLORS.bg_Colour,
													color: COLORS.text_desc,
												}}
											>
												Completed
											</span>
											<span style={{ color: COLORS.text_desc }}>
												{new Date(
													certificate.completionDate
												).toLocaleDateString()}
											</span>
										</div>
									</div>

									{/* Bottom Section */}
									<div className='flex items-end justify-between'>
										{/* Left side - Course details */}
										<div
											className='text-sm'
											style={{ fontFamily: FONTS.para_01.fontFamily }}
										>
											<div className='mb-2'>
												<span
													className='text-xs'
													style={{ color: COLORS.text_desc }}
												>
													Course Name:
												</span>
												<div
													className='font-semibold'
													style={{ color: COLORS.text_desc }}
												>
													{certificate.course}
												</div>
											</div>
											<div>
												<span
													className='text-xs'
													style={{ color: COLORS.text_desc }}
												>
													Duration:
												</span>
												<div
													className='font-semibold'
													style={{ color: COLORS.text_desc }}
												>
													{certificate.duration}
												</div>
											</div>
										</div>

										{/* Right side - View and Download buttons */}
										<div className='flex gap-2 '>
											<button
												onClick={(e) => {
													e.stopPropagation();
													handleViewCertificate(certificate);
												}}
												className='flex items-center justify-center w-12 h-12 rounded-lg shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
												style={{
													backgroundColor: COLORS.purple_01,
													color: COLORS.white,
													fontFamily: FONTS.para_01.fontFamily,
												}}
												title='View Certificate'
											>
												<Eye className='w-5 h-5' />
											</button>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>

					{/* Empty State */}
					{certificatesData.length === 0 && (
						<div className='text-center py-12'>
							<div className='w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
								<svg
									className='w-12 h-12 text-gray-400'
									fill='none'
									stroke='currentColor'
									viewBox='0 0 24 24'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
									/>
								</svg>
							</div>
							<h3
								className='font-semibold text-lg mb-2'
								style={{
									color: COLORS.text_title,
									fontFamily: FONTS.heading_04.fontFamily,
								}}
							>
								No Certificates Available
							</h3>
							<p
								style={{
									color: COLORS.text_desc,
									fontFamily: FONTS.para_01.fontFamily,
								}}
							>
								Complete courses to earn certificates
							</p>
						</div>
					)}

					{/* Summary Stats */}
					{certificatesData.length > 0 && (
						<div className='mt-8 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6'>
							<div
								className='rounded-lg p-6 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
								style={{
									backgroundColor: COLORS.bg_Colour,
									fontFamily: FONTS.para_01.fontFamily,
								}}
							>
								<div className='text-center'>
									<div
										className='w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
										style={{ backgroundColor: COLORS.light_blue }}
									>
										<svg
											className='w-8 h-8'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
											style={{ color: COLORS.white }}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
											/>
										</svg>
									</div>
									<p
										className='font-bold text-3xl mb-2'
										style={{
											color: COLORS.text_title,
											fontFamily: FONTS.heading_01.fontFamily,
										}}
									>
										{certificatesData.length}
									</p>
									<p
										className='font-medium'
										style={{
											color: COLORS.text_desc,
											fontFamily: FONTS.para_01.fontFamily,
										}}
									>
										Total Certificates
									</p>
								</div>
							</div>

							<div
								className='rounded-lg p-6 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
								style={{
									backgroundColor: COLORS.bg_Colour,
									fontFamily: FONTS.para_01.fontFamily,
								}}
							>
								<div className='text-center'>
									<div
										className='w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
										style={{ backgroundColor: COLORS.light_blue }}
									>
										<svg
											className='w-8 h-8'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
											style={{ color: COLORS.white }}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M5 13l4 4L19 7'
											/>
										</svg>
									</div>
									<p
										className='font-bold text-3xl mb-2'
										style={{
											color: COLORS.text_title,
											fontFamily: FONTS.heading_01.fontFamily,
										}}
									>
										{
											certificatesData.filter((cert) =>
												cert.grade.includes('A')
											).length
										}
									</p>
									<p
										className='font-medium'
										style={{
											color: COLORS.text_desc,
											fontFamily: FONTS.para_01.fontFamily,
										}}
									>
										Grade A & Above
									</p>
								</div>
							</div>

							<div
								className='rounded-lg p-6 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
								style={{
									backgroundColor: COLORS.bg_Colour,
									fontFamily: FONTS.para_01.fontFamily,
								}}
							>
								<div className='text-center'>
									<div
										className='w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]'
										style={{ backgroundColor: COLORS.light_blue }}
									>
										<svg
											className='w-8 h-8'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
											style={{ color: COLORS.white }}
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
											/>
										</svg>
									</div>
									<p
										className='font-bold text-3xl mb-2'
										style={{
											color: COLORS.text_title,
											fontFamily: FONTS.heading_01.fontFamily,
										}}
									>
										{Math.round(
											certificatesData.reduce(
												(acc, cert) =>
													acc + parseInt(cert.duration.split(' ')[0]),
												0
											) / certificatesData.length
										) || 0}
									</p>
									<p
										className='font-medium'
										style={{
											color: COLORS.text_desc,
											fontFamily: FONTS.para_01.fontFamily,
										}}
									>
										Avg Duration (Months)
									</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Certificate;

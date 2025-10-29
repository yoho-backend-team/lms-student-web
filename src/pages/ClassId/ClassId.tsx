import { useNavigate, useParams } from 'react-router-dom';
import classImg from '../../assets/classes/Mask group.png';
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
	CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { COLORS, FONTS } from '@/constants/uiConstants';
import backImg from '../../assets/classes/back.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectIdClass } from '@/features/Classid/reducers/selector';
import { useEffect } from 'react';
import { getClassIdDetail } from '@/features/Classid/reducers/thunks';
import type { AppDispatch } from '@/store/store';
import { FileText, Download, BookOpen, Video } from 'lucide-react';

const ClassId = () => {
	const { id } = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const classIdData = useSelector(selectIdClass);

	useEffect(() => {
		if (id) {
			dispatch(
				getClassIdDetail({
					id,
					course: id,
					classType: 'online',
				})
			);
		}
	}, [id, dispatch]);

	const navigate = useNavigate();
	const handleBackPage = () => {
		navigate(-1);
	};

	const {
		notes = [],
		study_materials = [],
		video_url = '',
	} = classIdData?.data || {};

	// Function to handle file download
	const handleDownload = (fileUrl: string, fileName: string) => {
		const link = document.createElement('a');
		link.href = fileUrl;
		link.download = fileName;
		link.target = '_blank';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Function to get file extension
	const getFileExtension = (url: string) => {
		const extension = url.split('.').pop()?.toLowerCase();
		return extension;
	};

	// Function to get file icon based on type
	const getFileIcon = (url: string) => {
		const ext = getFileExtension(url);
		if (ext === 'pdf') {
			return (
				<FileText className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-red-500' />
			);
		} else if (['jpg', 'jpeg', 'png', 'gif'].includes(ext || '')) {
			return (
				<FileText className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-500' />
			);
		}
		return (
			<FileText className='w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-500' />
		);
	};

	// Function to convert YouTube URL to embed URL
	const getYouTubeEmbedUrl = (url: string) => {
		if (!url) return '';
		const videoIdMatch = url.match(
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
		);
		return videoIdMatch
			? `https://www.youtube.com/embed/${videoIdMatch[1]}`
			: url;
	};

	const hasMaterials = notes.length > 0 || study_materials.length > 0;

	return (
		<div className='mb-4 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16'>
			{/* title section */}
			<div className='my-4 flex flex-row justify-start items-center gap-3 sm:gap-5'>
				<div
					onClick={handleBackPage}
					className='p-2 rounded-lg bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] cursor-pointer hover:shadow-lg transition-shadow'
				>
					<img src={backImg} alt='back-img' className='w-5 h-5 sm:w-6 sm:h-6' />
				</div>
				<h1
					style={{ ...FONTS.heading_01 }}
					className='text-lg sm:text-xl md:text-2xl lg:text-3xl'
				>
					Class Details - {classIdData.data?.id}
				</h1>
			</div>

			{/* card section */}
			<div className='grid xl:grid-cols-2 grid-cols-1 gap-6 sm:gap-8 lg:gap-10'>
				{/* Left side card */}
				<Card
					style={{ backgroundColor: COLORS.bg_Colour }}
					className='px-3 sm:px-4 py-1 h-auto min-h-[350px] sm:min-h-[400px]'
				>
					<CardHeader className='px-2 sm:px-6'>
						<CardTitle
							style={{ ...FONTS.heading_01 }}
							className='!text-[#7B00FF] mb-3 sm:mb-4 text-base sm:text-lg lg:text-xl'
						>
							Batch No: #{classIdData.data?.batch?.id || 'N/A'}
						</CardTitle>
						<CardDescription>
							<h2
								style={{ ...FONTS.heading_02 }}
								className='text-[#2A2A2A] mb-2 text-sm sm:text-base lg:text-lg'
							>
								{classIdData.data?.class_name}
							</h2>
							<p
								style={{ ...FONTS.para_02 }}
								className='text-xs sm:text-sm lg:text-base'
							>
								{classIdData.data?.course?.description}
							</p>
						</CardDescription>
					</CardHeader>

					<Card className='bg-[#ebeff3] shadow-[5px_5px_4px_rgba(255,255,255,0.7),2px_2px_3px_rgba(189,194,199,0.75)_inset] mx-2 sm:mx-4 mb-4'>
						<Card className='bg-gradient-to-r from-[#7B00FF] to-[#B200FF] text-white p-3 sm:p-4 mx-2 sm:mx-4 my-3 sm:my-4 overflow-x-auto'>
							<table className='w-full table-fixed text-center min-w-[500px]'>
								<thead style={{ ...FONTS.para_02 }} className='!text-[#ffffff]'>
									<tr>
										<td className='text-xs sm:text-sm lg:text-base py-2'>
											Date
										</td>
										<td className='text-xs sm:text-sm lg:text-base py-2'>
											Start At
										</td>
										<td className='text-xs sm:text-sm lg:text-base py-2'>
											End At
										</td>
										<td className='text-xs sm:text-sm lg:text-base py-2'>
											Duration
										</td>
									</tr>
								</thead>
								<tbody
									style={{ ...FONTS.heading_04 }}
									className='!text-[#ffffff]'
								>
									<tr>
										<td className='text-xs sm:text-sm lg:text-base py-2'>
											{classIdData.data?.start_date &&
												new Date(
													classIdData.data.start_date
												).toLocaleDateString('en-GB', {
													day: 'numeric',
													month: 'long',
													year: 'numeric',
												})}
										</td>
										<td className='text-xs sm:text-sm lg:text-base py-2'>
											{classIdData.data?.start_time &&
												new Date(classIdData.data.start_time)
													.toLocaleString('en-IN', {
														hour: 'numeric',
														minute: 'numeric',
														hour12: true,
														timeZone: 'Asia/Kolkata',
													})
													.toUpperCase()}
										</td>
										<td className='text-xs sm:text-sm lg:text-base py-2'>
											{classIdData.data?.end_time &&
												new Date(classIdData.data.end_time)
													.toLocaleString('en-IN', {
														hour: 'numeric',
														minute: 'numeric',
														hour12: true,
														timeZone: 'Asia/Kolkata',
													})
													.toUpperCase()}
										</td>
										<td className='text-xs sm:text-sm lg:text-base py-2'>
											{classIdData.data?.course?.durationInMonths} Month
										</td>
									</tr>
								</tbody>
							</table>
						</Card>
					</Card>
				</Card>

				{/* Right side card - Class Video */}
				<Card
					style={{ backgroundColor: COLORS.bg_Colour }}
					className='px-3 sm:px-4 h-auto min-h-[350px] sm:min-h-[400px]'
				>
					<CardHeader className='px-2 sm:px-6'>
						<CardTitle className='flex items-center gap-2 text-base sm:text-lg lg:text-xl'>
							<Video className='w-5 h-5 sm:w-6 sm:h-6' />
							Class Video
						</CardTitle>
					</CardHeader>
					<CardContent className='px-2 sm:px-6'>
						{video_url ? (
							<div
								className='relative w-full'
								style={{ paddingBottom: '56.25%' }}
							>
								<iframe
									className='absolute top-0 left-0 w-full h-full rounded-lg'
									src={getYouTubeEmbedUrl(video_url)}
									title='Class Video'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
								/>
							</div>
						) : (
							<div className='flex flex-col justify-center items-center py-8'>
								<img
									className='w-[200px] sm:w-[300px] lg:w-[350px] mb-4'
									src={classImg}
									alt='no video'
								/>
								<p
									style={{ ...FONTS.para_02 }}
									className='text-gray-500 text-xs sm:text-sm lg:text-base text-center'
								>
									Once Class finished, video will be uploaded
								</p>
							</div>
						)}
					</CardContent>
				</Card>
			</div>

			{/* Materials Section - Only show if there are notes or study materials */}
			{hasMaterials ? (
				<div className='mt-6 sm:mt-8 lg:mt-10 space-y-4 sm:space-y-6 lg:space-y-8'>
					{/* Notes Section */}
					{notes.length > 0 && (
						<Card className='shadow-lg'>
							<CardHeader className='bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 sm:p-4 lg:p-6'>
								<CardTitle className='flex items-center gap-2 text-base sm:text-lg lg:text-xl xl:text-2xl'>
									<FileText className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7' />
									Notes
								</CardTitle>
							</CardHeader>
							<CardContent className='p-3 sm:p-4 lg:p-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'>
									{notes.map((note: any, index: any) => (
										<Card
											key={index}
											className='btnshadow hover:shadow-xl transition-shadow duration-300 bg-[#ebeff3]'
										>
											<CardContent className='p-3 sm:p-4 lg:p-6'>
												<div className='flex flex-col h-full'>
													<div className='flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4'>
														{getFileIcon(note.file)}
														<div className='flex-1 min-w-0'>
															<h3
																style={{ ...FONTS.heading_07 }}
																className='font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 line-clamp-2'
															>
																{note.title}
															</h3>
															<p
																style={{ ...FONTS.heading_07 }}
																className='text-gray-600 text-xs sm:text-sm lg:text-base line-clamp-3'
															>
																{note.description}
															</p>
														</div>
													</div>
													<Button
														onClick={() =>
															handleDownload(note.file, note.title)
														}
														className='w-full mt-auto bg-gradient-to-l from-[#7B00FF] to-[#B200FF] hover:from-[#6a00dd] hover:to-[#9900dd] text-white text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 lg:py-3 rounded-xl'
													>
														<Download className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
														Download
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					)}

					{/* Study Materials Section */}
					{study_materials.length > 0 && (
						<Card className='shadow-lg'>
							<CardHeader className='bg-gradient-to-r from-green-600 to-green-700 text-white p-3 sm:p-4 lg:p-6'>
								<CardTitle className='flex items-center gap-2 text-base sm:text-lg lg:text-xl xl:text-2xl'>
									<BookOpen className='w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7' />
									Study Materials
								</CardTitle>
							</CardHeader>
							<CardContent className='p-3 sm:p-4 lg:p-6'>
								<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6'>
									{study_materials.map((material: any, index: any) => (
										<Card
											key={index}
											className='btnshadow hover:shadow-xl transition-shadow duration-300 bg-[#ebeff3]'
										>
											<CardContent className='p-3 sm:p-4 lg:p-6'>
												<div className='flex flex-col h-full'>
													<div className='flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4'>
														{getFileIcon(material.file)}
														<div className='flex-1 min-w-0'>
															<h3
																style={{ ...FONTS.heading_07 }}
																className='font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 line-clamp-2'
															>
																{material.title}
															</h3>
															<p
																style={{ ...FONTS.heading_07 }}
																className='text-gray-600 text-xs sm:text-sm lg:text-base line-clamp-3'
															>
																{material.description}
															</p>
														</div>
													</div>
													<Button
														onClick={() =>
															handleDownload(material.file, material.title)
														}
														className='w-full mt-auto bg-gradient-to-l from-[#7B00FF] to-[#B200FF] hover:from-[#6a00dd] hover:to-[#9900dd] text-white text-xs sm:text-sm lg:text-base py-2 sm:py-2.5 lg:py-3 rounded-xl'
													>
														<Download className='w-4 h-4 sm:w-5 sm:h-5 mr-2' />
														Download
													</Button>
												</div>
											</CardContent>
										</Card>
									))}
								</div>
							</CardContent>
						</Card>
					)}
				</div>
			) : (
				<div className='mt-6 sm:mt-8 lg:mt-10'>
					<Card className='shadow-lg'>
						<CardContent className='p-8 sm:p-12 lg:p-16'>
							<div className='flex flex-col items-center justify-center'>
								<img
									className='w-[200px] sm:w-[300px] lg:w-[400px] mb-6'
									src={classImg}
									alt='no data'
								/>
								<p
									style={{ ...FONTS.heading_07 }}
									className='text-gray-500 text-sm sm:text-base lg:text-lg text-center'
								>
									No study materials available yet
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			)}
		</div>
	);
};

export default ClassId;

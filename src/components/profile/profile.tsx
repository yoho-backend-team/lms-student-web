/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';
import { FONTS } from '@/constants/uiConstants';
import { useToast } from '@/components/ui/toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';
import {
	getStudentProfileThunk,
	updateStudentProfileThunk,
} from '@/features/Profile/reducers/thunks';
import { toast } from 'react-toastify';
import { uploadticketfile } from '@/features/Tickets/services/Tickets';

const ProfileInformation: React.FC = () => {
	const [activeMenuItem, setActiveMenuItem] = useState('profile');
	const [isEditing, setIsEditing] = useState(false);
	const [showCancelDialog, setShowCancelDialog] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const { showToast } = useToast();
	const dispatch = useDispatch<any>();
	const profileDetails = useSelector(selectProfile);

	// Use refs to track the original data that won't change with re-renders
	const originalPersonalInfoRef = useRef<any>(null);
	const originalProfileImageRef = useRef<string>('');

	useEffect(() => {
		dispatch(getStudentProfileThunk({}));
	}, [dispatch]);

	// Initialize profile data from profileDetails
	const [profileData, setProfileData] = useState({
		name: profileDetails?.full_name || '-',
		traineeId: profileDetails?.userDetail?.studentId || '-',
		profileImage: profileDetails?.image || null,
	});

	const [personalInfo, setPersonalInfo] = useState({
		mailAddress: profileDetails?.email || '-',
		name: profileDetails?.full_name || '',
		gender: profileDetails?.gender || '-',
		contactNumber: profileDetails?.contact_info?.phone_number || '-',
		alternatecontactNumber:
			profileDetails?.contact_info?.alternate_phone_number || '-',
		dateOfBirth: profileDetails?.dob || '-',
		pinCode: profileDetails?.contact_info?.pincode || '-',
		address:
			`${profileDetails?.contact_info?.address1}, ${profileDetails?.contact_info?.address2}` ||
			'-',
	});

	const [instituteInfo, setInstituteInfo] = useState({
		course: profileDetails?.userDetail?.course?.course_name || '-',
		batch: profileDetails?.userDetail?.course?.batches?.[0]?.batch_name || '-',
		rollNumber: profileDetails?.roll_no || '-',
		studentId: profileDetails?.userDetail?.studentId || '-',
	});

	// Update states when profileDetails changes
	useEffect(() => {
		if (profileDetails) {
			const newProfileData = {
				name: profileDetails?.full_name || '-',
				traineeId: profileDetails?.userDetail?.studentId || '-',
				profileImage: profileDetails?.image || null,
			};

			const newPersonalInfo = {
				mailAddress: profileDetails?.email || '-',
				name: profileDetails?.full_name || '-',
				gender: profileDetails?.gender || '-',
				contactNumber: profileDetails?.contact_info?.phone_number || '-',
				alternatecontactNumber:
					profileDetails?.contact_info?.alternate_phone_number || '-',
				dateOfBirth: profileDetails?.dob || '-',
				pinCode: profileDetails?.contact_info?.pincode || '-',
				address:
					`${profileDetails?.contact_info?.address1}, ${profileDetails?.contact_info?.address2}` ||
					'-',
			};

			const newInstituteInfo = {
				course: profileDetails?.userDetail?.course?.course_name || '-',
				batch:
					profileDetails?.userDetail?.course?.batches?.[0]?.batch_name || '-',
				rollNumber: profileDetails?.roll_no || '-',
				studentId: profileDetails?.userDetail?.studentId || '-',
			};

			setProfileData(newProfileData);
			setPersonalInfo(newPersonalInfo);
			setInstituteInfo(newInstituteInfo);

			// Update refs with current data
			originalPersonalInfoRef.current = { ...newPersonalInfo };
			originalProfileImageRef.current = newProfileData.profileImage;
		}
	}, [profileDetails]);

	const handleMenuItemClick = (itemId: string) => {
		if (isEditing && itemId !== 'profile') {
			setIsEditing(false);
		}
		setActiveMenuItem(itemId);
	};

	const handleGoBack = () => {};

	const handlePersonalInfoChange = (data: typeof personalInfo) => {
		setPersonalInfo(data);
		if (data?.name !== profileData.name) {
			setProfileData((prev) => ({ ...prev, name: data.name }));
		}
	};

	const handleInstituteInfoChange = (data: typeof instituteInfo) => {
		setInstituteInfo(data);
	};

	const handleEditClick = () => {
		if (!isEditing) {
			// Store current data as original when starting to edit
			originalPersonalInfoRef.current = { ...personalInfo };
			originalProfileImageRef.current = profileData.profileImage;
		}
		setIsEditing(!isEditing);
	};

	const handleImageChange = async (imageFile: File) => {
		const formData = new FormData();
		formData.append('file', imageFile);

		try {
			const response = await uploadticketfile(formData);
			if (response) {
				setProfileData((prev) => ({
					...prev,
					profileImage: response?.data?.file,
				}));
			}
		} catch (error) {
			toast.error('Failed to upload the image');
		}
	};

	const hasChanges = () => {
		if (!originalPersonalInfoRef.current) return false;

		const personalInfoChanged =
			JSON.stringify(personalInfo) !==
			JSON.stringify(originalPersonalInfoRef.current);
		const imageChanged =
			profileData.profileImage !== originalProfileImageRef.current;
		return personalInfoChanged || imageChanged;
	};

	const handleSave = async () => {
		if (!hasChanges()) {
			showToast('No changes detected to save.', 'info');
			return;
		}

		setIsSaving(true);

		try {
			// Prepare data for API update
			const updateData = {
				full_name: personalInfo?.name,
				first_name: personalInfo?.name.split(' ')[0],
				last_name: personalInfo?.name.split(' ')[1],
				gender: personalInfo?.gender,
				dob: personalInfo?.dateOfBirth,
				contact_info: {
					phone_number: personalInfo?.contactNumber,
					alternate_phone_number: personalInfo?.alternatecontactNumber,
					pincode: personalInfo?.pinCode,
					address1: personalInfo?.address.split(',')[0],
					address2: personalInfo?.address.split(',')[1],
				},
				image: profileData?.profileImage,
			};

			// Call the update profile thunk
			await dispatch(updateStudentProfileThunk(updateData));

			// Update refs with the saved data
			originalPersonalInfoRef.current = { ...personalInfo };
			originalProfileImageRef.current = profileData?.profileImage;

			showToast('Profile updated successfully!', 'success');
			setIsEditing(false);
		} catch (error: any) {
			console.error('Profile update error:', error);
			const errorMessage =
				error?.response?.data?.message ||
				(typeof error === 'object' && error !== null && 'message' in error
					? String(error.message)
					: 'Unknown error');

			if (errorMessage.includes('duplicate key error')) {
				showToast(
					'Error: There was a conflict with existing data. Please try with different information.',
					'error'
				);
			} else if (errorMessage.includes('is not allowed to be empty')) {
				showToast(
					'Error: Some required fields cannot be empty. Please fill in all required information.',
					'error'
				);
			} else {
				showToast(`Failed to update profile: ${errorMessage}`, 'error');
			}
		} finally {
			setIsSaving(false);
		}
	};

	const handleCancel = () => {
		if (hasChanges()) {
			setShowCancelDialog(true);
			return;
		}

		setIsEditing(false);
	};

	const confirmCancel = () => {
		// Reset to the original data stored in refs
		if (originalPersonalInfoRef.current) {
			setPersonalInfo(originalPersonalInfoRef.current);
			setProfileData((prev) => ({
				...prev,
				profileImage: originalProfileImageRef.current,
				name: originalPersonalInfoRef.current?.name,
			}));
		}
		setIsEditing(false);
		setShowCancelDialog(false);
	};

	return (
		<div className='min-h-fit' style={{ fontFamily: FONTS.para_01.fontFamily }}>
			<div className='flex flex-col xs:flex-col sm:flex-col md:flex-col lg:flex-row xl:flex-row 2xl:flex-row gap-3 xs:gap-3 sm:gap-4 md:gap-4 lg:gap-6 xl:gap-6 2xl:gap-8 p-2 xs:p-2 sm:p-3 md:p-4 lg:p-4 xl:p-6 2xl:p-8 max-w-[1400px] mx-auto w-full'>
				{/* Sidebar - Responsive width adjustments */}
				<div className='w-full xs:w-full sm:w-full md:w-full lg:w-[280px] xl:w-[320px] 2xl:w-[380px] flex-shrink-0'>
					<ProfileSidebar
						name={profileData?.name}
						traineeId={profileData?.traineeId}
						profileImage={profileData?.profileImage}
						activeMenuItem={activeMenuItem}
						onMenuItemClick={handleMenuItemClick}
						onGoBack={handleGoBack}
						onEditClick={handleEditClick}
						onImageChange={handleImageChange}
						isEditing={isEditing}
					/>
				</div>

				{/* Main Content - Responsive width adjustments */}
				<div className='flex-1 min-w-0 w-full xs:w-full sm:w-full md:w-full lg:flex-1 xl:flex-1 2xl:flex-1'>
					<ProfileContent
						personalInfo={personalInfo}
						instituteInfo={instituteInfo}
						onPersonalInfoChange={handlePersonalInfoChange}
						onInstituteInfoChange={handleInstituteInfoChange}
						isEditing={isEditing}
						onSave={handleSave}
						onCancel={handleCancel}
						activeMenuItem={activeMenuItem}
						isSaving={isSaving}
					/>
				</div>
			</div>

			{/* Confirmation Dialog */}
			<ConfirmationDialog
				isOpen={showCancelDialog}
				onClose={() => setShowCancelDialog(false)}
				onConfirm={confirmCancel}
				title='Discard Changes'
				description='You have unsaved changes. Are you sure you want to discard them?'
				confirmText='Discard'
				cancelText='Keep Editing'
				type='warning'
			/>
		</div>
	);
};

export default ProfileInformation;

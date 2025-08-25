/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileContent from './ProfileContent';
import { FONTS } from '@/constants/uiConstants';
import { useToast } from '@/components/ui/toast';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { useDispatch, useSelector } from 'react-redux';
import { selectProfile } from '@/features/Profile/reducers/selectors';
import { getStudentProfileThunk, updateStudentProfileThunk } from '@/features/Profile/reducers/thunks';

const ProfileInformation: React.FC = () => {
	const [activeMenuItem, setActiveMenuItem] = useState('profile');
	const [isEditing, setIsEditing] = useState(false);
	const [showCancelDialog, setShowCancelDialog] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const { showToast } = useToast();

	const dispatch = useDispatch<any>();
	const profileDetails = useSelector(selectProfile);

	useEffect(() => {
		dispatch(getStudentProfileThunk({}));
	}, [dispatch]);

	// Sample data - replace with actual data from props or API
	const [profileData, setProfileData] = useState({
		name: profileDetails.length != 0 ? profileDetails.full_name : 'NA',
		traineeId:
			profileDetails.length != 0 ? profileDetails.userDetail.studentId : 'NA',
		profileImage: profileDetails.length != 0 ? profileDetails.image : 'NA',
	});

	const [personalInfo, setPersonalInfo] = useState({
		mailAddress: profileDetails.length != 0 ? profileDetails.email : 'NA',
		name: profileDetails.length != 0 ? profileDetails.full_name : 'NA',
		gender: profileDetails.length != 0 ? profileDetails.gender : 'NA',
		contactNumber:
			profileDetails.length != 0
				? profileDetails.contact_info.phone_number
				: 'NA',
		dateOfBirth: profileDetails.length != 0 ? profileDetails.dob : 'NA',
		pinCode:
			profileDetails.length != 0 ? profileDetails.contact_info.pincode : 'NA',
		address:
			profileDetails.length != 0 ? profileDetails.contact_info.address2 : 'NA',
	});

	const [instituteInfo, setInstituteInfo] = useState({
		course: 'Theoretical Physics',
		batch: 'Batch 2024-25',
		rollNumber: profileDetails.length != 0 ? profileDetails.roll_no : 'NA',
		studentId:
			profileDetails.length != 0 ? profileDetails.userDetail.studentId : 'NA',
	});

	// Store original data to compare changes
	const [originalPersonalInfo, setOriginalPersonalInfo] =
		useState(personalInfo);
	const [originalProfileImage, setOriginalProfileImage] = useState(
		profileData.profileImage
	);

	const handleMenuItemClick = (itemId: string) => {
		if (isEditing && itemId !== 'profile') {
			setIsEditing(false);
		}
		setActiveMenuItem(itemId);
	};

	const handleGoBack = () => { };

	const handlePersonalInfoChange = (data: typeof personalInfo) => {
		setPersonalInfo(data);
		if (data.name !== profileData.name) {
			setProfileData((prev) => ({ ...prev, name: data.name }));
		}
	};

	const handleInstituteInfoChange = (data: typeof instituteInfo) => {
		setInstituteInfo(data);
	};

	const handleEditClick = () => {
		if (!isEditing) {
			// Store original data when starting to edit
			setOriginalPersonalInfo(personalInfo);
			setOriginalProfileImage(profileData.profileImage);
		}
		setIsEditing(!isEditing);
	};

	const handleImageChange = (imageFile: File) => {
		const imageUrl = URL.createObjectURL(imageFile);
		setProfileData((prev) => ({ ...prev, profileImage: imageUrl }));
	};

	const hasChanges = () => {
		const personalInfoChanged =
			JSON.stringify(personalInfo) !== JSON.stringify(originalPersonalInfo);
		const imageChanged = profileData.profileImage !== originalProfileImage;
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
				full_name: personalInfo.name,
				gender: personalInfo.gender,
				dob: personalInfo.dateOfBirth,
				contact_info: {
					phone_number: personalInfo.contactNumber,
					pincode: personalInfo.pinCode,
					address2: personalInfo.address,
					alternate_phone_number: personalInfo.contactNumber || "0000000000"
				}
			};

			// Call the update profile thunk
			await dispatch(updateStudentProfileThunk(updateData));

			// Update local state
			setOriginalPersonalInfo(personalInfo);
			setOriginalProfileImage(profileData.profileImage);
			showToast('Profile updated successfully!', 'success');
			setIsEditing(false);
		} catch (error: any) {
			console.error('Profile update error:', error);
			// Extract error message from different possible error structures
			const errorMessage = error?.response?.data?.message ||
				(typeof error === 'object' && error !== null && 'message' in error ?
					String(error.message) : 'Unknown error');

			// Handle specific error cases
			if (errorMessage.includes('duplicate key error')) {
				showToast('Error: There was a conflict with existing data. Please try with different information.', 'error');
			} else if (errorMessage.includes('is not allowed to be empty')) {
				showToast('Error: Some required fields cannot be empty. Please fill in all required information.', 'error');
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
		setPersonalInfo(originalPersonalInfo);
		setProfileData((prev) => ({
			...prev,
			profileImage: originalProfileImage,
			name: originalPersonalInfo.name,
		}));
		setIsEditing(false);
		setShowCancelDialog(false);
	};

	return (
		<div className='min-h-fit' style={{ fontFamily: FONTS.para_01.fontFamily }}>
			<div className='flex flex-col xl:flex-row gap-4 p-2 sm:p-4 max-w-[1400px] mx-auto'>
				<div className='w-full xl:w-[320px] 2xl:w-[380px] flex-shrink-0'>
					<ProfileSidebar
						name={profileData.name}
						traineeId={profileData.traineeId}
						profileImage={profileData.profileImage}
						activeMenuItem={activeMenuItem}
						onMenuItemClick={handleMenuItemClick}
						onGoBack={handleGoBack}
						onEditClick={handleEditClick}
						onImageChange={handleImageChange}
						isEditing={isEditing}
					/>
				</div>

				<div className='flex-1 min-w-0'>
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

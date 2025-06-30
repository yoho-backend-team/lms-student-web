import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import ProfileMenu from './ProfileMenu';
import { COLORS, FONTS } from '@/constants/uiConstants';

interface ProfileSidebarProps {
  name: string;
  traineeId: string;
  profileImage: string;
  activeMenuItem?: string;
  onMenuItemClick?: (itemId: string) => void;
  onGoBack?: () => void;
  onEditClick?: () => void;
  onImageChange?: (imageFile: File) => void;
  isEditing?: boolean;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  name,
  traineeId,
  profileImage,
  activeMenuItem,
  onMenuItemClick,
  onGoBack,
  onEditClick,
  onImageChange,
  isEditing = false
}) => {
  return (
    <div 
      className="rounded-lg shadow-lg lg:sticky lg:top-4 flex flex-col"
      style={{
        backgroundColor: COLORS.bg_Colour,
        fontFamily: FONTS.para_01.fontFamily,
        height: '75vh',
        marginRight: '2rem',
        marginLeft: '-3rem',
        width: '30%',
        minWidth: '320px',
        maxWidth: '400px',
      }}
    >
      {/* Header Section */}
      <div className="p-3 flex-shrink-0">
        <ProfileHeader 
          name={name}
          traineeId={traineeId}
          profileImage={profileImage}
          onEditClick={onEditClick}
          onImageChange={onImageChange}
          isEditing={isEditing}
          showEditButton={activeMenuItem === 'profile'}
        />
      </div>
      
      {/* Menu Section - Takes remaining space */}
      <div className="px-3 flex-1 overflow-y-auto">
        <ProfileMenu 
          activeItem={activeMenuItem}
          onMenuItemClick={onMenuItemClick}
        />
      </div>

      {/* Go Back Button - Fixed at bottom */}
      <div className="p-3 flex-shrink-0">
        <button 
          className="w-full rounded-lg py-3 px-3 flex items-center justify-center space-x-2 font-medium transition-all duration-200 shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] hover:shadow-[inset_3px_3px_5px_rgba(123,0,255,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] text-sm"
          style={{
            backgroundColor: COLORS.light_blue,
            color: COLORS.white,
            fontFamily: FONTS.para_01.fontFamily,
            fontSize: FONTS.para_01.fontSize
          }}
          onClick={onGoBack}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
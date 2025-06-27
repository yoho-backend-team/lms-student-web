import React from 'react';
import { ArrowLeft } from 'lucide-react';
import ProfileHeader from './ProfileHeader';
import ProfileMenu from './ProfileMenu';

interface ProfileSidebarProps {
  name: string;
  traineeId: string;
  profileImage: string;
  activeMenuItem?: string;
  onMenuItemClick?: (itemId: string) => void;
  onGoBack?: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({
  name,
  traineeId,
  profileImage,
  activeMenuItem,
  onMenuItemClick,
  onGoBack
}) => {
  return (
    <div 
      className="w-64 min-p-2 rounded-r-lg flex flex-col overflow-hidden" 
      style={{
        backgroundColor: '#EBEFF3', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        height: '75vh',
        marginTop: '2rem',
        marginLeft: '1rem',
        position: 'sticky',
        width: '20%'
      }}
    >
      {/* Profile Header - Fixed at top */}
      <div className="flex-shrink-0 p-4">
        <ProfileHeader 
          name={name}
          traineeId={traineeId}
          profileImage={profileImage}
        />
      </div>
      
      {/* Menu - Flexible middle section */}
      <div className="flex-1 overflow-y-auto px-4">
        <ProfileMenu 
          activeItem={activeMenuItem}
          onMenuItemClick={onMenuItemClick}
        />
      </div>

      {/* Go Back Button - Fixed at bottom */}
      <div className="flex-shrink-0 p-4">
        <button 
          className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg py-3 px-4 flex items-center justify-center space-x-2 font-medium transition-all duration-200" 
          style={{
            boxShadow: '0 10px 15px -3px rgba(139, 69, 255, 0.4), 0 4px 6px -2px rgba(139, 69, 255, 0.05)', 
            fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontSize: '14px'
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
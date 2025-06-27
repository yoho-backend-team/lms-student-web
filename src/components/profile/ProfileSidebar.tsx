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
      className="w-64 min-p-2 rounded-r-lg" 
      style={{
        backgroundColor: '#EBEFF3', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        height: '85vh',
        marginTop: '2rem',
        marginLeft: '1rem',
        position: 'sticky',
        width: '20%'
      }}
    >
      <ProfileHeader 
        name={name}
        traineeId={traineeId}
        profileImage={profileImage}
      />
      
      <ProfileMenu 
        activeItem={activeMenuItem}
        onMenuItemClick={onMenuItemClick}
      />

      {/* Go Back Button */}
      <div className="mt-auto pt-8">
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
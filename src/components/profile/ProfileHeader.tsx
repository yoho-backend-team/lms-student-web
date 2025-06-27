import React from 'react';
import { Edit } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  traineeId: string;
  profileImage: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, traineeId, profileImage }) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative mb-3">
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-200" style={{boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
          <img 
            src={profileImage}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <button className="absolute -top-1 -right-1 bg-gray-200 rounded-full p-1" style={{boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'}}>
          <Edit className="w-3 h-3 text-gray-600" />
        </button>
      </div>
      <h3 
        className="font-bold text-gray-900 mb-1" 
        style={{
          fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontWeight: 700,
          fontSize: '28px',
          lineHeight: '100%',
          letterSpacing: '0px'
        }}
      >
        {name}
      </h3>
      <p 
        className="text-gray-500" 
        style={{
          fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          fontSize: '14px', 
          lineHeight: '1.4'
        }}
      >
        Trainee ID: {traineeId}
      </p>
    </div>
  );
};

export default ProfileHeader;
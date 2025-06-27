import React from 'react';
import { Edit } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ProfileHeaderProps {
  name: string;
  traineeId: string;
  profileImage: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, traineeId, profileImage }) => {
  return (
    <Card className="bg-[#ebeff3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] border-none">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          {/* Left side - Image and details */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-200 shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]">
                <img 
                  src={profileImage}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Name and ID below image area */}
            <div className="flex flex-col justify-center">
              <h3 
                className="font-bold text-gray-900 mb-1" 
                style={{
                  fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 700,
                  fontSize: '18px',
                  lineHeight: '1.2',
                  letterSpacing: '0px'
                }}
              >
                {name}
              </h3>
              <p 
                className="text-gray-600" 
                style={{
                  fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '12px', 
                  lineHeight: '1.4'
                }}
              >
                ID: {traineeId}
              </p>
            </div>
          </div>

          {/* Right side - Edit button in input style */}
          <div className="flex-shrink-0">
            <button 
              className="bg-[#ebeff3] shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)] border-none rounded-md px-3 py-2 flex items-center gap-2 text-gray-700 hover:shadow-[inset_3px_3px_5px_rgba(189,194,199,0.75),inset_-3px_-3px_5px_rgba(255,255,255,0.7)] transition-all duration-200"
              style={{
                fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '12px',
                fontWeight: 500
              }}
            >
              <Edit className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
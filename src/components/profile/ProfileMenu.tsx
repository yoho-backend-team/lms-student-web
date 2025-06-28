import React from 'react';
import { Settings, FileText, CreditCard } from 'lucide-react';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  isActive?: boolean;
}

interface ProfileMenuProps {
  activeItem?: string;
  onMenuItemClick?: (itemId: string) => void;
}

const ProfileMenu: React.FC<ProfileMenuProps> = ({ activeItem = 'profile', onMenuItemClick }) => {
  const menuItems: MenuItem[] = [
    {
      id: 'profile',
      label: 'Profile Information',
      icon: <Settings className="w-4 h-4" />,
      isActive: activeItem === 'profile'
    },
    {
      id: 'certificate',
      label: 'Certificate',
      icon: <FileText className="w-4 h-4" />,
      isActive: activeItem === 'certificate'
    },
    {
      id: 'idcard',
      label: 'ID Card',
      icon: <CreditCard className="w-4 h-4" />,
      isActive: activeItem === 'idcard'
    }
  ];

  const handleItemClick = (itemId: string) => {
    if (onMenuItemClick) {
      onMenuItemClick(itemId);
    }
  };

  return (
    <div className="space-y-3">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            item.isActive
              ? 'bg-[#7b00ff] text-white'
              : 'text-gray-700 bg-[#ebeff3]'
          }`}
          style={{
            boxShadow: item.isActive 
              ? 'inset_3px_3px_5px_rgba(123,0,255,0.3),inset_-3px_-3px_5px_rgba(255,255,255,0.7)'
              : '3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)',
            fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
          onClick={() => handleItemClick(item.id)}
        >
          <div className="flex items-center space-x-3">
            <div 
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                item.isActive 
                  ? 'bg-white bg-opacity-20' 
                  : 'bg-[#ebeff3] shadow-[inset_2px_2px_4px_rgba(189,194,199,0.75),inset_-2px_-2px_4px_rgba(255,255,255,0.7)]'
              }`}
            >
              {item.icon}
            </div>
            <span 
              className="font-medium" 
              style={{
                fontFamily: 'Quicksand, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '14px'
              }}
            >
              {item.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileMenu;
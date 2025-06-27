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
    <div className="space-y-2">
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
            item.isActive
              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
              : 'text-gray-600'
          }`}
          style={{
            backgroundColor: item.isActive ? undefined : '#EBEFF3',
            boxShadow: item.isActive 
              ? '0 10px 15px -3px rgba(139, 69, 255, 0.4), 0 4px 6px -2px rgba(139, 69, 255, 0.05)'
              : '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
          onClick={() => handleItemClick(item.id)}
        >
          <div className="flex items-center space-x-3">
            <div 
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                item.isActive ? 'bg-white bg-opacity-20' : 'bg-gray-100'
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
// src/components/community/CommunitySide/chatHeader.tsx
import React from 'react';
import type { Chat } from './type.ts';

interface ChatHeaderProps {
  chat: Chat;
  onBack?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chat, onBack }) => {
  console.log('Chatttt', chat)
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-t-lg shadow-sm border-b">
      {/* Back button for mobile */}
      {onBack && (
        <button
          onClick={onBack}
          className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors mr-2"
        >
          <svg 
            className="w-5 h-5 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 19l-7-7 7-7" 
            />
          </svg>
        </button>
      )}
      
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
          {chat?.name?.charAt(0) || 'C'}
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-gray-800 truncate">
            {chat?.name || 'Community'}
          </h2>
          <p className="text-sm text-gray-500 truncate">
            {chat?.members || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
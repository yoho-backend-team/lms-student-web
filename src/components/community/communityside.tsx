/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/community/CommunitySide/CommunitySide.tsx
import React, { useMemo, useState, useEffect } from 'react';
import msgframe from '@/assets/icons/community/Frame 5185.png';
import Sidebar from './sidebar';
import ChatHeader from './chatHeader';
import MessageList from './messageList';
import ChatInputWithEmojiPicker from './chatInputWithEmojiPicker';
import type { Community } from './type.ts';
import { useCommunityChat } from './hooks/useCommunityChat';
import { useAutoScroll } from './hooks/useAutoScroll';
import { useStudentSocket } from '@/context/socketContext.tsx';
import { GetLocalStorage } from '@/utils/helper.ts';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store.ts';

type Props = {
  communities?: any;
};


const CommunitySide: React.FC<Props> = ({ communities }) => {
  const socket = useStudentSocket();
  const user: any = GetLocalStorage('user')
  const [searchTerm, setSearchTerm] = useState('');
  const messages = useSelector((state: RootState) => state.community.messages)
  const [isMobileView, setIsMobileView] = useState(false);
  const [showChatDetail, setShowChatDetail] = useState(false);

  const {
    selectedChat,
    selectChat,
    // messages,
    // sendMessage,
    isMine,
  } = useCommunityChat({
    socket,
    userId: user?._id,
    userName: user?.full_name,
    communities: communities?.data,
    receiveEventName: 'newMessage',
  });

  const bottomRef = useAutoScroll<HTMLDivElement>([messages]);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024; // lg breakpoint
      setIsMobileView(mobile);

      // Reset chat detail view when switching to desktop
      if (!mobile) {
        setShowChatDetail(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const filteredCommunities = useMemo<Community[]>(() => {
    const list = communities?.data ?? [];
    if (!searchTerm) return list;
    return list?.filter((g: any) =>
      g?.batch?.batch_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [communities?.data, searchTerm]);

  const formatMessageDate = (date?: string | Date): string => {
    if (!date) return '';

    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const isSameDay = (d1: Date, d2: Date): boolean =>
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();

    const formatTime = (d: Date): string =>
      d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

    if (isSameDay(messageDate, today)) return formatTime(messageDate);
    if (isSameDay(messageDate, yesterday)) return `Yesterday ${formatTime(messageDate)}`;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 6);
    if (messageDate >= oneWeekAgo) {
      const weekday = messageDate.toLocaleDateString('en-US', { weekday: 'long' });
      return `${weekday} ${formatTime(messageDate)}`;
    }

    return messageDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  // Handle chat selection with responsive behavior
  const handleSelectChat = (chat: Community) => {
    selectChat(chat);
    // On mobile, show chat detail and hide sidebar when a chat is selected
    if (isMobileView) {
      setShowChatDetail(true);
    }
  };

  // Handle back to sidebar on mobile
  const handleBackToSidebar = () => {
    if (isMobileView) {
      setShowChatDetail(false);
    }
  };

  console.log(selectedChat, 'chat ');

  // Determine what to show based on screen size and state
  const showSidebar = !isMobileView || !showChatDetail;
  const showChatArea = !isMobileView || showChatDetail;

  return (
    <div className="flex flex-col h-full sticky lg:flex-row position-sticky pt-4 gap-4">
      {/* Sidebar - Show on desktop always, on mobile only when not in chat detail */}
      {showSidebar && (
        <div className={`w-full ${isMobileView ? 'lg:w-1/3' : 'lg:w-1/3'}`}>
          <Sidebar
            communities={filteredCommunities}
            selectedChat={selectedChat}
            onSelectChat={handleSelectChat}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            formatMessageDate={formatMessageDate}
          />
        </div>
      )}

      {/* Chat Area - Show on desktop always, on mobile only when in chat detail */}
      {showChatArea && (
        <div className={`w-full ${isMobileView ? 'lg:w-2/3' : 'lg:w-2/3 xl:ml-20 md:ml-18 2xl:ml-2'} flex flex-col h-[75vh] position-sticky`}>
          {selectedChat ? (
            <>
              <ChatHeader
                chat={selectedChat}
                onBack={isMobileView ? handleBackToSidebar : undefined}
              />
              <MessageList
                messages={messages}
                formatMessageDate={formatMessageDate}
                isMine={isMine}
                bottomRef={bottomRef}
              />
              <ChatInputWithEmojiPicker communities={communities} />
            </>
          ) : (
            <div className="flex-1 min-w-0 bg-[#EBEFF3] rounded-xl shadow flex items-center justify-center">
              <img
                src={msgframe}
                alt="Message frame"
                className="max-w-full h-auto object-contain drop-shadow-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunitySide;
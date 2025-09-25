/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/community/CommunitySide/ChatInputWithEmojiPicker.tsx
import React, { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { RiEmojiStickerLine } from 'react-icons/ri';
import cursor from '@/assets/icons/community/Icon.png';
import { useOnClickOutside } from './hooks/useOnClickOutside';
import { useCommunityChat } from './hooks/useCommunityChat';
import { useStudentSocket } from '@/context/socketContext';

type Props = {
  onSend?: (text: string) => void;
  communities: any
};

const ChatInputWithEmojiPicker: React.FC<Props> = ({ communities }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef: any = useRef<HTMLDivElement>(null);
  const socket = useStudentSocket();
  const user: any = JSON.parse(localStorage.getItem('user') || '{}')

  const { sendMessage } = useCommunityChat({
    socket,
    userId: user?._id,
    userName: user?.full_name,
    communities: communities.data,
    receiveEventName: 'newMessage',
  })

  useOnClickOutside(pickerRef, () => setShowPicker(false));

  const handleSelectEmoji = (emojiData: any) => {
  let selectedEmoji = emojiData.emoji;

  // Skip if it's just two letters (flag shortcodes like "AF")
  if (/^[A-Z]{2}$/.test(selectedEmoji)) {
    return; // Do nothing, don't insert letters
  }

  setInputMessage((prev) => prev + selectedEmoji);
  setShowPicker(false);
};


  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage);
    setInputMessage('');
  };

  return (
    <div className="relative p-4 border-t bg-[#EBEFF3] flex items-center gap-2 mr-4">
      <button
        type="button"
        onClick={() => setShowPicker((s) => !s)}
        className="p-2 rounded-full bg-gray-300 hover:bg-gray-500 transition"
      >
        <RiEmojiStickerLine className="text-xl" />
      </button>

      {showPicker && (
        <div ref={pickerRef} className="absolute bottom-14 left-2 z-50 w-[320px] h-[380px] rounded-xl shadow-xl bg-white">
          <EmojiPicker onEmojiClick={handleSelectEmoji} width="100%" height="100%" />
        </div>
      )}

      <input
        type="text"
        placeholder="Type a Message"
        className="flex-1 border border-[#F4F7F9] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <button
        className=" bg-gray-300 hover:bg-gray-500 ml-2 text-white rounded-md p-2 transition"
        onClick={handleSend}
        type="button"
      >
        <img src={cursor} className="h-5 w-5 invert " alt="Send" />
      </button>
    </div>
  );
};

export default ChatInputWithEmojiPicker;

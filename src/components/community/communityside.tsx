import { useEffect, useState } from 'react';
import msgframe from "../../assets/icons/community/Frame 5185.png";
import doubleicon from '../../assets/icons/community/Group 210.png';
import cursor from '../../assets/icons/community/Icon.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectCommunities } from '@/features/community/redux/communitySelector';
import { useStudentSocket } from '@/context/socketContext';
import { getMessages } from '@/features/community/redux/commuityThunk';
import type { AppDispatch } from '@/store/store';

type Community = {
  _id: string;
  group: string;
  last_message?: {
    message: string;
    timestamp: string;
  };
  users: { user: string; isblock: boolean }[];
  groupimage?: string;
  admin?: { first_name: string }[];
};

type Chat = {
  _id: string;
  name: string;
  lastMessage: string;
  time: string;
  members: string;
  groupImage?: string;
  admin: string;
};

type Message = {
  content: string;
  time: string;
  isUser: boolean;
};

const  CommunitySide = () => {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const socket = useStudentSocket();

  // Get community data from Redux store
  const { data: communities } = useSelector(selectCommunities) as {
    data: Community[];
    status: string;
    message: string;
  };

  // Helper function to format time
  function formatTime(timestamp?: string): string {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Format chats from API response
  const chats: Chat[] = (communities || []).map((community) => ({
    _id: community._id,
    name: community.group,
    lastMessage: community.last_message?.message || "No messages yet",
    time: formatTime(community.last_message?.timestamp),
    members: `${community.users?.length || 0} Members`,
    groupImage: community.groupimage,
    admin: community.admin?.[0]?.first_name || "Admin",
  }));

  const handleChatClick = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    if(!socket) return;
    const newMessage: Message = {
      content: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isUser: true,
    };
    socket.emit('newMessage', newMessage)
    setMessages((prev) => [...prev, newMessage]);
    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const obId = chats.map((item) => item._id);

  console.log('obId',obId);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
          if (obId){
            dispatch(getMessages({
              community: obId,
            }));
          }
  },[dispatch])

  return (
    <>
      <div className="flex flex-col lg:flex-row p-4 gap-4">
        {/* Left Sidebar */}
        <div className="w-full lg:w-[400px] xl:w-[500px] h-[600px] bg-[#EBEFF3] rounded-xl shadow-2xl overflow-hidden transform transition-all">
          <div className="relative p-4 bg-[#EBEFF3]">
            <div className="relative mt-4">
              <input
                type="text"
                placeholder="Search"
                className="w-full p-3 h-10 pl-10 bg-[#EBEFF3] rounded-md shadow-[3px_3px_5px_rgba(255,255,255,0.7),inset_2px_2px_3px_rgba(189,194,199,0.75)]"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Chat List */}
          <div className="p-4 bg-[#EBEFF3] h-[calc(600px-80px)] border-[#EBEFF3] rounded-b-xl relative overflow-y-auto">
            <div className="absolute inset-0 border-2 rounded-b-xl pointer-events-none"></div>

            {chats.map((chat) => (
              <div
                key={chat._id}
                className={`relative z-10 flex items-center shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] justify-between p-3 bg-[#EBEFF3] rounded-lg overflow-hidden transform transition-all ${
                  selectedChat?._id === chat._id ? 'bg-gray-200' : ''
                }`}
                onClick={() => handleChatClick(chat)}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-900 text-white rounded-full h-12 w-12 flex items-center justify-center overflow-hidden">
                    {chat.groupImage ? (
                      <img src={chat.groupImage} alt={chat.name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-lg font-bold">{chat.name.charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{chat.name}</h3>
                    <p className="text-sm text-gray-600">{chat.lastMessage}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-xs text-gray-500">{chat.time}</p>
                  <img src={doubleicon} className="mt-1 w-4 h-4 opacity-70" alt="Read receipt" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="w-2/3 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 bg-[#EBEFF3] shadow-[-4px_-4px_4px_rgba(255,255,255,0.7),_5px_5px_4px_rgba(189,194,199,0.75)] flex items-center">
                <div className="bg-gray-900 text-white rounded-full h-12 w-12 flex items-center justify-center overflow-hidden mr-3">
                  {selectedChat.groupImage ? (
                    <img src={selectedChat.groupImage} alt={selectedChat.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-lg font-bold">{selectedChat.name.charAt(0).toUpperCase()}</span>
                  )}
                </div>
                <div>
                  <h2 className="font-bold text-lg text-gray-900">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-600">{selectedChat.members}</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 bg-[#EBEFF3] w-full h-[600px] overflow-y-auto relative">
                <div className="absolute inset-0 border-2 rounded-xl pointer-events-none"></div>
                <div className="relative z-10 space-y-3">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg max-w-[70%] shadow ${
                        message.isUser ? 'ml-auto bg-blue-100' : 'mr-auto bg-white'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500 text-right mt-1">{message.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input Box */}
              <div className="p-4 border-t bg-[#EBEFF3] mt-auto flex items-center">
                <input
                  type="text"
                  placeholder="Type a Message"
                  className="flex-1 border border-[#F4F7F9] rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  className="bg-[#EBEFF3] ml-2 text-white rounded-sm shadow-inner p-2"
                  onClick={handleSendMessage}
                >
                  <img src={cursor} className="h-5 w-5" alt="Send" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex-1 min-w-0 bg-[#EBEFF3] rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] flex items-center justify-center">
              <img src={msgframe} alt="Message frame" className="max-w-full h-auto object-contain drop-shadow-lg" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CommunitySide;

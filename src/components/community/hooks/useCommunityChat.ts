/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/community/CommunitySide/hooks/useCommunityChat.ts
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getMessage } from '@/features/community/services/communityservices';
import type { Chat, Community, Message } from '../type';
import { useSelector } from 'react-redux';
// import type { RootState } from '@/store/store';
import { GetLocalStorage } from '@/utils/helper';

type UseCommunityChatArgs = {
  socket: any;
  userId?: string;
  communities?: Community[];
  receiveEventName?: string;
  userName: string;
};

export function useCommunityChat({
  socket,
  userId,
  // userName,
}: UseCommunityChatArgs) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const selectedMsg: any = useSelector((state: any) => state.community.selectedMsg)
  const user: any = GetLocalStorage('user')

  const selectChat = (chat: Community) => {
    const selected: Chat = {
      _id: chat._id,
      name: chat.batch?.batch_name || chat.group,
      lastMessage: chat.last_message?.message || '',
      time: chat.last_message?.timestamp || '',
      members: `${chat.users.length} members`,
      groupImage: chat.batch?.groupImage,
      admin: chat.admin?.[0]?.first_name || '',
    };
    setSelectedChat(selected);
  };

  const fetchMessages = async (chatId?: string) => {
    try {
      if (!chatId) return;
      const params = { community: chatId };
      const data = await getMessage(params);
      setMessages(data?.data?.reverse() || []);
    } catch (error: any) {
      toast.error(error?.message || 'Error fetching messages');
    }
  };

  useEffect(() => {
    fetchMessages(selectedChat?._id);
    // }, [selectedChat?._id,messages, userId]);
  }, [selectedChat?._id, userId]);


  useEffect(() => {
    // if (!socket) return;

    const handleMessage = (message: Message) => {
      console.log(message, 'mess')
      setMessages((prev) => [...prev, message]);
    };

    const handleConnection = () => {
      setIsConnected(true);
    };

    const handleDisconnection = () => {
      setIsConnected(false);
    };

    socket.on("newMessage", handleMessage);
    socket.on("connect", handleConnection);
    socket.on("disconnect", handleDisconnection);


    return () => {
      socket.off("newMessage", handleMessage);
      socket.off("connect", handleConnection);
      socket.off("disconnect", handleDisconnection);

    };
  }, [socket, setMessages, messages]);

  const sendMessage = (text: string) => {

    const message: Message = {
      content: text,
      groupId: selectedMsg?._id,
      senderId: user?._id,
      name: user?.first_name,
      time: new Date().toISOString(),
      message: text
    };

    socket.emit('sendMessage', message);
    setMessages((prev) => [...prev, message]);
  };

  const isMine = (m: Message) => (m.sender ?? m.senderId) === userId;

  return {
    selectedChat,
    selectChat,
    messages,
    setMessages,
    sendMessage,
    isMine,
    isConnected,
  };
}

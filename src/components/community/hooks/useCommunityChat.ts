// src/components/community/CommunitySide/hooks/useCommunityChat.ts
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getMessage } from '@/features/community/services/communityservices';
import type { Chat, Community, Message } from '../type';

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
  communities,
  userName,
  receiveEventName = 'sendMessage',
}: UseCommunityChatArgs) {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState<boolean>(false)

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
  }, [selectedChat?._id]);


  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message:Message) => {
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
    if (!socket || !selectedChat || !text.trim() || !userId) return;

    const message: Message = {
      content: text,
      groupId: selectedChat._id,
      senderId: userId,
      name: userName,
      time: new Date().toISOString(),
    };

    socket.emit('sendMessage', message);
    console.log('Message EMit', message)
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
  };
}

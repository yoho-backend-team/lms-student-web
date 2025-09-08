/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetLocalStorage } from '@/utils/helper';
import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export function useStudentSocket() {
	return useContext(SocketContext);
}

export const StudentSocketProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [socket, setSocket] = useState<Socket | null>(null);

	const store: any = GetLocalStorage('user') ?? '{}'
	const user = store

	useEffect(() => {
		const url = import.meta.env.VITE_public_Backend_url;

		const socketIO = io(url, {
			query: { userId: user._id },
			transports: ['websocket'],
		});

		setSocket(socketIO);

		socketIO.emit('registerOnline', { userId: user._id });
		return () => {
			socketIO.disconnect();
		};
	}, [user._id]);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

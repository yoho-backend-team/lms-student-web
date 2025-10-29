export type Community = {
	_id: string;
	group: string;
	last_message?: {
		message: string;
		timestamp: string;
	};
	users: { user: string; isblock: boolean }[];
	groupimage?: any;
	admin?: { first_name: string }[];
	batch?: {
		_id: string;
		name: string;
		groupImage?: any;
	};
	name: string;
	members?: string;
};

export type Chat = {
	_id: string;
	name: string;
	lastMessage: string;
	time: string | Date;
	members: string;
	groupImage?: any | null;
	admin: string;
};

export type Message = {
	content?: string;
	time?: string;
	sender?: string;
	sender_name?: string;
	name?: string;
	message?: string;
	timestamp?: string | Date;
	groupId?: string;
	senderId?: string;
	_id?: string;
};

export type CommunitiesProp = {
	data?: Community[];
};

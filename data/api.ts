// ----------------------------------------- ChatController -----------------------------------------

// GET /chat/{chatId}/messages
export type ChatResponse = {
	chatId: string;
	userIds: string[];
};

// GET /chat/{chatId}/messages
export type ChatMessages = {
	messages: MessageOutput[];
};

// POST /chat
export type CreateChatRequest = {
	usernames: string[];
};

// ----------------------------------------- AuthenticationController -----------------------------------------

// POST /auth/login
export type LoginForm = {
	username: string;
	password: string;
};

// POST /auth/register
export type RegisterForm = {
	username: string;
	email: string;
	password: string;
};

// POST /auth
export type AuthenticationResponse = {
	id: string;
	username: string;
	userRole: string;
	token: string;
};

// ----------------------------------------- MessageController -----------------------------------------

// MESSAGE MAPPING /secured/chatting
export type MessageInput = {
	fromUserId: string;
	text: string;
};

// SEND TO /secured/chat_messages
export type MessageOutput = {
	username: string;
	text: string;
	time: string;
};

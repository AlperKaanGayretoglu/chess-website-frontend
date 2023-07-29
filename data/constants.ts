import { MessageSocket } from "../services/messageSocketApi";

export const COOKIE_NAMES = {
	userId: "chessWebsite_userId",
	username: "chessWebsite_username",
	userRole: "chessWebsite_role",
	token: "chessWebsite_token",
};

export const ADMIN_ONLY_PAGES = [];

export const API_MAIN_URL = "http://localhost:8080";

export const API_ENDPOINTS = {
	register: API_MAIN_URL + "/auth/register",
	login: API_MAIN_URL + "/auth/login",
	chat: API_MAIN_URL + "/chat",
};

export const API_WEBSOCKET_ENDPOINTS = {
	CHAT: {
		main: `${API_MAIN_URL}/secured/chatting`,
		subscribe: "/secured/chat_messages",
		send: "/app/secured/chatting",
	},
};

export type ChatIdToSocketConnection = {
	chatId: string;
	connection: MessageSocket;
};

export const socketConnections = {
	CHAT: [] as ChatIdToSocketConnection[],
};

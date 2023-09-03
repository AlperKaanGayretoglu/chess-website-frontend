import { ChessMoveSocket } from "../services/chessMoveSocketApi";

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
	chessGame: API_MAIN_URL + "/game",
	chessGamePlayers: API_MAIN_URL + "/game/players",
};

export const API_WEBSOCKET_ENDPOINTS = {
	CHESS_GAME: {
		main: `${API_MAIN_URL}/secured/gaming`,
		subscribe: "/secured/moves",
		send: "/app/secured/gaming",
	},
};

export type GameIdToSocketConnection = {
	gameId: string;
	connection: ChessMoveSocket;
};

export const socketConnections = {
	CHESS_GAME: [] as GameIdToSocketConnection[],
};

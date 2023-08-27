import { PlayChessMoveRequest, PlayedChessMoveResponse } from "../data/api";
import {
	API_WEBSOCKET_ENDPOINTS,
	COOKIE_NAMES,
	socketConnections,
} from "../data/constants";

import { getCookie } from "cookies-next";
import Stomp from "stompjs";
import StompWebSocket from "../utils/stompInstance";

export class ChessMoveSocket extends StompWebSocket<PlayChessMoveRequest> {
	constructor(
		gameId: string,
		getChessMoveCallback: (message: PlayedChessMoveResponse) => void,
		token: string | true
	) {
		super(
			API_WEBSOCKET_ENDPOINTS.CHESS_GAME.main,
			API_WEBSOCKET_ENDPOINTS.CHESS_GAME.subscribe + "/" + gameId,
			API_WEBSOCKET_ENDPOINTS.CHESS_GAME.send + "/" + gameId,
			(message: Stomp.Message) =>
				getChessMoveCallback(
					JSON.parse(message.body) as PlayedChessMoveResponse
				),
			{
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			}
		);
	}
}

export const getChessMoveSocket = async (
	gameId: string,
	getChessMoveCallback: (message: PlayedChessMoveResponse) => void
) => {
	try {
		const token = getCookie(COOKIE_NAMES.token);

		if (token) {
			socketConnections.CHESS_GAME.forEach((item) => {
				item.connection.unsubscribe();
				item.connection.disconnect();
				console.log("[DISCONNECTED ITEM]");
			});

			const chessMoveApi = new ChessMoveSocket(
				gameId,
				getChessMoveCallback,
				token
			);
			const connection = await chessMoveApi.connect();

			const existingConnection = socketConnections.CHESS_GAME.find(
				(item) => item.gameId === gameId
			);

			if (existingConnection) {
				existingConnection.connection = connection;
				console.log("[REPLACED EXISTING CONNECTION]");
			} else {
				socketConnections.CHESS_GAME.push({ gameId, connection });
				console.log("[PUSHED NEW CONNECTION]");
			}
			return connection;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

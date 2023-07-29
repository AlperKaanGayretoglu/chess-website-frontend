import { MessageInput, MessageOutput } from "../data/api";
import {
	API_WEBSOCKET_ENDPOINTS,
	COOKIE_NAMES,
	socketConnections,
} from "../data/constants";

import { getCookie } from "cookies-next";
import Stomp from "stompjs";
import StompWebSocket from "../utils/stompInstance";

export class MessageSocket extends StompWebSocket<MessageInput> {
	constructor(
		chatId: string,
		getMessageCallback: (message: MessageOutput) => void,
		token: string | true
	) {
		super(
			API_WEBSOCKET_ENDPOINTS.CHAT.main,
			API_WEBSOCKET_ENDPOINTS.CHAT.subscribe + "/" + chatId,
			API_WEBSOCKET_ENDPOINTS.CHAT.send + "/" + chatId,
			(message: Stomp.Message) =>
				getMessageCallback(JSON.parse(message.body) as MessageOutput),
			{
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			}
		);
	}
}

export const getMessageSocket = async (
	chatId: string,
	getMessageCallback: (message: MessageOutput) => void
) => {
	try {
		const token = getCookie(COOKIE_NAMES.token);

		if (token) {
			socketConnections.CHAT.forEach((item) => {
				item.connection.unsubscribe();
				item.connection.disconnect();
				console.log("[DISCONNECTED ITEM]");
			});

			const messageApi = new MessageSocket(chatId, getMessageCallback, token);
			const connection = await messageApi.connect();

			const existingConnection = socketConnections.CHAT.find(
				(item) => item.chatId === chatId
			);

			if (existingConnection) {
				existingConnection.connection = connection;
				console.log("[REPLACED EXISTING CONNECTION]");
			} else {
				socketConnections.CHAT.push({ chatId, connection });
				console.log("[PUSHED NEW CONNECTION]");
			}
			return connection;
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

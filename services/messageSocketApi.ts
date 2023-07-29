import { MessageInput, MessageOutput } from "../data/api";
import { API_WEBSOCKET_ENDPOINTS, COOKIE_NAMES } from "../data/constants";

import { getCookie } from "cookies-next";
import Stomp from "stompjs";
import StompWebSocket from "../utils/stompInstance";

class MessageSocket extends StompWebSocket<MessageInput> {
	constructor(
		getMessageCallback: (message: MessageOutput) => void,
		token: string | true
	) {
		super(
			API_WEBSOCKET_ENDPOINTS.CHAT.main,
			API_WEBSOCKET_ENDPOINTS.CHAT.subscribe,
			API_WEBSOCKET_ENDPOINTS.CHAT.send,
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
	getMessageCallback: (message: MessageOutput) => void
) => {
	try {
		const token = getCookie(COOKIE_NAMES.token);
		if (token) {
			const messageApi = new MessageSocket(getMessageCallback, token);
			return await messageApi.connect();
		}
	} catch (error) {
		console.log(error);
		throw error;
	}
};

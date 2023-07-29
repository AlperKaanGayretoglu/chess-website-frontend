import sendRequest, { RequestMethod } from "../utils/sendRequest";

import { CreateChatRequest } from "../data/api";
import { API_ENDPOINTS } from "../data/constants";

export const getChatMessages = async (chatId: string) => {
	try {
		return await sendRequest(
			API_ENDPOINTS.chatting + "/" + chatId + "/messages",
			RequestMethod.GET
		);
	} catch (error) {
		console.log("[ERROR]: " + error);
	}
};

export const createChat = async (request: CreateChatRequest) => {
	try {
		return await sendRequest(
			API_ENDPOINTS.chatting,
			RequestMethod.POST,
			request
		);
	} catch (error) {
		console.log("[ERROR]: " + error);
	}
};

import sendRequest, { RequestMethod } from "../utils/sendRequest";

import { CreateChessGameRequest } from "../data/api";
import { API_ENDPOINTS } from "../data/constants";

export const getChessGame = async (chessGameId: string) => {
	try {
		return await sendRequest(
			API_ENDPOINTS.chessGame + "/" + chessGameId,
			RequestMethod.GET
		);
	} catch (error) {
		console.log("[ERROR]: " + error);
	}
};

export const createChessGame = async (request: CreateChessGameRequest) => {
	try {
		return await sendRequest(
			API_ENDPOINTS.chessGame,
			RequestMethod.POST,
			request
		);
	} catch (error) {
		console.log("[ERROR]: " + error);
	}
};

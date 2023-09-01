import { ChessGameResponse, ChessPieceResponse } from "./api";

import useSWR from "swr";
import { getChessGame } from "../services/chessGameApi";

export function useChessGame(gameId: string) {
	const { data, isLoading, error, mutate } = useSWR(
		"api_chess_game",
		() => getChessGame(gameId),
		{
			revalidateOnFocus: false,
			revalidateOnMount: true,
			revalidateOnReconnect: false,
			refreshWhenOffline: false,
			refreshWhenHidden: false,
			refreshInterval: 0,
		}
	);

	if (data) {
		const map = new Map<string, ChessPieceResponse>();
		for (const [key, value] of Object.entries(data.board.board)) {
			map.set(key, value as ChessPieceResponse);
		}
		data.board.board = map;
	}

	const chessGameResponse: ChessGameResponse = data as ChessGameResponse;

	return {
		data: chessGameResponse,
		isLoading,
		error,
		mutate,
	};
}

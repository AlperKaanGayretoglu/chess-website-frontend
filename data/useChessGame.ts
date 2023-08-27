import useSWR from "swr";
import { getChessGame } from "../services/chessGameApi";
import { ChessGameResponse } from "./api";

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

	const chessGameResponse: ChessGameResponse = data as ChessGameResponse;

	return {
		data: chessGameResponse,
		isLoading,
		error,
		mutate,
	};
}

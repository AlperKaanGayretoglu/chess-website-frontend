import useSWR from "swr";
import { getChessGame } from "../services/chessGameApi";
import { ChessGameResponse } from "./api";

export function useChessGame(chatId: string) {
	const { data, isLoading, error, mutate } = useSWR(
		"api_chat",
		() => getChessGame(chatId),
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

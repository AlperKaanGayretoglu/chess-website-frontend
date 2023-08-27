import useSWR from "swr";
import { getChessMoveSocket } from "../services/chessMoveSocketApi";
import { PlayedChessMoveResponse } from "./api";

export default function useChessMoveSocket(
	gameId: string,
	getChessMoveCallback: (chessMove: PlayedChessMoveResponse) => void
) {
	const { data, isLoading, error, mutate } = useSWR(
		"api_chess_move",
		() => getChessMoveSocket(gameId, getChessMoveCallback),
		{
			revalidateOnFocus: false,
			revalidateOnMount: true,
			revalidateOnReconnect: false,
			refreshWhenOffline: false,
			refreshWhenHidden: false,
			refreshInterval: 0,
		}
	);

	const chessMoveSocket = data;

	return {
		data: {
			chessMoveSocket: chessMoveSocket,
		},
		isLoading,
		error,
		mutate,
	};
}

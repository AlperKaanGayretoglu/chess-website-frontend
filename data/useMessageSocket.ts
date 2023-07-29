import useSWR from "swr";
import { getMessageSocket } from "../services/messageSocketApi";
import { MessageOutput } from "./api";

export default function useMessageSocket(
	getMessageCallback: (message: MessageOutput) => void
) {
	const { data, isLoading, error, mutate } = useSWR(
		"api_message",
		() => getMessageSocket(getMessageCallback),
		{
			revalidateOnFocus: false,
			revalidateOnMount: true,
			revalidateOnReconnect: false,
			refreshWhenOffline: false,
			refreshWhenHidden: false,
			refreshInterval: 0,
		}
	);

	const messageSocket = data;

	return {
		data: {
			messageSocket: messageSocket,
		},
		isLoading,
		error,
		mutate,
	};
}

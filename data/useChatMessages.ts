import useSWR from "swr";
import { getChatMessages } from "../services/chatApi";
import { ChatMessages } from "./api";

export function useChatMessages(chatId: string) {
	const { data, isLoading, error, mutate } = useSWR(
		"api_chat_messages",
		() => getChatMessages(chatId),
		{
			revalidateOnFocus: false,
			revalidateOnMount: true,
			revalidateOnReconnect: false,
			refreshWhenOffline: false,
			refreshWhenHidden: false,
			refreshInterval: 0,
		}
	);

	const chatMessages: ChatMessages = {
		messages: data || [],
	};

	return {
		data: chatMessages,
		isLoading,
		error,
		mutate,
	};
}

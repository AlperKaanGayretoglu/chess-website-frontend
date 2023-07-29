import useSWR from "swr";
import { getChatMessages } from "../services/chatApi";
import { MessageOutput } from "../services/messageSocketApi";

export type ChatMessages = {
	messages: MessageOutput[];
};

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

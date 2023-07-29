import useSWR from "swr";
import { getChat } from "../services/chatApi";
import { ChatResponse } from "./api";

export function useChat(chatId: string) {
	const { data, isLoading, error, mutate } = useSWR("api_chat", () =>
		getChat(chatId)
	);

	const chatInfo: ChatResponse = data as ChatResponse;

	return {
		data: chatInfo,
		isLoading,
		error,
		mutate,
	};
}

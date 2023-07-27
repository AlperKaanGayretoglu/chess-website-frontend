import { API_WEBSOCKET_ENDPOINTS } from "../data/constants";
import Stomp from "stompjs";
import StompWebSocket from "../utils/stompInstance";

export interface MessageInput {
  from: string;
  text: string;
}

export interface MessageOutput {
  from: string;
  text: string;
  time: string;
}

class MessageSocket extends StompWebSocket<MessageInput> {

  constructor(getMessageCallback: (message: MessageOutput) => void, token: string | true) {
      super(
          API_WEBSOCKET_ENDPOINTS.CHAT,
          '/topic/messages',
          (message: Stomp.Message) => getMessageCallback(JSON.parse(message.body) as MessageOutput),
          '/app/chat',
          {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
          }
      )
  }
  
}

export const getMessageSocket = async (getMessageCallback: (message: MessageOutput) => void) => {
  try {
    // const token = getCookie(COOKIE_NAMES.token);
    const token = "getCookie(COOKIE_NAMES.token)";
    if (token) {
      const messageApi = new MessageSocket(getMessageCallback, token);
      return await messageApi.connect();
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

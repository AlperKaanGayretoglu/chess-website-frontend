import {
	DefaultBase,
	DefaultContainer,
	Title,
} from "../../styles/layouts/Default/Default.style";

import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { MessageOutput } from "../../data/api";
import { COOKIE_NAMES } from "../../data/constants";
import { useChatMessages } from "../../data/useChatMessages";
import useMessageSocket from "../../data/useMessageSocket";
import General from "../../styles/layouts/General/General";
import { redirectUser } from "../../utils/checkUser";

export default function Home() {
	const param = useRouter().query;
	const { id } = param;
	const chatId = id as string;
	const userId = getCookie(COOKIE_NAMES.userId);

	// TODO: Live reload messes things up (what to do about it?) (if the user can't do something like that, then it's not a problem???)
	const messageSocket = useMessageSocket(getMessageCallback).data.messageSocket;

	const [message, setMessage] = useState("");

	const { data, isLoading } = useChatMessages(chatId);

	// Do this when a message is received
	function getMessageCallback(message: MessageOutput) {
		const messageElement = document.createElement("div");
		messageElement.innerHTML = `<p>[${message.username}] ${message.text}</p>`;

		const mainElement = document.getElementById("stomp-table");

		mainElement.appendChild(messageElement);
	}

	function sendMessage() {
		messageSocket.sendMessage({
			chatId: chatId,
			fromUserId: userId as string,
			text: message,
		});
	}

	return (
		<General>
			<DefaultBase>
				<DefaultContainer>
					<Title>Chat</Title>
					<input
						id="message"
						onChange={() =>
							setMessage(
								(document.getElementById("message") as HTMLInputElement).value
							)
						}
					/>
					<button onClick={sendMessage}>Send</button>
					<div id="stomp-table">
						{!isLoading &&
							data?.messages?.map((message, index) => {
								return (
									<div key={index}>
										<p>
											[{message.username}] {message.text}
										</p>
									</div>
								);
							})}
					</div>
				</DefaultContainer>
			</DefaultBase>
		</General>
	);
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}

import { GetServerSidePropsContext } from "next";
import useMessageSocket from "../data/useMessage";
import { MessageOutput } from "../services/messageApi";
import General from "../styles/layouts/General/General";
import { redirectUser } from "../utils/checkUser";

const SendMessage = () => {
	// TODO: Live reload messes things up (what to do about it?) (if the user can't do something like that, then it's not a problem???)

	// Do this when a message is received
	function getMessageCallback(message: MessageOutput) {
		const messageElement = document.createElement("p");
		messageElement.appendChild(
			document.createTextNode(JSON.stringify(message))
		);

		const mainElement = document.getElementById("stomp-table");
		mainElement.appendChild(messageElement);
	}

	function sendMessage() {
		messageSocket.sendMessage({
			from: "A",
			text: "Hello World",
		});
	}

	const messageSocket = useMessageSocket(getMessageCallback).data.messageSocket;

	return (
		<General>
			<div id="stomp-table">
				<button onClick={sendMessage}>Send</button>
			</div>
		</General>
	);
};

export default SendMessage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
	return redirectUser(ctx) ?? { props: {} };
}

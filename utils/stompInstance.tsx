import SockJS from "sockjs-client";
import Stomp from "stompjs";

export default class StompWebSocket<T> {
	private readonly stompClient: Stomp.Client;

	private readonly subscriptionUrl: string;
	private readonly getMessageCallback: (message: Stomp.Message) => void;

	private readonly sendUrl: string;
	private readonly headers: {};

	constructor(
		connectionUrl: string,
		subscriptionUrl: string,
		getMessageCallback: (message: Stomp.Message) => void,
		sendUrl: string,
		headers?: {}
	) {
		this.subscriptionUrl = subscriptionUrl;
		this.getMessageCallback = getMessageCallback;

		this.sendUrl = sendUrl;
		this.headers = headers;

		const socket = new SockJS(connectionUrl);
		this.stompClient = Stomp.over(socket);

		this.stompClient.debug = null;
	}

	public async connect() {
		const client = this.stompClient;
		const subUrl = this.subscriptionUrl;
		const callBack = this.getMessageCallback;

		await client.connect({}, (frame: Stomp.Frame) => {
			console.log("[CONNECTED WEB SOCKET]: ");

			client.subscribe(subUrl, callBack);
		});

		return this;
	}

	public sendMessage(jsonObj: T) {
		if (this.stompClient.connected) {
			this.stompClient.send(
				this.sendUrl,
				this.headers,
				JSON.stringify(jsonObj)
			);
		}
	}

	public disconnect() {
		this.stompClient.disconnect(() => {
			console.log("[DISCONNECTED WEB SOCKET]");
		});
	}
}

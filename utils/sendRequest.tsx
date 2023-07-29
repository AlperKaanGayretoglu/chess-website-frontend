import { getCookie } from "cookies-next";
import { COOKIE_NAMES } from "../data/constants";

export enum RequestMethod {
	GET = "GET",
	POST = "POST",
	PUT = "PUT",
	DELETE = "DELETE",
}

const sendRequest = async (
	apiUrl: string,
	method: RequestMethod,
	body: {} = undefined,
	isAuthorized: boolean = true
) => {
	try {
		const token = getCookie(COOKIE_NAMES.token);
		if (token || !isAuthorized) {
			const res = await fetch(apiUrl, {
				method: method.toString(),
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify(body),
			});

			const result = await res.json();
			return result;
		}
	} catch (error) {
		if (error.message && error.message.includes("Failed to fetch")) {
			error.message = "Failed to Connect to Server";
		}
		return Promise.resolve(error);
	}
};

export default sendRequest;

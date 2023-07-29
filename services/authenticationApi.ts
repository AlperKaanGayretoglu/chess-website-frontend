import { deleteCookie, setCookie } from "cookies-next";
import { AuthenticationResponse, LoginForm, RegisterForm } from "../data/api";
import { API_ENDPOINTS, COOKIE_NAMES } from "../data/constants";
import sendRequest, { RequestMethod } from "../utils/sendRequest";

export const register = async (form: RegisterForm) => {
	try {
		const result = await sendRequest(
			API_ENDPOINTS.register,
			RequestMethod.POST,
			form,
			false
		);

		if (result && result.token) {
			const response = result as AuthenticationResponse;
			setCookie(COOKIE_NAMES.userId, response.id);
			setCookie(COOKIE_NAMES.username, response.username);
			setCookie(COOKIE_NAMES.userRole, response.userRole);
			setCookie(COOKIE_NAMES.token, response.token);
		}

		return result;
	} catch (error) {
		console.log("[ERROR]: " + error);
	}
};

export const login = async (form: LoginForm) => {
	try {
		const result = await sendRequest(
			API_ENDPOINTS.login,
			RequestMethod.POST,
			form,
			false
		);

		if (result && result.token) {
			const response = result as AuthenticationResponse;
			setCookie(COOKIE_NAMES.userId, response.id);
			setCookie(COOKIE_NAMES.username, response.username);
			setCookie(COOKIE_NAMES.userRole, response.userRole);
			setCookie(COOKIE_NAMES.token, response.token);
		}

		return result;
	} catch (error) {
		console.log("[ERROR]: " + error);
	}
};

export const logout = async () => {
	try {
		Object.values(COOKIE_NAMES).forEach((cookieName) => {
			deleteCookie(cookieName);
		});
	} catch (error) {
		console.log("[ERROR]: " + error);
	}
};

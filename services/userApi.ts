import { deleteCookie, setCookie } from 'cookies-next';
import { API_ENDPOINTS, COOKIE_NAMES } from '../data/constants';
import sendRequest, { RequestMethod } from '../utils/sendRequest';

export type LoginForm = {
	username: string;
	password: string;
};

export type RegisterForm = {
	username: string;
	email: string;
	password: string;
};

export const register = async (form: RegisterForm) => {
    try {
        const result = await sendRequest(
            API_ENDPOINTS.register,
            RequestMethod.POST,
            form,
            false
        );
        
        if (result && result.token) {
            setCookie(COOKIE_NAMES.token, result.token);
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
            setCookie(COOKIE_NAMES.token, result.token);
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

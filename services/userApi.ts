import { deleteCookie, setCookie } from 'cookies-next';
import { API_ENDPOINTS, COOKIE_NAMES } from '../data/constants';
import sendRequest, { RequestMethod } from '../utils/sendRequest';

export const login = async (form: any) => {
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

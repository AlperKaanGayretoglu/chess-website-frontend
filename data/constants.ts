export const COOKIE_NAMES = {
    userId: 'chessWebsite_userId',
    userRole: 'chessWebsite_role',
    token: 'chessWebsite_token',
};

export const ADMIN_ONLY_PAGES = [
];

export const API_MAIN_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    register: API_MAIN_URL + '/auth/register',
    login: API_MAIN_URL + '/auth/login',
    chat: API_MAIN_URL + '/chatting',
};

export const API_WEBSOCKET_ENDPOINTS = {
    CHAT: `${API_MAIN_URL}/secured/chatting`,
};

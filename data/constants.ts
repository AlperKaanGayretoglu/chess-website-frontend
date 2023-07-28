export const COOKIE_NAMES = {
    token: 'chessWebsite_token',
    role: 'chessWebsite_role',
};

export const ADMIN_ONLY_PAGES = [
];

export const API_MAIN_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
    register: API_MAIN_URL + '/auth/register',
    login: API_MAIN_URL + '/auth/login',
};

export const API_WEBSOCKET_ENDPOINTS = {
    CHAT: `${API_MAIN_URL}/chat`,
};

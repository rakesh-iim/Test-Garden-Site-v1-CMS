const TOKEN_KEY = 'mrgardenr_cms_token';
export const AUTH_LOGOUT_EVENT = 'mrgardenr:auth-logout';

export const getStoredToken = () => window.localStorage.getItem(TOKEN_KEY);

export const storeToken = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token);
};

export const clearStoredToken = () => {
  window.localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
};

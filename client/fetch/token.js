import axios from 'axios';

const getToken = () => {
  return window.localStorage.getItem('jwt') || null;
};

const setToken = token => {
  window.localStorage.setItem('jwt', token);
  setAuthorizationHeader(token);
};

const clearToken = () => {
  window.localStorage.removeItem('jwt');
  axios.defaults.headers.common['Authorization'] = undefined;
};

const initToken = () => {
  const token = getToken();
  if (token) {
    setAuthorizationHeader(token);
  }
  return token;
}

const setAuthorizationHeader = (token) => {
  axios.defaults.headers.common['Authorization'] = `Token ${token}`;
}

export {
  getToken,
  setToken,
  clearToken,
  initToken
}

import axios from 'axios';

import users from './users';
import { initToken } from './token';

function initFetch() {
  axios.defaults.baseURL = 'http://127.0.0.1:8080/api';
  return initToken();
}

export { 
  initFetch,
  users
};

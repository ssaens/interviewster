import axios from 'axios';

import admin from './admin';
import users from './users';
import { initToken } from './token';

function initFetch() {
  axios.defaults.baseURL = '/api';
  return initToken();
}

export {
  admin,
  initFetch,
  users
};

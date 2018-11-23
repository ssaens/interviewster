import axios from 'axios';

const me = () => axios.get('/users/me');
const login = (email, password) => axios.post('/users/login', { email, password });
const create = (username, email, password) => axios.post('/users/create', { username, email, password });

export default {
  me,
  login,
  create
};

import axios from 'axios';

const getSkills = q => axios.get('/skills', { params: { q } });
const getSkill = id => axios.get(`/skills/${id}`);
const getFeaturedSkills = () => axios.get('/skills?featured=true');
const createSkill = model => axios.post('/skills', model);
const deleteSkill = id => axios.delete(`/skills/${id}`);

const getRoles = q => axios.get('/roles', { params: { q } });
const getRole = id => axios.get(`/roles/${id}`);
const getPopularRoles = () => axios.get('/roles?popular=true');
const createRole = model => axios.post('/roles', model);
const deleteRole = id => axios.delete(`/roles/${id}`);

export default {
  createSkill,
  getSkills,
  getFeaturedSkills,
  getRoles,
  createRole,
  getPopularRoles
};

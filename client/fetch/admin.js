import axios from 'axios';

const getSkills = (q, limit) => axios.get('/skills', { params: { q, limit } });
const getSkill = id => axios.get(`/skills/${id}`);
const getFeaturedSkills = () => axios.get('/skills?featured=true');
const createSkill = model => axios.post('/skills', model);
const deleteSkill = id => axios.delete(`/skills/${id}`);

const getRoles = (q, limit) => axios.get('/roles', { params: { q, limit } });
const getRole = id => axios.get(`/roles/${id}`);
const getPopularRoles = v => axios.get('/roles', { params: { v } });
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

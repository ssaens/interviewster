import axios from 'axios';

const getSkills = (q, limit) => axios.get('/skills', { params: { q, limit } });
const getSkill = id => axios.get(`/skills/${id}`);
const getFeaturedSkills = () => axios.get('/skills?featured=true');
const createSkill = model => axios.post('/skills', model);
const deleteSkill = id => axios.delete(`/skills/${id}`);

const getRoles = (q, limit) => axios.get('/roles', { params: { q, limit, v: true } });
const getRole = id => axios.get(`/roles/${id}`);
const getPopularRoles = v => axios.get('/roles', { params: { popular: true, v } });
const createRole = model => axios.post('/roles', model);
const deleteRole = id => axios.delete(`/roles/${id}`);

const createGuide = model => axios.post('/guides', model);
const getGuides = () => axios.get('/guides');
const getGuide = id => axios.get(`/guides/${id}`)

export default {
  createSkill,
  getSkills,
  getFeaturedSkills,
  getRoles,
  createRole,
  getPopularRoles,
  createGuide,
  getGuides,
  getGuide
};

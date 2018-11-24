import axios from 'axios';

const getSkills = q => axios.get('/skills', { params: { q } });
const getSkill = id => axios.get(`/skills/${id}`)
const getFeatured = () => axios.get('/skills?featured=true');
const createSkill = model => axios.post('/skills', model);
const deleteSkill = id => axios.delete(`/skills/${id}`)

export default {
  createSkill,
  getSkills,
  getFeatured
};

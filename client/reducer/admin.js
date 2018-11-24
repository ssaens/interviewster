import { combineReducers } from 'redux';
import {
  CREATE_SKILL,
  ADD_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  REORDER_QUESTION,
  ASYNC_START,
  ASYNC_END,
  SKILLS_LOAD,
  FEATURED
} from './action-types';

const getUniqueNumber = (() => {
  let nextUniqueNumber = 0;
  return () => ++nextUniqueNumber;
})();

const makeQuestion = () => ({
  _id: getUniqueNumber(),
  text: '',
  rubric: []
});

const makeRubricItem = () => ({
  points: 0,
  desc: ''
})

const defaultCreateSkillState = () => ({
  busy: false,
  errors: null,
  name: '',
  questions: []
});

const defaultSkillsState = {
  featuredLoaded: false,
  featured: [],
  skillsBusy: true,
  skills: [],
  createFormModel: defaultCreateSkillState(),
  editFormModel: null
};

const defaultRolesState = {
  popularLoaded: false,
  popular: [],
  rolesBusy: true,
  roles: []
};

const createSkill = (state, action) => {
  switch (action.subtype) {
    case ADD_QUESTION: {
      return {
        ...state,
        questions: [ ...state.questions, makeQuestion() ]
      };
    }
    case REORDER_QUESTION: 
    case DELETE_QUESTION: {
      return {
        ...state,
        questions: action.payload
      }
    }
    case ASYNC_START:
      return {
        ...state,
        busy: true
      }
    case ASYNC_END: {
      if (action.payload.errors) {
        return {
          ...state,
          errors: action.payload.errors
        };
      } else {
        return defaultCreateSkillState()
      }
    }
    default:
      return state;
  }
};

const skills = (state=defaultSkillsState, action) => {
  switch (action.type) {
    case CREATE_SKILL:
      return {
        ...state,
        createFormModel: createSkill(state.createFormModel, action)
      }
    case SKILLS_LOAD: {
      if (action.subtype === FEATURED) {
        return {
          ...state,
          featured: action.payload,
          featuredLoaded: true
        }
      } else {
        return {
          ...state,
          skills: action.payload,
          skillsBusy: false
        }
      }
    }
    default:
      return state;
  }
};

const roles = (state=defaultRolesState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({
  skills, roles
});

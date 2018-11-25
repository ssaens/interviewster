import { combineReducers } from 'redux';
import {
  ASYNC_START,
  ASYNC_END,
  GUIDE_LOAD,
  POPULAR,
  FEATURED,
  GUIDE_SELECT_ROLE,
  GUIDE_ROLE_AUTOSUGGEST,
  GUIDE_SKILL_AUTOSUGGEST,
  GUIDE_ATTACH_SKILL,
  GUIDE_REMOVE_SKILL,
  GUIDE_SELECT_DURATION,
  GUIDE_TO_RUBRIC,
  GUIDE_ADD_QUESTION,
  GUIDE_DELETE_QUESTION,
  GUIDE_REORDER_QUESTION,
  GUIDE_REQUEST_AUTH,
  GUIDE_CREATE,
  MODAL_OPEN,
  MODAL_CLOSE,
  LOGIN,
  REGISTER,
  GUIDE_TO_FINISH
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

const guideModelDefaultState = {
  role: null,
  skills: [],
  questions: [],
  duration: 30,
  redirect: null
};

const guideMetaDefaultState = {
  loadedRoles: false,
  popularRoles: [],
  loadedSkills: false,
  featuredSkills: [],
  waitingFor: null,
  suggestedRoles: null,
  suggestedSkills: null,
  creatingGuide: false,
  activeModal: null
}

const model = (state=guideModelDefaultState, action) => {
  switch (action.type) {
    case GUIDE_SELECT_ROLE:
      return {
        ...state,
        role: action.payload,
        skills: action.payload ? [ ...action.payload.skills ] : []
      }
    case GUIDE_ATTACH_SKILL: {
      if (!state.skills.find(skill => skill._id === action.payload._id) & state.skills.length < 8) {
        return {
          ...state,
          skills: [ ...state.skills, action.payload ]
        };
      } else {
        return state;
      }
    }
    case GUIDE_REMOVE_SKILL:
     return {
        ...state,
        skills: state.skills.filter(skill => skill._id !== action.payload._id)
     };
    case GUIDE_SELECT_DURATION:
      return {
        ...state,
        duration: action.payload
      };
    case GUIDE_TO_RUBRIC: {
      const questions = [];
      for (const skill of state.skills) {
        for (const question of skill.questions) {
          questions.push({ 
            ...question, 
            rubric: [ ...question.rubric.map(item => ({ ...item })) ] 
          });
        }
      }
      return {
        ...state,
        questions: questions
      };
    }
    case GUIDE_ADD_QUESTION: {
      return {
        ...state,
        questions: [ ...state.questions, makeQuestion() ]
      };
    }
    case GUIDE_DELETE_QUESTION: {
      return {
        ...state,
        questions: state.questions.filter(q => q._id !== action.payload._id)
      }
    }
    case GUIDE_REORDER_QUESTION: {
      return {
        ...state,
        questions: action.payload
      }
    }
    case GUIDE_TO_FINISH: {
      return guideModelDefaultState
    }
    default:
      return state;
  }
};

const meta = (state=guideMetaDefaultState, action) => {
  switch (action.type) {
    case GUIDE_LOAD: {
      if (action.subtype === POPULAR) {
        return {
          ...state,
          loadedRoles: true,
          popularRoles: action.payload
        };
      } else if (action.subtype === FEATURED) {
        return {
          ...state,
          loadedSkills: true,
          featuredSkills: action.payload
        };
      }
    }
    case GUIDE_SELECT_ROLE: {
      return {
        ...state,
        suggestedRoles: null
      };
    }
    case GUIDE_ROLE_AUTOSUGGEST: {
      if (action.subtype === ASYNC_START) {
        return {
          ...state,
          waitingFor: action.payload
        };
      } else if (action.subtype === ASYNC_END) {
        return {
          ...state,
          waitingFor: null,
          suggestedRoles: action.payload
        };
      }
    }
    case GUIDE_SKILL_AUTOSUGGEST: {
      if (action.subtype === ASYNC_START) {
        return {
          ...state,
          waitingFor: action.payload
        };
      } else if (action.subtype === ASYNC_END) {
        return {
          ...state,
          waitingFor: null,
          suggestedSkills: action.payload
        };
      }
    }
    case GUIDE_REQUEST_AUTH: {
      if (action.subtype === MODAL_OPEN) {
        return { ...state, activeModal: true };
      } else if (action.subtype === MODAL_CLOSE) {
        return { ...state, activeModal: false };
      } else if (action.subtype === LOGIN) {
        return { ...state, activeModal: false };
      } else if (action.subtype === REGISTER) {
        return { ...state, activeModal: false };
      } else {
        return state;
      }
    }
    case GUIDE_CREATE: {
      if (action.subtype === ASYNC_START) {
        return { ...state, creatingGuide: 'request' };
      } else if (action.subtype === ASYNC_END) {
        if (action.payload.errors) {
          return { ...state, creatingGuide: null };
        } else {
          return { ...state, creatingGuide: 'done' };
        }
      } else {
        return state;
      }
    }
    case GUIDE_TO_FINISH: {
      return { ...guideMetaDefaultState, redirect: '/guides' };
    }
    default:
      return state;
  }
};

export default combineReducers({ meta, model });

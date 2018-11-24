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
  GUIDE_SELECT_DURATION
} from './action-types';

const guideModelDefaultState = {
  role: null,
  skills: [],
  questions: [],
  duration: 30
};

const guideMetaDefaultState = {
  loadedRoles: false,
  popularRoles: [],
  loadedSkills: false,
  featuredSkills: [],
  waitingFor: null,
  suggestedRoles: null,
  suggestedSkills: null
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
      if (!state.skills.find(skill => skill._id === action.payload._id)) {
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
    
    default:
      return state;
  }
};

export default combineReducers({ meta, model });

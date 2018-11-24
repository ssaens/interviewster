import { combineReducers } from 'redux';
import {
  ASYNC_START,
  ASYNC_END,
  GUIDE_LOAD,
  POPULAR,
  FEATURED,
  GUIDE_SELECT_ROLE,
  GUIDE_ROLE_AUTOSUGGEST
} from './action-types';

const guideModelDefaultState = {
  role: null,
  skills: [],
  questions: [],
  duration: 30
};

const guideMetaDefaultState = {
  loaded: false,
  popularRoles: [],
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
        role: action.payload
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
          loaded: true,
          popularRoles: action.payload
        }
      }
    }
    case GUIDE_SELECT_ROLE: {
      return {
        ...state,
        suggestedRoles: null
      }
    }
    case GUIDE_ROLE_AUTOSUGGEST: {
      if (action.subtype === ASYNC_START) {
        return {
          ...state,
          waitingFor: action.payload
        }
      } else if (action.subtype === ASYNC_END) {
        return {
          ...state,
          waitingFor: null,
          suggestedRoles: action.payload
        }
      }
    }
    default:
      return state;
  }
};

export default combineReducers({ meta, model });

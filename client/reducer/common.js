import {
  APP_LOAD
} from './action-types';

const defaultState = {
  isLoaded: false,
  redirect: null
};

export default (state=defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return { ...state, isLoaded: true }
    default:
      return state;
  }
};

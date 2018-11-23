import {
  APP_LOAD,
  LOGIN,
  LOGOUT,
  REGISTER,
  MODAL_OPEN,
  MODAL_CLOSE,
  ASYNC_START,
  ASYNC_END
} from './action-types';

const defaultState = {
  user: null,
  token: null,
  activeModal: null,
  busy: false,
  errors: null
};

export default (state=defaultState, action) => {
  switch (action.type) {
    case APP_LOAD: {
      return { ...state, ...action.payload };
    }

    case LOGOUT: {
      return { ...defaultState };
    }

    case MODAL_OPEN:
      return { ...state, activeModal: action.subtype };
    case MODAL_CLOSE:
      return { ...state, activeModal: null, errors: null, busy: null };

    case ASYNC_START: {
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { ...state, busy: true };
      }
    }
    case ASYNC_END: {
      if (action.subtype === LOGIN || action.subtype === REGISTER) {
        return { 
          ...state, 
          busy: false,
          errors: action.payload.errors || null,
          user: action.payload.user || null,
          token: action.payload.user ? action.payload.user.token : null,
          activeModal: action.payload.errors ? state.activeModal : null
        };
      }    
    }

    default:
      return state;
  }
}

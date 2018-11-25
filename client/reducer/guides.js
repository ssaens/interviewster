import {
  GUIDE_LIST_LOAD
} from './action-types';

const defaultState = {
  loaded: false,
  guides: []
};

export default (state=defaultState, action) => {
  switch (action.type) {
    case GUIDE_LIST_LOAD: {
      return { ...state, loaded: true, guides: action.payload };
    }
    default: 
      return state;
  }
};

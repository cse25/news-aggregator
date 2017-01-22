import { STORE_SELECTED_SOURCE } from '../actions/types';

export default function(state = null, action) {
  switch(action.type) {
    case STORE_SELECTED_SOURCE:
      return action.payload
  }
  return state;
}

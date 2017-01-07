import { TOGGLE_FAVORITE, GET_FAVORITES } from '../actions/types';

export default function(state = [], action) {
  switch(action.type) {
    case GET_FAVORITES:
      console.log('get favorites action.payload', action.payload)
      return action.payload;
    case TOGGLE_FAVORITE:
      const newState = state.map((obj) => {
        if (obj.id === action.payload.id && obj.favorite === false) {
          obj.favorite = true;
          return obj;
        } else if (obj.id === action.payload.id && obj.favorite === true) {
          obj.favorite = false;
          return obj;
        } else {
          return obj;
        }
      })
    return newState;
  }
  return state;
}

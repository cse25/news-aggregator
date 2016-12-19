import { FETCH_ARTICLES } from '../actions/types';

export default function(state = [], action) {
  console.log('action received', action)
  switch(action.type) {
    case FETCH_ARTICLES:
      return action.payload
  }
  return state;
}

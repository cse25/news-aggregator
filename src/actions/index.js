import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';
import { AUTH_ERROR } from './types';
import { UNAUTH_USER } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {
    // Submit email and password to server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good:
        // -Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // -Save JWT token
        localStorage.setItem('token', response.data.token);
        // -Redirect to route '/feature'
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad:
        // -Show error to user
        dispatch(authError('Incorrect Login Info'));
      });
  }
}

export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Email already in use'));
      });
      // .catch(response => dispatch(authError(response.data.error)));
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER,
  }
}

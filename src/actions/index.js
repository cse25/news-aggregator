import axios from 'axios';
import config from '../../config'
import { browserHistory } from 'react-router';
import { AUTH_USER } from './types';
import { AUTH_ERROR } from './types';
import { UNAUTH_USER } from './types';
import { FETCH_MESSAGE } from './types';
import { FETCH_ARTICLES } from './types';
import { SELECT_ARTICLE } from './types';
import { TOGGLE_FAVORITE } from './types';

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

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        })
      });
  }
}

export function fetchArticles(source) {
  const url = `https://newsapi.org/v1/articles?source=${source}&apiKey=${config.API_KEY}`;
  console.log('fetching articles');
  return function(dispatch) {
    axios.get(url)
      .then(response => {
        console.log(response.data)
        dispatch({
          type: FETCH_ARTICLES,
          payload: response.data.articles
        })
      })
  }
}

export function toggleFavorite(favorite) {
  return {
    type: TOGGLE_FAVORITE,
    payload: favorite
  }
}

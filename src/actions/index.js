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
import { SAVE_EMAIL } from './types';
import { GET_FAVORITES } from './types';
import { STORE_SELECTED_SOURCE } from './types';

const ROOT_URL = 'https://agile-sea-64824.herokuapp.com';

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
        // console.log('response.data.email', response.data.email);
        dispatch({ type: SAVE_EMAIL, payload: response.data.email });
        dispatch({ type: GET_FAVORITES, payload: response.data.favorites });
        // -Redirect to route '/dashboard'
        browserHistory.push('/dashboard');
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
        dispatch({ type: SAVE_EMAIL, payload: response.data.email});      
        // dispatch({ type: GET_FAVORITES, payload: response.data.favorites});
        browserHistory.push('/dashboard');
      })
      .catch(() => {
        dispatch(authError('Email already in use'));
      });
      // .catch(response => dispatch(authError(response.data.error)));
  }
}

export function signoutUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  // localStorage.removeItem('favorites');
  return {
    type: UNAUTH_USER
  }
}

export function getFavorites(email) {
  return function(dispatch) {
    if (email) {
      axios.post(`${ROOT_URL}/favorites`, {"email": email})
        .then(response => {
          console.log(response.data.favorites);
          dispatch({ type: GET_FAVORITES, payload: response.data.favorites })
        })
    }
  }
}

export function saveFavorites(email, favorites) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/save`, {"email": email, "favorites": favorites})
      .then(response => {
        console.log(response.data)
      })
  }
}

export function toggleFavorite(favorite) {
  return {
    type: TOGGLE_FAVORITE,
    payload: favorite
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
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

export function fetchArticles(source, sourceName) {
  const url = `https://newsapi.org/v1/articles?source=${source}&apiKey=${config.API_KEY}`;
  return function(dispatch) {
    axios.get(url)
      .then(response => {
        dispatch({
          type: FETCH_ARTICLES,
          payload: response.data.articles
        })
      }).then(response => {
        dispatch({
          type: STORE_SELECTED_SOURCE,
          payload: sourceName
        })
      })
  }
}

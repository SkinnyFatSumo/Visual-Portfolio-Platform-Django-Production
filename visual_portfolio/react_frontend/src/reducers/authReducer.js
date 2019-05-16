import {
  AUTHENTICATION_SUCCESS, AUTHENTICATION_LOADING, AUTHENTICATION_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE
}
from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  isLoading: false,
  user: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case AUTHENTICATION_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case AUTHENTICATION_SUCCESS:
      console.log('authentication success');
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      console.log('login success payload: ', action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case AUTHENTICATION_FAILURE:
    case LOGIN_FAILURE:
      console.log('authentication failure');
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state;
  }
}

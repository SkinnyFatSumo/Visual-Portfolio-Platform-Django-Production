import {
  ALL_USERS_SUCCESS,
  ALL_USERS_LOADING,
  ALL_USERS_FAILURE,
}
from '../actions/types';

const initialState = {
  isLoading: false,
  users: [] 
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ALL_USERS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case ALL_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload
      }
    case ALL_USERS_FAILURE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

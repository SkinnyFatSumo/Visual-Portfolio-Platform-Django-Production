import {
  ALL_USERS_SUCCESS,
  ALL_USERS_LOADING,
  ALL_USERS_FAILURE,
} from './types';



export const fetchAllUsers = () => dispatch => {
  const allUsers_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const allUsers_endpoint = 'http://localhost:8000/api/auth/users';

  fetch(allUsers_endpoint, allUsers_lookupOptions)
    dispatch({
      type: ALL_USERS_LOADING
    });
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    })
    .then(response => response.json())
    .then(response => {
      dispatch({
        type: ALL_USERS_SUCCESS,
        payload: response,
      });
    })
    .catch(error => {
      console.log(error);
      dispatch({
        type: ALL_USERS_FAILURE,
      });
    });
};

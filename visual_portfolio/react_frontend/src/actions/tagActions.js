import {
  // LOADING
  TAGS_LOADING,
  RELATIONS_LOADING,
  // SUCCESS
  TAGS_SUCCESS,
  ALL_TAGS_SUCCESS,
  RELATIONS_SUCCESS,
  // FAILURE
  TAGS_FAILURE,
  RELATIONS_FAILURE,
  // SYNCHRONOUS
  SET_TAGS,
} from './types';

// TODO: create CREATE/UPDATE/DESTROY_RELATIONS
// TODO: create CREATE/UPDATE/DESTROY_TAGS

//---------------------------------------------------------------------------//
//                          ASYNCHRONOUS CALLS                                //
//---------------------------------------------------------------------------//

// Get all photo tags, assign as inactive
export const fetchTags = (username) => dispatch => {
  console.log('Fetch Tags called in ACTIONS');
  dispatch({type: TAGS_LOADING});
  const get_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const get_endpoint = 'http://localhost:8000/api/photos/tags/' + username + '/list';
  console.log('JUST BEFORE FETCH');
  fetch(get_endpoint, get_lookupOptions)
    .then(res => res.json())
    .then(tags => {
      // FIRST DISPATCH THE UNALTERED, WHOLE SET OF TAGS
      dispatch({
        type: ALL_TAGS_SUCCESS,
        payload: tags,
      });
      // THEN CREATE ACTIVATEABLE LIST, DEACTIVE BY DEFAULT
      tags.forEach(tag => {
        tag.isActive = false;
      });
      return tags;
    })
    .then(updated_tags => {
      // SET TAGS TO DEACTIVATED TAG LIST
      dispatch({
        type: SET_TAGS,
        payload: updated_tags,
      });
      // DISPATCH ON SUCCESS
      dispatch({
        type: TAGS_SUCCESS,
      });
    })
    .catch(err => dispatch({type: TAGS_FAILURE, payload: err.message}));
};

/*
// GET ALL TAGS, DON'T WORRY ABOUT ACTIVATING OR DEACTIVATING THEM
export const fetchAllTags = (username) => dispatch => {
  dispatch({type: ALL_TAGS_LOADING});
  const get_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const get_endpoint = 'http://localhost:8000/api/photos/tags/' + username + '/list';
  fetch(get_endpoint, get_lookupOptions)
    .then(res => res.json())
    .then(tags =>
      dispatch({
        type: ALL_TAGS_SUCCESS,
        payload: all_tags,
      }),
    )
    .catch(err => dispatch({type: ALL_TAGS_FAILURE, payload: err.message}));
};
*/


// Get all relationship identities between photos and tags
export const fetchRelations = (username) => dispatch => {
  dispatch({type: RELATIONS_LOADING});
  const get_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const get_endpoint = 'http://localhost:8000/api/photos/pwt/' + username + '/list';

  fetch(get_endpoint, get_lookupOptions)
    .then(res => res.json())
    .then(relations =>
      dispatch({
        type: RELATIONS_SUCCESS,
        payload: relations,
      }),
    )
    .catch(err => dispatch({type: RELATIONS_FAILURE, payload: err.message}));
};

//---------------------------------------------------------------------------//
//                          SYNCHRONOUS CALLS
//---------------------------------------------------------------------------//

// Set ACTIVE tags
export const setTags = (target_tagname, tags) => {
  console.log('target', target_tagname);
  console.log('tags', tags);
  for (let i = 0; i < tags.length; i++) {
    if (tags[i].tagname === target_tagname) {
      tags[i].isActive = !tags[i].isActive;
      break;
    }
  }
  return {
    type: SET_TAGS,
    payload: tags,
  };
};

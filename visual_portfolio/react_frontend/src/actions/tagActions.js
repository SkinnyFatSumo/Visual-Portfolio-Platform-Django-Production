import {
  // LOADING
  TAGS_LOADING,
  RELATIONS_LOADING,
  // SUCCESS
  TAGS_SUCCESS,
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

// Get all photo tags
export const fetchTags = () => dispatch => {
  console.log('Fetch Tags called in ACTIONS');
  dispatch({type: TAGS_LOADING});
  const get_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const get_endpoint = 'http://localhost:8000/api/photos/tags/';
  console.log('JUST BEFORE FETCH');
  fetch(get_endpoint, get_lookupOptions)
    .then(res => res.json())
    .then(tags => {
      tags.forEach(tag => {
        tag.isActive = false;
      });
      return tags;
    })
    .then(updated_tags =>
      dispatch({
        type: SET_TAGS,
        payload: updated_tags,
      }),
    );
  //    .catch(err => dispatch({type: TAGS_FAILURE, payload: err.message}));
};

// Get all relationship identities between photos and tags
export const fetchRelations = () => dispatch => {
  dispatch({type: RELATIONS_LOADING});
  const get_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const get_endpoint = 'http://localhost:8000/api/photos/pwt/';

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

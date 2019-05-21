import {
  // LOADING
  TAGS_LOADING,
  NEW_TAG_LOADING,
  RELATIONS_LOADING,
  NEW_RELATION_LOADING,
  // SUCCESS
  TAGS_SUCCESS,
  ALL_TAGS_SUCCESS,
  NEW_TAG_SUCCESS,
  RELATIONS_SUCCESS,
  NEW_RELATION_SUCCESS,
  // FAILURE
  TAGS_FAILURE,
  NEW_TAG_FAILURE,
  RELATIONS_FAILURE,
  NEW_RELATION_FAILURE,
  // SYNCHRONOUS
  SET_TAGS,
} from './types';

// TODO: create CREATE/UPDATE/DESTROY_RELATIONS
// TODO: create CREATE/UPDATE/DESTROY_TAGS

//---------------------------------------------------------------------------//
//                          ASYNCHRONOUS CALLS                                //
//---------------------------------------------------------------------------//

// Get all photo tags, assign as inactive
export const fetchTags = username => dispatch => {
  console.log('FETCH TAGS CALLED');
  dispatch({type: TAGS_LOADING});
  const get_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const get_endpoint =
    'http://localhost:8000/api/photos/tags/' + username + '/list';
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

// POST / CREATE RELATION 
export const postRelation = relationData => (dispatch, getState) => {
  console.log('POST TAG CALLED');
  dispatch({
    type: NEW_RELATION_LOADING,
  });

  const post_lookupOptions = {
    method: 'POST',
    body: JSON.stringify(tagData),
    headers: {'Content-Type': 'application/json'},
  };

  const token = getState().auth.token;
  if (token) {
    post_lookupOptions.headers['Authorization'] = `Token ${token}`;
  }
  // TODO: else, dispatch an error

  const post_endpoint = 'http://localhost:8000/api/photos/pwt/create';

  fetch(post_endpoint, post_lookupOptions)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .then(relation =>
      dispatch({
        type: NEW_RELATION_SUCCESS,
        payload: relation,
      }),
    )
    .catch(err => {
      dispatch({
        type: NEW_RELATION_FAILURE,
        payload: err,
      }),
        console.log('error', err);
    });
};

// POST / CREATE Tag
export const postTag = tagData => (dispatch, getState) => {
  console.log('POST TAG CALLED');
  dispatch({
    type: NEW_TAG_LOADING,
  });

  const post_lookupOptions = {
    method: 'POST',
    body: JSON.stringify(tagData),
    headers: {'Content-Type': 'application/json'},
  };

  const token = getState().auth.token;
  if (token) {
    post_lookupOptions.headers['Authorization'] = `Token ${token}`;
  }
  // TODO: else, dispatch an error

  const post_endpoint = 'http://localhost:8000/api/photos/tags/create';

  fetch(post_endpoint, post_lookupOptions)
    .then(res => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res;
    })
    .then(res => res.json())
    .then(tag =>
      dispatch({
        type: NEW_TAG_SUCCESS,
        payload: tag,
      }),
    )
    .catch(err => {
      dispatch({
        type: NEW_TAG_FAILURE,
        payload: err,
      }),
        console.log('error', err);
    });
};

// Get all relationship identities between photos and tags
export const fetchRelations = username => dispatch => {
  console.log('FETCH RELATIONS CALLED');
  dispatch({type: RELATIONS_LOADING});
  const get_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const get_endpoint =
    'http://localhost:8000/api/photos/pwt/' + username + '/list';

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
/*
// Retrieve, Update, Destroy
export const rudPhoto = (id, method) => (dispatch, getState) => {
  console.log('RUD PHOTO CALLED');
  // TODO: deal with retrieve/update vs destroy headers and return values/statuses
  const rud_lookupOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const rud_endpoint = 'http://localhost:8000/api/photos/' + id.toString();

  const token = getState().auth.token;
  if (token) {
    rud_lookupOptions.headers['Authorization'] = `Token ${token}`;
  }
  // TODO: else, dispatch an error
  // TODO: catch status code, return alert based on success or failure / type

  fetch(endpoint, lookupOptions)
    .then(res => res.json())
    .then(photo => {
      dispatch({type: RUD_PHOTO_SUCCESS, payload: photo});
    })
    .catch(function(error) {
      console.log('error', error);
    });
};
*/
//---------------------------------------------------------------------------//
//                          SYNCHRONOUS CALLS
//---------------------------------------------------------------------------//

// Set ACTIVE tags
export const setTags = (target_tagname, tags) => {
  console.log('SET TAGS CALLED');
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

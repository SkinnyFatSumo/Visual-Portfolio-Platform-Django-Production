import {
  NEW_PHOTO,
  PHOTOS_SUCCESS,
  PHOTOS_LOADING,
  PHOTOS_FAILURE,
  ALL_PHOTOS_SUCCESS,
  ALL_PHOTOS_LOADING,
  ALL_PHOTOS_FAILURE,
} from './types';


// Set CURRENT PHOTOS based on tags
export const setPhotos = (username, tag_string) => dispatch => {
  dispatch({type: PHOTOS_LOADING});
  const tagged_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  var tagged_endpoint;
  tag_string == ''
    ? (tagged_endpoint = 'http://localhost:8000/api/photos/' + username + '/list/')
    : (tagged_endpoint =
      'http://localhost:8000/api/photos/' + username + '/sort?tags=' + tag_string);

  fetch(tagged_endpoint, tagged_lookupOptions)
    .then(res => res.json())
    .then(tagged_photos =>
      dispatch({
        type: PHOTOS_SUCCESS,
        payload: tagged_photos,
      }),
    )
    .catch(err =>
      dispatch({
        type: PHOTOS_FAILURE,
        payload: err.message,
      }),
    );
};

// GET ALL PHOTOS, DON'T CHANGE CURRENT PHOTOS SET
export const fetchAllPhotos = (username) => dispatch => {
  dispatch({type: ALL_PHOTOS_LOADING});
  const tagged_lookupOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };
  const tagged_endpoint = 'http://localhost:8000/api/photos/' + username + '/list/';

  fetch(tagged_endpoint, tagged_lookupOptions)
    .then(res => res.json())
    .then(all_photos =>
      dispatch({
        type: ALL_PHOTOS_SUCCESS,
        payload: all_photos,
      }),
    )
    .catch(err =>
      dispatch({
        type: ALL_PHOTOS_FAILURE,
        payload: err.message,
      }),
    );
};
/*
// Get photo detail
const loadPhoto = endpoint dispatch => {
  const lookupOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  fetch(endpoint, lookupOptions)
    .then(res => res.json())
    .then(photo => {
      dispatch({ type: LOAD_PHOTO_SUCCESS,
        payload: photo})
    })
    .catch(function(error) {
      console.log('error', error);
    });
}
*/
// Post NEW PHOTO to server, FOR LATER INTEGRATION!!!

export const postPhoto = photoData => dispatch => {
  console.log('PhotoData', photoData);
  const post_lookupOptions = {
    method: 'POST',
    body: JSON.stringify(photoData),
    headers: {'Content-Type': 'application/json'}
  };

  const post_endpoint = 'http://localhost:8000/api/photos/create';

  fetch(post_endpoint, post_lookupOptions)
    .then(res => res.json())
    .then(photos =>
      dispatch({
        type: NEW_PHOTO,
        payload: photos,
      }),
    )
    .catch(function(error) {
      console.log('error', error);
    });
};

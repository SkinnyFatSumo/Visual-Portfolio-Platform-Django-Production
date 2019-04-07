import {
  NEW_PHOTO,
  PHOTOS_FAILURE,
  PHOTOS_SUCCESS,
  PHOTOS_LOADING,
  ALL_PHOTOS_FAILURE,
  ALL_PHOTOS_SUCCESS,
  ALL_PHOTOS_LOADING,
} from '../actions/types';

const initialState = {
  // photos that come from get/post request
  photos: [],
  photos_loaded: false,
  all_photos: [],
  all_photos_loaded: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    //    case FETCH_PHOTOS:
    // return {
    //   ...state,
    //   all_photos: action.payload,
    // };
    case NEW_PHOTO:
      return {
        ...state,
        all_photos: action.payload,
      };
    case PHOTOS_LOADING:
      console.log('from reducer: photos loading...');
      return {
        ...state,
        photos_loaded: false,
      };
    case PHOTOS_SUCCESS:
      console.log('from reducer: photos success!');
      console.log('payload:', action.payload);
      return {
        ...state,
        photos_loaded: true,
        photos: action.payload,
      };
    case PHOTOS_FAILURE:
      return {
        ...state,
        photos_loaded: false,
      };
    case ALL_PHOTOS_LOADING:
      console.log('from reducer: photos loading...');
      return {
        ...state,
        all_photos_loaded: false,
      };
    case ALL_PHOTOS_SUCCESS:
      console.log('from reducer: photos success!');
      console.log('payload:', action.payload);
      return {
        ...state,
        all_photos_loaded: true,
        all_photos: action.payload,
      };
    case ALL_PHOTOS_FAILURE:
      return {
        ...state,
        all_photos_loaded: false,
      };
    default:
      return state;
  }
}

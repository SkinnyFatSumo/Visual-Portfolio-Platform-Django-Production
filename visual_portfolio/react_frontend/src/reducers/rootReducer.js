import { combineReducers } from 'redux';
import photosReducer from './photosReducer';
import tagsReducer from './tagsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  photos: photosReducer,
  tags: tagsReducer,
});

export default rootReducer;

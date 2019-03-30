import { combineReducers } from 'redux';
import photosReducer from './photosReducer';
import tagsReducer from './tagsReducer';

const rootReducer = combineReducers({
  photos: photosReducer,
  tags: tagsReducer,
});

export default rootReducer;

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
} from '../actions/types';

const initialState = {
  // tags that come from get request
  tags: [],
  all_tags: [],
  relations: [],
  tags_loaded: false,
  all_tags_loaded: false,
  relations_loaded: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    // SUCCESS
    case ALL_TAGS_SUCCESS:
      console.log('FROM REDUCER: inital batch of all tags reduced');
      return {
        ...state,
        all_tags: action.payload,
        all_tags_loaded: true,
      };
    case TAGS_SUCCESS:
      console.log('FROM REDUCER: inital batch of all tags reduced');
      return {
        ...state,
        tags_loaded: true,
      };
    case RELATIONS_SUCCESS:
      console.log('relations reduced');
      return {
        ...state,
        relations: action.payload,
        relations_loaded: true,
      };
    // LOADING
    case TAGS_LOADING:
      console.log('FROM REDUCER: tags loading');
      return {
        ...state,
        tags_loaded: false,
      };
    case RELATIONS_LOADING:
      return {
        ...state,
        relations_loaded: false,
      };
    // FAILURE
    case TAGS_FAILURE:
      return {
        ...state,
        tags_loaded: false,
      };
    case RELATIONS_FAILURE:
      console.log('THERE WAS A FAILURE');
      console.log('failrure:', action.payload);
      return {
        ...state,
        relations_loaded: false,
      };
    // SYNCHRONOUS
    case SET_TAGS:
      console.log('SET TAGS CALLED');
      return {
        ...state,
        tags: action.payload,
      };
    // DEFAULT
    default:
      return state;
  }
}

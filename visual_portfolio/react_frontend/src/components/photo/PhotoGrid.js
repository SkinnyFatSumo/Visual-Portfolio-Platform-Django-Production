// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Redux Actions
import {setPhotos} from '../../actions/photoActions';
import {fetchRelations, setTags, fetchTags} from '../../actions/tagActions';

// React Components

// Helpers
import PropTypes from 'prop-types';
import {groupByProperty, stringOfTags, tagStringFromURL} from '../support/helpers';

// ------------------------------------------------------------------------- //
//                               PHOTO GRID                                  //
// ------------------------------------------------------------------------- //

function PhotoGrid(props) {
  // EVENT HANDLERS

  // TODO: will need a hanlder for launching photo_detail
  //        IDK HOW I WANT TO CONSTRUCT THAT
  //        MAY HAVE TO MAKE THIS COMPONENT CLASSFUL

  if (props.photos_loaded && props.tags_loaded) {
    const photoList = props.photos.map(photo => (
      <div key={photo.id}>
        <h4>{photo.title}</h4>
        <img src={photo.thumbnail_source} alt="random" />
      </div>
    ));
    return (
      <div>
        <h1>{props.history.location.pathname}</h1>
        <h5>{photoList}</h5>
      </div>
    );
  } else {
    return 'Content still loading';
  }
}

PhotoGrid.propTypes = {
  // PHOTOS
  photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  photos_loaded: state.photos.photos_loaded,

  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(PhotoGrid),
);

// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Redux Actions
import {setPhotos} from '../../actions/photoActions';
import {fetchRelations, setTags, fetchTags} from '../../actions/tagActions';

// React Components
import Gallery from 'react-photo-gallery';

// Helpers
import PropTypes from 'prop-types';
import {
  groupByProperty,
  stringOfTags,
  tagStringFromURL,
} from '../support/helpers';

// ------------------------------------------------------------------------- //
//                               PHOTO GRID                                  //
// ------------------------------------------------------------------------- //

function columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 400) columns = 2;
  if (containerWidth >= 600) columns = 3;
  if (containerWidth >= 800) columns = 4;
  return columns;
}

function PhotoGrid(props) {
  if (props.photos_loaded && props.tags_loaded) {
    const photo_list = props.photos.map(photo => ({
      src: photo.thumbnail_source,
      width: photo.thumbnail_width,
      height: photo.thumbnail_height,
      key: photo.id,
    }));
    const photos_length = props.photos.length;
    console.log('photos length:', photos_length);
    return (
      <div id="gallery-border">
        <div id="container">
          <Gallery
            photos={photo_list}
            direction={photos_length <= 4 ? 'row' : 'column'}
            columns={columns}
          />
        </div>
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

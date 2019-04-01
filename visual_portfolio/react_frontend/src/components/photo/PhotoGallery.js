// Core React, Router, and Redux modules
import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// React Components
// import PhotoDetail from './PhotoDetail';
import Carousel from 'react-bootstrap/Carousel';

// Helpers
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                             PHOTO GALLERY                                 //
// ------------------------------------------------------------------------- //

function PhotoGallery(props) {
  if (props.photos_loaded && props.tags_loaded) {
    const slides = props.photos.map(photo => (
      <Carousel.Item key={photo.id}>
        <div className="carousel-item-container">
          <div className="carousel-image">
            <img src={photo.photo_source} href={photo.photo_source} />
            <h6>{photo.title}</h6>
          </div>
          <div className="carousel-detail-container">
            <h4>This will be a Dropdown(up) Item with photo info</h4>
          </div>
        </div>
      </Carousel.Item>
    ));
    return (
      <div>
        <h5>Total of {props.photos.length} photos</h5>
        <Carousel>{slides}</Carousel>;
      </div>
    );
  } else {
    return <h1>Gallery NOT Loaded</h1>;
  }
}

PhotoGallery.propTypes = {
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
  )(PhotoGallery),
);

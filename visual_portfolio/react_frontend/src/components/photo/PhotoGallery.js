// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Redux Actions
import {setPhotos} from '../../actions/photoActions';
import {setTags} from '../../actions/tagActions';

// React Components
import PhotoDetail from './PhotoDetail';
import PhotoCarousel from './PhotoCarousel';

// Helpers
import PropTypes from 'prop-types';
import {stringOfTags, tagStringFromURL} from '../support/helpers';

// ------------------------------------------------------------------------- //
//                           PHOTO GALLERY ROOT                              //
// ------------------------------------------------------------------------- //

class PhotoGallery extends Component {
  constructor(props) {
    super(props);

    this.handleTagClick = this.handleTagClick.bind(this);
  }

  componentDidUpdate() {
    if (this.props.photos_loaded && this.props.photos.length === 0) {
      console.log('NO TAGS MATCH');
      this.props.history.push('/error/', {hydrated: true});
    }
  }

  // --------------
  // EVENT HANDLERS

  handleTagClick = event => {
    event.preventDefault();
    const {tags, setTags, setPhotos} = this.props;
    setTags(event.target.id, tags);
    const string_for_url = stringOfTags(tags);
    setPhotos(string_for_url);
    this.props.history.push('/photo/gallery/' + string_for_url, {
      hydrated: true,
    });
  };

  // ---------------------
  // CONDITIONAL RENDERING 

  render() {
    if (this.props.photos_loaded && this.props.tags_loaded) {
      return <h1>Gallery Loaded</h1>;
    } else {
      return <h1>Gallery NOT Loaded</h1>;
    }
  }
}

PhotoGallery.propTypes = {
  // PHOTOS
  photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,
  setPhotos: PropTypes.func.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  setTags: PropTypes.func.isRequired,

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
    {setPhotos, setTags},
  )(PhotoGallery),
);

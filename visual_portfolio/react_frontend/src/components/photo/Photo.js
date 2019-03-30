import React, {Component, render} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';

import {Router, withRouter, Redirect} from 'react-router-dom';

// GET Requests for ALL photos/tags
import {setPhotos} from '../../actions/photoActions'; // async
import {
  fetchTags, // async
  setTags, // synchronous
  fetchRelations, // async
} from '../../actions/tagActions';

// components
import Gallery from 'react-photo-gallery';
import PhotoDetail from './PhotoDetail';
import PhotoGrid from './PhotoGrid';
import PhotoGallery from './PhotoGallery';
import {PhotoButton, PhotoCard} from './PhotoButton';

// react bootstrap
import {ButtonToolbar} from 'react-bootstrap';
// helpers
import {groupByProperty, stringOfTags} from '../support/helpers';
// import history from '../support/history';

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // options are: photo, gallery, grid, tag
      isActive: null,
      gifs: null,
      collapsed: false,
    };
    this.launchGalleryView = this.launchGalleryView.bind(this);
    this.launchGridView = this.launchGridView.bind(this);
    this.launchTagsView = this.launchTagsView.bind(this);
  }

  // -------------------
  // Component Lifecycle
  componentDidMount() {
    // Activate
    const {display} = this.props.match.params;
    const {url_params} = this.props.match.params;
    var which_view;
    if (display === undefined) {
      which_view === 'photo';
    } else if (
      display === 'gallery' ||
      display === 'grid' ||
      display === 'tags'
    ) {
      this.setState({isActive: display});
    } else {
      // TODO: Create an ALERT to notify that the URL is bad and redirect
      console.log('params did not match');
      this.props.history.push('/photo/');
    }

    // CHECK IF HYDRATED, MAKE HYDRATION A STATE VARIABLE IN HISTORY
    if (this.props.history.location.state === undefined) {
      this.props.history.push({state: {hydrated: false}});
    } else if (this.props.history.location.state.hydrated === undefined) {
      this.props.history.push({state: {hydrated: false}});
    }
    if (!this.props.history.location.state.hydrated) {
      this.props.fetchRelations();
      this.props.fetchTags();
    }
  }

  // PHOTO ROOT IS RESPONSIBLE FOR INITIAL HYDRATION OF ALL PHOTO CONTENT
  componentDidUpdate() {
    const {hydrated} = this.props.history.location.state;
    const {tags_loaded, photos_loaded, tags, photos} = this.props;
    const {url_tags} = this.props.match.params;

    if (!hydrated && tags_loaded) {
      // Get URL tags from URL parameters
      if (url_tags === undefined) {
        this.props.setPhotos('');
      } else {
        var tagnames = url_tags.split(',');
        tagnames.forEach(tagname => this.props.setTags(tagname, tags));
        this.props.setPhotos(endpoint);
      }
      this.props.history.push({state: {hydrated: true}});
    }
  }

  // --------------
  // Event Handlers

  launchGalleryView = () => {
    // push to gallery route
    // TODO: YOU SHOULD BE ABLE TO REPLACE STRING OF TAGS WITH URL PARAMS
    this.props.history.push('/photo/gallery/' + stringOfTags(this.props.tags), {
      hydrated: true,
    });
  };

  launchGridView = () => {
    // push to gallery route
    this.props.history.push('/photo/grid/' + stringOfTags(this.props.tags), {
      hydrated: true,
    });
  };

  launchTagsView = () => {
    // push to gallery route
    this.props.history.push('/photo/tags/' + stringOfTags(this.props.tags), {
      hydrated: true,
    });
  };

  // -------------------
  // Component Rendering

  render() {
    console.log('Rendering Photo', this.props.history);
    var hydrated;
    if (this.props.history.location.state !== undefined) {
      if (this.props.history.location.state.hydrated !== undefined) {
        if (this.props.history.location.state.hydrated) {
          hydrated = true;
        } else {
          hydrated = false;
        }
      } else {
        hydrated = false;
      }
    } else {
      hydrated = false;
    }
    const gallery_button = (
      <PhotoButton
        handleClick={this.launchGalleryView}
        active={hydrated}
        name="Gallery"
      />
    );

    const grid_buton = (
      <PhotoButton
        handleClick={this.launchGridView}
        active={hydrated}
        name="Grid"
      />
    );

    const tags_button = (
      <PhotoButton
        handleClick={this.launchTagView}
        active={hydrated}
        name="Tags"
      />
    );

    return (
      <ButtonToolbar>
        <h5>{gallery_button}</h5>
        <h5>{grid_buton}</h5>
        <h5>{tags_button}</h5>
      </ButtonToolbar>
    );
  }
}

Photo.propTypes = {
  // PHOTOS
  photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,
  setPhotos: PropTypes.func.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  setTags: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,
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
    {setPhotos, setTags, fetchTags, fetchRelations},
  )(Photo),
);

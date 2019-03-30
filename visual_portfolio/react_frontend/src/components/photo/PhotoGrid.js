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
import {stringOfTags, tagStringFromURL} from '../support/helpers';

// ------------------------------------------------------------------------- //
//                             PHOTO GRID ROOT                               //
// ------------------------------------------------------------------------- //

class PhotoGrid extends Component {
  constructor(props) {
    super(props);

    this.handleTagClick = this.handleTagClick.bind(this);
  }

  // --------------------------------------------------------------------- //
  //     HYDRATE STORE FROM SERVER IF URL ENTERED MANUALLY OR REFRESHED    //
  // --------------------------------------------------------------------- //

  componentDidMount() {
    // Check if hydration state exists, if not, create it, set it to false
    if (this.props.history.location.state === undefined) {
      this.props.history.push({state: {hydrated: false}});
    } else if (this.props.history.location.state.hydrated === undefined) {
      this.props.history.push({state: {hydrated: false}});
    }
    // Check state of hydration, if false, fetch
    if (!this.props.history.location.state.hydrated) {
      this.props.fetchTags();
      this.props.fetchRelations();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.tags_loaded &&
      this.props.photos_loaded &&
      this.props.photos.length === 0
    ) {
      console.log('NO TAGS MATCH');
      this.props.history.push('/error/', {
        hydrated: true,
      });
    }
    if (!this.props.history.location.state.hydrated && this.props.tags_loaded) {
      // Get URL tags from URL parameters
      const hold_tags = this.props.tags;
      var endpoint;
      if (this.props.match.params.url_tags === undefined) {
        endpoint = '';
        this.props.history.location.state.hydrated = true;
      } else {
        endpoint = this.props.match.params.url_tags;
        var tagnames = endpoint.split(',');
        tagnames.forEach(tagname => this.props.setTags(tagname, hold_tags));
      }
      this.props.setPhotos(endpoint);
      this.props.history.location.state.hydrated = true;
    }
  }

  // --------------
  // EVENT HANDLERS

  handleTagClick = event => {
    event.preventDefault();
    const tags = this.props.tags;
    this.props.setTags(event.target.id, this.props.tags);
    const string_for_url = stringOfTags(this.props.tags);
    this.props.setPhotos(string_for_url);
    this.props.history.push('/photo/grid/' + string_for_url, {
      hydrated: true,
    });
  };

  render() {
    if (this.props.photos_loaded && this.props.tags_loaded) {
      const tagList = this.props.tags.map(tag => (
        <div key={tag.tagname}>
          <button id={tag.tagname} onClick={this.handleTagClick}>
            {tag.tagname}
          </button>
        </div>
      ));

      const relationsList = this.props.relations.map(relation => (
        <div key={relation.id}>
          <h6>id = {relation.id}</h6>
          <h6>tag = {relation.tag}</h6>
          <h6>photo = {relation.photo}</h6>
        </div>
      ));

      const photoList = this.props.photos.map(photo => (
        <div key={photo.id}>
          <h4>{photo.title}</h4>
          <img src={photo.thumbnail_source} alt="random" />
        </div>
      ));
      return (
        <div>
          <h1>{this.props.history.location.pathname}</h1>
          <h5>{tagList}</h5>
          <h5>{photoList}</h5>
          <h5>{relationsList}</h5>
        </div>
      );
    } else {
      return 'Content still loading';
    }
  }
}

PhotoGrid.propTypes = {
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
  )(PhotoGrid),
);

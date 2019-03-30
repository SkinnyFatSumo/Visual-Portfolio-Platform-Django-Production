// REACT
import React, {Component, render} from 'react';
import PropTypes from 'prop-types';

// REDUX CONNECT
import {connect} from 'react-redux';
// REDUX ACTIONS
import {setPhotos} from '../../actions/photoActions'; // async
import {
  fetchTags, // async
  setTags, // synchronous
  fetchRelations, // async
} from '../../actions/tagActions';

// REACT ROUTER
import {Router, withRouter, Redirect} from 'react-router-dom';

// REACT BOOTSTRAP
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

// COMPONENTS
import Gallery from 'react-photo-gallery';
import PhotoDetail from './PhotoDetail';
import PhotoGrid from './PhotoGrid';
import PhotoGallery from './PhotoGallery';

// HELPER FUNCTIONS
import {groupByProperty, stringOfTags} from '../support/helpers';

// ------------------------
// ROOT OF PHOTO COMPONENTS

class Photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButtons: true,
      gifButtons: false,
    };

    // this can go in a TAG component
    // this.handleTagClick = this.handleTagClick.bind(this);
    this.launchGalleryView = this.launchGalleryView.bind(this);
    this.launchGridView = this.launchGalleryView.bind(this);
    this.launchTagView = this.launchTagView.bind(this);
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  // -------------------
  // Component Lifecycle

  componentDidMount() {
    // CHECK IF HYDRATED, MAKE HYDRATION A STATE VARIABLE IN HISTORY
    if (this.props.history.location.state === undefined) {
      this.props.history.push({state: {hydrated: false}});
    } else if (this.props.history.location.state.hydrated === undefined) {
      this.props.history.push({state: {hydrated: false}});
    }
    if (!this.props.history.location.state.hydrated) {
      this.props.fetchTags();
      this.props.setPhotos('');
    }
  }

  componentDidUpdate(prevProps) {
    const {hydrated} = this.props.history.location.state;
    const {url_params} = this.props.match.params;
    const {tags_loaded, photos_loaded, tags, photos} = this.props;

    if (tags_loaded && photos_loaded) {
      this.props.history.push({state: {hydrated: true}});
    }



    // IF NO ACTUAL PHOTOS LOAD BASED ON URL, THE TAG COMBINATION IS INVALID
    if (hydrated && tags_loaded && photos_loaded) {
      if (photos.length === 0) {
        console.log('NO TAGS MATCH');
        this.props.history.push('/error/', {
          hydrated: false,
          failure: 404,
          cause: 'bad tag combination',
        });
      } else if (this.props.tags !== prevProps.tags) {
        this.props.setPhotos(stringOfTags(this.props.tags));
      }
    }
  }

  // ----------------
  // Helper Functions

  relationsByPhoto = photo_id => {
    groupByProperty(this.props.relations, 'photo')[photo_id];
  };

  // ----------------
  // Display Handlers

  handleTagClick = event => {
    event.preventDefault();
    this.props.setTags(event.target.id, this.props.tags);
    const string_for_url = stringOfTags(this.props.tags);
    this.props.setPhotos(string_for_url);
    this.props.history.push('/photo/gallery/' + string_for_url, {
      hydrated: true,
    });
  };

  // -----------------
  // Display Launchers

  launchGalleryView = () => {
    // push to gallery view route, append active tags
    this.props.history.push('/photo/gallery/' + stringOfTags(this.props.tags), {
      hydrated: true,
    });
  };

  launchGridView = () => {
    // push to grid view route, append active tags
    this.props.history.push('/photo/grid/' + stringOfTags(this.props.tags), {
      hydrated: true,
    });
  };

  launchTagView = () => {
    // push to tag view route, append active tags
    this.props.history.push('photo/tag/' + stringOfTags(this.props.tags), {
      hydrated: true,
    });
  };

  // -------------------
  // Component Rendering

  render() {
    if (
      // insure data is hydrated from server
      this.props.photos_loaded &&
      this.props.tags_loaded &&
      this.props.relations_loaded
    ) {
      // update history.location.state to show it is hydrated now
      this.props.history.location.state.hydrated = true;

      // temp
      const tagList = this.props.tags.map(tag => (
        <div key={tag.id}>
          <button
            id={tag.tagname}
            onClick={this.handleTagClick}
            className={tag.isActive ? 'active' : 'inactive'}>
            {tag.tagname}
          </button>
        </div>
      ));

      // temp
      const relationsList = this.props.relations.map(relation => (
        <div key={relation.id}>
          <h6>id = {relation.id}</h6>
          <h6>tag = {relation.tag}</h6>
          <h6>photo = {relation.photo}</h6>
        </div>
      ));

      // temp
      const photoList = this.props.photos.map(photo => (
        <div key={photo.id}>
          <h4>{photo.title}</h4>
          <button onClick={this.launchGalleryView} id={photo.id}>
            Go to Gallery
          </button>
          <img src={photo.thumbnail_source} alt="random" />
        </div>
      ));

      return (
        <div>
          <ButtonGroup>
            <button onClick={this.launchGridView}>Launch Grid View</button>
            <button onClick={this.launchGalleryView}>
              Launch Gallery View
            </button>
            <button onClick={this.launchTagView}>Launch Tag View</button>
          </ButtonGroup>
          <h5>{tagList}</h5>
          <h5>{photoList}</h5>
          <h5>{relationsList}</h5>
        </div>
      );
    } else {
      return <h6>Content Loading...</h6>;
    }
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

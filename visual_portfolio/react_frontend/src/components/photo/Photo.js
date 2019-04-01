// React
import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';

// React Router
import {Router, withRouter, Redirect} from 'react-router-dom';

// GET Requests for ALL photos/tags
import {setPhotos} from '../../actions/photoActions'; // async
import {
  fetchTags, // async
  setTags, // synchronous
  fetchRelations, // async
} from '../../actions/tagActions';

// Components
import TagSelectBox from './TagSelectBox';
import Buttons_OR_Cards from './Buttons_OR_Cards';

// Helpers
import {stringOfTags, tagStringFromURL} from '../support/helpers';
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

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
    this.handleTagClick = this.handleTagClick.bind(this);
  }

  // ------------------
  // Component Mounting
  // ------------------

  componentDidMount() {
    // Activate
    const display = this.props.match.params.display;
    console.log('Mounting:', display);
    if (display === undefined) {
      display === 'photo';
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
  
  // ------------------
  // Component Updating 
  // ------------------
  
  // PHOTO ROOT IS RESPONSIBLE HYDRATION AND LOADING ALL PHOTO CONTENT
  componentDidUpdate(prevProps) {
    // GET PROPS
    const {display} = this.props.match.params;
    const {hydrated} = this.props.history.location.state;
    const {tags_loaded, tags, photo_loaded, photos} = this.props;
    // LOAD PHOTOS IF IF NOT HYDRATED
    if (tags_loaded && !hydrated) {
      // IF AT PHOTO ROOT ('photo/') LOAD ALL PHOTOS
      if (display === undefined) {
        this.props.setPhotos('');
        // OTHERWISE SET TAGS BASED ON LAST PATH OF URL, FOLLOWING DISPLAY TYPE
      } else {
        var url_tags = tagStringFromURL(this.props.location.pathname);
        var tagnames = url_tags.split(',');
        tagnames.forEach(tagname => this.props.setTags(tagname, tags));
        this.props.setPhotos(url_tags);
      }
      // SET AS HYDRATED
      this.props.history.push({state: {hydrated: true}});
    }
    // THERE SHOULD ALWAYS BE PHOTOS, IF NOT IT'S A BAD URL OR TAG COMBO
    if (this.props.photos_loaded && this.props.photos.length === 0) {
      this.props.history.push('/error/', {
        failure:
          'Either your URL is misconfigured, or no photo includes that combination of tags',
      });
    }
  }

  // --------------
  // Event Handlers
  // --------------

  handleTagClick = event => {
    event.preventDefault();
    // set tags based on tag clicked, then get new url and set photos
    // and new path using it. maintain current display type
    const {tags, setTags, setPhotos} = this.props;
    setTags(event.target.id, tags);
    const string_for_url = stringOfTags(tags);
    setPhotos(string_for_url);
    const {display} = this.props.match.params;
    this.props.history.push('/photo/' + display + '/' + string_for_url, {
      hydrated: true,
    });
  };

  launchGalleryView = () => {
    // push to gallery route
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
  // -------------------

  render() {
    console.log('Rendering Photo', this.props.history);

    // Insure that hydration has occurred before activating display buttons
    var active;
    this.props.photos_loaded ? (active = true) : (active = false);

    // Get display type, we will only show tags for 'grid' and 'gallery'
    const {display} = this.props.match.params;

    // TODO: set up card display menu

    return (
      <Fragment>
        <Buttons_OR_Cards
          active={active}
          launchGallery={this.launchGalleryView}
          launchGrid={this.launchGridView}
          launchTags={this.launchTagsView}
        />
        <br />
        {display === 'grid' || display === 'gallery' ? (
          <TagSelectBox
            photos={this.props.photos}
            relations={this.props.relations}
            tags={this.props.tags}
            onTagClick={this.handleTagClick}
          />
        ) : null}
      </Fragment>
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

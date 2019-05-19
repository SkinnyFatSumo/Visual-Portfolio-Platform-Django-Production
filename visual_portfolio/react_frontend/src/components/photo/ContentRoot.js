// React
import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';

// React Router
import {Router, withRouter, Redirect} from 'react-router-dom';

// GET Requests for ALL photos/tags
import {setPhotos, fetchAllPhotos} from '../../actions/photoActions'; // async
import {
  fetchTags, // async
  setTags, // synchronous
  fetchRelations, // async
} from '../../actions/tagActions';
import {viewingUser} from '../../actions/userActions';

// Components
import TagSelectBox from './TagSelectBox';
import DisplayButtons from './DisplayButtons';
import DiscoverUsers from '../users/DiscoverUsers';

// Helpers
import {stringOfTags, tagStringFromURL} from '../support/helpers';
import PropTypes from 'prop-types';

// React Bootstrap
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

class ContentRoot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // options are: photo, gallery, grid, tag
      isActive: null,
      gifs: null,
      collapsed: false,
      viewed_user: null,
    };
    this.launchProfileView = this.launchProfileView.bind(this);
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
    const {username, display} = this.props.match.params;
    if (
      display === 'gallery' ||
      display === 'grid' ||
      display === 'tags' ||
      display === 'profile'
    ) {
      this.setState({isActive: display});
    } else {
      this.props.history.push('/discover/' + 'baddisplay');
    }

    // WAIT TIL ALL USERS ARE LOADED TO CHECK IF USER EXISTS
    if (username !== this.state.viewed_user) {
      if (this.props.allUsersLoaded) {
        if (!this.props.users.some(user => user.username === username)) {
          this.props.history.push('/discover/' + 'user-does-not-exist');
        } else {
          this.setState({viewed_user: username});
          this.props.fetchRelations(username);
          this.props.fetchTags(username);
          this.props.fetchAllPhotos(username);
          // this.props.fetchUserInfo
        }
      }
    }
  }

  // ------------------
  // Component Updating
  // ------------------

  componentDidUpdate(prevProps) {
    // Update all relations, tags, and photos if we are looking at new user
    const {username, display, urltags} = this.props.match.params;
    // GET PROPS
    const {
      allUsersLoaded,
      tags_loaded,
      tags,
      all_photos_loaded,
      photos_loaded,
      photos,
      relations_loaded,
      relations,
    } = this.props;

    console.log('this.props.match.params', this.props.match.params);
    console.log('urltags', urltags);
    console.log('update, username --', username);

    // INSURE DISPLAY TYPE IS VALID
    if (display !== this.state.isActive) {
      if (
        display === 'gallery' ||
        display === 'grid' ||
        display === 'tags' ||
        display === 'profile'
      ) {
        this.setState({isActive: display});
      } else {
        this.props.history.push('/discover/' + 'baddisplay');
      }
    }

    // WAIT TIL ALL USERS ARE LOADED TO CHECK IF USER EXISTS
    if (this.props.allUsersLoaded) {
      if (this.state.viewed_user !== username) {
        if (!this.props.users.some(user => user.username === username)) {
          this.props.history.push('/discover/' + 'user-does-not-exist');
        } else {
          this.setState({viewed_user: username});
          this.props.fetchRelations(username);
          this.props.fetchTags(username);
          this.props.fetchAllPhotos(username);
          // this.props.fetchUserInfo
        }
      }
      if (!this.props.tags_loaded) {
        this.props.fetchTags(username);
      }
      if (!this.props.all_photos_loaded) {
        this.props.fetchAllPhotos(username);
      }
      if (!this.props.relations_loaded) {
        this.props.fetchRelations(username);
      }
    }

    // LOAD PHOTOS ONCE TAGS AND ALL_PHOTOS ARE READY
    if (tags_loaded && all_photos_loaded && !photos_loaded) {
      // IF NO URL TAGS, LOADING ALL USER'S PHOTOS
      if (urltags === undefined) {
        this.props.setPhotos(username, '');
        // OTHERWISE SET TAGS BASED ON TAGS IN URL
      } else {
        // var url_tags = tagStringFromURL(this.props.location.pathname);
        var tagnames = urltags.split(',');
        tagnames.forEach(tagname => this.props.setTags(tagname, tags));
        this.props.setPhotos(username, urltags);
      }
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
    const {username, display} = this.props.match.params;
    this.props.history.push(
      '/photo/' + display + '/' + this.state.username + '/' + string_for_url,
      {
        hydrated: true,
      },
    );
  };

  launchGalleryView = () => {
    // push to gallery route
    this.props.history.push(
      '/user/' +
        this.props.match.params.username +
        '/gallery/' +
        stringOfTags(this.props.tags),
      {
        hydrated: true,
      },
    );
  };

  launchGridView = () => {
    // push to gallery route
    this.props.history.push(
      '/user/' +
      this.props.match.params.username + '/grid/' +
        stringOfTags(this.props.tags),
      {
        hydrated: true,
      },
    );
  };

  launchTagsView = () => {
    // push to gallery route
    this.props.history.push(
      '/user/' + this.props.match.params.username + '/tags/',
      {
        hydrated: true,
      },
    );
  };
  
  launchProfileView = () => {
    // push to gallery route
    this.props.history.push(
      '/user/' + this.props.match.params.username + '/profile/',
      {
        hydrated: true,
      },
    );
  };

  // -------------------
  // Component Rendering
  // -------------------

  render() {
    console.log('Rendering Photo', this.props.history);

    // Insure that hydration has occurred before activating display buttons
    var active;

    this.props.photos_loaded ? (active = true) : (active = false);

    console.log('Active', active);
    // Get display type, we will only show tags for 'grid' and 'gallery'
    const {display} = this.props.match.params;

    if (this.props.photos_loaded && this.props.photos.length === 0) {
      return <h1>This User has No Photos</h1>;
    }

    if (this.props.allUsersLoaded === false) {
      return <h1>Loading All Users</h1>;
    }

    // add launchProfile
    return (
      <Fragment>
        <ButtonToolbar>
          <DisplayButtons
            handleClick={this.launchProfileView}
            name="Profile"
            active={active}
          />
          <DisplayButtons
            handleClick={this.launchGalleryView}
            name="Gallery"
            active={active}
          />
          <DisplayButtons
            handleClick={this.launchGridView}
            name="Grid"
            active={active}
          />
          <DisplayButtons
            handleClick={this.launchTagsView}
            name="Tags"
            active={active}
          />
        </ButtonToolbar>
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

ContentRoot.propTypes = {
  // PHOTOS
  photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,
  all_photos_loaded: PropTypes.bool.isRequired,
  setPhotos: PropTypes.func.isRequired,
  fetchAllPhotos: PropTypes.func.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  setTags: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,

  // USERS
  users: PropTypes.array.isRequired,
  viewingUser: PropTypes.func.isRequired,
  allUsersLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  photos_loaded: state.photos.photos_loaded,
  all_photos_loaded: state.photos.all_photos_loaded,
  all_photos_current: state.photos.all_photos_loaded,

  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,

  users: state.users.users,
  allUsersLoaded: state.users.allUsersLoaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {
      setPhotos,
      setTags,
      fetchTags,
      fetchRelations,
      fetchAllPhotos,
      viewingUser,
    },
  )(ContentRoot),
);

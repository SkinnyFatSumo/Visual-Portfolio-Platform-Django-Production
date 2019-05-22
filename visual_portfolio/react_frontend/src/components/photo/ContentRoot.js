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
      display === 'profile' ||
      display === 'detail'
    ) {
      this.setState({isActive: display});
    } else {
      this.props.history.push('/discover/' + 'bad-display-type');
    }

    // INSURE THAT USERNAME IN URL MATCHES STORED USERNAME IN STATE
    if (username !== this.state.viewed_user) {
      // IF NOT, INSURE ALL USERS ARE LOADED PRIOR TO CHECK
      if (this.props.allUsersLoaded) {
        // INSURE THAT USERNAME IN URL ACTUALLY EXISTS, IF NOT, REDIRECT
        if (!this.props.users.some(user => user.username === username)) {
          this.props.history.push('/discover/' + 'user-does-not-exist');
          // IF USER EXISTS, UPDATE LOCAL STATE AND REDUX STATE
        } else {
          console.log('LOADING NEW USER in MOUNT');
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
    var activating_new_user = false;
    // STORE ALL VARIABLES NEEDED FROM URL PARAMS AND PROPS
    const {username, display, urltags} = this.props.match.params;
    const {
      allUsersLoaded,
      tags_loaded,
      tags_loading,
      tags,
      all_photos_loaded,
      all_photos_loading,
      photos_loaded,
      photos_loading,
      photos,
      relations_loaded,
      relations_loading,
      relations,
    } = this.props;

    // INSURE DISPLAY TYPE IS VALID, SET STATE IF IT IS
    if (display !== this.state.isActive) {
      if (
        display === 'gallery' ||
        display === 'grid' ||
        display === 'tags' ||
        display === 'profile' ||
        display === 'detail'
      ) {
        this.setState({isActive: display});
        // OTHERWISE REDIRECT DUE TO BAD DISPLAY TYPE
      } else {
        this.props.history.push('/discover/' + 'bad-display-type');
      }
    }

    // INSURE THAT ALL USERS ARE LOADED
    if (this.props.allUsersLoaded) {
      // IF SO, CHECK IF USER IN URL IS SAME AS USER STORED IN STATE
      if (this.state.viewed_user !== username) {
        // IF NOT, INSURE USER IN URL ACTUALLY EXISTS, REDIRECT IF NOT
        if (!this.props.users.some(user => user.username === username)) {
          this.props.history.push('/discover/' + 'user-does-not-exist');
          // OTHERWISE UPDATE LOCAL AND REDUX STATE FOR CURRENT VIEWED USER
        } else {
          activating_new_user = true;
          console.log('LOADING NEW USER');
          this.setState({viewed_user: username});
          this.props.fetchRelations(username);
          this.props.fetchTags(username);
          this.props.fetchAllPhotos(username);
          // this.props.fetchUserInfo
        }
      }
      if (!tags_loaded && !tags_loading && !activating_new_user) {
        console.log('tags_loading', tags_loading);
        console.log('tags_loaded', tags_loaded);
        console.log('had to load tags');
        this.props.fetchTags(username);
      }
      if (!all_photos_loaded && !all_photos_loading && !activating_new_user) {
        console.log('had to load photos');
        this.props.fetchAllPhotos(username);
      }
      if (!relations_loaded && !relations_loading && !activating_new_user) {
        console.log('had to load relations');
        this.props.fetchRelations(username);
      }
    }

    // LOAD ACTIVE PHOTOS ONCE ALL TAGS AND ALL PHOTOS ARE LOADED
    if (tags_loaded && all_photos_loaded && !photos_loaded && !photos_loading) {
      // IF NO URL TAGS, LOAD ALL USER'S PHOTOS
      console.log('URL TAGS IS...', urltags);
      if (urltags === undefined || display === 'detail') {
        this.props.setPhotos(username, '');
        // OTHERWISE SET TAGS BASED ON TAGS IN URL
      } else {
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
    const {username, display} = this.props.match.params;
    const {tags, setTags, setPhotos} = this.props;
    // SET TAGS BASED ON THE TAG CLICKED
    setTags(event.target.id, tags);
    // GET NEW TAG STRING BASED ON UPDATED LIST OF ACTIVE TAGS
    const string_for_url = stringOfTags(tags);
    // THEN GET PHOTOS BASED ON UPDATED TAG URL
    setPhotos(username, string_for_url);
    // PUSH TO NEW URL WITH UPDATED TAGS
    //
    console.log('handle tag click username is', username);
    this.props.history.push(
      '/user/' + username + '/' + display + '/' + string_for_url,
      {
        hydrated: true,
      },
    );
  };

  launchGalleryView = () => {
    //  PUSH TO GALLERY VIEW
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
    // PUSH TO GRID VIEW
    this.props.history.push(
      '/user/' +
        this.props.match.params.username +
        '/grid/' +
        stringOfTags(this.props.tags),
      {
        hydrated: true,
      },
    );
  };

  launchTagsView = () => {
    // PUSH TO TAGS VIEW
    this.props.history.push(
      '/user/' + this.props.match.params.username + '/tags/',
      {
        hydrated: true,
      },
    );
  };

  launchProfileView = () => {
    // PUSH TO PROFILE VIEW
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
    var active;
    this.props.photos_loaded ? (active = true) : (active = false);

    // STORE DISPLAY TYPE, BECAUSE WE WILL ONLY SHOW TAG SELECT BOX FOR
    // GRID AND GALLERY VIEWS
    const {display} = this.props.match.params;

    if (this.props.all_photos_loaded && this.props.all_photos.length === 0) {
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
  all_photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,
  photos_loading: PropTypes.bool.isRequired,
  all_photos_loaded: PropTypes.bool.isRequired,
  all_photos_loading: PropTypes.bool.isRequired,
  setPhotos: PropTypes.func.isRequired,
  fetchAllPhotos: PropTypes.func.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  tags_loading: PropTypes.bool.isRequired,
  setTags: PropTypes.func.isRequired,
  fetchTags: PropTypes.func.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  relations_loading: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,

  // USERS
  users: PropTypes.array.isRequired,
  viewingUser: PropTypes.func.isRequired,
  allUsersLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  all_photos: state.photos.all_photos,
  photos_loaded: state.photos.photos_loaded,
  photos_loading: state.photos.photos_loading,
  all_photos_loaded: state.photos.all_photos_loaded,
  all_photos_loading: state.photos.all_photos_loading,

  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,
  tags_loading: state.tags.tags_loading,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
  relations_loading: state.tags.relations_loading,

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

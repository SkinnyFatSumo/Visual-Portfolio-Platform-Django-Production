// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Redux Actions
import {fetchRelations} from '../../actions/tagActions';

// Helpers
import PropTypes from 'prop-types';

class PhotoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // STORE ALL TAGS RELATED TO THIS PHOTOS IN A SET
    var associated_tag_ids = new Set();

    // ADD TAG IDS FROM RELATIONS THAT HAVE THIS PHOTO
    this.props.relations.forEach(relation =>
      if (relation.photo === this.props.current_photo.id) {
        associated_tag_ids.add(relation.tag)
      })

    // INITIALIZE UNASSOCIATED TAGS LIST TO ALL TAGS
    var unassociated_tags = this.props.all_tags.splice();
    // INITIALIZE ASSOCIATED TAGS LIST TO EMPTY ARRAY
    var associated_tags = [];

    // GET ACTUAL TAGS FROM THEIR IDS
    associated_tag_ids.forEach(tag_id =>
      associated_tags.push(this.props.all_tags.find(tag => tag.id === tag_id)))

    // GET ALL TAGS THAT AREN'T ASSOCIATED BY FILTERING OUT THOSE THAT ARE
    associated_tags.forEach(as_tag => {
      unassociated_tags = unassociated_tags.filter(
        un_tag => un_tag.id !== as_tag.id,
      );
    });

    return <h1>Hi</h1>;
  }
}

PhotoDetail.propTypes = {
  // PHOTOS
  all_photos: PropTypes.array.isRequired,
  all_photos_loaded: PropTypes.bool.isRequired,
  all_photos_loading: PropTypes.bool.isRequired,

  // TAGS
  all_tags: PropTypes.array.isRequired,
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,
  tags_loading: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  relations_loading: PropTypes.bool.isRequired,
  fetchRelations: PropTypes.func.isRequired,

  // USERS
  users: PropTypes.array.isRequired,
  allUsersLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  all_photos: state.photos.all_photos,
  all_photos_loaded: state.photos.all_photos_loaded,
  all_photos_loading: state.photos.all_photos_loading,

  all_tags: state.tags.all_tags,
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
      fetchRelations,
    },
  )(PhotoDetail),
);

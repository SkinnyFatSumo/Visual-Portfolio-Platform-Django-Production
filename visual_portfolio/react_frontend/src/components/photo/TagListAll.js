// React
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
import {
  groupByProperty,
  stringOfTags,
  tagStringFromURL,
} from '../support/helpers';

// ------------------------------------------------------------------------- //
//                     LIST OF ALL TAGS AND THEIR PHOTOS                     //
// ------------------------------------------------------------------------- //

function TagListAll(props) {
  // MAYBE, TO PREVENT ALL TAGS FROM RE-RENDERING, MAKE EACH A STATEFUL COMPONENT
  // THAT CAN BE EITHER ACTIVE OR INACTIVE (WITHIN ITS OWN CLASS)
  // TAGS WILL BE LISTED ALPHABETICALLY, SO NO NEED TO MOVE THEM AROUND WHEN
  // ACTIVE BECOMES INACTIVE OR VICE-VERSA

  // MAYBE FIND A SIMILAR WAY TO DO THAT FOR THE TAG SELECT BOX TOO, IF NEEDED

  /*
  props.tags.forEach(tag => {
    if (tag.isActive) {
      active.push(
        <Button
          key={tag.id}
          className="active_tag"
          variant="success"
          id={tag.tagname}
          onClick={this.props.onTagClick}>
          {tag.tagname.toUpperCase()}
        </Button>,
      );
    } else {
      var isDisabled;
      related_photo_tag_ids.has(tag.id)
        ? (isDisabled = false)
        : (isDisabled = true);
      inactive.push(
        <Button
          key={tag.id}
          className="inactive_tag"
          variant="danger"
          disabled={isDisabled}
          id={tag.tagname}
          onClick={this.props.onTagClick}>
          {tag.tagname.toUpperCase()}
        </Button>,
      );
    }
  });
  */

  return (
    <div>
      <h5>List All Tags ==> UNDER CONSTRUCTION}</h5>
      <h5>Delete Tags</h5>
      <h5>Add Tags</h5>
    </div>
  );
}

TagListAll.propTypes = {
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
  )(TagListAll),
);

// React
// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// React Components
import TagHasPhotos from './TagHasPhotos';
import TagHasNoPhotos from './TagHasNoPhotos';

// Helpers
import PropTypes from 'prop-types';
import {
  groupByProperty,
  stringOfTags,
  tagStringFromURL,
} from '../support/helpers';

// ------------------------------------------------------------------------- //
//                 LIST OF ALL TAGS AND RESPECTIVE THEIR PHOTOS              //
// ------------------------------------------------------------------------- //

// TODO: CURRENTLY ONLY TAGS THAT ALREADY HAVE A RELATIONSHIP WITH A PHOTO
// WILL BE SHOWN
// THIS COULD BE AN ISSUE / UX PROBLEM WHEN A USER CREATES A NEW TAG
// OR DELETES ALL PHOTOS ASSOCIATED WITH A TAG // MAYBE FORCE USER TO ASSIGN THE TAG TO AT LEAST ONE PHOTO BEFORE CREATING // AND AUTOMATICALLY DELETE TAG WHEN LAST OF PHOTOS IS TO BE DELETED
//    (PROMPT THEM OF COURSE)
// OR REWORK CODE TO GENERATE LIST OF TAGS FROM 'ALL_TAGS' INSTEAD

class TagListAll extends Component {
  constructor(props) {
    super(props);

    this.assignData = this.assignData.bind(this);
  }

  // RESTRUCTURE DATA FOR DISTRIBUTING PHOTOS BASED ON TAGS
  assignData = () => {
    console.log('assign data called');
    // CREATE OBJECT TO STORE PHOTOS, USING THEIR IDS AS KEYS
    var photos_object = {};
    this.props.all_photos.forEach(photo => {
      photos_object[photo.id] = photo;
    });

    // GROUP RELATIONS (original format is 1:1, photo to tag) BY TAG
    const grouped_by_tag = groupByProperty(this.props.relations, 'tag');

    // STORE TAGNAME AND ITS PHOTOS TO ARRAY OF TAGS
    // STORE THE ACTUAL PHOTO OBJECTS TO THE ARRAY INSTEAD OF THEIR IDS
    var tag_array_with_photos = [];
    var tag_array_no_photos = this.props.all_tags.slice();

    for (const [key, value] of Object.entries(grouped_by_tag)) {
      // STORE ALL RELATED PHOTOS FOR EACH TAG INTO AN ARRAY BY ACCESSING THE
      // PHOTOS OBJECT HELD IN STATE USING THE RELATION'S PHOTO_ID KEY
      var related_photos = [];
      value.forEach(relation_photo => {
        related_photos.push(photos_object[relation_photo.photo]);
      });

      // SORT PHOTOS UNDER TAG BY TITLE NAME (ALPHABETICAL)
      related_photos.sort((a, b) => {
        var title_a = a.title.toLowerCase();
        var title_b = b.title.toLowerCase();
        if (title_a < title_b) {
          return -1;
        }
        if (title_a > title_b) {
          return 1;
        }
        return 0;
      });

      // APPEND VALUES TO TAG ARRAY
      tag_array_with_photos.push({
        tagname: value[0].tagname,
        photos: related_photos,
      });
    }
    
    console.log('Tag Array NONE, before', tag_array_no_photos);

    // CREATE A LIST OF UNUSED TAGS (THOSE WITH NO PHOTOS ASSOCIATED)
    for (let i = 0; i < tag_array_with_photos.length; i++) {
      tag_array_no_photos = tag_array_no_photos.filter(
        all_tags => all_tags.tagname !== tag_array_with_photos[i].tagname,
      );
      console.log('t_a_n_p', tag_array_no_photos);
    }


    // SORT TAG ARRAY BY TAGNAME (ALPHABETICALLY)
    tag_array_with_photos.sort((a, b) => {
      var tagname_a = a.tagname.toLowerCase();
      var tagname_b = b.tagname.toLowerCase();
      if (tagname_a < tagname_b) {
        return -1;
      }
      if (tagname_a > tagname_b) {
        return 1;
      }
      return 0;
    });

    // TODO: Set up side bar gallery element???
    console.log('Tag Array WITH', tag_array_with_photos);
    console.log('Tag Array NONE, after', tag_array_no_photos);

    // CONVERT TO JSX LISTS
    const per_tag_with_photos = tag_array_with_photos.map(tag => (
      <div>
        <TagHasPhotos
          key={tag.tagname}
          tagname={tag.tagname}
          photos={tag.photos}
        />
      </div>
    ));

    const per_tag_no_photos = tag_array_no_photos.map(tag => (
      <div>
        <TagHasNoPhotos key={tag.tagname} tagname={tag.tagname} />
      </div>
    ));

    return (
      <div>
        <h3>Tags with Associated Photos</h3>
        <div>{per_tag_with_photos}</div>
        <h3>Tags without Associated Photos</h3>
        <div>{per_tag_no_photos}</div>
      </div>
    );
  };

  render() {
    // GROUP RELATIONS BY TAG - IN ORDER TO ACCESS ALL PHOTOS OWNED BY TAG
    if (this.props.all_photos_loaded) {
      return (
        <div>
          <ul>{this.assignData()}</ul>
          <h5>Delete Tags</h5>
          <h5>Add Tags</h5>
        </div>
      );
    } else {
      return <h6>Photos Still Loading </h6>;
    }
  }
}

TagListAll.propTypes = {
  // PHOTOS
  all_photos: PropTypes.array.isRequired,
  all_photos_loaded: PropTypes.bool.isRequired,

  // TAGS
  all_tags: PropTypes.array.isRequired,
  all_tags_loaded: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  all_photos: state.photos.all_photos,
  all_photos_loaded: state.photos.all_photos_loaded,

  all_tags: state.tags.all_tags,
  all_tags_loaded: state.all_tags_loaded,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(TagListAll),
);

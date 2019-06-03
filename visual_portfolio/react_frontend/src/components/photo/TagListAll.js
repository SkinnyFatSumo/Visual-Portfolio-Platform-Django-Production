// React
// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// React Components
import TagHasPhotos from './TagHasPhotos';
import TagHasNoPhotos from './TagHasNoPhotos';
import AddTag from './AddTag';
import FindTagByName from './FindTagByName';
import {rudRelation, rudTag} from '../../actions/tagActions';

// Helpers
import PropTypes from 'prop-types';
import {groupByProperty} from '../support/helpers';

// React Bootstrap
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Form,
  Collapse,
  Container,
} from 'react-bootstrap';

// CSS
import '../../css/photo/taglistall.css';

// ------------------------------------------------------------------------- //
//                 LIST OF ALL TAGS AND RESPECTIVE THEIR PHOTOS              //
// ------------------------------------------------------------------------- //

class TagListAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTagActive: false,
      searchTagActive: false,
    };

    this.handleAddVsSearch = this.handleAddVsSearch.bind(this);
    this.assignData = this.assignData.bind(this);
    this.destroyRelation = this.destroyRelation.bind(this);
    this.destroyTag = this.destroyTag.bind(this);
  }

  handleAddVsSearch = event => {
    if (event.target.id === 'search-tag-toggle-button') {
      if (this.state.addTagActive) {
        this.setState({addTagActive: false});
      }
      this.setState({searchTagActive: !this.state.searchTagActive});
    } else if (event.target.id === 'add-tag-toggle-button') {
      if (this.state.searchTagActive) {
        this.setState({searchTagActive: false});
      }
      this.setState({addTagActive: !this.state.addTagActive});
    }
  };

  destroyRelation = event => {
    event.preventDefault();
    console.log('destroyRelation called');
    console.log('this.props.relations', this.props.relations);
    console.log(event.target.getAttribute('data-photo_id'));
    console.log(event.target.getAttribute('data-tag_id'));
    var relation = this.props.relations.find(
      relation =>
        relation.photo == event.target.getAttribute('data-photo_id') &&
        relation.tag == event.target.getAttribute('data-tag_id'),
    );
    console.log('relation', relation);
    this.props.rudRelation(relation.id, 'DELETE');
  };

  destroyTag = event => {
    event.preventDefault();
    console.log('destroyTag called');
    this.props.rudTag(
      event.target.id,
      'DELETE',
      this.props.match.params.username,
    );
  };

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

    console.log('GROUPED BY TAG', grouped_by_tag);
    // STORE TAGNAME AND ITS PHOTOS TO ARRAY OF TAGS
    // STORE THE ACTUAL PHOTO OBJECTS TO THE ARRAY INSTEAD OF THEIR IDS
    var tag_array_with_photos = [];
    var tag_array_no_photos = this.props.all_tags.slice();

    for (const [key, value] of Object.entries(grouped_by_tag)) {
      // STORE ALL RELATED PHOTOS FOR EACH TAG INTO AN ARRAY BY ACCESSING THE
      // PHOTOS OBJECT HELD IN STATE USING THE RELATION'S PHOTO_ID KEY
      var related_photos = [];
      value.forEach(relation_photo => {
        related_photos.push({
          photo_info: photos_object[relation_photo.photo],
          relation_id: relation_photo.id,
          owner: relation_photo.owner,
        });
      });

      // SORT PHOTOS UNDER TAG BY TITLE NAME (ALPHABETICAL)
      related_photos.sort((a, b) => {
        var title_a = a.photo_info.title.toLowerCase();
        var title_b = b.photo_info.title.toLowerCase();
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
        tag_id: value[0].tag,
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

    console.log('Tag Array WITH', tag_array_with_photos);
    console.log('Tag Array NONE, after', tag_array_no_photos);

    // CONVERT TO JSX LISTS
    const per_tag_with_photos = tag_array_with_photos.map(tag => (
      <TagHasPhotos
        all_photos={this.props.all_photos}
        destroyRelation={this.destroyRelation}
        destroyTag={this.destroyTag}
        id={tag.tagname + '-dropdown'}
        isAuthenticated={this.props.isAuthenticated}
        key={tag.tagname}
        photos={tag.photos}
        relations={this.props.relations}
        tag_id={tag.tag_id}
        tagname={tag.tagname}
        user={this.props.user}
      />
    ));

    const per_tag_no_photos = tag_array_no_photos.map(tag => (
      <TagHasNoPhotos
        all_photos={this.props.all_photos}
        destroyTag={this.destroyTag}
        key={tag.tagname}
        tag_id={tag.id}
        tagname={tag.tagname}

        relations={this.props.relations}
        user={this.props.user}
        isAuthenticated={this.props.isAuthenticated}

      />
    ));

    return (
      <div className="tag-container" id="tags-area">
        <h3 className="tag-container" id="all-tags-header" className="header">
          All Tags
        </h3>
        <div id="tags-list">
          <div className="tag-container" id="tags-with-photos-container">
            {this.props.user !== null &&
            this.props.user.username === this.props.match.params.username ? (
              <h4 id="tags-with-photos-header" className="header">
                Tags With Associated Photos
              </h4>
            ) : null}
            <div id="tags-with-photos-body" className="body">
              {per_tag_with_photos}
            </div>
          </div>
          {per_tag_no_photos.length > 0 &&
          this.props.user !== null &&
          this.props.user.username === this.props.match.params.username ? (
            <div className="tag-container" id="tags-no-photos-container">
              <h4 id="tags-without-photos-header" className="header">
                Tags Without Associated Photos
              </h4>

              <div id="tags-without-photos-body" className="body">
                {per_tag_no_photos}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  render() {
    // GROUP RELATIONS BY TAG - IN ORDER TO ACCESS ALL PHOTOS OWNED BY TAG
    if (this.props.all_photos_loaded) {
      console.log('tags loaded?', this.props.all_tags_loaded);
      return (
        <div id="tag-view-content-container" className="content-container">
          <div id="find-add-tag-container" className="content-container">
            <ButtonToolbar id="find-add-tag-toolbar" className="button-toolbar">
              {// Only allow a tag to be added if a user is logged in and this
              // is their content
              this.props.user !== null &&
              this.props.user.username === this.props.match.params.username &&
              this.props.isAuthenticated ? (
                <AddTag
                  isOpen={this.state.addTagActive}
                  toggleOpen={this.handleAddVsSearch}
                />
              ) : null}
              <FindTagByName
                isOpen={this.state.searchTagActive}
                toggleOpen={this.handleAddVsSearch}
              />
            </ButtonToolbar>
          </div>
          <div id="all-tags-content-container" className="content-container">
            <Form id="all-tags-body-form">{this.assignData()}</Form>
          </div>
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
  rudRelation: PropTypes.func.isRequired,
  rudTag: PropTypes.func.isRequired,

  // USER
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  all_photos: state.photos.all_photos,
  all_photos_loaded: state.photos.all_photos_loaded,

  all_tags: state.tags.all_tags,
  all_tags_loaded: state.tags.all_tags_loaded,

  tags: state.tags.tags,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,

  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
  connect(
    mapStateToProps,
    {rudRelation, rudTag},
  )(TagListAll),
);

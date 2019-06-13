import React, {Component} from 'react';

import {Router, withRouter, Redirect} from 'react-router-dom';

// React Components
import Gallery from 'react-photo-gallery';
import AddRelationDefaultTag from './AddRelationDefaultTag';
// Bootstrap Components
import {
  Button,
  ButtonGroup,
  ButtonToolbar,
  Collapse,
  Container,
  Row,
} from 'react-bootstrap';

import {validOwner} from '../support/helpers';

function Columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 400) columns = 2;
  if (containerWidth >= 600) columns = 3;
  if (containerWidth >= 800) columns = 4;
  if (containerWidth >= 1000) columns = 5;
  return columns;
}

class TagHasPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false, buttonClass: 'button-inactive'};

    this.launchDetailView = this.launchDetailView.bind(this);
    this.mapPhotoButtons = this.mapPhotoButtons.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  launchDetailView = event => {
    event.preventDefault();
    //  PUSH TO GALLERY VIEW
    this.props.history.push(
      '/user/' +
        this.props.match.params.username +
        '/detail/' +
        event.target.id,
    );
  };

  mapPhotoButtons = (photos, tag_id, destroyRelation) => {
    console.log('tag_id', tag_id);
    var titles_list = photos.map(photo =>
      validOwner(this.props) ? (
        <ButtonGroup className="photo-button-group" key={photo.id}>
          <Button
            className="photo-button-name"
            id={photo.id}
            onClick={this.launchDetailView}>
            {photo.title}
          </Button>
          <Button
            className="remove-button"
            data-photo_id={photo.id}
            data-tag_id={tag_id}
            onClick={destroyRelation}
          />
        </ButtonGroup>
      ) : (
        <ButtonGroup className="photo-button-group">
          <Button key={photo.id} id={photo.id} onClick={this.launchDetailView}>
            {photo.title}
          </Button>
        </ButtonGroup>
      ),
    );
    return titles_list;
  };

  toggleActive = event => {
    console.log('toggling active');
    event.preventDefault();
    this.props.activeTag === event.target.name
      ? this.props.unsetActiveTag
      : this.props.setActiveTag;
  };

  render() {
    console.log('this.props.user', this.props.user);

    const photo_list = this.props.photos.map(photo => ({
      src: photo.photo_info.thumbnail_source,
      width: photo.photo_info.thumbnail_width,
      height: photo.photo_info.thumbnail_height,
      key: photo.photo_info.id.toString(),
    }));

    const associated_photos = this.props.photos.map(photo => ({
      id: photo.photo_info.id,
      title: photo.photo_info.title,
    }));

    var unassociated_photos = this.props.all_photos.map(photo => ({
      id: photo.id,
      title: photo.title,
    }));

    associated_photos.forEach(as_photo => {
      unassociated_photos = unassociated_photos.filter(
        un_photo => un_photo.id !== as_photo.id,
      );
    });

    const photos_length = this.props.photos.length;

    return (
      <div>
        <button
          className="tagname-button"
          id={this.props.tagname + '-dropdown'}
          name={this.props.tagname}
          onClick={
            this.props.activeTag === this.props.tagname
              ? this.props.unsetActiveTag
              : this.props.setActiveTag
          }>
          {this.props.tagname}
        </button>
        {this.props.activeTag === this.props.tagname ? (
          <div className="tag-content-container">
            <div className="general-outer-container">
              <h4 className="sub-header">Photos</h4>
              <hr />
              <div>
                {this.mapPhotoButtons(
                  associated_photos,
                  this.props.tag_id,
                  this.props.destroyRelation,
                )}
              </div>
            </div>
            {validOwner(this.props) ? (
              <div className="general-outer-container">
                <AddRelationDefaultTag
                  tagname={this.props.tagname}
                  tag_id={this.props.tag_id}
                  unassociated_photos={unassociated_photos}
                />
              </div>
            ) : null}
            <div id="gallery" className="general-outer-container">
              <Gallery
                photos={photo_list}
                directions={photos_length <= 4 ? 'column' : null}
                columns={Columns}
              />
            </div>
            {validOwner(this.props) ? (
              <Button
                variant="danger"
                className="remove-tag-button"
                id={this.props.tag_id}
                onClick={this.props.destroyTag}>
                Delete Tag
              </Button>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default withRouter(TagHasPhotos);

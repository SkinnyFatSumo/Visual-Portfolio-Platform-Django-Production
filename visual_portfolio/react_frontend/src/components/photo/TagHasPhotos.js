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
} from 'react-bootstrap';

// CSS
import '../../css/photo/taghasphotos.css';

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
      this.props.user !== null &&
      this.props.user.username === this.props.match.params.username &&
      this.props.isAuthenticated ? (
        <ButtonGroup key={photo.id}>
          <Button id={photo.id} onClick={this.launchDetailView}>
            {photo.title}
          </Button>
          <Button
            data-photo_id={photo.id}
            data-tag_id={tag_id}
            onClick={destroyRelation}>
            Remove
          </Button>
        </ButtonGroup>
      ) : (
        <Button key={photo.id} id={photo.id} onClick={this.launchDetailView}>
          {photo.title}
        </Button>
      ),
    );
    return titles_list;
  };

  toggleActive = () => {
    console.log('toggling active');
    var new_button_state;
    this.state.buttonClass === 'button-active'
      ? (new_button_state = 'button-inactive')
      : (new_button_state = 'button-active');
    console.log('button state', this.state.buttonClass);
    this.setState({
      isActive: !this.state.isActive,
      buttonClass: new_button_state,
    });
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
        <Button
          id={this.props.tagname + '-dropdown'}
          onClick={this.toggleActive}
          variant='outline-danger'
          block>
          {this.props.tagname}
        </Button>
        {this.state.isActive ? (
          <Container>
            <div id="associated-photos-container">
              <ButtonToolbar>
                {this.mapPhotoButtons(
                  associated_photos,
                  this.props.tag_id,
                  this.props.destroyRelation,
                )}
              </ButtonToolbar>
            </div>
            {this.props.user !== null &&
            this.props.user.username === this.props.match.params.username &&
            this.props.isAuthenticated ? (
              <div id="add-associated-photo-container">
                <AddRelationDefaultTag
                  tagname={this.props.tagname}
                  tag_id={this.props.tag_id}
                  unassociated_photos={unassociated_photos}
                />
              </div>
            ) : null}
            <div id="right">
              <Gallery
                photos={photo_list}
                directions={photos_length <= 4 ? 'column' : null}
                columns={Columns}
              />
            </div>
          </Container>
        ) : null}
      </div>
    );
  }
}

export default withRouter(TagHasPhotos);

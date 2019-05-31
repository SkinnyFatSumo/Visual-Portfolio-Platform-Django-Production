// Core React, Router, and Redux modules
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// React Components
import AddRelationDefaultPhoto from './AddRelationDefaultPhoto';
import Carousel from 'react-bootstrap/Carousel';
import {Button, ButtonGroup, ButtonToolbar, Collapse} from 'react-bootstrap';
import CreateOrEditPhoto from './CreateOrEditPhoto';
// Helpers
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                             PHOTO GALLERY                                 //
// ------------------------------------------------------------------------- //

class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagActive: false,
      photoActive: false,
      index: 0,
      direction: null,
      mapping: null,
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.handlePhotoVsTag = this.handlePhotoVsTag.bind(this);
  }

  handleSelect = (selectedIndex, e) => {
    console.log('index from handle', this.state.index);
    console.log('photos', this.props.photos);
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  };
  
  handlePhotoVsTag= event => {
    if (event.target.id === 'edit-photo-toggle-button') {
      if (this.state.tagActive) {
        this.setState({tagActive: false});
      }
      this.setState({photoActive: !this.state.photoActive});
    } else if (event.target.id === 'edit-tag-toggle-button') {
      if (this.state.photoActive) {
        this.setState({photoActive: false});
      }
      this.setState({tagActive: !this.state.tagActive});
    }
  };

  render() {
    const {index, direction, isOpen, tagActive, photoActive} = this.state;
    var action;
    var disabled;
    if (
      this.props.user !== null &&
      this.props.user.username === this.props.match.params.username &&
      this.props.isAuthenticated
    ) {
      action = 'edit';
    } else {
      action = 'info';
      disabled = 'disabled';
    }
    console.log('INDEX', index);
    if (this.props.photos_loaded && this.props.tags_loaded) {
      return (
        <div>
          <Carousel
            activeIndex={index}
            direction={direction}
            onSelect={this.handleSelect}
            controls={true}
            indicators={true}
            interval={null}>
            {this.props.photos.map(photo => (
              <Carousel.Item key={photo.id}>
                <div className="carousel-item-container">
                  <div className="carousel-image">
                    <img src={photo.photo_source} href={photo.photo_source} />
                    <h6>{photo.title}</h6>
                  </div>
                  <div className="carousel-detail-container">
                    <h4>This will be a Dropdown(up) Item with photo info</h4>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
          <ButtonGroup>
            <CreateOrEditPhoto
              action={action}
              isOpen={photoActive}
              toggleOpen={this.handlePhotoVsTag}
              photo={this.props.photos[index]}
              disabled={disabled}
            />
            {action === 'edit' ? (
              <AddRelationDefaultPhoto
                isOpen={tagActive}
                toggleOpen={this.handlePhotoVsTag}
                photo_id={this.props.photos[index].id}
              />
            ) : null}
            }
          </ButtonGroup>
        </div>
      );
    } else {
      return <h1>Gallery NOT Loaded</h1>;
    }
  }
}

PhotoGallery.propTypes = {
  // PHOTOS
  photos: PropTypes.array.isRequired,
  photos_loaded: PropTypes.bool.isRequired,

  // TAGS
  tags: PropTypes.array.isRequired,
  tags_loaded: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,

  // USER
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  // rudRelation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  photos_loaded: state.photos.photos_loaded,

  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,

  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(PhotoGallery),
);

// Core React, Router, and Redux modules
import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// React Components
// import PhotoDetail from './PhotoDetail';
import Carousel from 'react-bootstrap/Carousel';
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
      isOpen: true,
      index: 0,
      direction: null,
      mapping: null,
    };

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

    /*
  componentDidMount() {
    const mapped = this.props.photos.forEach(photo => mapper.push(photo));
    this.setState({mapping: mapped});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.photos.length !== this.props.photos.length) {
      const mapped = [];
      this.props.photos.forEach(photo => mapped.push(photo));
      this.setState({mapping: mapped});
    }
  }
  */

  handleSelect = (selectedIndex, e) => {
    console.log('index from handle', this.state.index);
    console.log('photos', this.props.photos);
    this.setState({
      index: selectedIndex,
      direction: e.direction,
    });
  };

  toggleOpen = () => {
    this.setState({isOpen: !this.state.isOpen});
  };

  render() {
    const {index, direction, isOpen} = this.state;
    console.log('INDEX', index);
    if (
      this.props.photos_loaded &&
      this.props.tags_loaded
    ) {
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
          <div>
            {this.props.user !== null &&
            this.props.user.username === this.props.match.params.username &&
            this.props.isAuthenticated ? (
              <CreateOrEditPhoto
                action="edit"
                isOpen={this.state.isOpen}
                photo={this.props.photos[index]}
                toggleOpen={this.toggleOpen}
              />
            ) : null}
          </div>
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

import React, {Component} from 'react';

import PropTypes from 'prop-types';

// React Router
import {Router, withRouter, Link} from 'react-router-dom';
import {
  Dropdown,
  DropdownButton,
  Button,
  ButtonGroup,
  Form,
  Collapse,
  Col,
  Row,
  Container,
} from 'react-bootstrap';

// Redux
import {connect} from 'react-redux';

// GET Requests for ALL photos/tags
import {setPhotos, fetchAllPhotos} from '../../actions/photoActions'; // async
import {
  fetchTags, // async
  setTags, // synchronous
  fetchRelations, // async
} from '../../actions/tagActions';

import AddPhoto from '../photo/AddPhoto';
import '../../css/users/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActivePhotos: false,
      isActiveTags: false,
    };
  }

  toggleActivePhotos = () => {
    this.setState({isActivePhotos: !this.state.isActivePhotos});
  };

  toggleActiveTags = () => {
    this.setState({isActiveTags: !this.state.isActiveTags});
  };

  render() {
    const photo_list = this.props.photos.map(photo => (
      <Row key={photo.id}>
        <Col>
          <h6>{photo.title}</h6>
          <img>
            src={photo.thumbnail_source} width={photo.thumbnail_width}
            height={photo.thumbnail_height}
          </img>
        </Col>
        <Col />
      </Row>
    ));
    return (
      <Container>
        <Row>
          <Col>
            <h6>USERNAME</h6>
            <h5>IMAGE</h5>
            <h6>First Last</h6>
          </Col>
          <Col>
            <p>This is the bio here. However it's totally optional.</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <h4>Edit / Add / Delete</h4>
            <div id="content-holder">
              <Button
                id="photo-button"
                className="toggle-button"
                onClick={this.toggleActivePhotos}>
                Photos
              </Button>
              <div id="photo-dropdown-list" className="dropdown-list">
                {this.state.isActivePhotos ? (
                  <AddPhoto id="photo-form" className="list-item" />
                ) : null}
                <h6>Something Else</h6>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

Profile.propTypes = {
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
};

const mapStateToProps = state => ({
  photos: state.photos.photos,
  photos_loaded: state.photos.photos_loaded,
  all_photos_loaded: state.photos.all_photos_loaded,

  tags: state.tags.tags,
  tags_loaded: state.tags.tags_loaded,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {setPhotos, setTags, fetchTags, fetchRelations, fetchAllPhotos},
  )(Profile),
);

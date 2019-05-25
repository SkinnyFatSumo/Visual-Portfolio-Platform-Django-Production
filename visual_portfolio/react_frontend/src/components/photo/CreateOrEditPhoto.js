import React, {Component} from 'react';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {postPhoto} from '../../actions/photoActions';

class CreateOrEditPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      title: '',
      photo_source: '',
      thumbnail_source: '',
      thumbnail_width: '',
      thumbnail_height: '',
      owner: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const {photo} = this.props;
    if (this.props.action === 'edit') {
      this.setState({
        title: photo.title,
        photo_source: photo.photo_source,
        thumbnail_source: photo.thumbnail_source,
        thumbnail_width: photo.thumbnail_width,
        thumbnail_height: photo.thumbnail_height,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {photo} = this.props;
    if (prevProps.photo !== photo && this.props.action === 'edit') {
      this.setState({
        title: photo.title,
        photo_source: photo.photo_source,
        thumbnail_source: photo.thumbnail_source,
        thumbnail_width: photo.thumbnail_width,
        thumbnail_height: photo.thumbnail_height,
      });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.props.action === 'create') {
      const photo = {
        title: this.state.title,
        photo_source: this.state.photo_source,
        thumbnail_source: this.state.thumbnail_source,
        thumbnail_width: this.state.thumbnail_width,
        thumbnail_height: this.state.thumbnail_height,
        owner: this.props.user.id,
      };
      this.props.postPhoto(photo);
    }
  }

  render() {
    const {isOpen} = this.state;
    return (
      <div className="photo-add-box">
        <Button
          id="add-photo-button"
          onClick={this.props.toggleOpen}
          aria-controls="collapse-photo-box"
          aria-expanded={this.props.isOpen}>
          {this.props.isOpen ? 'Finish' : 'Add Photo'}
        </Button>
        <Collapse in={this.props.isOpen}>
          <div id="collapse-photo-box">
            <Form onSubmit={this.onSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="an excellent title"
                    onChange={this.onChange}
                    required
                    value={this.state.title}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Full Resolution URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="photo_source"
                    placeholder="https://www.somehost.com/fullresurl"
                    onChange={this.onChange}
                    value={this.state.photo_source}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Thumbnail URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="thumbnail_source"
                    placeholder="https://www.somehost.com/thumbnailurl"
                    onChange={this.onChange}
                    value={this.state.thumbnail_source}
                    required
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Thumbnail Width</Form.Label>
                  <Form.Control
                    type="number"
                    name="thumbnail_width"
                    placeholder="integer"
                    onChange={this.onChange}
                    min="0"
                    step="1"
                    value={this.state.thumbnail_width}
                    required
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Thumbnail Height</Form.Label>
                  <Form.Control
                    type="number"
                    name="thumbnail_height"
                    placeholder="integer"
                    onChange={this.onChange}
                    min="0"
                    step="1"
                    value={this.state.thumbnail_height}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Button type="submit">Upload Photo</Button>
            </Form>
          </div>
        </Collapse>
      </div>
    );
  }
}

CreateOrEditPhoto.propTypes = {
  postPhoto: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {postPhoto},
)(CreateOrEditPhoto);

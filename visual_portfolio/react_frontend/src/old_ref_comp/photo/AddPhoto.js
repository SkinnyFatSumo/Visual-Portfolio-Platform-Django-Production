import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';
// Actions
import {postPhoto} from '../../actions/photoActions';

class AddPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      photo_source: '',
      thumbnail_source: '',
      thumbnail_width: '',
      thumbnail_height: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const photo = {
      title: this.state.title,
      photo_source: this.state.photo_source,
      thumbnail_source: this.state.thumbnail_source,
      thumbnail_width: this.state.thumbnail_width,
      thumbnail_height: this.state.thumbnail_height,
    };

    this.props.postPhoto(photo);
  }

  render() {
    return (
      <div>
        <h4>Add Photo</h4>
        <form onSubmit={this.onSubmit}>
          <fieldset Classname="required">
            <div>
              <label>Title: </label>
              <input
                type="text"
                name="title"
                onChange={this.onChange}
                value={this.state.title}
              />
            </div>
            <h5>Photo's Source Must be a URL</h5>
            <div>
              <label>Full Resolution: </label>
              <input
                type="url"
                name="photo_source"
                onChange={this.onChange}
                value={this.state.photo_source}
              />
              <br />
            </div>
            <div>
              <h5>
                Please Provide The Height and Width in Pixels of Thumbnail
              </h5>
              <h6>This insures it displays correctly in the gallery</h6>
              <div>
                <label>Thumbnail: </label>
                <input
                  type="url"
                  name="thumbnail_source"
                  onChange={this.onChange}
                  value={this.state.thumbnail_source}
                />
                <br />
                <label>Height: </label>
                <input
                  type="number"
                  name="thumbnail_height"
                  onChange={this.onChange}
                  min="0"
                  step="1"
                  value={this.state.thumbnail_height}
                />
                <br />
                <label>Width: </label>
                <input
                  type="number"
                  name="thumbnail_width"
                  onChange={this.onChange}
                  min="0"
                  step="1"
                  value={this.state.thumbnail_width}
                />
              </div>
            </div>
            <button type="submit">add photo</button>
          </fieldset>
        </form>
      </div>
    );
  }
}

AddPhoto.propTypes = {
  postPhoto: PropTypes.func.isRequired,
};

export default connect(null, {postPhoto} )(AddPhoto);

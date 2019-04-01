// Core React, Router, and Redux modules
import React, {Component, render} from 'react';
import {Router, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

// Redux Actions
import {setPhotos} from '../../actions/photoActions';
import {fetchRelations, setTags, fetchTags} from '../../actions/tagActions';

// React Components
import PhotoDetail from './PhotoDetail';

// Helpers
import PropTypes from 'prop-types';
import {stringOfTags, tagStringFromURL} from '../support/helpers';

//import AddPhoto from './AddPhoto';

////// I DONT LIKE THIS !!!! ///////
// TODO: DON'T MAP PROPS TO STATE //
// COULD CAUSE BUGS, VIOLATE SINGLE SOURCE OF TRUTH //

// Present Individual Photos, with all Content Availalbe
class PhotoGallery extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.loadPhoto = this.loadPhoto.bind(this);
  }

  // get detail of photo from url endpoint
  loadPhoto(endpoint) {
    const lookupOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(endpoint, lookupOptions)
      .then(res => res.json())
      .then(data => {
        // set state for all passed keys
        // json keys exactly match state var names
        Object.keys(data).forEach(key => {
          this.setState({
            [key]: data[key],
          });
        });
        // load successful (TO DO: add loading status)
        this.setState({
          loaded: true,
        });
        // insure id entered via url actually exists
        if (this.state.id !== null) {
          this.setState({id_exists: true});
        }
        console.log('Values received');
      })
      .catch(function(error) {
        console.log('error', error);
      });
  }

  componentDidMount() {
    this.loadPhoto('/api/photos/' + this.props.photo_id + '/');
  }

  render() {
    if (!this.state.loaded) {
      return <h5>Loading...</h5>;
    }
    if (!this.state.id_exists) {
      return <h5>The photo you're looking for isn't here :(</h5>;
    } else {
      return (
        <div>
          <div>
            <h5>{this.state.title}</h5>
            <img src={this.state.photo_source} alt="placeholder" />
            <h5>{this.state.id}</h5>
          </div>
        </div>
      );
    }
  }
}

export default PhotoGallery;

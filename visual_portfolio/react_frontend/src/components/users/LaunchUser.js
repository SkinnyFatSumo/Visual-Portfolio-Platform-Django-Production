// React
import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';

// React Router
import {Router, withRouter, Redirect} from 'react-router-dom';

import {Button} from 'react-bootstrap';
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

class LaunchUser extends Component {
  constructor(props) {
    super(props);

    this.launchUserProfile = this.launchUserProfile.bind(this);
  }

  launchUserProfile = () => {
    // push to gallery route
    this.props.history.push('/user/' + this.props.username + '/profile/', {
      hydrated: true,
    });
  };

  render() {
    return <Button onClick={this.launchUserProfile}>{this.props.username}</Button>;
  }
}

export default withRouter(LaunchUser);

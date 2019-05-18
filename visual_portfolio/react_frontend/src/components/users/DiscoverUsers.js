// React
import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';

// React Router
import {Router, withRouter, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

class DiscoverUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
}

Photo.propTypes = {
  users: 
};

const mapStateToProps = state => ({
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(DiscoverUsers),
);

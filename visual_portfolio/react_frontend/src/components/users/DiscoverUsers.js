// React
import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';

// React Router
import {Router, withRouter, Redirect} from 'react-router-dom';

import SearchUsers from './SearchUsers';

import {Button, Form, Collapse, Col} from 'react-bootstrap';

// import {fetchAllUsers} from '../../actions/userActions';
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

class DiscoverUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      isActive: false,
    };
  }
  
  render() {
    return (
      <div>
        <SearchUsers quantity={20} source='discover_users'/>
      </div>
    )
  }
}


DiscoverUsers.propTypes = {
  allUsersLoaded: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  allUsersLoaded: state.users.allUsersLoaded,
  users: state.users.users,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(DiscoverUsers),
);

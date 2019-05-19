// React
import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';

// React Router
import {Router, withRouter, Redirect} from 'react-router-dom';

import LaunchUser from './LaunchUser';

// import {fetchAllUsers} from '../../actions/userActions';
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

class DiscoverUsers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const all_users = this.props.users.map(user => (
      <LaunchUser key={user.id} username={user.username} />
    ));

    return (
      <div>
        <h1>DISCOVER USERS</h1>
        <ul>{all_users}</ul>
      </div>
    );
  }
}

DiscoverUsers.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  users: state.users.users,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(DiscoverUsers),
);

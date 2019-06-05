// React
import React, {Component, Fragment} from 'react';

// Redux
import {connect} from 'react-redux';

// React Router
import {Router, withRouter, Redirect, Link} from 'react-router-dom';

import {
  InputGroup,
  FormControl,
  Button,
  Form,
  Collapse,
  Col,
  Row,
  Container,
  Nav,
} from 'react-bootstrap';
import LaunchUser from './LaunchUser';
// import {fetchAllUsers} from '../../actions/userActions';
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//                 ROOT COMPONENT FOR ALL --PHOTO-- MATERIAL                 //
// ------------------------------------------------------------------------- //

class SearchUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      valid_users: [],
      isActive: false,
    };
    this.onChange = this.onChange.bind(this);
    this.clearState = this.clearState.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {username, isActive} = this.state;
    const {source} = this.props;
    if (source === 'discover_users' && !isActive) {
      this.setState({isActive: true});
    } else if (username !== '' && !isActive) {
      this.setState({isActive: true});
    } else if (source !== 'discover_users' && username === '' && isActive) {
      this.setState({isActive: false});
    }

    if (
      this.props.allUsersLoaded &&
      this.state.username !== prevState.username
    ) {
      console.log('state username', this.state.username);
      if (this.state.username === '') {
        this.setState({valid_users: []});
      } else {
        var resulting_users = this.props.users
          .slice()
          .filter(user =>
            user.username
              .toLowerCase()
              .includes(this.state.username.toLowerCase()),
          )
          .sort((a, b) => {
            var username_a = a.username.toLowerCase();
            var username_b = b.username.toLowerCase();
            if (username_a < username_b) {
              return -1;
            }
            if (username_a > username_b) {
              return 1;
            }
            return 0;
          })
          .slice(0, this.props.quantity);
        this.setState({
          valid_users: resulting_users.map(user => user.username),
        });
      }
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    console.log('form submitted');
    var submitted_name;
    this.state.valid_users.includes(this.state.username)
      ? (submitted_name = this.state.username)
      : (submitted_name = this.state.valid_users[0]);

    if (submitted_name !== undefined) {
      this.props.history.push('/user/' + submitted_name + '/grid/', {
        hydrated: true,
      });
    }
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  clearState() {
    this.setState({username: ''});
  }

  onOptionChange(e) {
    console.log('on option change', e.target.name);
  }

  render() {
    if (this.state.username !== '') {
      var user_buttons = this.state.valid_users.map((username, index) => (
        <option id={index} name={username} value={username} />
      ));
    }
    console.log('USER BUTTONS', user_buttons);
    console.log('valid users', this.state.valid_users);

    return (
      <form
        className="general-form-container"
        id="search-users-form"
        onSubmit={this.onFormSubmit}>
        <input
          autoComplete="off"
          className="general-input"
          id="search-users-input"
          list="users-list"
          name="username"
          onChange={this.onChange}
          placeholder="find a user"
          type="text"
          value={this.state.username}
        />
        {this.state.valid_users !== undefined ? (
          <datalist className="general-dropdown-list" id="users-list">
            {user_buttons}
          </datalist>
        ) : null}
        <button id="search-users-input-button" onSubmit={this.onFormSubmit}>
          Go
        </button>
      </form>
    );
  }
}

SearchUsers.propTypes = {
  users: PropTypes.array.isRequired,
  allUsersLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  users: state.users.users,
  allUsersLoaded: state.users.allUsersLoaded,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(SearchUsers),
);

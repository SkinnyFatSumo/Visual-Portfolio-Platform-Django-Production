import React, {Component} from 'react';
import {
  Button,
  ButtonGroup,
  Nav,
  Navbar,
  NavDropdown,
  Form,
  Collapse,
  Col,
  Row,
  Container,
} from 'react-bootstrap';

import {matchPath} from 'react-router';
import {withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

import SearchUsers from '../users/SearchUsers';

//import '../../css/general/navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {menu_value: 'account'};

    //this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    e.preventDefault();
    console.log('EVENT TARGET VALUE:', e.target.value);
    this.setState({menu_value: 'account'});
  };

  componentDidUpdate(prevProps) {
    console.log('NAVIGATION UPDATE', this.props.match.params.username);
    // IF USERNAME IN ROUTER CHANGES, FORCE THE COMPONENT TO UPDATE
  }

  render() {
    const match = matchPath(this.props.history.location.pathname, {
      path: '/user/:username',
    });

    const {history} = this.props.history;

    console.log('Username?', match);

    return (
      <Navbar expand="sm" id="navbar">
        <Navbar.Toggle id="navbar-toggle" aria-controls="collapsible-nav" />
        <Navbar.Collapse id="collapsible-nav">
          <Nav>
            <Nav.Item className="nav-item">
              <SearchUsers quantity={5} source="navbar" id='navbar' active={false} />
            </Nav.Item>
            <Nav.Item className="nav-item">
              {match !== null ? (
                <h4 id="nav-viewing-user">
                  Viewing User: {match.params.username}
                </h4>
              ) : null}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
        <Nav>
          <Nav.Item>
            <form
              className="general-form-container"
              id="account-options-form"
              onSubmit={this.onFormSubmit}>
              <select
                className="account-options"
                id="account-options-selector"
                name="&nbsp; Account"
                onChange={this.handleChange}
                value={this.state.menu_value}>
                <option id="account" disabled selected hidden value="account">
                  Account
                </option>
                <option id="profile" value="profile">
                  View My Profile
                </option>
                <option id="logout" value="logout">
                  Logout
                </option>
              </select>
            </form>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(Navigation);

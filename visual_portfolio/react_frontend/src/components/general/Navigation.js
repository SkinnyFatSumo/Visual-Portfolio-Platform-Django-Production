import React, {Component} from 'react';
import {
  Button,
  ButtonGroup,
  Navbar,
  Form,
  Collapse,
  Col,
  Row,
  Container,
} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

import SearchUsers from '../users/SearchUsers';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const headerStyle = {
      borderStyle: 'solid',
      borderRadius: '5px 5px 5px 5px',
      borderColor: 'black',
      borderWidth: '1px',
    };
    return (
      <Navbar bg="dark" variant="dark">
        <SearchUsers quantity={5} source="navbar" />
        <h5>fine</h5>
      </Navbar>
    );
  }
}

export default Navigation;

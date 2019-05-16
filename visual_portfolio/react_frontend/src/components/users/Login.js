import React, {Component} from 'react';
import {Router, withRouter, Link, Redirect} from 'react-router-dom';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import {Connect} from 'react-redux';
import PropTypes from 'prop-types';
import '../../css/users/login.css';

// Redux
import {connect} from 'react-redux';

// GET Requests for ALL photos/tags
import {authenticateUser} from '../../actions/authActions'; // async

import {loginUser} from '../../actions/authActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    }
    console.log('user:' , user);
    this.props.loginUser(user);
    console.log('login form submitted');

  };

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  render() {
    if(this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const {
      email,
      password
    } = this.state;
    return (
      <div className="formContainer" id="all">
        <div className="formContainer" id="login">
          <h4>Login</h4>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={email}
                placeholder="Enter Email" 
                onChange={this.handleChange} 
              />
              
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                value={password}
                type="password"
                placeholder="Password"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button variant="primary" name="submit" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="formContainer" id="register">
          <Link to="/register" className="nav-link">
            Don't have an Account? Click here to register.
          </Link>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


export default withRouter(
  connect(
    mapStateToProps,
    {loginUser},
  )(Login),
);

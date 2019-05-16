import React, {Component} from 'react';
import {Router, withRouter, Link} from 'react-router-dom';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import '../../css/users/register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_2: '',
      first_name: '',
      last_name: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('register form submitted');
  };

  handleChange = e => this.setState({[e.target.name]: e.target.value});

  render() {
    const {
      username,
      email,
      password,
      password_2,
      first_name,
      last_name,
    } = this.state;
    return (
      <div className="formContainer" id="all">
        <div className="formContainer" id="register">
          <h4>Register</h4>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="formGroupUsername">
              <Form.Label>Create a Username</Form.Label>
              <Form.Control type="text" placeholder="Enter Username" />
            </Form.Group>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="email" placeholder="Enter Email" />
              <Form.Text className="text-muted">
                We will never email you or share your email address. This is
                just for logging in.
              </Form.Text>
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
              <Form.Control
                name="password_2"
                value={password_2}
                type="password"
                placeholder="Confirm Password"
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>First Name</Form.Label>
                <Form.Control type="test" onChange={this.handleChange} />
                <Form.Text className="text-muted">Optional</Form.Text>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="name" onChange={this.handleChange} />
                <Form.Text className="text-muted">Optional</Form.Text>
              </Form.Group>
            </Form.Row>

            <Button variant="primary" name="submit" type="submit">
              Submit
            </Button>
          </Form>
        </div>
        <div className="formContainer" id="login">
          <Link to="/login" className="nav-link">
            Have an Account? Click here to go to login page.
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);

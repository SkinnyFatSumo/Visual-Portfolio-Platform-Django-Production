import React, {Component} from 'react';
import {Router, withRouter, Link} from 'react-router-dom';
import {
  Dropdown,
  DropdownButton,
  Button,
  Form,
  Collapse,
  Col,
  Row,
  Container,
} from 'react-bootstrap';
import '../../css/users/profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h6>USERNAME</h6>
            <h5>IMAGE</h5>
            <h6>First Last</h6>
          </Col>
          <Col>
            <p>This is the bio here. However it's totally optional.</p>
          </Col>
        </Row>
        <Row>
          <Col />
          <Col />
        </Row>

        <Row>
          <Col>
            <div className="dropdown-container">
            <Dropdown className="dropdown">
              <Dropdown.Toggle
                variant="success"
                className="toggle"
                id="photos-toggle">
                Photos
              </Dropdown.Toggle>
              <Dropdown.Menu className="menu">
                <Dropdown.Item className="item">Add Photo</Dropdown.Item>
                <Dropdown.Item as="button" className="individual">
                  Edit
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>



            <Dropdown className="dropdown">
              <Dropdown.Toggle
                variant="success"
                className="toggle"
                id="dropdown-tags">
                Tags
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Add Tag</Dropdown.Item>
                <Dropdown.Item as="button" className="button-thing">
                  Edit
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          </Col>
          <Col>
            <p>This is the bio here. However it's totally optional.</p>
          </Col>
        </Row>
        <Row>
          <Col />
          <Col />
        </Row>
      </Container>
    );
  }
}

export default withRouter(Profile);

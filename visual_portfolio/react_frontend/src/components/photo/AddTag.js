import React, {Component} from 'react';
import {Button, Form, Collapse, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {postTag} from '../../actions/tagActions';

class AddTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagname: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    const tag = {
      tagname: this.state.tagname,
      owner: this.props.user.id,
    };

    this.props.postTag(tag);
  }

  render() {
    return (
      <div className="tag-add-box">
        <Button
          id="add-tag-toggle-button"
          onClick={this.props.toggleOpen}
          aria-controls="collapse-add-tag-box"
          aria-expanded={this.props.isOpen}>
          {this.props.isOpen ? 'Close' : 'Add Tag'}
        </Button>
        <Collapse in={this.props.isOpen}>
          <div id="collapse-add-tag-box">
            <Form onSubmit={this.onSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="text"
                    name="tagname"
                    placeholder="sample tag"
                    onChange={this.onChange}
                    required
                    value={this.state.title}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Button type="submit">Create Tag</Button>
                </Form.Group>
              </Form.Row>
            </Form>
          </div>
        </Collapse>
      </div>
    );
  }
}

AddTag.propTypes = {
  postTag: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {postTag},
)(AddTag);

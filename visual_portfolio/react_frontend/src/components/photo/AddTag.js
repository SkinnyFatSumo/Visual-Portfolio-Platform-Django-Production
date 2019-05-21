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
      isOpen: false,
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
    const {isOpen} = this.state;
    return (
      <div className="tag-add-box">
        <Button
          onClick={() => this.setState({isOpen: !isOpen})}
          aria-controls="collapse-tag-box"
          aria-expanded={isOpen}>
          {isOpen ? 'Finish' : 'Add Tag'}
        </Button>
        <Collapse in={this.state.isOpen}>
          <div id="collapse-tag-box">
            <Form onSubmit={this.onSubmit}>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="tagname"
                    placeholder="sample tag"
                    onChange={this.onChange}
                    required
                    value={this.state.title}
                  />
                </Form.Group>
                <Button type="submit">Create Tag</Button>
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
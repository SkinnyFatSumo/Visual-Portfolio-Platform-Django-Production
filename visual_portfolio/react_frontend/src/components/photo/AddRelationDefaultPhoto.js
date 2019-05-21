import React, {Component} from 'react';
import {Button, ButtonGroup, Form, Collapse, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {postRelation} from '../../actions/tagActions';

class AddRelationDefaultTag extends Component {
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
    
    const tag_buttons = this.props.unassociated_tags
      .filter(tag =>
        tag.tagname
          .toLowerCase()
          .includes(this.state.tagname.toLowerCase()),
      )
      .map(remaining_tag => (
        <ButtonGroup key={remaining_tag.id} className='new-tag-button-group'>
          <Button disabled>{remaining_tag.title.toUpperCase()}</Button>
          <Button>VIEW</Button>
          <Button>SELECT</Button>
        </ButtonGroup>
      ));
    
    return (
      <div className="relations-box">
        <div id="collapse-tag-box">
          <Form onSubmit={this.onSubmit}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  name="tagname"
                  placeholder="search tag by tagname"
                  onChange={this.onChange}
                  required
                  value={this.state.tagname}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <div>
                <h3>{tag_buttons}</h3>
              </div>
            </Form.Row>
          </Form>
        </div>
      </div>
    );
  }
}

AddRelationDefaultTag.propTypes = {
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
  {postRelation},
)(AddRelationDefaultTag);

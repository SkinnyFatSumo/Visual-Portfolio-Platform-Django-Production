import React, {Component} from 'react';
import {Button, ButtonGroup, Form, Collapse, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Hash Link
import {HashLink as Link} from 'react-router-hash-link';

// Actions
import {postRelation} from '../../actions/tagActions';

class FindTagByName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagname: '',
    };

    this.onChange = this.onChange.bind(this);
    this.clearState = this.clearState.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  clearState() {
    this.setState({tagname: ''});
  }

  render() {
    // Get all tags that are in use
    var associated_tags = new Set();
    this.props.relations.forEach(relation =>
      associated_tags.add(relation.tagname),
    );
    console.log('arrayified', [...associated_tags]);
    const go_to_tag_buttons = [...associated_tags]
      .filter(tagname =>
        tagname.toLowerCase().includes(this.state.tagname.toLowerCase()),
      )
      .sort((a, b) => {
        var tagname_a = a.toLowerCase();
        var tagname_b = b.toLowerCase();
        if (tagname_a < tagname_b) {
          return -1;
        }
        if (tagname_a > tagname_b) {
          return 1;
        }
        return 0;
      })
      .map(remaining_tag => (
        <Link
          id={remaining_tag}
          to={
            '/user/' +
            this.props.match.params.username +
            '/tags#' +
            remaining_tag +
            '-dropdown'
          }>
          <Button onClick={this.clearState} id={remaining_tag}>
            {remaining_tag.toUpperCase()}
          </Button>
        </Link>
      ));

    return (
      <div className="search-tag-toggle-box">
        <Button
          id="search-tag-toggle-button"
          onClick={this.props.toggleOpen}
          aria-controls="collapse-search-tag-box"
          aria-expanded={this.props.isOpen}>
          {this.props.isOpen ? 'Close' : 'Find Tag'}
        </Button>
        <Collapse in={this.props.isOpen}>
          <container id="collapse-search-tag-box">
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="text"
                    name="tagname"
                    placeholder="find a tag"
                    onChange={this.onChange}
                    required
                    value={this.state.tagname}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <div>
                  {go_to_tag_buttons.length > 0 ? (
                    go_to_tag_buttons
                  ) : (
                    <h6>no matches</h6>
                  )}
                </div>
              </Form.Row>
            </Form>
          </container>
        </Collapse>
      </div>
    );
  }
}

FindTagByName.propTypes = {
  postRelation: PropTypes.func.isRequired,
  relations: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  relations: state.tags.relations,
});

export default withRouter(
  connect(
    mapStateToProps,
    {postRelation},
  )(FindTagByName),
);

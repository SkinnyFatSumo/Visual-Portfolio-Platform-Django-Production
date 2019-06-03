import React, {Component} from 'react';
import {Button, ButtonGroup, Form, Collapse, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {postRelation} from '../../actions/tagActions';

// CSS
import '../../css/photo/addrelationdefaultphoto.css';

class AddRelationDefaultPhoto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tagname: '',
    };

    this.onChange = this.onChange.bind(this);
    this.addRelation = this.addRelation.bind(this);
    this.launchDetailView = this.launchDetailView.bind(this);
    this.filterOutput = this.filterOutput.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  addRelation(e) {
    e.preventDefault();
    const relation = {
      photo: this.props.photo_id,
      tag: parseInt(event.target.id),
      owner: this.props.user.id,
      tagname: this.props.tagname,
    };
    console.log('relation', relation);
    console.log('json relation', JSON.stringify(relation));
    this.props.postRelation(relation);
    this.setState({photo_title: ''});
  }

  launchDetailView(e) {
    event.preventDefault();
    //  PUSH TO GALLERY VIEW
    this.props.history.push(
      '/user/' +
        this.props.match.params.username +
        '/detail/' +
        event.target.id,
    );
  }

  filterOutput(tag_buttons) {
    if (tag_buttons.length > 0) {
      return tag_buttons;
    } else {
      return <h6>no matches</h6>;
    }
  }

  render() {
    const related_tags = this.props.relations.filter(
      relation => relation.photo === this.props.photo_id,
    );
    console.log('related_tags', related_tags);
    var unrelated_tags = this.props.all_tags.slice();
    console.log('All tags', this.props.all_tags);

    console.log('unrelated_tags before', unrelated_tags);
    related_tags.forEach(rel_tag => {
      unrelated_tags = unrelated_tags.filter(
        un_tag => un_tag.id !== rel_tag.tag,
      );
    });

    console.log('unrelated_tags after', unrelated_tags);

    const tag_buttons = unrelated_tags
      .filter(tag =>
        tag.tagname.toLowerCase().includes(this.state.tagname.toLowerCase()),
      )
      .sort((a, b) => {
        var tagname_a = a.tagname.toLowerCase();
        var tagname_b = b.tagname.toLowerCase();
        if (tagname_a < tagname_b) {
          return -1;
        }
        if (tagname_a > tagname_b) {
          return 1;
        }
        return 0;
      })
      .map(remaining_tag => (
        <ButtonGroup key={remaining_tag.id} className="new-tag-button-group">
          <Button id={remaining_tag.id} onClick={this.launchDetailView}>
            {remaining_tag.tagname.toUpperCase()}
          </Button>
          <Button id={remaining_tag.id} onClick={this.addRelation}>
            Add
          </Button>
        </ButtonGroup>
      ));

    const {isOpen, toggleOpen} = this.props;
    return (
      <div className="relations-box">
        <Button
          id="edit-tag-toggle-button"
          onClick={toggleOpen}
          aria-controls="collapse-photo-box"
          aria-expanded={isOpen}>
          {isOpen ? 'Finish' : 'Edit Tags'}
        </Button>
        <Collapse in={isOpen}>
          <div id="collapse-photo-box">
            <Form>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    type="text"
                    name="tagname"
                    placeholder="search tag by name"
                    onChange={this.onChange}
                    required
                    value={this.state.tagname}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <div>{this.filterOutput(tag_buttons)}</div>
              </Form.Row>
            </Form>
          </div>
        </Collapse>
      </div>
    );
  }
}
AddRelationDefaultPhoto.propTypes = {
  // TAGS
  all_tags: PropTypes.array.isRequired,
  all_tags_loaded: PropTypes.bool.isRequired,

  // RELATIONS
  relations: PropTypes.array.isRequired,
  relations_loaded: PropTypes.bool.isRequired,
  rudRelation: PropTypes.func.isRequired,

  // USER
  user: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  all_photos: state.photos.all_photos,
  all_photos_loaded: state.photos.all_photos_loaded,

  all_tags: state.tags.all_tags,
  all_tags_loaded: state.all_tags_loaded,

  relations: state.tags.relations,
  relations_loaded: state.tags.relations_loaded,
  postRelation: PropTypes.func.isRequired,

  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default withRouter(
  connect(
    mapStateToProps,
    {postRelation},
  )(AddRelationDefaultPhoto),
);

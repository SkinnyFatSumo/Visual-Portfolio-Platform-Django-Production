import React, {Component} from 'react';
import {Button, ButtonGroup, Form, Collapse, Col} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

// Redux
import {connect} from 'react-redux';

// Actions
import {postRelation} from '../../actions/tagActions';

class AddRelationDefaultTag extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo_title: '',
    };

    this.onChange = this.onChange.bind(this);
    this.addRelation = this.addRelation.bind(this);
    this.launchDetailView = this.launchDetailView.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  addRelation(e) {
    e.preventDefault();
    const relation = {
      tag: this.props.tag_id,
      photo: parseInt(event.target.id),
      owner: this.props.user.id,
      tagname: this.props.tagname,
    };
    console.log('relation', relation);
    console.log('json relation', JSON.stringify(relation));
    this.props.postRelation(relation);
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

  render() {
    const photo_buttons = this.props.unassociated_photos
      .filter(photo =>
        photo.title
          .toLowerCase()
          .includes(this.state.photo_title.toLowerCase()),
      )
      .sort((a, b) => {
        var title_a = a.title.toLowerCase();
        var title_b = b.title.toLowerCase();
        if (title_a < title_b) {
          return -1;
        }
        if (title_a > title_b) {
          return 1;
        }
        return 0;
      })
      .map(remaining_photo => (
        <ButtonGroup key={remaining_photo.id} className="new-tag-button-group">
          <Button id={remaining_photo.id} onClick={this.launchDetailView}>
            {remaining_photo.title.toUpperCase()}
          </Button>
          <Button id={remaining_photo.id} onClick={this.addRelation}>
            ADD TO TAG
          </Button>
        </ButtonGroup>
      ));

    return (
      <div className="relations-box">
        <div id="collapse-tag-box">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Control
                  type="text"
                  name="photo_title"
                  placeholder="search photo by title"
                  onChange={this.onChange}
                  required
                  value={this.state.photo_title}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <div>
                {photo_buttons.length > 0 ? photo_buttons : <h6>no matches</h6>}
              </div>
            </Form.Row>
          </Form>
        </div>
      </div>
    );
  }
}

AddRelationDefaultTag.propTypes = {
  postRelation: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default withRouter(
  connect(
    mapStateToProps,
    {postRelation},
  )(AddRelationDefaultTag),
);

import React, {Component} from 'react';
import {Button, ButtonToolbar, Collapse} from 'react-bootstrap';
import {withRouter} from 'react-router-dom';
import {groupByProperty} from '../support/helpers';

// ------------------------------------------------------------------------- //
//                             PHOTO GALLERY                                 //
// ------------------------------------------------------------------------- //
class TagSelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  render() {
    //const grouped = groupByProperty(props.relations, 'photo');
    //console.log('GROUPED:', grouped);

    // CONTROL TOGGLE STATE OF THE TAG BOX
    const {isOpen} = this.state;

    // CREATE LISTS TO STORE ACTIVE VS. INACTIVE TAG BUTTONS
    var active = [];
    var inactive = [];

    // STORE IDS OF ALL CURRENT PHOTOS BEING DISPLAYED
    const photo_ids = this.props.photos.map(photo => photo.id);
    // STORE ALL TAGS CONTAINED WITHIN THOSE PHOTOS IN A SET
    var related_photo_tag_ids = new Set();
    this.props.relations.forEach(relation => {
      if (photo_ids.includes(relation.photo)) {
        related_photo_tag_ids.add(relation.tag);
      }
    });
    console.log('Related_photo_tag_ids', related_photo_tag_ids);

    // SET BUTTONS ACCORDING TO ACTIVE OR INACTIVE
    // IF INACTIVE SET BUTTON AS DISABLED IF NO CURRENT PHOTOS CONTAIN ITS TAG
    this.props.tags.forEach(tag => {
      if (tag.isActive) {
        active.push(
          <Button
            key={tag.id}
            className="active_tag"
            variant="success"
            id={tag.tagname}
            onClick={this.props.onTagClick}>
            {tag.tagname.toUpperCase()}
          </Button>,
        );
      } else {
        var isDisabled;
        related_photo_tag_ids.has(tag.id)
          ? (isDisabled = false)
          : (isDisabled = true);
        inactive.push(
          <Button
            key={tag.id}
            className="inactive_tag"
            variant="danger"
            disabled={isDisabled}
            id={tag.tagname}
            onClick={this.props.onTagClick}>
            {tag.tagname.toUpperCase()}
          </Button>,
        );
      }
    });

    return (
      <div className="collapse-tags-all">
        <Button
          onClick={() => this.setState({isOpen: !isOpen})}
          aria-controls="collapse-tags-container"
          aria-expanded={isOpen}>
          VIEW TAGS
        </Button>
        <Collapse in={this.state.isOpen}>
          <div id="collapse-tags-container">
            <div className="collapse-tags-box" id="collapse-tags-active">
              <h6>active tags</h6>
              <ButtonToolbar>{active}</ButtonToolbar>
            </div>
            <div className="collapse-tags-box" id="collapse-tags-inactive">
              <h6>inactive tags</h6>
              <ButtonToolbar>{inactive}</ButtonToolbar>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default withRouter(TagSelectBox);

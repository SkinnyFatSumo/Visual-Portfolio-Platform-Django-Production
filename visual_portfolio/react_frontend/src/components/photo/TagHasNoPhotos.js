import React, {Component} from 'react';

// React Components
import Gallery from 'react-photo-gallery';
import AddRelationDefaultTag from './AddRelationDefaultTag';

// Bootstrap Components
import {Button, ButtonToolbar, Collapse} from 'react-bootstrap';

// CSS
import '../../css/photo/taghasphotos.css';

class TagHasNoPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false};
    this.toggleActive = this.toggleActive.bind(this);
  }

  toggleActive = () => {
    this.setState({isActive: !this.state.isActive});
  };

  render() {
    console.log('THIS.PROPS.TAG.ID', this.props.tag_id);
    return (
      <div>
        <button onClick={this.toggleActive}>{this.props.tagname}</button>
        {this.state.isActive ? (
          <div>
            <AddRelationDefaultTag
              tagname={this.props.tagname}
              tag_id={this.props.tag_id}
              unassociated_photos={this.props.all_photos}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default TagHasNoPhotos;

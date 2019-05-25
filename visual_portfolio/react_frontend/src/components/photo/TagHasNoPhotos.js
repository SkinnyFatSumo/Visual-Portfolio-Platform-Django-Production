import React, {Component} from 'react';

import {withRouter} from 'react-router-dom';

// React Components
import AddRelationDefaultTag from './AddRelationDefaultTag';

// Bootstrap Components
import {Button, ButtonToolbar} from 'react-bootstrap';

// CSS
// import '../../css/photo/taghasphotos.css';

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
    if (
      this.props.user !== null &&
      this.props.user.username === this.props.match.params.username &&
      this.props.isAuthenticated
    ) {
      return (
        <div>
          <Button onClick={this.toggleActive}>{this.props.tagname}</Button>
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
    } else {
      return null;
    }
  }
}

export default withRouter(TagHasNoPhotos);

import React, {Component} from 'react';

// React Components
import Gallery from 'react-photo-gallery';

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
    return (
      <div>
        <button onClick={this.toggleActive}>{this.props.tagname}</button>
        {this.state.isActive ? (
          <div>
            <h6>Do Stuff</h6>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TagHasNoPhotos;

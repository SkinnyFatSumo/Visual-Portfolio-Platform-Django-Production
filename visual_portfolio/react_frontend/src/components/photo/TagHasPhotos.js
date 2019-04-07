import React, {Component} from 'react';
import {Button, ButtonToolbar, Collapse} from 'react-bootstrap';

class TagHasPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {isActive: false};

    this.getTitles = this.getTitles.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
  }

  getTitles = photos => {
    var titles_list = photos.map(photo => <li>{photo.title}</li>);
    return titles_list;
  };

  toggleActive = () => {
    this.setState({isActive: !this.state.isActive});
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleActive}>{this.props.tagname}</button>
        {this.state.isActive ? (
          <ul>{this.getTitles(this.props.photos)}</ul>
        ) : null}
      </div>
    );
  }
}

export default TagHasPhotos;

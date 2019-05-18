import React, {Component} from 'react';

// React Components
import Gallery from 'react-photo-gallery';

// Bootstrap Components
import {Button, ButtonToolbar, Collapse} from 'react-bootstrap';

// CSS
import '../../css/photo/taghasphotos.css';

function Columns(containerWidth) {
  let columns = 1;
  if (containerWidth >= 400) columns = 2;
  if (containerWidth >= 600) columns = 3;
  if (containerWidth >= 800) columns = 4;
  if (containerWidth >= 1000) columns = 5;
  return columns;
}

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
    const photo_list = this.props.photos.map(photo => ({
      src: photo.thumbnail_source,
      width: photo.thumbnail_width,
      height: photo.thumbnail_height,
      key: photo.id,
    }));

    const photos_length = this.props.photos.length;

    return (
      <div>
        <h1>{photo_list.length}</h1>
        <button onClick={this.toggleActive}>{this.props.tagname}</button>
        {this.state.isActive ? (
          <div>
            <div id="left">
              <ul>{this.getTitles(this.props.photos)}</ul>
            </div>
            <div id="right">
              <Gallery
                photos={photo_list}
                directions={photos_length <= 4 ? 'column' : null}
                columns={Columns}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

export default TagHasPhotos;

import React, {Component} from 'react';

// Bootstrap Components
import {Button, ButtonToolbar, Collapse} from 'react-bootstrap';

class UserContent extends Component {
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
        <Button onClick={this.toggleActive}>{this.props.category}</button>
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

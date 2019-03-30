import React, {Component} from 'react';
import {Router, withRouter} from 'react-router-dom';

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log('from error page:', this.props.history);
    return (
      <div>
        <h1>
          Either your URL is bad or there is no picture with all those tags
        </h1>
        <button>PlaceHolder: Go Back to Before The Issue</button>
      </div>
    );
  }
}

export default withRouter(ErrorPage);

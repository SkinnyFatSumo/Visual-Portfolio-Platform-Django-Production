import React, {Component} from 'react';
import {Router, withRouter} from 'react-router-dom';

class ErrorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.history.location.state) {
      if (this.props.history.location.state.failure) {
        if (this.props.history.location.state.failure === 'bad url') {
          return (
            <div>
              <h1>
                Either your URL is bad or there is no picture with all those
                tags
              </h1>
              <button>PlaceHolder: Go Back to Before The Issue</button>
            </div>
          );
        } else {
          return <h1>You reached this page because of an UNKNOWN error</h1>;
        }
      } else {
        return <h1>You reached this page because of an UNKNOWN error</h1>;
      }
    } else {
      return <h1>You reached this page because of an UNKNOWN error</h1>;
    }
  }
}

export default withRouter(ErrorPage);

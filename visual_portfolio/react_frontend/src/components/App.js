// React
import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';

// React Redux
import {Provider} from 'react-redux';
// Redux Store
import store from '../Store';

// React Alerts
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

// React Router
import {Router, Route, Switch} from 'react-router-dom';

// Authorization
import {authenticateUser} from '../actions/authActions';

// COMPONENTS //
// Photo
import Photo from './photo/Photo';
import PhotoDetail from './photo/PhotoDetail';
import PhotoGrid from './photo/PhotoGrid';
import PhotoGallery from './photo/PhotoGallery';
import TagListAll from './photo/TagListAll';
import MyTags from './photo/TagListAll';

// User
import Register from './users/Register';
import Login from './users/Login';
import Profile from './users/Profile';

// Support
import ErrorPage from './support/ErrorPage';
import Alerts from './support/Alerts';

import {createBrowserHistory} from 'history';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

// Temporary Styling
const headerStyle = {
  margin: '10px',
  backgroundColor: 'LightSlateGrey',
};

// Track browser history to control redux state operations and push routes
const history = createBrowserHistory();
// if there is history of a location with hydrated in it's state
// set hydrated to false, to insure page hydrates on refresh
if (
  history.location &&
  history.location.state &&
  history.location.state.hydrated
) {
  const state = {...history.location.state};
  state.hydrated = false;
  history.replace({...history.location, state});
}

// Root App for building out components (keep index.js pure)
class App extends Component {
  constructor(props) {
    super(props);
    this.State = {};
  }

  componentDidMount() {
    console.log('APP MOUNTED, HISTORY:', history);
    store.dispatch(authenticateUser());
  }
  // <Route path="/photo/tags/:user?/:url_tags?" component={TagListAll} />
  // <Route path="/photo/grid/:user?/:url_tags?" component={PhotoGrid} />
  // <Route path="/photo/gallery/:user?/:url_tags?" component={PhotoGallery} />



  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <h1 style={headerStyle}>This is the Navigation Bar</h1>
          <Router history={history}>
            <Fragment>
              <Route path="/register/" component={Register} />
              <Route path="/login/" component={Login} />
              <Route path="/profile/:username" component={Profile} />
              <Route path="/photo/:display?/:username?" component={Photo} />
              <Route
                path="/photo/gallery/:username/:url_tags?"
                component={PhotoGallery}
              />
              <Route path="/photo/grid/:username/:url_tags?" component={PhotoGrid} />
              <Route path="/photo/detail/:id" component={PhotoDetail} />
              <Route
                path="/photo/tags/:username/:url_tags?"
                component={TagListAll}
              />
              <Route path="/error/" component={ErrorPage} />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

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
import {fetchAllUsers} from '../actions/userActions';

// COMPONENTS //
// Photo
import ContentRoot from './photo/ContentRoot';
import PhotoDetail from './photo/PhotoDetail';
import PhotoGrid from './photo/PhotoGrid';
import PhotoGallery from './photo/PhotoGallery';
import TagListAll from './photo/TagListAll';
import MyTags from './photo/TagListAll';

// User
import Register from './users/Register';
import Login from './users/Login';
import Profile from './users/Profile';
import DiscoverUsers from './users/DiscoverUsers';

// General
import Navigation from './general/Navigation';

// Support
import ErrorPage from './support/ErrorPage';
import Alerts from './support/Alerts';

import {createBrowserHistory} from 'history';

import '../css/app.css';

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: 'top center',
};

// Track browser history to control redux state operations and push routes
// for more complex requests
const history = createBrowserHistory();

// TODO: YOU SHOULD BE ABLE TO REMOVE THE LAST OF THIS, IT'S OUTDATED
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
    store.dispatch(fetchAllUsers());
  }

  render() {
    return (
      <div id='body'>
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router history={history}>
            <Fragment>
              <Route path="/" component={Navigation} />
              <Route path="/register/" component={Register} />
              <Route path="/login/" component={Login} />
              <Route path="/user/:username/:display/:urltags?" component={ContentRoot} />
              <Route path="/user/:username/profile/" component={Profile} />
              <Route path="/user/:username/gallery/:urltags?"
                component={PhotoGallery}
              />
              <Route path="/user/:username/grid/:urltags?" component={PhotoGrid} />
              <Route path="/user/:username/tags"
                component={TagListAll}
              />
              <Route path="/user/:username/detail/:id" component={PhotoDetail} />
              <Route path="/discover/:reason?" component={DiscoverUsers} />
              <Route path="/error/" component={ErrorPage} />
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

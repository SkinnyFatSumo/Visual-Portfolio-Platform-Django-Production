// React
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Router
import {withRouter} from 'react-router-dom';

// Redux
/*
import {connect} from 'react-redux';
import {fetchTags} from '../../actions/tagActions';
import {setTags} from '../../actions/tagActions';
import {fetchRelations} from '../../actions/tagActions';
*/

class TagListAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h5>List All Tags ==> {this.props.tags}</h5>
        <h5>Delete Tags</h5>
        <h5>Add Tags</h5>
      </div>
    );
  }
}

export default withRouter(TagListAll);

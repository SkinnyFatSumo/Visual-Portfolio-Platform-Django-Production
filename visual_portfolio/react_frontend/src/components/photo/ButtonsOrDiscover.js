// React
import React from 'react';

import {connect} from 'react-redux';
// React Router
import {withRouter} from 'react-router-dom';

// Components
import DisplayButtons from './DisplayButtons';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import PropTypes from 'prop-types';

// ------------------------------------------------------------------------- //
//         CHOOSE BETWEEN BUTTON OR CARD MENU FOR PHOTO DISPLAY TYPES        //
// ------------------------------------------------------------------------- //

export function ButtonsOrDiscover(props) {
  return (
    <ButtonToolbar>
      <DisplayButtons
        handleClick={props.launchGallery}
        name="Gallery"
        active={props.active}
      />
      <DisplayButtons
        handleClick={props.launchGrid}
        name="Grid"
        active={props.active}
      />
      <DisplayButtons
        handleClick={props.launchTags}
        name="Tags"
        active={props.active}
      />
    </ButtonToolbar>
  );
}

ButtonsOrDiscover.propTypes = {
  users: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  users: state.users.users,
});

export default withRouter(
  connect(
    mapStateToProps,
    {},
  )(ButtonsOrDiscover),
);

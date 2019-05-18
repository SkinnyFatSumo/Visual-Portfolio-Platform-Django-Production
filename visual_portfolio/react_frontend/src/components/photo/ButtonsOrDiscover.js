// React
import React from 'react';

// React Router
import {withRouter} from 'react-router-dom';

// Components
import DisplayButtons from './DisplayButtons';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

// ------------------------------------------------------------------------- //
//         CHOOSE BETWEEN BUTTON OR CARD MENU FOR PHOTO DISPLAY TYPES        //
// ------------------------------------------------------------------------- //

export function ButtonsOrDiscover(props) {
  console.log('pathname:', props.location.pathname);
  if (props.location.pathname !== undefined) {
    const {pathname} = props.location;
    const {display, username} = props.match.params;
    console.log('Active in But or Dis: ', props.active);
    console.log('params: ', props.match.params);
    if (
      display === null ||
      display === undefined ||
      username === null ||
      username === undefined
    ) {
      return <h1>DISCOVER A USER</h1>;
    }

    // ----------------------------------------------------------
    // RETURN BUTTON VIEW IF AT ONE OF THE PHOTO DISPLAYS ALREADY
    // ----------------------------------------------------------
    else {
      if (display === 'gallery' || display === 'grid' || display === 'tags') {
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
    }
  }
}

export default withRouter(ButtonsOrDiscover);

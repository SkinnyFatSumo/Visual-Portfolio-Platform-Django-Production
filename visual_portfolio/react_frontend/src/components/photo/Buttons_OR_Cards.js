// React
import React from 'react';

// React Router
import {withRouter} from 'react-router-dom';

// Components
import {PhotoButton, PhotoCard} from './Buttons_AND_Cards';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';

// ------------------------------------------------------------------------- //
//         CHOOSE BETWEEN BUTTON OR CARD MENU FOR PHOTO DISPLAY TYPES        //
// ------------------------------------------------------------------------- //

export function Buttons_OR_Cards(props) {
  if (props.location.pathname !== undefined) {
    const {pathname} = props.location;

    // -------------------------------------------------------
    // RETURN --CARD-- VIEW IF AT HOME PAGE OR PHOTO ROOT PAGE
    // -------------------------------------------------------
    
    if (pathname === '/' || pathname === '/photo/') {
      return <h1>CARDS</h1>;

    // ----------------------------------------------------------
    // RETURN BUTTON VIEW IF AT ONE OF THE PHOTO DISPLAYS ALREADY
    // ----------------------------------------------------------
    
    } else if (props.match.params.display !== undefined) {
      const {display} = props.match.params;
      if (display === 'gallery' || display === 'grid' || display === 'tags') {
        return (
          <ButtonToolbar>
            <PhotoButton
              handleClick={props.launchGallery}
              active={props.active}
              name="Gallery"
            />
            <PhotoButton
              handleClick={props.launchGrid}
              active={props.active}
              name="Grid"
            />
            <PhotoButton
              handleClick={props.launchTags}
              active={props.active}
              name="Tags"
            />
          </ButtonToolbar>
        );
      }
    }
  }
}

export default withRouter(Buttons_OR_Cards);

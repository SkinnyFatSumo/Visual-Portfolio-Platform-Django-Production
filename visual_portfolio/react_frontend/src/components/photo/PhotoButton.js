import React from 'react';
import {Button} from 'react-bootstrap';
import {Card} from 'react-bootstrap';

function PhotoButton(props) {
  var onClick;
  var active;
  props.active ? (onClick = props.handleClick) : (onClick = console.log('no'));

  return (
    <Button onClick={onClick} className={active}>
      {props.name}
    </Button>
  );
}

function PhotoCard(props) {
  var onClick;
  var active;
  props.active
    ? (onClick = this.props.handleClick)
    : (onClick = console.log('no'));

  return (
    <Card onClick={onClick} className={active}>
      {props.name}
    </Card>
  );
}

export {PhotoButton, PhotoCard};

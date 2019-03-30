import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';


class TagElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }
  
  render() {
    return (
      <h1>Hell0</h1>
    );
  }
}


export default TagElement;

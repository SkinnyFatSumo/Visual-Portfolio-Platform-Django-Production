import React, {Component} from 'react';

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // state should include: date range
  }

  // props should include:
  // -numposts
  // -more (passed onClick handler)
  // -way to access posts
  // 
  //  - number of posts per page (pagination)?
  //  - maybe an indicator for a method to expand with more entries
  //  - the posts themselves (probably an async redux call)
  //  - an op

  render() {
    return <h1>Blogs Component</h1>;
  }
}

export default withAlert()(Blog);

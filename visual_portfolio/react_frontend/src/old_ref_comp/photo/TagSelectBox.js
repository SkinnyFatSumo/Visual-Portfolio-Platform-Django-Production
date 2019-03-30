/*
import React, {Component} from 'react';

class TagSelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }
  // receives props:
  //    - onTagClick
  //    - tags
  render() {
    // control toggle state of the tag box
    const {isOpen} = this.state;
    var active = [];
    var inactive = [];
    this.props.tags.forEach(tag => {
      tag.isActive
        ? active.push(
            <button className="active_tag" id={tag.tagname} onClick={this.props.onTagClick}>
              {tag.tagname}
            </button>,
          )
        : inactive.push(
            <button className="inactive_tag" id={tag.tagname} onClick={this.props.onTagClick}>
              {tag.tagname}
            </button>,
          );
    })

    return (
      <div className="collapse-tags-all">
        <Button
          onClick={() => this.setState({isOpen: !isOpen})}
          aria-controls="collapse-tags-container"
          aria-expanded={isOpen}>
          VIEW TAGS
        </Button>
        <Collapse in={this.state.isOpen}>
          <div id="collapse-tags-container">
            <div className="collapse-tags-box" id="collapse-tags-active">
              <h6>active tags</h6>
              <ButtonToolbar>
                {active}
              </ButtonToolbar>
            </div>
            <div className="collapse-tags-box" id="collapse-tags-inactive">
              <h6>inactive tags</h6>
              <ButtonToolbar>
                {inactive} 
              </ButtonToolbar>
            </div>
          </div>
        </Collapse>
      </div>
    );
  }
}

export default TagSelectBox;
*/


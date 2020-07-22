import React, { Component } from 'react';
import CSSTransitionGroup from 'react-transition-group';
class Transition extends Component {
  render() {
    return (
      <CSSTransitionGroup
        transitionName="sample-app"
        transitionEnterTimeout={500}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
      >
        {this.props.children}
      </CSSTransitionGroup>
    );
  }
}

export default Transition;

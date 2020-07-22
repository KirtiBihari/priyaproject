import { MDBCard, MDBCardHeader, MDBIcon, MDBCollapse } from 'mdbreact';
import React, { Component } from 'react';

class AccordianMenu extends Component {
  state = {
    collapseID: ''
  };
  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ''
    }));
  createSubMenu = items => {
    return items.map((item, i) => {
      return (
        <li key={i}>
          <a href="#">{item.name}</a>
        </li>
      );
    });
  };
  createMenuList = props => {
    let template = null;

    return props.menus.map((item, i) => {
      let collapse = 'collapse' + i;
      if (item.child) {
        template = (
          <li key={i}>
            <a
              href="#"
              onClick={this.toggleCollapse(collapse)}
              className={
                this.state.collapseID === collapse
                  ? 'collapsible-header Ripple-parent arrow-r active'
                  : 'collapsible-header Ripple-parent arrow-r'
              }
            >
              {item.name}
              <i className="fa fa-angle-down rotate-icon" />
            </a>
            <MDBCollapse id={'collapse' + i} isOpen={this.state.collapseID}>
              <ul className="collapsible collapsible-accordion">
                {this.createSubMenu(item.submenu)}
              </ul>
            </MDBCollapse>
          </li>
        );
      } else {
        template = (
          <li>
            <a href="#">{item.name}</a>
          </li>
        );
      }
      return template;
    });
  };
  render() {
    return (
      <div>
        <MDBCard style={{ width: '100%', marginTop: '0rem' }} narrow>
          <MDBCardHeader
            className="light-blue "
            style={{ paddingRight: '1.25rem' }}
          >
            {this.props.title}
          </MDBCardHeader>
          <div className="menu-nav">
            <ul className="collapsible collapsible-accordion">
              {this.createMenuList(this.props)}
            </ul>
          </div>
        </MDBCard>
      </div>
    );
  }
}

export default AccordianMenu;

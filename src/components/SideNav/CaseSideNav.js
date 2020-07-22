import React from 'react';
import {
  MDBIcon,
  MDBSideNavCat,
  MDBSideNavNav,
  MDBSideNav,
  MDBSideNavLink
} from 'mdbreact';
import DynamicNav from './dynamicNav';
import { menuList } from './dynamic';
import { isNullOrUndefined } from 'util';
class SideNavPage extends React.Component {
  componentWillMount() {
    console.log('menu1 :' + JSON.stringify(this.props.menu));
  }
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  createDynamicMenu() {
    console.log('menu2 :' + JSON.stringify(this.props.menu));
    let menu = this.props.menu;
    if (!this.isEmpty(menu)) {
      return <DynamicNav caseid={this.props.caseid} {...menu.menuData} />;
    }
  }
  render() {
    console.log('menu :' + JSON.stringify(this.props.menu));

    return (
      <MDBSideNav fixed breakWidth={1300} className="white side-nav-top">
        <li className="settings">Request Processing</li>
        <MDBSideNavNav>
          <MDBSideNavCat name="Case" id="case" icon="briefcase">
            <MDBSideNavLink to={'/case/caseedit/' + this.props.caseid}>
              Edit Request
            </MDBSideNavLink>
            {this.createDynamicMenu()}
            {/* {this.props.menu ? <DynamicNav props={this.props.menu} /> : null} */}

         
          </MDBSideNavCat>
        </MDBSideNavNav>
      </MDBSideNav>
    );
  }
}
export default SideNavPage;

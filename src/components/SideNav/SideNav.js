import React from 'react';
import SideNav, {NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';

// Be sure to include styles at some point, probably during your bootstraping
import '../../assets/css/react-sidenav.css';
class SideNavPage extends React.Component {
  getChildMenu = child => {
    return child.map ((menu, key) => (
      <NavItem
        eventKey={`${this.props.path}${menu.to}`}
        key={key}
        to={`${this.props.path}${menu.to}`}
      >
        <NavText title="Policies">
          {menu.name}
        </NavText>
      </NavItem>
    ));
  };
  createNavLink = sideMenuList => {
    return sideMenuList.map ((sidemenu, key) => {
      return (
        <NavItem eventKey={sidemenu.id} key={key}>
          <NavIcon>
            <i
              className={`fa fa-fw fa-${sidemenu.icon}`}
              style={{fontSize: '1.75em'}}
            />
          </NavIcon>
          <NavText>
            {sidemenu.name}
          </NavText>
          {this.getChildMenu (sidemenu.child)}
        </NavItem>
      );
    });
  };

  render () {
    const {sideMenuList, onToggle, onSelect, selected} = this.props;
    return (
      <SideNav onSelect={onSelect} onToggle={onToggle}>
        <SideNav.Toggle />
        <SideNav.Nav selected={selected}>
          {this.createNavLink (sideMenuList)}
        </SideNav.Nav>
      </SideNav>
    );
  }
}

export default SideNavPage;

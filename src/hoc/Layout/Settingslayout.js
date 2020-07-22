import React, {Component} from 'react';
import SideNav from '../../components/SideNav/SideNav';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class SettingsLayout extends Component {
  state = {
    selected: 'home',
    expanded: false,
    path: '/org',
  };
  onSelect = selected => {
    this.setState ({selected: selected}, () => {
      this.props.navigate (selected);
    });
  };
  onToggle = expanded => {
    this.setState ({expanded: expanded});
  };

  componentDidMount () {
    this.props.getSideMenuList (this.props.path);
    if (this.props.path === 'appManagerSideNav') {
      this.setState ({path: '/appmanager'});
    }
  }
  render () {
    const sideMenuList = this.props.sideMenuList.sideMenu;
    const {selected, expanded} = this.state;
    return (
      <div className="content">

        <SideNav
          sideMenuList={sideMenuList}
          selected={selected}
          expanded={expanded}
          onSelect={this.onSelect}
          onToggle={this.onToggle}
          path={this.state.path}
        />
        <div
          style={{
            marginLeft: expanded ? 240 : 64,
            padding: '15px 20px 0 20px',
          }}
        >
          {this.props.children}
        </div>

      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    sideMenuList: state.sideMenu,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getSideMenuList: path => dispatch (actions.sideNavListProcess (path)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (SettingsLayout);

import React, {Component} from 'react';
import {Navbar, NavbarBrand, NavbarNav, NavItem, MDBAvatar} from 'mdbreact';
import './header.scss';
import {Link} from 'react-router-dom';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';

class Header extends Component {
  state = {
    username: '',
  };
  handleLogout = event => {
    this.props.logout ();
  };
  navigateTo = url => {
    this.props.history.push (url);
  };

  componentDidMount = () => {
    const userId = localStorage.getItem ('userId');
    this.setState ({username: userId});
  };

  render () {
    return (
      <Navbar className="header" expand="md">
        <NavbarBrand>
          <div className="apptitle" />
        </NavbarBrand>

        <NavbarNav right>
          <NavItem className="profile">

            {this.state.username}
            <MDBAvatar
              tag="img"
              src={'https://mdbootstrap.com/img/Photos/Avatars/avatar-14.jpg'}
              alt="Mahesh"
              circle
              className="mr-2 z-depth-1"
            />

          </NavItem>
          <NavItem className="" onClick={this.handleLogout}>
            <Link to="/login">
              Logout
            </Link>
          </NavItem>
        </NavbarNav>
      </Navbar>
    );
  }
}
const mapStateToProps = state => ({
  isLoggedOut: state.auth.isLoggedOut,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch (actions.logout ()),
  authcheck: () => dispatch (actions.authCheckState ()),
});

export default connect (mapStateToProps, mapDispatchToProps) (Header);

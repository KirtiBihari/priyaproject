import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CaseSideNav from '../../components/SideNav/CaseSideNav';
import { Auth } from 'aws-amplify';
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar';
import CaseHeader from '../../components/Case/CaseHeader';

var ps;
class CaseLayout extends Component {
  signOut = async e => {
    e.preventDefault();
    Auth.signOut()
      .then(() => {
        this.props.onStateChange('signedOut', null);
        console.log('signedOut');
      })
      .catch(err => console.log(err));
  };
  componentDidMount() {
   
  }
  componentWillUnmount() {
    
  }

  componentWillMount() {
    console.log("CASE LAYOUTTTTTTTTTTT", this.props.caseid);
  }

  render() {
    return (
      <div className="content">
        <CaseSideNav caseid={this.props.caseid} menu={this.props.menu} />
        <CaseHeader caseid={this.props.caseid} />
        {this.props.children}
      </div>
    );
  }
}

export default CaseLayout;

import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';


class Layout extends Component {
  state = {
    activeItemClassicTabs1: "1"
  };

  toggleClassicTabs1 = tab => () => {
    if (this.state.activeItemClassicTabs1 !== tab) {
      this.setState({
        activeItemClassicTabs2: tab
      });
    }
  };

  render() {
    return (
      <div className="main-panel" ref="mainPanel">
        <Header />
       
    
        <div className="container-fluid">{this.props.children}</div>
        
        <Footer />
      </div>
    );
  }
}

export default Layout;

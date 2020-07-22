import React, {Component} from 'react';

import './HomePage.scss';
import Tabs from '../../components/Tabs/Tabs';
import {Route, Switch} from 'react-router-dom';
import HomeContent from './HomeContent';
import OpsContent from '../ops/OpsContent';
import AdminSettings from '../adminsettings/AdminSettings';
import AppManager from '../appmanager/AppManager';
class HomePage extends Component {
  state = {
    tabs: [],
  };

  componentDidMount () {
    let tabstore = localStorage.getItem ('tabs');
    if (tabstore !== null) {
      this.setState ({tabs: JSON.parse( tabstore)});
    }
  }
  addTabs = (to, title) => {
    let tabs = [];
    tabs.push ({to: to, title: title});
    this.setState ({tabs});
    localStorage.setItem ('tabs', JSON.stringify(tabs));
    this.props.history.push (`/${to}`);
  };

  closeTabs = (event, to) => {
    event.stopPropagation ();
    event.preventDefault ();
    let tabs = [];
    tabs.splice (tabs.findIndex (item => item.to === to), 1);
    this.setState ({tabs});
    this.props.history.push ('/');
  };
  clearTabs = () => {
    this.setState ({tabs: []});
    this.props.history.push ('/');
  };

  render () {
    const {path} = this.props.match;
    return (
      <React.Fragment>
        <Tabs
          tabLinks={this.state.tabs}
          path={path}
          location={this.props.location.pathname}
          closeTabs={(event, to) => this.closeTabs (event, to)}
          clearTabs={this.clearTabs}
        />
        <div className="tabs">
      <Switch>
        
          <Route  path={`/ops`} component={OpsContent} />
          <Route  path={`/org`} component={AdminSettings} />
          <Route  path={`/appmanager`} component={AppManager} />
          <Route
            path="/"
            
            render={routeProps => (
              <HomeContent
                {...routeProps}
                addTabs={(to, title) => this.addTabs (to, title)}
              />
            )}
          />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default HomePage;

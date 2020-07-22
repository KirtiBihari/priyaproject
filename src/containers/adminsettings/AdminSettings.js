import React, { Component } from 'react';
import SettingsLayout from '../../hoc/Layout/Settingslayout';
import { Route, Switch } from 'react-router-dom';
import AddOrg from './Organization/AddOrganization';
import OrgList from './Organization/OrganizationList';
import AddUnit from './Unit/AddUnit';
import UnitList from './Unit/UnitList';
import AddEntity from './Entity/AddEntity';
import EntityList from './Entity/EntityList';
import NotFound from '../../components/404/NotFound';
import { withRouter } from 'react-router';
import './AdminSettings.scss';
class AdminSettings extends Component {
  navigate=(path)=>{
    this.props.history.push(path);
  }
    render() {
      const  path  = 'adminSideNav';
        return (
            <SettingsLayout path={path} navigate={this.navigate}>
             <Switch>
             <Route exact path="/org" component={OrgList} />
             <Route exact path="/org/orglist" component={OrgList} />
             <Route exact path="/org/addOrg" component={AddOrg} />
             <Route exact path="/org/addOrg/:id" component={AddOrg} />
             <Route exact path="/org/unitlist" component={UnitList} />
             <Route exact path="/org/addunit" component={AddUnit} />
             <Route exact path="/org/addunit/:id" component={AddUnit} />
             <Route exact path="/org/entitylist" component={EntityList} />
             <Route exact path="/org/addEntity" component={AddEntity} />
             <Route exact path="/org/addEntity/:id" component={AddEntity} />
             <Route path={'*'} component={NotFound}/>
             </Switch>
          
          </SettingsLayout>
        );
    }
}

export default withRouter(AdminSettings);
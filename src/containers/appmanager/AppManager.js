import React, {Component} from 'react';
import SettingsLayout from '../../hoc/Layout/Settingslayout';
import {Route, Switch} from 'react-router-dom';
import NotFound from '../../components/404/NotFound';
import ProcessList from './Process/ProcessList';
import AddProcess from './Process/AddProcess';
import ProcessFormsList from './Process/ProcessFormsList';
import AddProcessForms from './Process/AddProcessForms';
import SubProcessList from './SubProcess/SubProcessList';
import AddSubProcess from './SubProcess/AddSubProcess';
import {withRouter} from 'react-router';
import AddRules from './Rules/AddRules';
import RulesList from './Rules/RulesList';
import ProcessForm from './Process/ProcessForm';
import AddForms from './Process/AddForms';
class AppManager extends Component {
  navigate = path => {
    this.props.history.push (path);
  };
  render () {
    const path = 'appManagerSideNav';
    return (
      <SettingsLayout path={path} navigate={this.navigate}>

        <Switch>

          <Route exact path="/appmanager/processlist" component={ProcessList} />
          <Route
            path="/appmanager/processlist/processformslist/:id"
            component={ProcessFormsList}
          />
          <Route
            exact
            path="/appmanager/addprocess/:id"
            component={AddProcess}
          />
          <Route exact path="/appmanager/addprocess" component={AddProcess} />
          <Route
            path="/appmanager/processlist/processformslist/addprocessforms/:id/:processId"
            component={AddProcessForms}
          />

          <Route path="/appmanager/subprocesslist" component={SubProcessList} />
          <Route
            path="/appmanager/subprocesslist/subprocessformslist/:id"
            component={ProcessFormsList}
          />
          <Route
            path="/appmanager/subprocesslist/subprocessformslist/addsubprocessforms/:id/:processId"
            component={AddProcessForms}
          />

          <Route path="/appmanager/addsubprocess" component={AddSubProcess} />
          <Route
            path="/appmanager/addsubprocess/:id"
            component={AddSubProcess}
          />
          <Route path="/appmanager/ruleslist" component={RulesList} />
          <Route path="/appmanager/addrules" component={AddRules} />
          <Route path="/appmanager/formslist/:id" component={AddForms} />
          <Route path="/appmanager/formslist" component={ProcessForm} />
          <Route path="/appmanager/forms" component={AddProcessForms} />
          <Route path="/appmanager/forms/:id" component={AddProcessForms} />

          <Route path="/appmanager" component={ProcessList} />

          <Route path={'*'} component={NotFound} />
        </Switch>

      </SettingsLayout>
    );
  }
}

export default withRouter (AppManager);

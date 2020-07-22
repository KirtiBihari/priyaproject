import {combineReducers} from 'redux';
import auth from './authReducer';
import home from './homeReducer';
import ops from './opsReducer';
import sideMenu from './sidemenuReducer';
import org from './adminsettings/organisationReducer';
import entity from './adminsettings/entityReducer';
import unit from './adminsettings/unitReducer';

import process from './appsmanager/processReducer';
import subprocess from './appsmanager/subProcessReducer';
import processform from './appsmanager/processFormReducer';
import rules from './appsmanager/rulesReducer';
import breadcrum from './breadcrumReducer';
const rootReducer = combineReducers ({
  auth,
  home,
  ops,
  sideMenu,
  org,
  entity,
  unit,
  process,
  subprocess,
  processform,
  rules,
  breadcrum,
});

export default rootReducer;

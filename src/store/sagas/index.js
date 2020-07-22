import { takeEvery, all } from "redux-saga/effects";

import * as actionTypes from '../definitions';

import * as authSaga from './authSagas';
import * as homeSaga from './homeSagas';
import * as opsSaga from './opsSagas';
import * as sideNavSaga from './sideMenuSagas';
import * as org from './adminsettings/organisationSaga';
import * as entity from './adminsettings/entitySagas';
import * as unit from './adminsettings/unitSagas';

import * as process from'./appsmanager/processSagas'
import * as subprocess from './appsmanager/subProcessSagas'
import * as processform from './appsmanager/processFormSagas';
import * as rules from './appsmanager/rulesSagas'

export function* watchAuth(){
    yield all([
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT,authSaga.checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_LOGOUT_INITIATE,authSaga.logoutSaga),
        takeEvery(actionTypes.AUTH_USER,authSaga.authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE,authSaga.authCheckStateSaga)
        
    ])
}
export function* watchHome(){
    yield all([
        takeEvery(actionTypes.HOME_TILES_LIST,homeSaga.homeTilesSaga)
    ])}

export function* watchOps(){
    yield all([
        takeEvery(actionTypes.TOP_PROCESS,opsSaga.topContentSaga),
        takeEvery(actionTypes.REQUESTLIST_PROCESS,opsSaga.requestListSaga),
        takeEvery(actionTypes.CASELIST_PROCESS,opsSaga.caseListSaga),

    ])
}
export function* watchOrganisation(){
    yield all([
        //Organisation
        takeEvery(actionTypes.SIDE_NAV_PROCESS,sideNavSaga.sideNavListSaga),
        takeEvery(actionTypes.ORGANISATION_LIST_PROCESS,org.orglistSaga),
        takeEvery(actionTypes.ORGANISATION_ADD_PROCESS,org.orgAddSaga),
        takeEvery(actionTypes.ORGANISATION_EDIT_PROCESS,org.orgEditSaga),
        takeEvery(actionTypes.ORGANISATION_CHECK_PROCESS,org.orgCheckSaga),
        takeEvery(actionTypes.ORGANISATION_UPDATE_PROCESS,org.orgUpdateSaga),
        takeEvery(actionTypes.ORGANISATION_DELETE_PROCESS,org.orgDeleteSaga),
        //Entity
        takeEvery(actionTypes.ENTITY_LIST_PROCESS,entity.entitylistSaga),
        takeEvery(actionTypes.ENTITY_ADD_PROCESS,entity.entityAddSaga),
        takeEvery(actionTypes.ENTITY_EDIT_PROCESS,entity.entityEditSaga),
        takeEvery(actionTypes.ENTITY_CHECK_PROCESS,entity.entityCheckSaga),
        takeEvery(actionTypes.ENTITY_UPDATE_PROCESS,entity.entityUpdateSaga),
        takeEvery(actionTypes.ENTITY_DELETE_PROCESS,entity.entityDeleteSaga),
        //Unit
        takeEvery(actionTypes.UNIT_LIST_PROCESS,unit.unitlistSaga),
        takeEvery(actionTypes.UNIT_ADD_PROCESS,unit.unitAddSaga),
        takeEvery(actionTypes.UNIT_EDIT_PROCESS,unit.unitEditSaga),
        takeEvery(actionTypes.UNIT_CHECK_PROCESS,unit.unitCheckSaga),
        takeEvery(actionTypes.UNIT_UPDATE_PROCESS,unit.unitUpdateSaga),
        takeEvery(actionTypes.UNIT_DELETE_PROCESS,unit.unitDeleteSaga),

    ])}
    export function* watchAppsManager(){
        yield all([
            //Process
            takeEvery(actionTypes.SIDE_NAV_PROCESS,sideNavSaga.sideNavListSaga),
            takeEvery(actionTypes.PROCESS_LIST_PROCESS,process.processlistSaga),
            takeEvery(actionTypes.PROCESS_ADD_PROCESS,process.processAddSaga),
            takeEvery(actionTypes.PROCESS_EDIT_PROCESS,process.processEditSaga),
            takeEvery(actionTypes.PROCESS_CHECK_PROCESS,process.processCheckSaga),
            takeEvery(actionTypes.PROCESS_UPDATE_PROCESS,process.processUpdateSaga),
            takeEvery(actionTypes.PROCESS_DELETE_PROCESS,process.processDeleteSaga),
            takeEvery(actionTypes.PROCESS_DEPLOY_PROCESS,process.processDeploySaga),
            takeEvery(actionTypes.PROCESS_DEPLOY_DELETE_PROCESS,process.processDeployDeleteSaga),
            //SubProcess
            takeEvery(actionTypes.SUB_PROCESS_LIST_PROCESS,subprocess.subprocesslistSaga),
            takeEvery(actionTypes.SUB_PROCESS_ADD_PROCESS,subprocess.subprocessAddSaga),
            takeEvery(actionTypes.SUB_PROCESS_EDIT_PROCESS,subprocess.subprocessEditSaga),
            takeEvery(actionTypes.SUB_PROCESS_CHECK_PROCESS,subprocess.subprocessCheckSaga),
            takeEvery(actionTypes.SUB_PROCESS_UPDATE_PROCESS,subprocess.subprocessUpdateSaga),
            takeEvery(actionTypes.SUB_PROCESS_DELETE_PROCESS,subprocess.subprocessDeleteSaga),
            //ProcessForm
            takeEvery(actionTypes.PROCESS_FORM_LIST_PROCESS,processform.processFormlistSaga),
            takeEvery(actionTypes.PROCESS_FORM_ADD_PROCESS,processform.processFormAddSaga),
            takeEvery(actionTypes.PROCESS_FORM_EDIT_PROCESS,processform.processFormEditSaga),
            takeEvery(actionTypes.PROCESS_FORM_CHECK_PROCESS,processform.processFormCheckSaga),
            takeEvery(actionTypes.PROCESS_FORM_UPDATE_PROCESS,processform.processFormUpdateSaga),
            takeEvery(actionTypes.PROCESS_FORM_DELETE_PROCESS,processform.processFormDeleteSaga),
            
            //Rules
            takeEvery(actionTypes.RULES_LIST_PROCESS,rules.ruleslistSaga),
            takeEvery(actionTypes.RULES_ADD_PROCESS,rules.rulesAddSaga),
            takeEvery(actionTypes.RULES_EDIT_PROCESS,rules.rulesEditSaga),
            takeEvery(actionTypes.RULES_CHECK_PROCESS,rules.rulesCheckSaga),
            takeEvery(actionTypes.RULES_UPDATE_PROCESS,rules.rulesUpdateSaga),
            takeEvery(actionTypes.RULES_DELETE_PROCESS,rules.rulesDeleteSaga),

        ])}
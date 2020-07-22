import {put} from 'redux-saga/effects';
import * as actions from '../../actions';
import API from '../../../_shared/serviceWrapper';
import ApiUrls from '../../../_shared/_constants';
//  Get the List Of process
const orgs=JSON.parse(localStorage.getItem('orgs'));
export function* processlistSaga (action) {
    yield put (actions.processListStart());
   
     
     try{
      const res=yield  API.get(`${ApiUrls.process}/${orgs.id}`)
    yield put (
        actions.processListSuccess(res.data))
        if(action.cb!==undefined){
        action.cb();
        }
    }catch (error) {
            yield put (actions.processListFail (error));
          }    
}
// Add
export function* processAddSaga (action) {
  yield put (actions.processAddStart());
  try{
   const res=yield  API.post(ApiUrls.processCreate,action.data);
 
  yield put (
      actions.processAddSuccess(res.data));
  
  }catch (error) {
          yield put (actions.processAddFail (error));
        }    
}
// Get By Id
export function* processEditSaga (action) {
  yield put (actions.processEditStart());
 
   const res=yield  API.get(ApiUrls.processGet+`/${action.id}`)
   try{
  yield put (
      actions.processEditSuccess(res.data));
     
  }catch (error) {
          yield put (actions.processEditFail (error));
        }    
}
// Check process Exist
export function* processCheckSaga (action) {
  yield put (actions.processCheckStart());
 
  
   try{
    const res=yield  API.get(ApiUrls.processExist+`/${orgs.id}/${action.id}`);
    
  yield put (
      actions.processCheckSuccess(res.data));
      action.cb(res.data);
  }catch (error) {
          yield put (actions.processCheckFail (error));
        }    
}

//  process Update
export function* processUpdateSaga (action) {
  yield put (actions.processUpdateStart());
    try{
    const res=yield  API.put(ApiUrls.processUpdate,action.data);
    
  yield put (
      actions.processUpdateSuccess(res.data));
      
  }catch (error) {
          yield put (actions.processUpdateFail (error));
        }    
}

// Process Delete
export function* processDeleteSaga (action) {
  yield put (actions.processDelStart());
 
  
   try{
    const res=yield  API.delete(ApiUrls.processDelete,action.data);
  yield put (
      actions.processDelSuccess(res.data));
      
  }catch (error) {
          yield put (actions.processDelFail (error));
        }    
}

// Process Deploy
export function* processDeploySaga (action) {
    yield put (actions.processDeployStart());
   
    
     try{
      const res=yield  API.post(ApiUrls.processDeploy,action.data);
    yield put (
        actions.processDeploySuccess(res.data));
        
    }catch (error) {
            yield put (actions.processDeployFail (error));
          }    
  }

  // Process Deploy Delete
export function* processDeployDeleteSaga (action) {
  yield put (actions.processDeployDelStart());
 
  
   try{
    const res=yield  API.post(ApiUrls.processDeployDelete,action.data);
  yield put (
      actions.processDeployDelSuccess(res.data));
      
  }catch (error) {
          yield put (actions.processDeployDelFail (error));
        }    
}

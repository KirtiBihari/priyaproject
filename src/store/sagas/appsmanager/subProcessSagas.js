import {put} from 'redux-saga/effects';
import * as actions from '../../actions';
import API from '../../../_shared/serviceWrapper';
import ApiUrls from '../../../_shared/_constants';
const orgs=JSON.parse(localStorage.getItem('orgs'));
//  Get the List Of subprocess
export function* subprocesslistSaga (action) {
    yield put (actions.subprocessListStart());
   
     
     try{
      const res=yield  API.get(`${ApiUrls.subprocess}/${orgs.id}`)
    yield put (
        actions.subprocessListSuccess(res.data))
        if(action.cb!==undefined){
        action.cb();
        }
    }catch (error) {
            yield put (actions.subprocessListFail (error));
          }    
}
// Add
export function* subprocessAddSaga (action) {
  yield put (actions.subprocessAddStart());
  try{
   const res=yield  API.post(ApiUrls.subprocessCreate,action.data);
 
  yield put (
      actions.subprocessAddSuccess(res.data));
  action.cb(res.data.status);
  }catch (error) {
          yield put (actions.subprocessAddFail (error));
        }    
}
// Get By Id
export function* subprocessEditSaga (action) {
  yield put (actions.subprocessEditStart());
 
   const res=yield  API.get(ApiUrls.subprocessById+`/${action.id}`)
   try{
  yield put (
      actions.subprocessEditSuccess(res.data));
      action.cb();
  }catch (error) {
          yield put (actions.subprocessEditFail (error));
        }    
}
// Check subprocess Exist
export function* subprocessCheckSaga (action) {
  yield put (actions.subprocessCheckStart());
 
  
   try{
    const res=yield  API.get(ApiUrls.subprocessExist+`/${orgs.id}/${action.id}`);
    
  yield put (
      actions.subprocessCheckSuccess(res.data));
      action.cb(res.data);
  }catch (error) {
          yield put (actions.subprocessCheckFail (error));
        }    
}

//  Unit Update
export function* subprocessUpdateSaga (action) {
  yield put (actions.subprocessUpdateStart());
    try{
    const res=yield  API.put(ApiUrls.subprocessUpdate,action.data);
    
  yield put (
      actions.subprocessUpdateSuccess(res.data));
      action.cb(res.data.status);
  }catch (error) {
          yield put (actions.subprocessUpdateFail (error));
        }    
}

// Unit Delete
export function* subprocessDeleteSaga (action) {
  yield put (actions.subprocessDelStart());
   try{
    const res=yield  API.delete(ApiUrls.subprocessDelete,action.data);
  yield put (
      actions.subprocessDelSuccess(res.data));
      action.cb();
  }catch (error) {
          yield put (actions.subprocessDelFail (error));
        }    
}

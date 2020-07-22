import {put} from 'redux-saga/effects';
import * as actions from '../../actions';
import API from '../../../_shared/serviceWrapper';
import ApiUrls from '../../../_shared/_constants';
//  Get the List Of processForm
const orgs=JSON.parse(localStorage.getItem('orgs'));
export function* processFormlistSaga (action) {
    yield put (actions.processFormListStart());
     try{
      const res=yield  API.get(`${ApiUrls.processForm}/${orgs.id}`)
    yield put (
        actions.processFormListSuccess(res.data))
       
    }catch (error) {
            yield put (actions.processFormListFail (error));
          }    
}
// Add
export function* processFormAddSaga (action) {
  yield put (actions.processFormAddStart());
  try{
   const res=yield  API.post(ApiUrls.processFormCreate,action.data);
 
  yield put (
      actions.processFormAddSuccess(res.data));
  action.cb(res.data.status);
  }catch (error) {
          yield put (actions.processFormAddFail (error));
        }    
}
// Get By Id
export function* processFormEditSaga (action) {
  yield put (actions.processFormEditStart());
 
   const res=yield  API.get(ApiUrls.processForm+`/getForm/${action.id}`)
   try{
  yield put (
      actions.processFormEditSuccess(res.data));
  }catch (error) {
          yield put (actions.processFormEditFail (error));
        }    
}
// Check processForm Exist
export function* processFormCheckSaga (action) {
  yield put (actions.processFormCheckStart());
   try{
    const res=yield  API.get(ApiUrls.processFormExist+`/${orgs.id}/${action.id}`);
    
  yield put (
      actions.processFormCheckSuccess(res.data));
      action.cb(res.data);
  }catch (error) {
          yield put (actions.processFormCheckFail (error));
        }    
}

//  processForm Update
export function* processFormUpdateSaga (action) {
  yield put (actions.processFormUpdateStart());
    try{
    const res=yield  API.put(ApiUrls.processFormUpdate,action.data);
    
  yield put (
      actions.processFormUpdateSuccess(res.data));
      action.cb(res.data.status);
  }catch (error) {
          yield put (actions.processFormUpdateFail (error));
        }    
}

// Process Delete
export function* processFormDeleteSaga (action) {
  yield put (actions.processFormDelStart());
   try{
    const res=yield  API.delete(ApiUrls.processFormDelete,action.data);
  yield put (
      actions.processFormDelSuccess(res.data));
      action.cb(res.data.status);
  }catch (error) {
          yield put (actions.processFormDelFail (error));
        }    
}



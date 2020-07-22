import {put} from 'redux-saga/effects';
import * as actions from '../../actions';
import API from '../../../_shared/serviceWrapper';
import ApiUrls from '../../../_shared/_constants';
//  Get the List Of entity
export function* entitylistSaga () {
    yield put (actions.entityListStart());
   
     
     try{
      const res=yield  API.get(ApiUrls.entities)
    yield put (
        actions.entityListSuccess(res.data))
    }catch (error) {
            yield put (actions.entityListFail (error));
          }    
}
// Add
export function* entityAddSaga (action) {
  yield put (actions.entityAddStart());
  try{
   const res=yield  API.post(ApiUrls.entityCreate,action.data);
 
  yield put (
      actions.entityAddSuccess(res.data));
  action.cb();
  }catch (error) {
          yield put (actions.entityAddFail (error));
        }    
}
// Get By Id
export function* entityEditSaga (action) {
  yield put (actions.entityEditStart());
 
   const res=yield  API.get(ApiUrls.entities+`/${action.id}`)
   try{
  yield put (
      actions.entityEditSuccess(res.data));
      action.cb();
  }catch (error) {
          yield put (actions.entityEditFail (error));
        }    
}
// Check entity Exist
export function* entityCheckSaga (action) {
  yield put (actions.entityCheckStart());
 
  
   try{
    const res=yield  API.get(ApiUrls.entityExist+`/${action.id}`);
    
  yield put (
      actions.entityCheckSuccess(res.data));
      action.cb();
  }catch (error) {
          yield put (actions.entityCheckFail (error));
        }    
}

// Get By Update
export function* entityUpdateSaga (action) {
  yield put (actions.entityUpdateStart());
    try{
    const res=yield  API.put(ApiUrls.entityUpdate,action.data);
    
  yield put (
      actions.entityUpdateSuccess(res.data));
      action.cb();
  }catch (error) {
          yield put (actions.entityUpdateFail (error));
        }    
}

// Delete
export function* entityDeleteSaga (action) {
  yield put (actions.entityDelStart());
 
   const res=yield  API.delete(ApiUrls.entityDelete,action.data)
   try{
  yield put (
      actions.entityDelSuccess(res.data));
      action.cb();
  }catch (error) {
          yield put (actions.entityDelFail (error));
        }    
}

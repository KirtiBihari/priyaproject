import {put} from 'redux-saga/effects';
import * as actions from '../../actions';
import API from '../../../_shared/serviceWrapper';
import ApiUrls from '../../../_shared/_constants';
//  Get the List Of unit
export function* unitlistSaga (action) {
    yield put (actions.unitListStart());
   
     
     try{
      const res=yield  API.get(ApiUrls.units)
    yield put (
        actions.unitListSuccess(res.data))
        if(action.cb!==undefined){
        action.cb();
        }
    }catch (error) {
            yield put (actions.unitListFail (error));
          }    
}
// Add
export function* unitAddSaga (action) {
  yield put (actions.unitAddStart());
  try{
   const res=yield  API.post(ApiUrls.unitsCreate,action.data);
 
  yield put (
      actions.unitAddSuccess(res.data));
  action.cb();
  }catch (error) {
          yield put (actions.unitAddFail (error));
        }    
}
// Get By Id
export function* unitEditSaga (action) {
  yield put (actions.unitEditStart());
 
   const res=yield  API.get(ApiUrls.units+`/${action.id}`)
   try{
  yield put (
      actions.unitEditSuccess(res.data));
      action.cb();
  }catch (error) {
          yield put (actions.unitEditFail (error));
        }    
}
// Check unit Exist
export function* unitCheckSaga (action) {
  yield put (actions.unitCheckStart());
 
  
   try{
    const res=yield  API.get(ApiUrls.unitsExist+`/${action.id}`);
    
  yield put (
      actions.unitCheckSuccess(res.data));
      action.cb(res.data);
  }catch (error) {
          yield put (actions.unitCheckFail (error));
        }    
}

//  Unit Update
export function* unitUpdateSaga (action) {
  yield put (actions.unitUpdateStart());
    try{
    const res=yield  API.put(ApiUrls.unitsUpdate,action.data);
    
  yield put (
      actions.unitUpdateSuccess(res.data));
      action.cb();
  }catch (error) {
          yield put (actions.unitUpdateFail (error));
        }    
}

// Unit Delete
export function* unitDeleteSaga (action) {
  yield put (actions.unitDelStart());
 
  
   try{
    const res=yield  API.delete(ApiUrls.unitsDelete,action.data);
  yield put (
      actions.unitDelSuccess(res.data));
      action.cb();
  }catch (error) {
          yield put (actions.unitDelFail (error));
        }    
}

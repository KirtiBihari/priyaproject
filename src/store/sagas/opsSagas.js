import {put} from 'redux-saga/effects';
import * as actions from '../actions';
import API from '../../_shared/serviceWrapper';
import Api from '../../_shared/_constants';

export function* topContentSaga (action) {
    yield put (actions.topStart());
    const data = {
        userId: action.userId,
        groupId:action.groupId,
        startedAfter:action.startedAfter
        
      };
     const res=yield  API.post(Api.statstics, data)
     try{
    yield put (
        actions.topSuccess(res.data))
    }catch (error) {
            yield put (actions.topFail (error));
          }    
}

export function* requestListSaga (action) {
  yield put (actions.requestListStart());

    const url=Api.tasks+'/ops_apps_id/'+action.userId+'?potentialRequests=false'
   const res=yield  API.get(url);
   try{
  yield put (
      actions.requestListSuccess(res.data))
  }catch (error) {
          yield put (actions.requestListFail (error));
        }    
}

export function* caseListSaga (action) {
  yield put (actions.caseListStart());

   const res=yield  API.get(Api.tasks+'/ops_apps_id/'+action.userId+'?potentialRequests=true')
   try{
  yield put (
      actions.caseListSuccess(res.data))
  }catch (error) {
          yield put (actions.caseListFail (error));
        }    
}
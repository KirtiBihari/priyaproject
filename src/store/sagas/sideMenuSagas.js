import {put} from 'redux-saga/effects';
import * as actions from '../actions';
import API from '../../_shared/serviceWrapper';
import Api from '../../_shared/_constants';

export function* sideNavListSaga (action) {
    yield put (actions.sideNavStart());
      
       const res=yield  API.get(Api[action.path])
     try{
    yield put (
        actions.sideNavSuccess(res.data));
    }catch (error) {
            yield put (actions.sideNavFail (error));
          }    
}
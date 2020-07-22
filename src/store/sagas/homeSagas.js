import {put} from 'redux-saga/effects';
import * as actions from '../actions';
import API from '../../_shared/serviceWrapper';
import Api from '../../_shared/_constants';
export function* homeTilesSaga (action) {
    yield put (actions.homeTilesStart());
    const data = {
        userId: action.username
        
      };
     const res=yield  API.post(Api.userApps,data)
     try{
    yield put (
        actions.homeTilesSuccess(res.data))
    }catch (error) {
            yield put (actions.homeTilesFail (error));
          }    
}
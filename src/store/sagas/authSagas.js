
import {put,delay} from 'redux-saga/effects';

import * as actions from '../actions';
import API from '../../_shared/serviceWrapper';
import Api from '../../_shared/_constants';
export function* logoutSaga (action) {
  localStorage.clear();
  yield put (actions.logoutSucceed ());
}
export function* checkAuthTimeoutSaga (action) {
  yield delay (action.expirationTime * 1000);
  yield put (actions.logout ());
}

export function* authUserSaga (action) {
  yield put (actions.authStart ());
  const authData = {
    userId: action.username,
    password: action.password,
  };
  try {
    const response = yield API.post (Api.auth, authData);
   
    yield localStorage.setItem ('userId', response.data.userId);
    yield localStorage.setItem ('groupId', response.data.groups[0].id);
    yield localStorage.setItem (
      'authorization1',
      response.headers.authorization1
    );
    yield localStorage.setItem ('profile', JSON.stringify (response.data));
    yield localStorage.setItem('orgs',JSON.stringify(response.data.orgs));
    action.cb();
    yield put (
      actions.authSuccess (
        response.headers.authorization1,
        response.data.userId
      )
    );
    
    yield put (actions.authProfile (response.data));
   
    
  } catch (error) {
    yield put (actions.authFail (error.response.data.message));
  }
}
export function* authCheckStateSaga (action) {
  const token = yield localStorage.getItem ('authorization1');
  const profile = yield localStorage.getItem ('profile');
  if (!token) {
    yield put (actions.logout ());
  } else {
    const expirationDate = yield new Date (
      localStorage.getItem ('expirationDate')
    );
    if (expirationDate <= new Date ()) {
      yield put (actions.logout ());
    } else {
      const userId = yield localStorage.getItem ('userId');
      yield put (actions.authSuccess (token, userId));
      yield put (actions.authProfile (profile));
    }
  }
}

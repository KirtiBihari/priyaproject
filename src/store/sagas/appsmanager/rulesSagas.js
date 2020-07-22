import {put} from 'redux-saga/effects';
import * as actions from '../../actions';
import API from '../../../_shared/serviceWrapper';
import ApiUrls from '../../../_shared/_constants';
const orgs = JSON.parse (localStorage.getItem ('orgs'));
//  Get the List Of rules
export function* ruleslistSaga (action) {
  yield put (actions.rulesListStart ());
  try {
    const res = yield API.get (ApiUrls.rules + '/' + orgs.id);
    yield put (actions.rulesListSuccess (res.data));
    if (action.cb !== undefined) {
      action.cb ();
    }
  } catch (error) {
    yield put (actions.rulesListFail (error));
  }
}
// Add
export function* rulesAddSaga (action) {
  yield put (actions.rulesAddStart ());
  try {
    const res = yield API.post (ApiUrls.rulesCreate, action.data);

    yield put (actions.rulesAddSuccess (res.data));
    action.cb (res.data.status);
  } catch (error) {
    yield put (actions.rulesAddFail (error));
  }
}
// Get By Id
export function* rulesEditSaga (action) {
  yield put (actions.rulesEditStart ());

  const res = yield API.get (ApiUrls.rulesById + `/${action.id}`);
  try {
    yield put (actions.rulesEditSuccess (res.data));
    action.cb ();
  } catch (error) {
    yield put (actions.rulesEditFail (error));
  }
}
// Check rules Exist
export function* rulesCheckSaga (action) {
  yield put (actions.rulesCheckStart ());

  try {
    const res = yield API.get (ApiUrls.rulesExist + `/${orgs.id}/${action.id}`);

    yield put (actions.rulesCheckSuccess (res.data));
    action.cb (res.data);
  } catch (error) {
    yield put (actions.rulesCheckFail (error));
  }
}

//  Unit Update
export function* rulesUpdateSaga (action) {
  yield put (actions.rulesUpdateStart ());
  try {
    const res = yield API.put (ApiUrls.rulesUpdate, action.data);

    yield put (actions.rulesUpdateSuccess (res.data));
    action.cb (res.data.status);
  } catch (error) {
    yield put (actions.rulesUpdateFail (error));
  }
}

// Unit Delete
export function* rulesDeleteSaga (action) {
  yield put (actions.rulesDelStart ());

  try {
    const res = yield API.delete (ApiUrls.rulesDelete, action.data);
    yield put (actions.rulesDelSuccess (res.data));
    action.cb (res.data.status);
  } catch (error) {
    yield put (actions.rulesDelFail (error));
  }
}

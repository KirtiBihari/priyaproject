import {put} from 'redux-saga/effects';
import * as actions from '../../actions';
import API from '../../../_shared/serviceWrapper';
import ApiUrls from '../../../_shared/_constants';
//  Get the List Of Organisation
export function* orglistSaga (action) {
  yield put (actions.orgListStart ());

  try {
    const res = yield API.get (ApiUrls.orgs);
    yield put (actions.orgListSuccess (res.data));
    if (action.cb !== undefined) {
      action.cb ();
    }
  } catch (error) {
    yield put (actions.orgListFail (error));
  }
}
// Add
export function* orgAddSaga (action) {
  yield put (actions.orgAddStart ());
  try {
    const res = yield API.post (ApiUrls.orgCreate, action.data);

    yield put (actions.orgAddSuccess (res.data));
    action.cb ();
  } catch (error) {
    yield put (actions.orgAddFail (error));
  }
}
// Get By Id
export function* orgEditSaga (action) {
  yield put (actions.orgEditStart ());

  const res = yield API.get (ApiUrls.orgs + `/${action.id}`);
  try {
    yield put (actions.orgEditSuccess (res.data));
    action.cb ();
  } catch (error) {
    yield put (actions.orgEditFail (error));
  }
}
// Check Org Exist
export function* orgCheckSaga (action) {
  yield put (actions.orgCheckStart ());

  try {
    const res = yield API.get (ApiUrls.orgExist + `/${action.id}`);

    yield put (actions.orgCheckSuccess (res.data));
    action.cb ();
  } catch (error) {
    yield put (actions.orgCheckFail (error));
  }
}

// Get By Update
export function* orgUpdateSaga (action) {
  yield put (actions.orgUpdateStart ());
  try {
    const res = yield API.put (ApiUrls.orgUpdate, action.data);

    yield put (actions.orgUpdateSuccess (res.data));
    action.cb ();
  } catch (error) {
    yield put (actions.orgUpdateFail (error));
  }
}

// Delete
export function* orgDeleteSaga (action) {
  yield put (actions.orgDelStart ());

  const res = yield API.delete (ApiUrls.orgDelete, action.data);
  try {
    yield put (actions.orgDelSuccess (res.data));
    action.cb ();
  } catch (error) {
    yield put (actions.orgDelFail (error));
  }
}

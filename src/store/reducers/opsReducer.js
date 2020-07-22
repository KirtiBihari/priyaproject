import * as actionTypes from '../definitions';
import {updateObject} from '../../_shared/utility';
const initialState = {
  topContent: {
    finished: 0,
    unfinished: 0,
    missed: 0,
    received: 0,
    assigned: 0,
  },
  error: null,
  loading: false,
  requestList: [],
  caseList: [],
};

const topStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const topSuccess = (state, action) => {
  return updateObject (state, {
    topContent: {
      finished: action.finished,
      unfinished: action.unfinished,
      missed: action.missed,
      received: action.received,
      assigned: action.assigned,
    },
    loading: false,
  });
};
const topFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
    loading: false,
  });
};

// Case List
const caseStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const caseSuccess = (state, action) => {
  return updateObject (state, {
    caseList:action.caseList,
    loading: false,
  });
};
const caseFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
    loading: false,
  });
};
// RequestList
const requestStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const requestSuccess = (state, action) => {
  return updateObject (state, {
    requestList: action.requestList,
    loading: false,
  });
};
const requestFail = (state, action) => {
  return updateObject (state, {
    error: action.error,
    loading: false,
  });
};
const ops = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.TOP_START:
      return topStart (state, action);

    case actionTypes.TOP_SUCCESS:
      return topSuccess (state, action);

    case actionTypes.TOP_FAIL:
      return topFail (state, action);

    case actionTypes.CASELIST_START:
      return caseStart (state, action);

    case actionTypes.CASELIST_SUCCESS:
      return caseSuccess (state, action);

    case actionTypes.CASELIST_FAIL:
      return caseFail (state, action);

      case actionTypes.REQUESTLIST_START:
      return requestStart (state, action);

    case actionTypes.REQUESTLIST_SUCCESS:
      return requestSuccess (state, action);

    case actionTypes.REQUESTLIST_FAIL:
      return requestFail (state, action);

    default:
      return state;
  }
};

export default ops;

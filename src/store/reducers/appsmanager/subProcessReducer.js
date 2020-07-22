import * as actionTypes from '../../definitions';
import {updateObject} from '../../../_shared/utility';
const initialState = {
  subProcessList: [],
  subProcessDetails:{},
  error: null,
  loading: false,
  isUnitExist:null,
  status:null
};

//List
const subProcessListStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const subProcessListSuccess = (state, action) => {
  return updateObject (state, {
    subProcessList: action.subprocessList,
    loading: false,
  });
};
const subProcessListFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Add
const subProcessAddStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const subProcessAddSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const subProcessAddFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};

// Edit
const subProcessEditStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const subProcessEditSuccess = (state, action) => {
  return updateObject (state, {
    subProcessDetails: action.subProcessDetails,
    loading: false,
  });
};
const subProcessEditFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const subProcessCheckStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const subProcessCheckSuccess = (state, action) => {
  return updateObject (state, {
    isSubProcessExist: action.isSubProcessExist,
    loading: false,
  });
};
const subProcessCheckFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Update
const subProcessUpdateStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const subProcessUpdateSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const subProcessUpdateFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Delete
const subProcessDeleteStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const subProcessDeleteSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const subProcessDeleteFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const subProcess = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUB_PROCESS_LIST_START:
      return subProcessListStart (state, action);

    case actionTypes.SUB_PROCESS_LIST_SUCCESS:
      return subProcessListSuccess (state, action);

    case actionTypes.SUB_PROCESS_LIST_FAIL:
      return subProcessListFail (state, action);

    case actionTypes.SUB_PROCESS_ADD_START:
      return subProcessAddStart (state, action);

    case actionTypes.SUB_PROCESS_ADD_SUCCESS:
      return subProcessAddSuccess (state, action);

    case actionTypes.SUB_PROCESS_ADD_FAIL:
      return subProcessAddFail (state, action);

    case actionTypes.SUB_PROCESS_EDIT_START:
      return subProcessEditStart (state, action);

    case actionTypes.SUB_PROCESS_EDIT_SUCCESS:
      return subProcessEditSuccess (state, action);

    case actionTypes.SUB_PROCESS_EDIT_FAIL:
      return subProcessEditFail (state, action);

      case actionTypes.SUB_PROCESS_CHECK_START:
      return subProcessCheckStart (state, action);

    case actionTypes.SUB_PROCESS_CHECK_SUCCESS:
      return subProcessCheckSuccess (state, action);

    case actionTypes.SUB_PROCESS_CHECK_FAIL:
      return subProcessCheckFail (state, action);


    case actionTypes.SUB_PROCESS_UPDATE_START:
      return subProcessUpdateStart (state, action);

    case actionTypes.SUB_PROCESS_UPDATE_SUCCESS:
      return subProcessUpdateSuccess (state, action);

    case actionTypes.SUB_PROCESS_UPDATE_FAIL:
      return subProcessUpdateFail (state, action);

    case actionTypes.SUB_PROCESS_DELETE_START:
      return subProcessDeleteStart (state, action);

    case actionTypes.SUB_PROCESS_DELETE_SUCCESS:
      return subProcessDeleteSuccess (state, action);

    case actionTypes.SUB_PROCESS_DELETE_FAIL:
      return subProcessDeleteFail (state, action);

    default:
      return state;
  }
};

export default subProcess;

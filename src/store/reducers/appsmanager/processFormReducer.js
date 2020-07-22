import * as actionTypes from '../../definitions';
import {updateObject} from '../../../_shared/utility';
const initialState = {
  processFormList: [],
  error: null,
  loading: false,
  isUnitExist: null,
  status: null,
  processFormDetails:{}
};

//List
const processFormListStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processFormListSuccess = (state, action) => {
  return updateObject (state, {
    processFormList: action.processFormList,
    loading: false,
  });
};
const processFormListFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Add
const processFormAddStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processFormAddSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const processFormAddFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};

// Edit
const processFormEditStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processFormEditSuccess = (state, action) => {
  return updateObject (state, {
    processFormDetails: action.processFormList,
    loading: false,
  });
};
const processFormEditFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processFormCheckStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processFormCheckSuccess = (state, action) => {
  return updateObject (state, {
    isProcessFormExist: action.isProcessFormExist,
    loading: false,
  });
};
const processFormCheckFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Update
const processFormUpdateStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processFormUpdateSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const processFormUpdateFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Delete
const processFormDeleteStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processFormDeleteSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const processFormDeleteFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};


const processForm = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROCESS_FORM_LIST_START:
      return processFormListStart (state, action);

    case actionTypes.PROCESS_FORM_LIST_SUCCESS:
      return processFormListSuccess (state, action);

    case actionTypes.PROCESS_FORM_LIST_FAIL:
      return processFormListFail (state, action);

    case actionTypes.PROCESS_FORM_ADD_START:
      return processFormAddStart (state, action);

    case actionTypes.PROCESS_FORM_ADD_SUCCESS:
      return processFormAddSuccess (state, action);

    case actionTypes.PROCESS_FORM_ADD_FAIL:
      return processFormAddFail (state, action);

    case actionTypes.PROCESS_FORM_EDIT_START:
      return processFormEditStart (state, action);

    case actionTypes.PROCESS_FORM_EDIT_SUCCESS:
      return processFormEditSuccess (state, action);

    case actionTypes.PROCESS_FORM_EDIT_FAIL:
      return processFormEditFail (state, action);

    case actionTypes.PROCESS_FORM_CHECK_START:
      return processFormCheckStart (state, action);

    case actionTypes.PROCESS_FORM_CHECK_SUCCESS:
      return processFormCheckSuccess (state, action);

    case actionTypes.PROCESS_FORM_CHECK_FAIL:
      return processFormCheckFail (state, action);

    case actionTypes.PROCESS_FORM_UPDATE_START:
      return processFormUpdateStart (state, action);

    case actionTypes.PROCESS_FORM_UPDATE_SUCCESS:
      return processFormUpdateSuccess (state, action);

    case actionTypes.PROCESS_FORM_UPDATE_FAIL:
      return processFormUpdateFail (state, action);

    case actionTypes.PROCESS_FORM_DELETE_START:
      return processFormDeleteStart (state, action);

    case actionTypes.PROCESS_FORM_DELETE_SUCCESS:
      return processFormDeleteSuccess (state, action);

    case actionTypes.PROCESS_FORM_DELETE_FAIL:
      return processFormDeleteFail (state, action);

    

    default:
      return state;
  }
};

export default processForm;

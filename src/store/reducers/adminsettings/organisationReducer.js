import * as actionTypes from '../../definitions';
import {updateObject} from '../../../_shared/utility';
const initialState = {
  orgList: [],
  error: null,
  loading: false,
  isOrgExist:null,
  status:null
};

//List
const orgListStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const orgListSuccess = (state, action) => {
  return updateObject (state, {
    orgList: action.orgList,
    loading: false,
  });
};
const orgListFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Add
const orgAddStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const orgAddSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const orgAddFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};

// Edit
const orgEditStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const orgEditSuccess = (state, action) => {
  return updateObject (state, {
    orgDetails: action.orgList,
    loading: false,
  });
};
const orgEditFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const orgCheckStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const orgCheckSuccess = (state, action) => {
  return updateObject (state, {
    isOrgExist: action.isOrgExist,
    loading: false,
  });
};
const orgCheckFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Update
const orgUpdateStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const orgUpdateSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const orgUpdateFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Delete
const orgDeleteStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const orgDeleteSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const orgDeleteFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const org = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORGANISATION_LIST_START:
      return orgListStart (state, action);

    case actionTypes.ORGANISATION_LIST_SUCCESS:
      return orgListSuccess (state, action);

    case actionTypes.ORGANISATION_LIST_FAIL:
      return orgListFail (state, action);

    case actionTypes.ORGANISATION_ADD_START:
      return orgAddStart (state, action);

    case actionTypes.ORGANISATION_ADD_SUCCESS:
      return orgAddSuccess (state, action);

    case actionTypes.ORGANISATION_ADD_FAIL:
      return orgAddFail (state, action);

    case actionTypes.ORGANISATION_EDIT_START:
      return orgEditStart (state, action);

    case actionTypes.ORGANISATION_EDIT_SUCCESS:
      return orgEditSuccess (state, action);

    case actionTypes.ORGANISATION_EDIT_FAIL:
      return orgEditFail (state, action);

      case actionTypes.ORGANISATION_CHECK_START:
      return orgCheckStart (state, action);

    case actionTypes.ORGANISATION_CHECK_SUCCESS:
      return orgCheckSuccess (state, action);

    case actionTypes.ORGANISATION_CHECK_FAIL:
      return orgCheckFail (state, action);


    case actionTypes.ORGANISATION_UPDATE_START:
      return orgUpdateStart (state, action);

    case actionTypes.ORGANISATION_UPDATE_SUCCESS:
      return orgUpdateSuccess (state, action);

    case actionTypes.ORGANISATION_UPDATE_FAIL:
      return orgUpdateFail (state, action);

    case actionTypes.ORGANISATION_DELETE_START:
      return orgDeleteStart (state, action);

    case actionTypes.ORGANISATION_DELETE_SUCCESS:
      return orgDeleteSuccess (state, action);

    case actionTypes.ORGANISATION_DELETE_FAIL:
      return orgDeleteFail (state, action);

    default:
      return state;
  }
};

export default org;

import * as actionTypes from '../../definitions';
import {updateObject} from '../../../_shared/utility';
const initialState = {
  unitList: [],
  error: null,
  loading: false,
  isUnitExist:null,
  status:null
};

//List
const unitListStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const unitListSuccess = (state, action) => {
  return updateObject (state, {
    unitList: action.unitList,
    loading: false,
  });
};
const unitListFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Add
const unitAddStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const unitAddSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const unitAddFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};

// Edit
const unitEditStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const unitEditSuccess = (state, action) => {
  return updateObject (state, {
    unitDetails: action.unitList,
    loading: false,
  });
};
const unitEditFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const unitCheckStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const unitCheckSuccess = (state, action) => {
  return updateObject (state, {
    isUnitExist: action.isUnitExist,
    loading: false,
  });
};
const unitCheckFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Update
const unitUpdateStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const unitUpdateSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const unitUpdateFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Delete
const unitDeleteStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const unitDeleteSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const unitDeleteFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const unit = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UNIT_LIST_START:
      return unitListStart (state, action);

    case actionTypes.UNIT_LIST_SUCCESS:
      return unitListSuccess (state, action);

    case actionTypes.UNIT_LIST_FAIL:
      return unitListFail (state, action);

    case actionTypes.UNIT_ADD_START:
      return unitAddStart (state, action);

    case actionTypes.UNIT_ADD_SUCCESS:
      return unitAddSuccess (state, action);

    case actionTypes.UNIT_ADD_FAIL:
      return unitAddFail (state, action);

    case actionTypes.UNIT_EDIT_START:
      return unitEditStart (state, action);

    case actionTypes.UNIT_EDIT_SUCCESS:
      return unitEditSuccess (state, action);

    case actionTypes.UNIT_EDIT_FAIL:
      return unitEditFail (state, action);

      case actionTypes.UNIT_CHECK_START:
      return unitCheckStart (state, action);

    case actionTypes.UNIT_CHECK_SUCCESS:
      return unitCheckSuccess (state, action);

    case actionTypes.UNIT_CHECK_FAIL:
      return unitCheckFail (state, action);


    case actionTypes.UNIT_UPDATE_START:
      return unitUpdateStart (state, action);

    case actionTypes.UNIT_UPDATE_SUCCESS:
      return unitUpdateSuccess (state, action);

    case actionTypes.UNIT_UPDATE_FAIL:
      return unitUpdateFail (state, action);

    case actionTypes.UNIT_DELETE_START:
      return unitDeleteStart (state, action);

    case actionTypes.UNIT_DELETE_SUCCESS:
      return unitDeleteSuccess (state, action);

    case actionTypes.UNIT_DELETE_FAIL:
      return unitDeleteFail (state, action);

    default:
      return state;
  }
};

export default unit;

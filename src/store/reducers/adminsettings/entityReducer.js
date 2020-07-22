import * as actionTypes from '../../definitions';
import {updateObject} from '../../../_shared/utility';
const initialState = {
  entityList: [],
  error: null,
  loading: false,
  isEntityExist:null,
  status:null
};

//List
const entityListStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const entityListSuccess = (state, action) => {
  return updateObject (state, {
    entityList: action.entityList,
    loading: false,
  });
};
const entityListFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Add
const entityAddStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const entityAddSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const entityAddFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};

// Edit
const entityEditStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const entityEditSuccess = (state, action) => {
  return updateObject (state, {
    entityDetails: action.entityList,
    loading: false,
  });
};
const entityEditFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const entityCheckStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const entityCheckSuccess = (state, action) => {
  return updateObject (state, {
    isEntityExist: action.isEntityExist,
    loading: false,
  });
};
const entityCheckFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Update
const entityUpdateStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const entityUpdateSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const entityUpdateFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Delete
const entityDeleteStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const entityDeleteSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const entityDeleteFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const entity = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ENTITY_LIST_START:
      return entityListStart (state, action);

    case actionTypes.ENTITY_LIST_SUCCESS:
      return entityListSuccess (state, action);

    case actionTypes.ENTITY_LIST_FAIL:
      return entityListFail (state, action);

    case actionTypes.ENTITY_ADD_START:
      return entityAddStart (state, action);

    case actionTypes.ENTITY_ADD_SUCCESS:
      return entityAddSuccess (state, action);

    case actionTypes.ENTITY_ADD_FAIL:
      return entityAddFail (state, action);

    case actionTypes.ENTITY_EDIT_START:
      return entityEditStart (state, action);

    case actionTypes.ENTITY_EDIT_SUCCESS:
      return entityEditSuccess (state, action);

    case actionTypes.ENTITY_EDIT_FAIL:
      return entityEditFail (state, action);

      case actionTypes.ENTITY_CHECK_START:
      return entityCheckStart (state, action);

    case actionTypes.ENTITY_CHECK_SUCCESS:
      return entityCheckSuccess (state, action);

    case actionTypes.ENTITY_CHECK_FAIL:
      return entityCheckFail (state, action);


    case actionTypes.ENTITY_UPDATE_START:
      return entityUpdateStart (state, action);

    case actionTypes.ENTITY_UPDATE_SUCCESS:
      return entityUpdateSuccess (state, action);

    case actionTypes.ENTITY_UPDATE_FAIL:
      return entityUpdateFail (state, action);

    case actionTypes.ENTITY_DELETE_START:
      return entityDeleteStart (state, action);

    case actionTypes.ENTITY_DELETE_SUCCESS:
      return entityDeleteSuccess (state, action);

    case actionTypes.ENTITY_DELETE_FAIL:
      return entityDeleteFail (state, action);

    default:
      return state;
  }
};

export default entity;

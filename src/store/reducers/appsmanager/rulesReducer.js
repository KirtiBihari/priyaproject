import * as actionTypes from '../../definitions';
import {updateObject} from '../../../_shared/utility';
const initialState = {
  rulesList: [],
  error: null,
  loading: false,
  isRulesExist: null,
  status: null,
  rulesDetails: null,
};

//List
const rulesListStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const rulesListSuccess = (state, action) => {
  return updateObject (state, {
    rulesList: action.rulesList,
    loading: false,
  });
};
const rulesListFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Add
const rulesAddStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const rulesAddSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const rulesAddFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};

// Edit
const rulesEditStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const rulesEditSuccess = (state, action) => {
  return updateObject (state, {
    rulesDetails: action.rulesDetails,
    loading: false,
  });
};
const rulesEditFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const rulesCheckStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const rulesCheckSuccess = (state, action) => {
  return updateObject (state, {
    isRulesExist: action.isRulesExist,
    loading: false,
  });
};
const rulesCheckFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Update
const rulesUpdateStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const rulesUpdateSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const rulesUpdateFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Delete
const rulesDeleteStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const rulesDeleteSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const rulesDeleteFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const rules = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RULES_LIST_START:
      return rulesListStart (state, action);

    case actionTypes.RULES_LIST_SUCCESS:
      return rulesListSuccess (state, action);

    case actionTypes.RULES_LIST_FAIL:
      return rulesListFail (state, action);

    case actionTypes.RULES_ADD_START:
      return rulesAddStart (state, action);

    case actionTypes.RULES_ADD_SUCCESS:
      return rulesAddSuccess (state, action);

    case actionTypes.RULES_ADD_FAIL:
      return rulesAddFail (state, action);

    case actionTypes.RULES_EDIT_START:
      return rulesEditStart (state, action);

    case actionTypes.RULES_EDIT_SUCCESS:
      return rulesEditSuccess (state, action);

    case actionTypes.RULES_EDIT_FAIL:
      return rulesEditFail (state, action);

    case actionTypes.RULES_CHECK_START:
      return rulesCheckStart (state, action);

    case actionTypes.RULES_CHECK_SUCCESS:
      return rulesCheckSuccess (state, action);

    case actionTypes.RULES_CHECK_FAIL:
      return rulesCheckFail (state, action);

    case actionTypes.RULES_UPDATE_START:
      return rulesUpdateStart (state, action);

    case actionTypes.RULES_UPDATE_SUCCESS:
      return rulesUpdateSuccess (state, action);

    case actionTypes.RULES_UPDATE_FAIL:
      return rulesUpdateFail (state, action);

    case actionTypes.RULES_DELETE_START:
      return rulesDeleteStart (state, action);

    case actionTypes.RULES_DELETE_SUCCESS:
      return rulesDeleteSuccess (state, action);

    case actionTypes.RULES_DELETE_FAIL:
      return rulesDeleteFail (state, action);

    default:
      return state;
  }
};

export default rules;

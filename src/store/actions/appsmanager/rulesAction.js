import * as actionTypes from '../../definitions';
// RULES List
export const rulesListStart = () => ({
  type: actionTypes.RULES_LIST_START,
});

export const rulesListSuccess = res => ({
  type: actionTypes.RULES_LIST_SUCCESS,
  rulesList: res,
});

export const rulesListFail = err => ({
  type: actionTypes.RULES_LIST_FAIL,
  error: err,
});

export const rulesListProcess = cb => {
  return {
    type: actionTypes.RULES_LIST_PROCESS,
    cb: cb,
  };
};
//RULES Add

export const rulesAddStart = () => ({
  type: actionTypes.RULES_ADD_START,
});

export const rulesAddSuccess = res => ({
  type: actionTypes.RULES_ADD_SUCCESS,
  status: res.status,
});

export const rulesAddFail = err => ({
  type: actionTypes.RULES_ADD_FAIL,
  error: err,
});

export const rulesAddProcess = (data, cb) => {
  return {
    type: actionTypes.RULES_ADD_PROCESS,
    data: data,
    cb: cb,
  };
};

//RULES Edit

export const rulesEditStart = () => ({
  type: actionTypes.RULES_EDIT_START,
});

export const rulesEditSuccess = res => ({
  type: actionTypes.RULES_EDIT_SUCCESS,
  rulesDetails: res,
});

export const rulesEditFail = err => ({
  type: actionTypes.RULES_EDIT_FAIL,
  error: err,
});

export const rulesEditProcess = (id, cb) => {
  return {
    type: actionTypes.RULES_EDIT_PROCESS,
    username: localStorage.getItem ('userId'),
    id: id,
    cb: cb,
  };
};
//RULES Check
export const rulesCheckStart = () => ({
  type: actionTypes.RULES_CHECK_START,
});

export const rulesCheckSuccess = res => ({
  type: actionTypes.RULES_CHECK_SUCCESS,
  isUnitExist: res,
});

export const rulesCheckFail = err => ({
  type: actionTypes.RULES_CHECK_FAIL,
  error: err,
});

export const rulesCheckProcess = (id, cb) => {
  return {
    type: actionTypes.RULES_CHECK_PROCESS,
    id: id,
    cb: cb,
  };
};
//RULES Update

export const rulesUpdateStart = () => ({
  type: actionTypes.RULES_UPDATE_START,
});

export const rulesUpdateSuccess = res => ({
  type: actionTypes.RULES_UPDATE_SUCCESS,
  status: res.status,
});

export const rulesUpdateFail = err => ({
  type: actionTypes.RULES_UPDATE_FAIL,
  error: err,
});

export const rulesUpdateProcess = (data, cb) => {
  return {
    type: actionTypes.RULES_UPDATE_PROCESS,
    data: data,
    cb: cb,
  };
};

//RULES Delete

export const rulesDelStart = () => ({
  type: actionTypes.RULES_DELETE_START,
});

export const rulesDelSuccess = res => ({
  type: actionTypes.RULES_DELETE_SUCCESS,
  status: res.status,
});

export const rulesDelFail = err => ({
  type: actionTypes.RULES_DELETE_FAIL,
  error: err,
});

export const rulesDelProcess = (data, cb) => {
  return {
    type: actionTypes.RULES_DELETE_PROCESS,
    data: data,
    cb: cb,
  };
};

import * as actionTypes from '../../definitions';
// UNIT List
export const unitListStart = () => ({
  type: actionTypes.UNIT_LIST_START,
});

export const unitListSuccess = res => ({
  type: actionTypes.UNIT_LIST_SUCCESS,
  unitList: res,
});

export const unitListFail = err => ({
  type: actionTypes.UNIT_LIST_FAIL,
  error: err,
});

export const unitListProcess = (cb) => {
  return {
    type: actionTypes.UNIT_LIST_PROCESS,
    username: localStorage.getItem ('userId'),
    cb:cb
  };
};
//UNIT Add

export const unitAddStart = () => ({
  type: actionTypes.UNIT_ADD_START,
});

export const unitAddSuccess = res => ({
  type: actionTypes.UNIT_ADD_SUCCESS,
  status: res.status,
});

export const unitAddFail = err => ({
  type: actionTypes.UNIT_ADD_FAIL,
  error: err,
});

export const unitAddProcess = (data, cb) => {
  return {
    type: actionTypes.UNIT_ADD_PROCESS,
    data: data,
    cb: cb,
  };
};

//UNIT Edit

export const unitEditStart = () => ({
  type: actionTypes.UNIT_EDIT_START,
});

export const unitEditSuccess = res => ({
  type: actionTypes.UNIT_EDIT_SUCCESS,
  unitList: res,
});

export const unitEditFail = err => ({
  type: actionTypes.UNIT_EDIT_FAIL,
  error: err,
});

export const unitEditProcess = (id, cb) => {
  return {
    type: actionTypes.UNIT_EDIT_PROCESS,
    username: localStorage.getItem ('userId'),
    id: id,
    cb: cb,
  };
};
//UNIT Check
export const unitCheckStart = () => ({
  type: actionTypes.UNIT_CHECK_START,
});

export const unitCheckSuccess = res => ({
  type: actionTypes.UNIT_CHECK_SUCCESS,
  isUnitExist: res,
});

export const unitCheckFail = err => ({
  type: actionTypes.UNIT_CHECK_FAIL,
  error: err,
});

export const unitCheckProcess = (id, cb) => {
  return {
    type: actionTypes.UNIT_CHECK_PROCESS,
    id: id,
    cb: cb,
  };
};
//UNIT Update

export const unitUpdateStart = () => ({
  type: actionTypes.UNIT_UPDATE_START,
});

export const unitUpdateSuccess = res => ({
  type: actionTypes.UNIT_UPDATE_SUCCESS,
  status: res.status,
});

export const unitUpdateFail = err => ({
  type: actionTypes.UNIT_UPDATE_FAIL,
  error: err,
});

export const unitUpdateProcess = (data, cb) => {
  return {
    type: actionTypes.UNIT_UPDATE_PROCESS,
    data: data,
    cb: cb,
  };
};

//UNIT Delete

export const unitDelStart = () => ({
  type: actionTypes.UNIT_DELETE_START,
});

export const unitDelSuccess = res => ({
  type: actionTypes.UNIT_DELETE_SUCCESS,
  status: res.status,
});

export const unitDelFail = err => ({
  type: actionTypes.UNIT_DELETE_FAIL,
  error: err,
});

export const unitDelProcess = (data, cb) => {
  return {
    type: actionTypes.UNIT_DELETE_PROCESS,
    data: data,
    cb: cb,
  };
};

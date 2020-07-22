import * as actionTypes from '../../definitions';
// SUB_PROCESS List
export const subprocessListStart = () => ({
  type: actionTypes.SUB_PROCESS_LIST_START,
});

export const subprocessListSuccess = res => ({
  type: actionTypes.SUB_PROCESS_LIST_SUCCESS,
  subprocessList: res,
});

export const subprocessListFail = err => ({
  type: actionTypes.SUB_PROCESS_LIST_FAIL,
  error: err,
});

export const subprocessListProcess = (cb) => {
  return {
    type: actionTypes.SUB_PROCESS_LIST_PROCESS,
    username: localStorage.getItem ('userId'),
    cb:cb
  };
};
//SUB_PROCESS Add

export const subprocessAddStart = () => ({
  type: actionTypes.SUB_PROCESS_ADD_START,
});

export const subprocessAddSuccess = res => ({
  type: actionTypes.SUB_PROCESS_ADD_SUCCESS,
  status: res.status,
});

export const subprocessAddFail = err => ({
  type: actionTypes.SUB_PROCESS_ADD_FAIL,
  error: err,
});

export const subprocessAddProcess = (data, cb) => {
  return {
    type: actionTypes.SUB_PROCESS_ADD_PROCESS,
    data: data,
    cb: cb,
  };
};

//SUB_PROCESS Edit

export const subprocessEditStart = () => ({
  type: actionTypes.SUB_PROCESS_EDIT_START,
});

export const subprocessEditSuccess = res => ({
  type: actionTypes.SUB_PROCESS_EDIT_SUCCESS,
  subProcessDetails: res,
});

export const subprocessEditFail = err => ({
  type: actionTypes.SUB_PROCESS_EDIT_FAIL,
  error: err,
});

export const subprocessEditProcess = (id, cb) => {
  return {
    type: actionTypes.SUB_PROCESS_EDIT_PROCESS,
    username: localStorage.getItem ('userId'),
    id: id,
    cb: cb,
  };
};
//SUB_PROCESS Check
export const subprocessCheckStart = () => ({
  type: actionTypes.SUB_PROCESS_CHECK_START,
});

export const subprocessCheckSuccess = res => ({
  type: actionTypes.SUB_PROCESS_CHECK_SUCCESS,
  isSubProcessExist: res,
});

export const subprocessCheckFail = err => ({
  type: actionTypes.SUB_PROCESS_CHECK_FAIL,
  error: err,
});

export const subprocessCheckProcess = (id, cb) => {
  return {
    type: actionTypes.SUB_PROCESS_CHECK_PROCESS,
    id: id,
    cb: cb,
  };
};
//SUB_PROCESS Update

export const subprocessUpdateStart = () => ({
  type: actionTypes.SUB_PROCESS_UPDATE_START,
});

export const subprocessUpdateSuccess = res => ({
  type: actionTypes.SUB_PROCESS_UPDATE_SUCCESS,
  status: res.status,
});

export const subprocessUpdateFail = err => ({
  type: actionTypes.SUB_PROCESS_UPDATE_FAIL,
  error: err,
});

export const subprocessUpdateProcess = (data, cb) => {
  return {
    type: actionTypes.SUB_PROCESS_UPDATE_PROCESS,
    data: data,
    cb: cb,
  };
};

//SUB_PROCESS Delete

export const subprocessDelStart = () => ({
  type: actionTypes.SUB_PROCESS_DELETE_START,
});

export const subprocessDelSuccess = res => ({
  type: actionTypes.SUB_PROCESS_DELETE_SUCCESS,
  status: res.status,
});

export const subprocessDelFail = err => ({
  type: actionTypes.SUB_PROCESS_DELETE_FAIL,
  error: err,
});

export const subprocessDelProcess = (data, cb) => {
  return {
    type: actionTypes.SUB_PROCESS_DELETE_PROCESS,
    data: data,
    cb: cb,
  };
};

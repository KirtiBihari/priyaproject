import * as actionTypes from '../../definitions';
// PROCESS_FORM List
export const processFormListStart = () => ({
  type: actionTypes.PROCESS_FORM_LIST_START,
});

export const processFormListSuccess = res => ({
  type: actionTypes.PROCESS_FORM_LIST_SUCCESS,
  processFormList: res,
});

export const processFormListFail = err => ({
  type: actionTypes.PROCESS_FORM_LIST_FAIL,
  error: err,
});

export const processFormListProcess = () => {
  return {
    type: actionTypes.PROCESS_FORM_LIST_PROCESS,
  };
};
//PROCESS_FORM Add

export const processFormAddStart = () => ({
  type: actionTypes.PROCESS_FORM_ADD_START,
});

export const processFormAddSuccess = res => ({
  type: actionTypes.PROCESS_FORM_ADD_SUCCESS,
  status: res.status,
});

export const processFormAddFail = err => ({
  type: actionTypes.PROCESS_FORM_ADD_FAIL,
  error: err,
});

export const processFormAddProcess = (data, cb) => {
  return {
    type: actionTypes.PROCESS_FORM_ADD_PROCESS,
    data: data,
   cb:cb

    
  };
};

//PROCESS_FORM Edit

export const processFormEditStart = () => ({
  type: actionTypes.PROCESS_FORM_EDIT_START,
});

export const processFormEditSuccess = res => ({
  type: actionTypes.PROCESS_FORM_EDIT_SUCCESS,
  processFormList: res,
});

export const processFormEditFail = err => ({
  type: actionTypes.PROCESS_FORM_EDIT_FAIL,
  error: err,
});

export const processFormEditProcess = (id) => {
  return {
    type: actionTypes.PROCESS_FORM_EDIT_PROCESS,
    username: localStorage.getItem ('userId'),
    id: id,
  };
};
//PROCESS_FORM Check
export const processFormCheckStart = () => ({
  type: actionTypes.PROCESS_FORM_CHECK_START,
});

export const processFormCheckSuccess = res => ({
  type: actionTypes.PROCESS_FORM_CHECK_SUCCESS,
  isProcessFormExist: res,
});

export const processFormCheckFail = err => ({
  type: actionTypes.PROCESS_FORM_CHECK_FAIL,
  error: err,
});

export const processFormCheckProcess = (id,cb) => {
  return {
    type: actionTypes.PROCESS_FORM_CHECK_PROCESS,
    id: id,
    cb:cb
   

    
  };
};
//PROCESS_FORM Update

export const processFormUpdateStart = () => ({
  type: actionTypes.PROCESS_FORM_UPDATE_START,
});

export const processFormUpdateSuccess = res => ({
  type: actionTypes.PROCESS_FORM_UPDATE_SUCCESS,
  status: res.status,
});

export const processFormUpdateFail = err => ({
  type: actionTypes.PROCESS_FORM_UPDATE_FAIL,
  error: err,
});

export const processFormUpdateProcess = (data,cb) => {
  return {
    type: actionTypes.PROCESS_FORM_UPDATE_PROCESS,
    data: data,
    cb:cb
   
  };
};

//PROCESS_FORM Delete

export const processFormDelStart = () => ({
  type: actionTypes.PROCESS_FORM_DELETE_START,
});

export const processFormDelSuccess = res => ({
  type: actionTypes.PROCESS_FORM_DELETE_SUCCESS,
  status: res.status,
});

export const processFormDelFail = err => ({
  type: actionTypes.PROCESS_FORM_DELETE_FAIL,
  error: err,
});

export const processFormDelProcess = (data,cb) => {
  return {
    type: actionTypes.PROCESS_FORM_DELETE_PROCESS,
    data: data,
    cb:cb
   

    
  };
};

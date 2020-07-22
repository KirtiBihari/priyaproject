import * as actionTypes from '../../definitions';
// PROCESS List
export const processListStart = () => ({
  type: actionTypes.PROCESS_LIST_START,
});

export const processListSuccess = res => ({
  type: actionTypes.PROCESS_LIST_SUCCESS,
  processList: res,
});

export const processListFail = err => ({
  type: actionTypes.PROCESS_LIST_FAIL,
  error: err,
});

export const processListProcess = (cb) => {
  return {
    type: actionTypes.PROCESS_LIST_PROCESS,
    username: localStorage.getItem ('userId'),
    cb:cb
  };
};
//PROCESS Add

export const processAddStart = () => ({
  type: actionTypes.PROCESS_ADD_START,
});

export const processAddSuccess = res => ({
  type: actionTypes.PROCESS_ADD_SUCCESS,
  status: res.status,
});

export const processAddFail = err => ({
  type: actionTypes.PROCESS_ADD_FAIL,
  error: err,
});

export const processAddProcess = (data) => {
  return {
    type: actionTypes.PROCESS_ADD_PROCESS,
    data: data,
    
  };
};

//PROCESS Edit

export const processEditStart = () => ({
  type: actionTypes.PROCESS_EDIT_START,
});

export const processEditSuccess = res => ({
  type: actionTypes.PROCESS_EDIT_SUCCESS,
  processList: res,
});

export const processEditFail = err => ({
  type: actionTypes.PROCESS_EDIT_FAIL,
  error: err,
});

export const processEditProcess = (id, cb) => {
  return {
    type: actionTypes.PROCESS_EDIT_PROCESS,
    username: localStorage.getItem ('userId'),
    id: id,
    
  };
};
//PROCESS Check
export const processCheckStart = () => ({
  type: actionTypes.PROCESS_CHECK_START,
});

export const processCheckSuccess = res => ({
  type: actionTypes.PROCESS_CHECK_SUCCESS,
  isProcessExist: res,
});

export const processCheckFail = err => ({
  type: actionTypes.PROCESS_CHECK_FAIL,
  error: err,
});

export const processCheckProcess = (id, cb) => {
  return {
    type: actionTypes.PROCESS_CHECK_PROCESS,
    id: id,
    
  };
};
//PROCESS Update

export const processUpdateStart = () => ({
  type: actionTypes.PROCESS_UPDATE_START,
});

export const processUpdateSuccess = res => ({
  type: actionTypes.PROCESS_UPDATE_SUCCESS,
  status: res.status,
});

export const processUpdateFail = err => ({
  type: actionTypes.PROCESS_UPDATE_FAIL,
  error: err,
});

export const processUpdateProcess = (data) => {
  return {
    type: actionTypes.PROCESS_UPDATE_PROCESS,
    data: data,
    
  };
};

//PROCESS Delete

export const processDelStart = () => ({
  type: actionTypes.PROCESS_DELETE_START,
});

export const processDelSuccess = res => ({
  type: actionTypes.PROCESS_DELETE_SUCCESS,
  status: res.status,
});

export const processDelFail = err => ({
  type: actionTypes.PROCESS_DELETE_FAIL,
  error: err,
});

export const processDelProcess = (data) => {
  return {
    type: actionTypes.PROCESS_DELETE_PROCESS,
    data: data,
    
   
  };
};
//PROCESS DEPLOY 

export const processDeployStart = () => ({
  type: actionTypes.PROCESS_DEPLOY_START,
});

export const processDeploySuccess = res => ({
  type: actionTypes.PROCESS_DEPLOY_SUCCESS,
  status: res.status,
});

export const processDeployFail = err => ({
  type: actionTypes.PROCESS_DEPLOY_FAIL,
  error: err,
});

export const processDeployProcess = (data) => {
  return {
    type: actionTypes.PROCESS_DEPLOY_PROCESS,
    data: data,
 
  };
};
//PROCESS DEPLOY Delete

export const processDeployDelStart = () => ({
  type: actionTypes.PROCESS_DEPLOY_DELETE_START,
});

export const processDeployDelSuccess = res => ({
  type: actionTypes.PROCESS_DEPLOY_DELETE_SUCCESS,
  status: res.status,
});

export const processDeployDelFail = err => ({
  type: actionTypes.PROCESS_DEPLOY_DELETE_FAIL,
  error: err,
});

export const processDeployDelProcess = (data) => {
  return {
    type: actionTypes.PROCESS_DEPLOY_DELETE_PROCESS,
    data: data,
    
  };
};

export const processReset=()=>({
  type:actionTypes.PROCESS_RESET
})
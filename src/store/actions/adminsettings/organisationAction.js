import * as actionTypes from '../../definitions'
// Organisation List
export const orgListStart = () => ({
    type: actionTypes.ORGANISATION_LIST_START
  });
  
  export const orgListSuccess = (res) => ({
    type: actionTypes.ORGANISATION_LIST_SUCCESS,
    orgList: res
  });
  
  export const orgListFail = err => ({
    type: actionTypes.ORGANISATION_LIST_FAIL,
    error: err
  });

  export const orgListProcess=(cb)=>{
      return {
          type:actionTypes.ORGANISATION_LIST_PROCESS,
          username:localStorage.getItem('userId'),
          cb:cb
      }
  }
  //Organisation Add
  
export const orgAddStart = () => ({
  type: actionTypes.ORGANISATION_ADD_START
});

export const orgAddSuccess = (res) => ({
  type: actionTypes.ORGANISATION_ADD_SUCCESS,
  status: res.status
});

export const orgAddFail = err => ({
  type: actionTypes.ORGANISATION_ADD_FAIL,
  error: err
});

export const orgAddProcess=(data,cb)=>{
    return {
        type:actionTypes.ORGANISATION_ADD_PROCESS,
        data:data,
        cb:cb
    }
}

  //Organisation Edit
  
export const orgEditStart = () => ({
  type: actionTypes.ORGANISATION_EDIT_START
});

export const orgEditSuccess = (res) => ({
  type: actionTypes.ORGANISATION_EDIT_SUCCESS,
  orgList: res
});

export const orgEditFail = err => ({
  type: actionTypes.ORGANISATION_EDIT_FAIL,
  error: err
});

export const orgEditProcess=(id,cb)=>{
    return {
        type:actionTypes.ORGANISATION_EDIT_PROCESS,
        username:localStorage.getItem('userId'),
        id:id,
        cb:cb
    }
}
//Organisation Check
  export const orgCheckStart = () => ({
    type: actionTypes.ORGANISATION_CHECK_START
  });
  
  export const orgCheckSuccess = (res) => ({
    type: actionTypes.ORGANISATION_CHECK_SUCCESS,
    isOrgExist: res
  });
  
  export const orgCheckFail = err => ({
    type: actionTypes.ORGANISATION_CHECK_FAIL,
    error: err
  });
  
  export const orgCheckProcess=(id,cb)=>{
      return {
          type:actionTypes.ORGANISATION_CHECK_PROCESS,
          id:id,
          cb:cb

      }
  }
  //Organisation Update
  
  export const orgUpdateStart = () => ({
    type: actionTypes.ORGANISATION_UPDATE_START
  });
  
  export const orgUpdateSuccess = (res) => ({
    type: actionTypes.ORGANISATION_UPDATE_SUCCESS,
    status: res.status
  });
  
  export const orgUpdateFail = err => ({
    type: actionTypes.ORGANISATION_UPDATE_FAIL,
    error: err
  });
  
  export const orgUpdateProcess=(data,cb)=>{
      return {
          type:actionTypes.ORGANISATION_UPDATE_PROCESS,
          data:data,
          cb:cb
      }
  }

  //Organisation Delete
  
  export const orgDelStart = () => ({
    type: actionTypes.ORGANISATION_DELETE_START
  });
  
  export const orgDelSuccess = (res) => ({
    type: actionTypes.ORGANISATION_DELETE_SUCCESS,
    status: res.status
  });
  
  export const orgDelFail = err => ({
    type: actionTypes.ORGANISATION_DELETE_FAIL,
    error: err
  });
  
  export const orgDelProcess=(data,cb)=>{
      return {
          type:actionTypes.ORGANISATION_DELETE_PROCESS,
          data:data,
          cb:cb
      }
  }
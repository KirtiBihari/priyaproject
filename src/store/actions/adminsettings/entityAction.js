import * as actionTypes from '../../definitions'
// ENTITY List
export const entityListStart = () => ({
    type: actionTypes.ENTITY_LIST_START
  });
  
  export const entityListSuccess = (res) => ({
    type: actionTypes.ENTITY_LIST_SUCCESS,
    entityList: res
  });
  
  export const entityListFail = err => ({
    type: actionTypes.ENTITY_LIST_FAIL,
    error: err
  });

  export const entityListProcess=()=>{
      return {
          type:actionTypes.ENTITY_LIST_PROCESS,
          username:localStorage.getItem('userId'),
      }
  }
  //ENTITY Add
  
export const entityAddStart = () => ({
  type: actionTypes.ENTITY_ADD_START
});

export const entityAddSuccess = (res) => ({
  type: actionTypes.ENTITY_ADD_SUCCESS,
  status: res.status
});

export const entityAddFail = err => ({
  type: actionTypes.ENTITY_ADD_FAIL,
  error: err
});

export const entityAddProcess=(data,cb)=>{
    return {
        type:actionTypes.ENTITY_ADD_PROCESS,
        data:data,
        cb:cb
    }
}

  //ENTITY Edit
  
export const entityEditStart = () => ({
  type: actionTypes.ENTITY_EDIT_START
});

export const entityEditSuccess = (res) => ({
  type: actionTypes.ENTITY_EDIT_SUCCESS,
  entityList: res
});

export const entityEditFail = err => ({
  type: actionTypes.ENTITY_EDIT_FAIL,
  error: err
});

export const entityEditProcess=(id,cb)=>{
    return {
        type:actionTypes.ENTITY_EDIT_PROCESS,
        id:id,
        cb:cb
    }
}
//ENTITY Check
  export const entityCheckStart = () => ({
    type: actionTypes.ENTITY_CHECK_START
  });
  
  export const entityCheckSuccess = (res) => ({
    type: actionTypes.ENTITY_CHECK_SUCCESS,
    isentityExist: res
  });
  
  export const entityCheckFail = err => ({
    type: actionTypes.ENTITY_CHECK_FAIL,
    error: err
  });
  
  export const entityCheckProcess=(id,cb)=>{
      return {
          type:actionTypes.ENTITY_CHECK_PROCESS,
          id:id,
          cb:cb

      }
  }
  //ENTITY Update
  
  export const entityUpdateStart = () => ({
    type: actionTypes.ENTITY_UPDATE_START
  });
  
  export const entityUpdateSuccess = (res) => ({
    type: actionTypes.ENTITY_UPDATE_SUCCESS,
    status: res.status
  });
  
  export const entityUpdateFail = err => ({
    type: actionTypes.ENTITY_UPDATE_FAIL,
    error: err
  });
  
  export const entityUpdateProcess=(data,cb)=>{
      return {
          type:actionTypes.ENTITY_UPDATE_PROCESS,
          data:data,
          cb:cb
      }
  }

  //ENTITY Delete
  
  export const entityDelStart = () => ({
    type: actionTypes.ENTITY_DELETE_START
  });
  
  export const entityDelSuccess = (res) => ({
    type: actionTypes.ENTITY_DELETE_SUCCESS,
    status: res.status
  });
  
  export const entityDelFail = err => ({
    type: actionTypes.ENTITY_DELETE_FAIL,
    error: err
  });
  
  export const entityDelProcess=(data,cb)=>{
      return {
          type:actionTypes.ENTITY_DELETE_PROCESS,
          data:data,
          cb:cb
      }
  }
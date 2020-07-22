import * as actionTypes from '../../definitions';
import {updateObject} from '../../../_shared/utility';
const initialState = {
  processList: [],
  error: null,
  loading: false,
  isUnitExist: null,
  status: null,
};

//List
const processListStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processListSuccess = (state, action) => {
  return updateObject (state, {
    processList: action.processList,
    loading: false,
  });
};
const processListFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Add
const processAddStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processAddSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const processAddFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};

// Edit
const processEditStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processEditSuccess = (state, action) => {
  return updateObject (state, {
    processDetails: action.processList,
    loading: false,
  });
};
const processEditFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processCheckStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processCheckSuccess = (state, action) => {
  return updateObject (state, {
    isProcessExist: action.isProcessExist,
    loading: false,
  });
};
const processCheckFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Update
const processUpdateStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processUpdateSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const processUpdateFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
// Delete
const processDeleteStart = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};
const processDeleteSuccess = (state, action) => {
  return updateObject (state, {
    status: action.status,
    loading: false,
  });
};
const processDeleteFail = (state, action) => {
  return updateObject (state, {
    error: null,
    loading: true,
  });
};

// Deploy
const processDeployStart = (state, action) => {
    return updateObject (state, {
      error: null,
      loading: true,
    });
  };
  const processDeploySuccess = (state, action) => {
    return updateObject (state, {
      status: action.status,
      loading: false,
    });
  };
  const processDeployFail = (state, action) => {
    return updateObject (state, {
      error: null,
      loading: true,
    });
  };

  // Deploy Delete
const processDeployDeleteStart = (state, action) => {
    return updateObject (state, {
      error: null,
      loading: true,
    });
  };
  const processDeployDeleteSuccess = (state, action) => {
    return updateObject (state, {
      status: action.status,
      loading: false,
    });
  };
  const processDeployDeleteFail = (state, action) => {
    return updateObject (state, {
      error: null,
      loading: true,
    });
  };

  const processReset=(state,action)=>{
    return updateObject(state,{
      processList: [],
      error: null,
      loading: false,
      isUnitExist: null,
      status: null,
    })
  }
const process = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROCESS_LIST_START:
      return processListStart (state, action);

    case actionTypes.PROCESS_LIST_SUCCESS:
      return processListSuccess (state, action);

    case actionTypes.PROCESS_LIST_FAIL:
      return processListFail (state, action);

    case actionTypes.PROCESS_ADD_START:
      return processAddStart (state, action);

    case actionTypes.PROCESS_ADD_SUCCESS:
      return processAddSuccess (state, action);

    case actionTypes.PROCESS_ADD_FAIL:
      return processAddFail (state, action);

    case actionTypes.PROCESS_EDIT_START:
      return processEditStart (state, action);

    case actionTypes.PROCESS_EDIT_SUCCESS:
      return processEditSuccess (state, action);

    case actionTypes.PROCESS_EDIT_FAIL:
      return processEditFail (state, action);

    case actionTypes.PROCESS_CHECK_START:
      return processCheckStart (state, action);

    case actionTypes.PROCESS_CHECK_SUCCESS:
      return processCheckSuccess (state, action);

    case actionTypes.PROCESS_CHECK_FAIL:
      return processCheckFail (state, action);

    case actionTypes.PROCESS_UPDATE_START:
      return processUpdateStart (state, action);

    case actionTypes.PROCESS_UPDATE_SUCCESS:
      return processUpdateSuccess (state, action);

    case actionTypes.PROCESS_UPDATE_FAIL:
      return processUpdateFail (state, action);

    case actionTypes.PROCESS_DELETE_START:
      return processDeleteStart (state, action);

    case actionTypes.PROCESS_DELETE_SUCCESS:
      return processDeleteSuccess (state, action);

    case actionTypes.PROCESS_DELETE_FAIL:
      return processDeleteFail (state, action);

    case actionTypes.PROCESS_DEPLOY_START:
      return processDeployStart (state, action);

    case actionTypes.PROCESS_DEPLOY_SUCCESS:
      return processDeploySuccess (state, action);

    case actionTypes.PROCESS_DEPLOY_FAIL:
      return processDeployFail (state, action);

    case actionTypes.PROCESS_DEPLOY_DELETE_START:
      return processDeployDeleteStart (state, action);

    case actionTypes.PROCESS_DEPLOY_DELETE_SUCCESS:
      return processDeployDeleteSuccess (state, action);

    case actionTypes.PROCESS_DEPLOY_DELETE_FAIL:
      return processDeployDeleteFail (state, action);

      case  actionTypes.PROCESS_RESET:
       return processReset() ; 
      
    default:
      return state;
  }
};

export default process;

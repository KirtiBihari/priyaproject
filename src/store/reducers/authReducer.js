import * as actionTypes from '../definitions';
import { updateObject } from '../../_shared/utility';
const initialState = {
  token: null,
  authtoken: null,
  userId: null,
  authorizedApps: [],
  firstName: null,
  lastName: null,
  error: null,
  email: null,
  groups: [],
  groupUsers: [],
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};
const authSuccess = (state, action) => {
  return updateObject(state, {
    authtoken: action.authtoken,
    userId: action.userId,
    authorizedApps: action.authorizedApps,
    error: null,
    loading: false
  });
};
const authFail = (state, action) => {
  return updateObject(state, { error: action.error, loading: false });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, isLoggedOut: true });
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);

    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTH_FAIL:
      return authFail(state, action);

    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default auth;

import * as actionTypes from '../definitions';



export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  authtoken: token,
  userId: userId
});

export const authProfile = profile => ({
  type: actionTypes.AUTH_PROFILE,
  profile: profile
});

export const authFail = error => ({
  type: actionTypes.AUTH_FAIL,
  error: error
});

export const logout = () => {
  
  return { type: actionTypes.AUTH_LOGOUT_INITIATE };
};
export const logoutSucceed = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};
export const checkAuthTimeout = expirationTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    expirationTime: expirationTime
  };
};

export const auth = (username, password,cb) => {
  return  {
    type: actionTypes.AUTH_USER,
    username:username,
    password:password,
    cb:cb
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path
  };
};

export const authCheckState = () => {
  return {
    type: actionTypes.AUTH_CHECK_STATE
  };

};

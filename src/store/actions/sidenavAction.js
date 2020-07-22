import * as actionTypes from '../definitions'
export const sideNavStart = () => ({
    type: actionTypes.SIDE_NAV_START
  });
  
  export const sideNavSuccess = (res) => ({
    type: actionTypes.SIDE_NAV_SUCCESS,
    sideNav: res
  });
  
  export const sideNavFail = err => ({
    type: actionTypes.SIDE_NAV_FAIL,
    error: err
  });

  export const sideNavListProcess=(path)=>{
      return {
          type:actionTypes.SIDE_NAV_PROCESS,
          username:localStorage.getItem('userId'),
          path:path
      }
  }
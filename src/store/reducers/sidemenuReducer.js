import * as actionTypes from '../definitions';
import { updateObject } from '../../_shared/utility';
const initialState = {
  
    sideMenu: [],
    error: null,
    loading: false
  };
  const sideMenuStart=(state,action)=>{
    return updateObject(state, {
        error: null,
        loading: true
      });
  }
  const sideMenuSuccess=(state,action)=>{
    return updateObject(state, {
        sideMenu: action.sideNav,
        loading: false
      });
}
const sideMenuFail=(state,action)=>{
    return updateObject(state, {
        error: null,
        loading: true
      });
}

  const sidemenu = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.SIDE_NAV_START:
        return sideMenuStart(state, action);
  
      case actionTypes.SIDE_NAV_SUCCESS:
        return sideMenuSuccess(state, action);
  
      case actionTypes.SIDE_NAV_FAIL:
        return sideMenuFail(state, action);
  
      default:
        return state;
    }
  };
  
  export default sidemenu;
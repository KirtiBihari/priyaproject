import * as actionTypes from '../definitions';
import { updateObject } from '../../_shared/utility';
const initialState = {
  
    hometiles: [],
    error: null,
    loading: false
  };
  const tilesStart=(state,action)=>{
    return updateObject(state, {
        error: null,
        loading: true
      });
  }
  const tileSuccess=(state,action)=>{
    return updateObject(state, {
        hometiles: action.hometiles,
        loading: false
      });
}
const tilesFail=(state,action)=>{
    return updateObject(state, {
        error: null,
        loading: true
      });
}

  const home = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.HOME_TILES_START:
        return tilesStart(state, action);
  
      case actionTypes.HOME_TILES_SUCCESS:
        return tileSuccess(state, action);
  
      case actionTypes.HOME_TILES_FAIL:
        return tilesFail(state, action);
  
      default:
        return state;
    }
  };
  
  export default home;
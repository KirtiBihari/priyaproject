import * as actionTypes from '../definitions'
export const homeTilesStart = () => ({
    type: actionTypes.HOME_TILES_START
  });
  
  export const homeTilesSuccess = (res) => ({
    type: actionTypes.HOME_TILES_SUCCESS,
    hometiles: res
  });
  
  export const homeTilesFail = err => ({
    type: actionTypes.HOME_TILES_FAIL,
    error: err
  });

  export const getHomeTilesList=()=>{
      return {
          type:actionTypes.HOME_TILES_LIST,
          username:localStorage.getItem('userId'),
      }
  }
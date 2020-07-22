import * as actionTypes from '../definitions';
import produce from 'immer';
const initialState = {
  pageList: ['SubProcessList'],
};
const breadcrum = produce ((state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BREADCRUM:
      state.pageList.push (action.pageName);
      return state;

    case actionTypes.GET_BREADCRUM:
      return state;

    case actionTypes.REMOVE_BREADCRUM:
      state.pageList.pop ();
      return state;

    default:
      return state;
  }
});

export default breadcrum;

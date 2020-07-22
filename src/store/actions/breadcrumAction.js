import * as actionTypes from '../definitions';

export const setBreadCrum = pageName => {
  return {
    type: actionTypes.SET_BREADCRUM,
    pageName,
  };
};
export const removeBreadCrum = () => {
  return {
    type: actionTypes.REMOVE_BREADCRUM,
  };
};
export const getBreadCrum = () => {
  return {
    type: actionTypes.GET_BREADCRUM,
  };
};

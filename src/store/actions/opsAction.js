import * as actionTypes from '../definitions';
// Top Content
export const topStart = () => ({
    type: actionTypes.TOP_START
  });
  export const topFail = err => ({
    type: actionTypes.TOP_FAIL,
    error: err
  });
  
  export const topSuccess = res => ({
    type: actionTypes.TOP_SUCCESS,
    finished: res.finished,
    unfinished: res.unfinished,
    missed: res.missed,
    received: res.received,
    assigned:res.assigned
  });

  export const topContent = () => {
      return {
          type:actionTypes.TOP_PROCESS,
          userId: localStorage.getItem('userId'),
          groupId: localStorage.getItem('groupId'),
          startedAfter: getMonday()
      }

  };

  // Request List
  export const requestListStart = () => ({
    type: actionTypes.REQUESTLIST_START
  });
  export const requestListFail = err => ({
    type: actionTypes.REQUESTLIST_FAIL,
    error: err
  });
  
  export const requestListSuccess = res => ({
    type: actionTypes.REQUESTLIST_SUCCESS,
    requestList:res
  });

  export const requestListFetch = () => {
      return {
          type:actionTypes.REQUESTLIST_PROCESS,
          userId: localStorage.getItem('userId'),
         
      }

  };
  //Case List
  export const caseListStart = () => ({
    type: actionTypes.CASELIST_START
  });
  export const caseListFail = err => ({
    type: actionTypes.CASELIST_FAIL,
    error: err
  });
  
  export const caseListSuccess = res => ({
    type: actionTypes.CASELIST_SUCCESS,
    caseList:res
  });

  export const caseListFetch = () => {
      return {
          type:actionTypes.CASELIST_PROCESS,
          userId: localStorage.getItem('userId'),
          
      }

  };
    //  Util Methods
  const getMonday = () => {
    let d = new Date(new Date().setHours(0, 0, 0, 0));
    var day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(d.setDate(diff)).toISOString();
  };

  // eslint-disable-next-line no-extend-native
  Date.prototype.toISOString = function() {
    var tzo = -this.getTimezoneOffset(),
      dif = tzo >= 0 ? '+' : '-',
      pad = function(num) {
        var norm = Math.floor(Math.abs(num));
        return (norm < 10 ? '0' : '') + norm;
      };
    return (
      this.getFullYear() +
      '-' +
      pad(this.getMonth() + 1) +
      '-' +
      pad(this.getDate()) +
      'T' +
      pad(this.getHours()) +
      ':' +
      pad(this.getMinutes()) +
      ':' +
      pad(this.getSeconds()) +
      dif +
      pad(tzo / 60) +
      ':' +
      pad(tzo % 60)
    );
  };
  
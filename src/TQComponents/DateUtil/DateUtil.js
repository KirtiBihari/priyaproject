import { DAYS } from './constants';

export function DateUtil(text) {
  debugger;
  let dateArray = text.split(' ');
  if (DAYS[dateArray[0]] !== undefined) {
    dateArray[0] = DAYS[dateArray[0]];
  } else {
    dateArray[1] = DAYS[dateArray[1]];
  }

  let datea = dateArray.join(' ');
  let d = new Date(datea);
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var year = d.getFullYear();
  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }
  return `${year}-${month}-${day}`;
}

export default DateUtil;

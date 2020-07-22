const millisecToTime = milisec => {

   
        let yrRem, monRem, dayRem, hrsRem, minRem;
        const no_years= Math.floor(milisec/(1000*60*60*24*365));
        yrRem = milisec % (1000*60*60*24*365);
        const no_months= Math.floor(yrRem/(1000*60*60*24*30));
        monRem = yrRem % (1000*60*60*24*30);
        const no_days= Math.floor(monRem/(1000*60*60*24));
        dayRem = monRem % (1000*60*60*24);
        const no_hours= Math.floor(dayRem/(60*60*1000));
        hrsRem = dayRem % (60*60*1000);
        const no_mins= Math.floor(hrsRem/(60*1000));
        minRem = hrsRem % (60*1000);
        const no_secs= Math.floor(minRem/1000);
    
        const yearStr = no_years > 0?no_years + (no_years>1?" years ":" year "):"";
        const monthStr = no_months > 0?no_months + (no_months>1?" months ":" month "):"";
        const dayStr = no_days > 0?no_days + (no_days>1?" days ":" day "):"";
        const hourStr = no_hours > 0?no_hours + (no_hours>1?" hours ":" hour "):"";
        const minStr = no_mins > 0?no_mins + (no_mins>1?" mins ":" min "):"";
        const secStr = no_secs > 0?no_secs + (no_secs>1?" secs ":" sec "):"";
    
        return (yearStr +" "+ monthStr +" "+ dayStr +" "+ hourStr +" "+ minStr +" "+ secStr).trim();
    

};
export const getMonth = val => {
  switch (val) {
    case 1:
      return 'Jan';

    case 2:
      return 'Feb';

    case 3:
      return 'Mar';

    case 4:
      return 'Apr';

    case 5:
      return 'May';

    case 6:
      return 'Jun';

    case 7:
      return 'Jul';

    case 8:
      return 'Aug';

    case 9:
      return 'Sep';

    case 10:
      return 'Oct';

    case 11:
      return 'Nov';

    case 12:
      return 'Dec';

    default:
      break;
  }
};
export default millisecToTime;

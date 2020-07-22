const chartData = cdata => {
  let dataGroupByYear = cdata.reduce (function (r, a) {
    r[a.year] = r[a.year] || [];
    r[a.year].push (a);
    return r;
  }, Object.create (null));

  function createDataFormat (
    _label,
    _data,
    _backgroundColor,
    _borderColor = '#fff',
    _borderWidth = 1
  ) {
    this.label = _label;
    this.data = _data;
    this.backgroundColor = '#4285f4';
    this.borderColor = _borderColor;
    this.borderWidth = _borderWidth;
  }

  let formattedData = [];
  let itemCount = 0;
  for (let item of Object.keys (dataGroupByYear)) {
    itemCount++;
    let yearArr = dataGroupByYear[item].sort ((a, b) => a.month - b.month);
    let monthCountData = [];
    let c = 0;
    for (let i = 0; i < 12; i++) {
      if (
        c < dataGroupByYear[item].length &&
        dataGroupByYear[item][c].month === i + 1
      ) {
        monthCountData.push (dataGroupByYear[item][c].count);
        c++;
      } else {
        monthCountData.push (0);
      }
    }
    formattedData.push (
      new createDataFormat (
        item,
        monthCountData,
        'rgba(255, 255, 255,' + itemCount * 0.3 + ')'
      )
    );
  }
  return formattedData;
};

export default chartData;

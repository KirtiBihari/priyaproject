import React from 'react';

const Tooltip = info => {
  if (Object.keys(info.tdata).length > 0) {
    return <div>{info.tdata.text}</div>;
  }
  return null;
};

export default Tooltip;

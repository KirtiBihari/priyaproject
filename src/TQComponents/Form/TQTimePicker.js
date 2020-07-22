import React from 'react';

import TimePicker from '../TimePicker/TimePicker';
const TQTimePicker = props => {
  return (
    <div
      className={
        props.property.validationMessage === '' ? 'is-valid' : 'is-invalid'
      }
    >
      <TimePicker
        id={props.property.id}
        label={props.property.label}
        getValue={props.getvalue}
        value={props.property.value}
        {...props}
      />
      <div className="invalid-feedback">{props.validationMessage}</div>
    </div>
  );
};

export default TQTimePicker;
export { TQTimePicker };

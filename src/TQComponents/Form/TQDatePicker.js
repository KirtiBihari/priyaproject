import React from 'react';
import DatePicker from '../DatePicker/DatePicker';
const TQDatePicker = props => {
  return (
    <div
      className={
        props.property.validationMessage === '' ? 'is-valid' : 'is-invalid'
      }
    >
      <DatePicker
        label={props.property.label}
        id={props.property.id}
        value={props.property.value}
        getValue={props.getvalue}
        {...props}
      />
      <div className="invalid-feedback">{props.property.validationMessage}</div>
    </div>
  );
};

export default TQDatePicker;
export { TQDatePicker };

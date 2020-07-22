import React from 'react';
import { MDBAutocomplete } from 'mdbreact';
const TQAutoComplete = props => {
  return (
    <div
      className={
        props.property.validationMessage === '' ? 'is-valid' : 'is-invalid'
      }
    >
      <MDBAutocomplete
        data={props.data}
        label={props.property.label}
        clear
        clearClass="grey-text"
        id={props.property.id}
        className="mx-auto"
        getValue={props.getvalue}
        {...props}
      />
      <div className="invalid-feedback">{props.property.validationMessage}</div>
    </div>
  );
};

export default TQAutoComplete;
export { TQAutoComplete };

import React from 'react';
import {MDBInput} from 'mdbreact';
const TQInput = props => {
  return (
    <div
      className={
        props.property.validationMessage === '' ? 'is-valid' : 'is-invalid'
      }
    >
      <MDBInput
        label={props.property.label}
        id={props.property.id}
        value={props.property.value}
        {...props}
        className={props.property.validationMessage === '' ? '' : 'is-invalid'}
      >
        {' '}
      </MDBInput>
      <div className="invalid-feedback">{props.property.validationMessage}</div>
    </div>
  );
};

export default TQInput;
export {TQInput};

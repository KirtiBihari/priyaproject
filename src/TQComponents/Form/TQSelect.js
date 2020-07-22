import React from 'react';
import { MDBSelect } from 'mdbreact';
const TQSelect = props => {
  let options=props.property.options;
  const getSelected=()=>{
    let selectedOption="Choose your option";
    if(props.property.selected){
       let opt= options.find(option=>(
        option.value===props.property.selected
       ));
       selectedOption=opt.text;
    }
    return selectedOption;
   
  }
  return (
    <div
      className={
        props.property.validationMessage === '' ? 'is-valid' : 'is-invalid'
      }
    >
      <MDBSelect
        id={props.property.id}
        selected={getSelected()}
        options={props.property.options}
        className="select"
        {...props}
      />

      <label>{props.property.label}</label>
      <div className="invalid-feedback">{props.property.validationMessage}</div>
    </div>
  );
};

export default TQSelect;
export { TQSelect };

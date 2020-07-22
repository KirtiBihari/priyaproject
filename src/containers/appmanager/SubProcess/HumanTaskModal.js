import React, {useState,useEffect} from 'react';
import {
  MDBBtn,
  MDBAnimation,
  MDBIcon,
} from 'mdbreact';
import ProcessFormsList
  from '../../../containers/appmanager/Process/ProcessFormsList';
import AddProcessForms
  from '../../../containers/appmanager/Process/AddProcessForms';
const HumanTaskModal = (props) => {
  const [addForm, setAddForm] = useState (false);
  const [editForm, setEditForm] = useState ('');

  const toggleAddForm = item => {
    setAddForm (!addForm);
    if(Object.keys (item).length>0){
      setEditForm (item._id);
    }else{
      setEditForm ('');
    }
    if(!addForm){
      props.setHeader('Add SubProcess Form ')
    }
    
  };
  if(!addForm){
    props.setHeader('SubProcessForm List')
  }
   
  

  return (
 
     <>
    
        {addForm
          ? <MDBAnimation type="slideInUp">
              <AddProcessForms toggleAddForm={toggleAddForm} formid={editForm} />
            </MDBAnimation>
          :(
          <React.Fragment>
             <div className="d-flex justify-content-end"><MDBBtn
            tag="a"
            floating
            color="red"
            size="sm"
            onClick={()=>props.taskToggle('')}
          >
            <MDBIcon icon="arrow-left" />
          </MDBBtn></div>
          <div><ProcessFormsList toggleAddForm={toggleAddForm} setAttachProcessForm ={props.setAttachProcessForm } /></div></React.Fragment>)
        } 
 </>
  );
};

export default HumanTaskModal;

import React, {useState} from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBAnimation,
} from 'mdbreact';
import ProcessFormsList
  from '../../../containers/appmanager/Process/ProcessFormsList';
import AddProcessForms
  from '../../../containers/appmanager/Process/AddProcessForms';
const UserTaskModal = ({modal, toggle,setAttachProcessForm}) => {
  const [addForm, setAddForm] = useState (false);
  const [editForm, setEditForm] = useState ('');

  const toggleAddForm = item => {
    setAddForm (!addForm);
    if(Object.keys (item).length>0){
      setEditForm (item._id);
    }else{
      setEditForm ('');
    }
    
  };

  return (
    <MDBModal
      isOpen={modal}
      toggle={toggle}
      size="xl"
      fullHeight
      position="right"
    >
      <MDBModalHeader toggle={toggle}>{addForm ?'Add/Edit Task':'User Task List'}</MDBModalHeader>
      <MDBModalBody>
        {addForm
          ? <MDBAnimation type="slideInUp">
              <AddProcessForms toggleAddForm={toggleAddForm} formid={editForm}/>
            </MDBAnimation>
          :<ProcessFormsList toggleAddForm={toggleAddForm} setAttachProcessForm={setAttachProcessForm} toggle={toggle}/>
        } 
      </MDBModalBody>
      
    </MDBModal>
  );
};

export default UserTaskModal;

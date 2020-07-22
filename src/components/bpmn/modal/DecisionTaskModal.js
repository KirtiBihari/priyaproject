import React, {useState} from 'react';
import {MDBModal, MDBModalBody, MDBModalHeader, MDBAnimation} from 'mdbreact';
import AddRules from '../../../containers/appmanager/Rules/AddRules';
import RulesList from '../../../containers/appmanager/Rules/RulesList';
const DecisionTaskModal = ({modal, toggle, setAttachRules}) => {
  const [addForm, setAddForm] = useState (false);
  const [editForm, setEditForm] = useState ('');
  const toggleAddRules = item => {
    setAddForm (!addForm);
    if (Object.keys (item).length > 0) {
      setEditForm (item._id);
    } else {
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
      <MDBModalHeader toggle={toggle}>
        {addForm ? 'Add/Edit Decision Task' : 'Decision Task List'}
      </MDBModalHeader>
      <MDBModalBody>
        {addForm
          ? <MDBAnimation type="slideInUp">
              <AddRules toggleAddRules={toggleAddRules} rulesid={editForm} />
            </MDBAnimation>
          : <RulesList
              toggleAddRules={toggleAddRules}
              taskToggle={toggle}
              attachRules={setAttachRules}
            />}
      </MDBModalBody>

    </MDBModal>
  );
};

export default DecisionTaskModal;

import React, {useState} from 'react';
import {MDBAnimation, MDBBtn, MDBIcon} from 'mdbreact';
import AddRules from '../Rules/AddRules';
import RulesList from '../Rules/RulesList';

const DecisionTaskModal = props => {
  const [addForm, setAddForm] = useState (false);
  const [editForm, setEditForm] = useState ('');

  const toggleAddRules = item => {
    setAddForm (!addForm);
    if (Object.keys (item).length > 0) {
      setEditForm (item.id);
    } else {
      setEditForm ('');
    }
    if (!addForm) {
      props.setHeader ('Add Rules');
    }
  };
  if (!addForm) {
    props.setHeader ('Rules List');
  }
  return (
    <React.Fragment>
      {addForm
        ? <MDBAnimation type="slideInUp">
            <AddRules toggleAddRules={toggleAddRules} rulesid={editForm} />
          </MDBAnimation>
        : <React.Fragment>
            <div className="d-flex justify-content-end">
              <MDBBtn
                tag="a"
                floating
                color="red"
                size="sm"
                onClick={() => props.taskToggle ('')}
              >
                <MDBIcon icon="arrow-left" />
              </MDBBtn>
            </div>
            <div>
              <RulesList
                toggleAddRules={toggleAddRules}
                taskToggle={props.taskToggle}
                attachRules={props.attachRules}
              />
            </div>
          </React.Fragment>}

    </React.Fragment>
  );
};

export default DecisionTaskModal;

import React from 'react';
import {  MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
const ScriptTaskModal = ({modal,toggle}) => {
    return (
        <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Decision Task List</MDBModalHeader>
        <MDBModalBody>
          
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
};

export default ScriptTaskModal;
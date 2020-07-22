import React from 'react';
import {  MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
const ServiceModal = ({modal,toggle}) => {
    return (
        <MDBModal isOpen={modal} toggle={toggle}>
        <MDBModalHeader toggle={toggle}>Select Service</MDBModalHeader>
        <MDBModalBody>
          (...)
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggle}>Close</MDBBtn>
          <MDBBtn color="primary">Save changes</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    );
};

export default ServiceModal;
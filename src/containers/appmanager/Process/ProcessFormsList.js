import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {TQDataTable} from '../../../TQComponents';
import {ToastContainer, toast} from 'mdbreact';
import {
  MDBIcon,
  MDBBtn,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBDropdownMenu,
} from 'mdbreact';
import * as actions from '../../../store/actions';
const ProcessFormsList = ({
  processFormList,
  getProcessFormList,
  toggleAddForm,
  deleteProcessFormProcess,
  setAttachProcessForm,
  toggle,
}) => {
  useEffect (
    () => {
      getProcessFormList ();
    },
    [getProcessFormList]
  );
  const [selectedId, setSelectedId] = useState ('');
  const [deleteModal, setDeleteModal] = useState (false);
  const onDeleteHandler = item => {
    setSelectedId (item._id);
    toggleDeleteModal ();
  };

  const toggleDeleteModal = () => {
    setDeleteModal (!deleteModal);
  };

  const deleteProcessForm = () => {
    const data = {
      _id: selectedId,
    };
    deleteProcessFormProcess (data, status => {
      if (status === 'OK') {
        toast.success ('Process Form Deleted Sucessfully', {
          position: 'top-right',
        });
        toggleDeleteModal ();
      }
    });
  };

  const assembleProcessForms = () => {
    let processes = null;
    if (processFormList) {
      processes = processFormList.map (item => {
        return {
          formId: item.title,
          action: (
            <MDBDropdown size="sm">
              <MDBDropdownToggle floating tag="a" color="primary">
                <MDBIcon icon="fas fa-ellipsis-v" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="fixed-top" basic z-index="10">
                <MDBDropdownItem onClick={() => toggleAddForm (item)}>
                  <MDBIcon icon="edit" className="mr-2" />
                  Edit
                </MDBDropdownItem>

                <MDBDropdownItem onClick={() => onDeleteHandler (item)}>
                  <MDBIcon icon="trash" className="mr-2" />
                  Delete
                </MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem
                  onClick={() => {
                    setAttachProcessForm (item);
                  }}
                >
                  <MDBIcon icon="paperclip" className="mr-2" />
                  Attach
                </MDBDropdownItem>
              </MDBDropdownMenu>

            </MDBDropdown>
          ),
        };
      });
    }
    return processes;
  };
  const renderProcesses = () => {
    let processData = {
      columns: [
        {
          label: 'Form Title',
          field: 'formId',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 50,
        },
      ],
      rows: assembleProcessForms (),
    };
    return processData;
  };

  return (
    <div>
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
      />
      <div className="d-flex justify-content-end">
        <MDBBtn
          color="info"
          className="btn-add"
          onClick={() => toggleAddForm ('')}
        >
          <MDBIcon icon="plus mr-2" />Add
        </MDBBtn>
      </div>
      <TQDataTable striped bordered hover data={renderProcesses ()} />
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal} size="md">
        <ModalHeader toggle={toggleDeleteModal}>Delete Form</ModalHeader>
        <ModalBody>
          <h5>Are you sure to delete this record?</h5>
        </ModalBody>
        <ModalFooter>
          <MDBBtn color="primary" onClick={deleteProcessForm}>Yes</MDBBtn>
          <MDBBtn color="primary" onClick={toggleDeleteModal}>
            No
          </MDBBtn>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
};
const mapStateToProps = state => ({
  error: state.processform.error,
  loading: state.processform.loading,
  processFormList: state.processform.processFormList,
});

const mapDispatchToProps = dispatch => ({
  getProcessFormList: () => dispatch (actions.processFormListProcess ()),
  deleteProcessFormProcess: (data, cb) =>
    dispatch (actions.processFormDelProcess (data, cb)),
});

export default connect (mapStateToProps, mapDispatchToProps) (ProcessFormsList);

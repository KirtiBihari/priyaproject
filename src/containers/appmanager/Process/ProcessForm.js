import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {TQDataTable} from '../../../TQComponents';
import {
  ToastContainer,
  toast,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  MDBBtn,
} from 'mdbreact';
import {
  MDBCardBody,
  MDBIcon,
  MDBCard,
  MDBCol,
  MDBRow,
  MDBContainer,
} from 'mdbreact';
import * as actions from '../../../store/actions';

const ProcessForm = ({
  getProcessFormList,
  deleteProcessFormProcess,
  processFormList,
}) => {
  let history = useHistory ();
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
  const navigateToEdit = item => {
    history.push ('/appmanager/formslist/' + item._id);
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
                <MDBDropdownItem onClick={() => navigateToEdit (item)}>
                  <MDBIcon icon="edit" className="mr-2" />
                  Edit
                </MDBDropdownItem>

                <MDBDropdownItem onClick={() => onDeleteHandler (item)}>
                  <MDBIcon icon="trash" className="mr-2" />
                  Delete
                </MDBDropdownItem>

                {/* <>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem
                      onClick={() => {
                        setAttachProcessForm (item);
                      }}
                    >
                      <MDBIcon icon="paperclip" className="mr-2" />
                      Attach
                    </MDBDropdownItem>
                    </>
                  : null} */}
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
    <div id="profile-v1" className="mt-2">
      <MDBContainer fluid className="mb-5">
        <section className="section team-section mb-5">
          <MDBRow center className="">

            <MDBCol md="12" className="">
              <MDBCard cascade className="cascading-admin-card user-card">
                <div className="admin-up d-flex justify-content-start">
                  <MDBIcon icon="cog" className="icon-color py-4 " />
                  {' '}
                  <div className="data">
                    <h5 className="font-weight-bold dark-grey-text">
                      Process Form{' '}
                    </h5>
                  </div>
                </div>
                <MDBCardBody>
                  <TQDataTable
                    striped
                    bordered
                    hover
                    data={renderProcesses ()}
                  />
                  <Modal
                    isOpen={deleteModal}
                    toggle={toggleDeleteModal}
                    size="md"
                  >
                    <ModalHeader toggle={toggleDeleteModal}>
                      Delete Form
                    </ModalHeader>
                    <ModalBody>
                      <h5>Are you sure to delete this record?</h5>
                    </ModalBody>
                    <ModalFooter>
                      <MDBBtn color="primary" onClick={deleteProcessForm}>
                        Yes
                      </MDBBtn>
                      <MDBBtn color="primary" onClick={toggleDeleteModal}>
                        No
                      </MDBBtn>{' '}
                    </ModalFooter>
                  </Modal>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </section>
      </MDBContainer>
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

export default connect (mapStateToProps, mapDispatchToProps) (ProcessForm);

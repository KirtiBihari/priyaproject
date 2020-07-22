import React, {Component} from 'react';

import {ToastContainer, toast} from 'mdbreact';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import Loader from '../../../components/Loader/Loader';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  MDBCardBody,
  MDBDropdown,
  MDBBtn,
  MDBContainer,
  MDBIcon,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';
import {TQDataTable} from '../../../TQComponents';

class ProcessList extends Component {
  state = {
    data: [],
    processData: [],
    selectedId: '',
    loading: true,
    username: localStorage.getItem ('userId'),
  };

  assembleProcesses = () => {
    let processes = this.props.processList.map (item => {
      return {
        processId: item.procdefid,
        processName: item.name,

        action: (
          <MDBDropdown size="sm">
            <MDBDropdownToggle floating tag="a" color="primary">
              <MDBIcon icon="fas fa-ellipsis-v" />
            </MDBDropdownToggle>

            <MDBDropdownMenu className="fixed-top" basic z-index="10">
              <MDBDropdownItem onClick={() => this.onEditHandler (item)}>
                <MDBIcon icon="edit" className="mr-2" />
                Edit App
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => this.onDeleteHandler (item)}>
                <MDBIcon icon="trash" className="mr-2" />
                Delete App
              </MDBDropdownItem>
              <MDBDropdownItem divider />

              <MDBDropdownItem
                onClick={() => this.onCreateDeploymentHandler (item)}
              >
                <MDBIcon icon="edit" className="mr-2" />
                Deploy App
              </MDBDropdownItem>
              <MDBDropdownItem
                onClick={() => this.onDeleteDeploymentHandler (item)}
              >
                <MDBIcon icon="trash" className="mr-2" />
                Delete Deployment
              </MDBDropdownItem>
              {/* <MDBDropdownItem onClick={() => this.onFormHandler (item)}>
                <MDBIcon icon="cog" className="mr-2" />
                Configure Forms
              </MDBDropdownItem> */}
            </MDBDropdownMenu>
          </MDBDropdown>
        ),
      };
    });
    return processes;
  };

  toggleDeleteModal = () => {
    this.setState ({deleteModal: !this.state.deleteModal});
  };

  toggleCreateDeploymentModal = () => {
    this.setState ({createDeploymentModal: !this.state.createDeploymentModal});
  };

  toggleDeleteDeploymentModal = () => {
    this.setState ({deleteDeploymentModal: !this.state.deleteDeploymentModal});
  };

  onEditHandler = item => {
    this.props.history.push (`/appmanager/addprocess/${item.id}`);
  };

  onFormHandler = item => {
    this.props.history.push (
      `/appmanager/processlist/processformslist/${item.id}`
    );
  };

  onCreateDeploymentHandler = item => {
    this.setState ({selectedId: item.id});
    this.toggleCreateDeploymentModal ();
  };

  onDeleteDeploymentHandler = item => {
    this.setState ({selectedId: item.id});
    this.toggleDeleteDeploymentModal ();
  };

  onDeleteHandler = item => {
    console.log ('OPEN MODAL PROCESS - DELETE MODE');
    this.setState ({selectedId: item.id});
    this.toggleDeleteModal ();
  };

  createRequest = () => {
    let body = {
      id: this.state.selectedId,
      modifiedBy: this.state.username,
    };
    return body;
  };

  deleteProcess = async () => {
    this.toggleDeleteModal ();
    let requestObj = this.createRequest ();

    this.props.deleteProcess (requestObj);
  };

  createDeploymentRequest = () => {
    let body = {
      id: this.state.selectedId,
    };
    return body;
  };

  createDeployment = () => {
    this.toggleCreateDeploymentModal ();
    let requestObj = this.createDeploymentRequest ();

    this.props.processDeploy (requestObj, () => {
      if (this.props.status !== 'OK') {
        toast.error ('Please check your input and try again', {
          position: 'top-right',
        });
      } else {
        toast.success ('Process Deployed Sucessfully', {
          position: 'top-right',
        });
      }
    });
    this.props.getProcessList ();
  };

  deleteDeploymentRequest = () => {
    let body = {
      id: this.state.selectedId,
      modifiedBy: this.state.username,
    };
    return body;
  };

  deleteDeployment = async () => {
    this.setState ({loading: true});
    this.toggleDeleteDeploymentModal ();
    let requestObj = this.deleteDeploymentRequest ();
    this.props.processDeployDelete (requestObj, () => {
      if (this.props.status !== 'OK') {
        console.log ('error');
        toast.error ('Please check your input and try again', {
          position: 'top-right',
        });
        this.setState ({loading: false});
      } else {
        console.log ('sucesss');
        toast.success ('Deployment Deleted Sucessfully', {
          position: 'top-right',
        });
        this.setState ({loading: false});
      }
      this.props.getProcessList ();
    });
  };

  componentDidMount () {
    this.props.getProcessList ();
  }
  componentDidUpdate (prevProps) {
    if (prevProps.status !== this.props.status) {
      if (this.props.status && this.props.status !== 'OK') {
        toast.error ('Please check your input and try again', {
          position: 'top-right',
        });
      } else if (this.props.status && this.props.status === 'OK') {
        toast.success ('Process Deleted Sucessfully', {
          position: 'top-right',
        });
        this.props.resetProcess ();
        this.props.getProcessList ();
      }
    }
  }
  componentWillUnmount () {
    this.props.resetProcess ();
  }

  renderProcesses = () => {
    let processData = {
      columns: [
        {
          label: 'App ID',
          field: 'processId',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'App Name',
          field: 'processName',
          sort: 'asc',
          width: 250,
        },

        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 50,
        },
      ],
      rows: this.assembleProcesses (),
    };
    return processData;
  };
  render () {
    return (
      <div>
        <Loader load={this.props.loading} />
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
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
                          App List{' '}
                        </h5>
                      </div>
                    </div>
                    <MDBCardBody>
                      <TQDataTable
                        striped
                        bordered
                        hover
                        data={this.renderProcesses ()}
                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </section>
          </MDBContainer>
          <Modal isOpen={this.state.deleteModal} toggle={this.toggle} size="md">
            <ModalHeader toggle={this.toggle}>Delete Process</ModalHeader>
            <ModalBody>
              <h5>Are you sure to delete this record?</h5>
            </ModalBody>
            <ModalFooter>
              <MDBBtn color="primary" onClick={this.deleteProcess}>Yes</MDBBtn>
              <MDBBtn color="primary" onClick={this.toggleDeleteModal}>
                No
              </MDBBtn>{' '}
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={this.state.createDeploymentModal}
            toggle={this.toggle}
            size="md"
          >
            <ModalHeader toggle={this.toggle}>Deploy Process</ModalHeader>
            <ModalBody>
              <h5>Are you sure to deloy this process?</h5>
            </ModalBody>
            <ModalFooter>
              <MDBBtn color="primary" onClick={this.createDeployment}>
                Yes
              </MDBBtn>
              <MDBBtn
                color="primary"
                onClick={this.toggleCreateDeploymentModal}
              >
                No
              </MDBBtn>{' '}
            </ModalFooter>
          </Modal>
          <Modal
            isOpen={this.state.deleteDeploymentModal}
            toggle={this.toggle}
            size="md"
          >
            <ModalHeader toggle={this.toggle}>Delete Deployment</ModalHeader>
            <ModalBody>
              <h5>Are you sure to delete this deployment?</h5>
            </ModalBody>
            <ModalFooter>
              <MDBBtn color="primary" onClick={this.deleteDeployment}>
                Yes
              </MDBBtn>
              <MDBBtn
                color="primary"
                onClick={this.toggleDeleteDeploymentModal}
              >
                No
              </MDBBtn>{' '}
            </ModalFooter>
          </Modal>

        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.process.loading,
  processList: state.process.processList,
  status: state.process.status,
});

const mapDispatchToProps = dispatch => {
  return {
    getProcessList: () => dispatch (actions.processListProcess ()),
    deleteProcess: data => dispatch (actions.processDelProcess (data)),
    processDeploy: data => dispatch (actions.processDeployProcess (data)),
    processDeployDelete: data =>
      dispatch (actions.processDeployDelProcess (data)),
    resetProcess: () => dispatch (actions.processReset ()),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (ProcessList);

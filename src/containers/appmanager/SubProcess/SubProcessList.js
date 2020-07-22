import React, {Component} from 'react';

import {ToastContainer, toast} from 'mdbreact';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import Loader from '../../../components/Loader/Loader';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  MDBDropdown,
  MDBBtn,
  MDBIcon,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';
import {TQDataTable} from '../../../TQComponents';

class SubProcessList extends Component {
  state = {
    data: [],
    processData: [],
    selectedId: '',
    loading: true,
    username: localStorage.getItem ('userId'),
  };

  assembleSubProcesses = () => {
    if (this.props.subProcessList.length > 0) {
      let processes = this.props.subProcessList.map (item => {
        return {
          subProcessId: item.subProcDefId,
          subProcessName: item.name,

          action: (
            <MDBDropdown size="sm">
              <MDBDropdownToggle floating tag="a" color="primary">
                <MDBIcon icon="fas fa-ellipsis-v" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="fixed-top" basic z-index="10">

                <MDBDropdownItem
                  onClick={() => this.props.toggleAddSubProcess (item)}
                >
                  <MDBIcon icon="edit" className="mr-2" />
                  Edit
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => this.onDeleteHandler (item)}>
                  <MDBIcon icon="trash" className="mr-2" />
                  Delete
                </MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem
                  onClick={() => this.props.setAttachSubProcessForm (item)}
                >
                  <MDBIcon icon="trash" className="mr-2" />
                  Attach SubProcess
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          ),
        };
      });
      return processes;
    }
  };

  toggleModal = () => {
    this.setState ({modal: !this.state.modal});
  };

  onDeleteHandler = item => {
    console.log ('OPEN MODAL PROCESS - DELETE MODE');
    this.setState ({selectedId: item.id});
    this.toggleModal ();
  };

  createRequest = () => {
    let body = {
      id: this.state.selectedId,
      modifiedBy: this.state.username,
    };
    return body;
  };

  deleteSubProcess = async () => {
    this.setState ({loading: true});
    this.toggleModal ();
    let requestObj = this.createRequest ();
    this.props.deleteSubProcess (requestObj, () => {
      if (this.props.status !== 'OK') {
        toast.error ('Please check your input and try again', {
          position: 'top-right',
        });
      } else {
        toast.success ('Sub-Process Deleted Sucessfully', {
          position: 'top-right',
        });
      }
    });

    this.props.getSubProcessList ();
  };
  componentDidMount = () => {
    this.props.getSubProcessList ();
  };

  renderSubProcesses = () => {
    let subProcessData = {
      columns: [
        {
          label: 'Sub-Process ID',
          field: 'subProcessId',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Sub-Process Name',
          field: 'subProcessName',
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
      rows: this.props.subProcessList ? this.assembleSubProcesses () : null,
    };
    return subProcessData;
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
        <div className="d-flex justify-content-end">
          <MDBBtn
            color="info"
            className="btn-add"
            onClick={() => this.props.toggleAddSubProcess ('')}
          >
            <MDBIcon icon="plus mr-2" />Add
          </MDBBtn>
        </div>
        <TQDataTable striped bordered hover data={this.renderSubProcesses ()} />
        <div id="profile-v1" className="mt-2">
          <Modal isOpen={this.state.modal} toggle={this.toggle} size="md">
            <ModalHeader toggle={this.toggle}>Delete Sub-Process</ModalHeader>
            <ModalBody>
              <h5>Are you sure to delete this record?</h5>
            </ModalBody>
            <ModalFooter>
              <MDBBtn color="primary" onClick={this.deleteSubProcess}>
                Yes
              </MDBBtn>
              <MDBBtn color="primary" onClick={this.toggleModal}>No</MDBBtn>
              {' '}
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.subprocess.loading,
  subProcessList: state.subprocess.subProcessList,
  status: state.subprocess.status,
});

const mapDispatchToProps = dispatch => {
  return {
    getSubProcessList: () => dispatch (actions.subprocessListProcess ()),
    deleteSubProcess: (data, cb) =>
      dispatch (actions.subprocessDelProcess (data, cb)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (SubProcessList);

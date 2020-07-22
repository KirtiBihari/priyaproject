import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'mdbreact';
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
class RulesList extends Component {
  state = {
    data: [],
    processData: [],
    selectedId: '',
    loading: true,
    username: localStorage.getItem ('userId'),
    modal: false,
  };
  onRulesDeleteHandler = item => {
    this.setState ({selectedId: item.id});
    this.toggleModal ();
  };
  toggleModal = () => {
    this.setState ({modal: !this.state.modal});
  };
  assembleRulesData = () => {
    if (this.props.rulesList.length > 0) {
      let processes = this.props.rulesList.map (item => {
        return {
          rulesId: item.ruledefId,
          rulesName: item.name,

          action: (
            <MDBDropdown size="sm">
              <MDBDropdownToggle floating tag="a" color="primary">
                <MDBIcon icon="fas fa-ellipsis-v" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="fixed-top" basic z-index="10">
                <MDBDropdownItem
                  onClick={() => this.props.toggleAddRules (item)}
                >
                  <MDBIcon icon="edit" className="mr-2" />
                  Edit
                </MDBDropdownItem>
                <MDBDropdownItem
                  onClick={() => this.onRulesDeleteHandler (item)}
                >
                  <MDBIcon icon="trash" className="mr-2" />
                  Delete
                </MDBDropdownItem>
                <MDBDropdownItem divider />
                <MDBDropdownItem onClick={() => this.props.attachRules (item)}>
                  <MDBIcon icon="trash" className="mr-2" />
                  Attach Rules
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          ),
        };
      });
      return processes;
    }
  };

  componentDidMount = () => {
    this.props.getRulesList ();
  };
  renderRulesList = () => {
    let rulesData = {
      columns: [
        {
          label: 'Rules ID',
          field: 'rulesId',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Rules Name',
          field: 'rulesName',
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
      rows: this.props.rulesList ? this.assembleRulesData () : null,
    };
    return rulesData;
  };
  createRequest = () => {
    let body = {
      id: this.state.selectedId,
      modifiedBy: this.state.username,
    };
    return body;
  };

  deleteRulesHandler = () => {
    this.setState ({loading: true});
    this.toggleModal ();
    let requestObj = this.createRequest ();
    this.props.deleteRules (requestObj, status => {
      if (status !== 'OK') {
        toast.error ('Please check your input and try again', {
          position: 'top-right',
        });
      } else {
        toast.success ('Rules Deleted Sucessfully', {
          position: 'top-right',
        });
      }
    });

    this.props.getRulesList ();
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
            onClick={() => this.props.toggleAddRules ('')}
          >
            <MDBIcon icon="plus mr-2" />Add
          </MDBBtn>
        </div>
        <TQDataTable striped bordered hover data={this.renderRulesList ()} />
        <div id="profile-v1" className="mt-2">
          <Modal isOpen={this.state.modal} toggle={this.toggle} size="md">
            <ModalHeader toggle={this.toggle}>Delete Sub-Process</ModalHeader>
            <ModalBody>
              <h5>Are you sure to delete this record?</h5>
            </ModalBody>
            <ModalFooter>
              <MDBBtn color="primary" onClick={this.deleteRulesHandler}>
                Yes
              </MDBBtn>
              <MDBBtn color="primary" onClick={this.toggleModal}>No</MDBBtn>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  loading: state.rules.loading,
  rulesList: state.rules.rulesList,
  status: state.subprocess.status,
});

const mapDispatchToProps = dispatch => {
  return {
    getRulesList: () => dispatch (actions.rulesListProcess ()),
    deleteRules: (data, cb) => dispatch (actions.rulesDelProcess (data, cb)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (RulesList);

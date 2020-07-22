import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ToastContainer, toast} from 'mdbreact';

import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions';
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

class OrganizationList extends Component {
  state = {
    selectedId: '',
    selectedItem: {},
    username: localStorage.getItem ('userId'),
  };

  assembleOrgs = () => {
    let orgs = this.props.orgList.map (item => {
      return {
        orgId: item.id,
        orgName: item.name,
        action: (
          <MDBDropdown size="sm">
            <MDBDropdownToggle floating tag="a" color="primary">
              <MDBIcon icon="fas fa-ellipsis-v" />
            </MDBDropdownToggle>

            <MDBDropdownMenu className="fixed-top" basic z-index="10">
              <MDBDropdownItem onClick={() => this.onEditHandler (item)}>
                <MDBIcon icon="edit" className="mr-2" />
                Edit
              </MDBDropdownItem>
              <MDBDropdownItem onClick={() => this.onDeleteHandler (item)}>
                <MDBIcon icon="trash" className="mr-2" />
                Delete
              </MDBDropdownItem>
              <MDBDropdownItem divider />
            </MDBDropdownMenu>
          </MDBDropdown>
        ),
      };
    });
    return orgs;
  };

  toggleModal = () => {
    this.setState ({modal: !this.state.modal});
  };

  onEditHandler = item => {
    this.props.history.push (`/org/addOrg/${item.id}`);
  };

  onDeleteHandler = item => {
    this.setState ({selectedItem: item});
    this.toggleModal ();
  };

  deleteOrg = () => {
    this.toggleModal ();
    this.props.deleteOrg (this.state.selectedItem, () => {
      if (this.props.status !== 'OK') {
        toast.error ('Please check your input and try again', {
          position: 'top-right',
        });
      } else {
        toast.success ('Organization Deleted Sucessfully', {
          position: 'top-right',
        });
      }
      this.props.getOrgList ();
    });
  };

  componentDidMount () {
    this.props.getOrgList ();
  }
  renderOrgs = () => {
    let orgData = {
      columns: [
        {
          label: 'Organization ID',
          field: 'orgId',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Organization Name',
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
      rows: this.assembleOrgs (),
    };
    return orgData;
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

                <MDBCol className="">
                  <MDBCard cascade className="cascading-admin-card user-card">
                    <div className="admin-up d-flex justify-content-start">
                      <MDBIcon icon="building" className="icon-color py-4 " />
                      {' '}
                      <div className="data">
                        <h5 className="font-weight-bold dark-grey-text">
                          Organization List{' '}
                        </h5>
                      </div>
                    </div>
                    <MDBCardBody>
                      <TQDataTable
                        striped
                        bordered
                        hover
                        data={this.renderOrgs ()}
                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </section>
          </MDBContainer>
          <Modal isOpen={this.state.modal} toggle={this.toggle} size="md">
            <ModalHeader toggle={this.toggle}>Delete Organization</ModalHeader>
            <ModalBody>
              <h5>Are you sure to delete this record?</h5>
            </ModalBody>
            <ModalFooter>
              <MDBBtn color="primary" onClick={this.deleteOrg}>Yes</MDBBtn>
              <MDBBtn color="primary" onClick={this.toggleModal}>
                No
              </MDBBtn>{' '}

            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.org.loading,
    orgList: state.org.orgList,
    status: state.org.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrgList: () => dispatch (actions.orgListProcess ()),
    deleteOrg: (data, cb) => dispatch (actions.orgDelProcess (data, cb)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (OrganizationList);

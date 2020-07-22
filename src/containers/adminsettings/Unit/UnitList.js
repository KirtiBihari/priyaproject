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

class UnitList extends Component {
  state = {
    data: [],
    unitData: [],
    selectedId: '',
    loading: true,
    username: localStorage.getItem ('userId'),
  };

  assembleUnits = () => {
    let units = this.props.unitList.map (item => {
      return {
        unitId: item.unitId,
        unitName: item.name,
        orgName: item.org.name,
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
    return units;
  };

  toggleModal = () => {
    this.setState ({modal: !this.state.modal});
  };

  onEditHandler = item => {
    this.props.history.push (`/org/addunit/${item.id}`);
  };

  onDeleteHandler = item => {
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

  deleteUnit = async () => {
    this.setState ({loading: true});
    this.toggleModal ();
    let requestObj = this.createRequest ();
    this.props.deleteUnit (requestObj, () => {
      if (this.props.status !== 'OK') {
        toast.error ('Please check your input and try again', {
          position: 'top-right',
        });
      } else {
        toast.success ('Function Deleted Sucessfully', {
          position: 'top-right',
        });
      }
      this.props.getUnitList ();
    });
  };

  componentDidMount () {
    this.props.getUnitList ();
  }

  renderUnits = () => {
    let unitData = {
      columns: [
        {
          label: 'Function ID',
          field: 'unitId',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Function Name',
          field: 'unitName',
          sort: 'asc',
          width: 250,
        },
        {
          label: 'Organization',
          field: 'orgName',
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
      rows: this.assembleUnits (),
    };
    return unitData;
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
                      <MDBIcon icon="sitemap" className="icon-color py-4 " />
                      {' '}
                      <div className="data">
                        <h5 className="font-weight-bold dark-grey-text">
                          Function List{' '}
                        </h5>
                      </div>
                    </div>
                    <MDBCardBody>
                      <TQDataTable
                        striped
                        bordered
                        hover
                        data={this.renderUnits ()}
                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </section>
          </MDBContainer>
          <Modal isOpen={this.state.modal} toggle={this.toggle} size="md">
            <ModalHeader toggle={this.toggle}>Delete Function</ModalHeader>
            <ModalBody>
              <h5>Are you sure to delete this record?</h5>
            </ModalBody>
            <ModalFooter>
              <MDBBtn color="primary" onClick={this.deleteUnit}>Yes</MDBBtn>
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
const mapStateToProps = state => ({
  loading: state.unit.loading,
  unitList: state.unit.unitList,
  status: state.unit.status,
});

const mapDispatchToProps = dispatch => {
  return {
    getUnitList: () => dispatch (actions.unitListProcess ()),
    deleteUnit: (data, cb) => dispatch (actions.unitDelProcess (data, cb)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (UnitList);

import React, {Component} from 'react';

import {ToastContainer, toast} from 'mdbreact';
import {connect} from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import * as actions from '../../../store/actions';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBBtn,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  MDBCardBody,
  MDBDropdown,
  MDBContainer,
  MDBIcon,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';
import {TQDataTable} from '../../../TQComponents';

class EntityList extends Component {
  state = {
    data: [],
    entityData: [],
    selectedId: '',
    username: localStorage.getItem ('userId'),
  };

  assembleEntities = () => {
    let entities = this.props.entityList.map (item => {
      return {
        entityId: item.entityId,
        entityName: item.name,
        unitName: item.unit.name,
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
    return entities;
  };

  toggleModal = () => {
    this.setState ({modal: !this.state.modal});
  };

  onEditHandler = item => {
    this.props.history.push (`/org/addEntity/${item.id}`);
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

  deleteEntity = () => {
    this.setState ({loading: true});
    this.toggleModal ();
    let requestObj = this.createRequest ();
    this.props.deleteEntity (requestObj, () => {
      if (this.props.status !== 'OK') {
        toast.error ('Please check your input and try again', {
          position: 'top-right',
        });
      } else {
        toast.success ('Line Of Business Deleted Sucessfully', {
          position: 'top-right',
        });
      }
      this.props.getEntityList ();
    });
  };

  // getEntitiesList = async () => {
  //   console.log('GET ENTITY LISTTTTTTTTT');
  //   let response = await API.get('opsv3', `/entities`);
  //   this.setState({ data: response });
  // };

  componentDidMount () {
    this.props.getEntityList ();
  }
  renderEntities = () => {
    let entityData = {
      columns: [
        {
          label: 'Line Of Business ID',
          field: 'entityId',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Line Of Business Name',
          field: 'entityName',
          sort: 'asc',
          width: 250,
        },
        {
          label: 'Function',
          field: 'unitName',
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
      rows: this.assembleEntities (),
    };
    return entityData;
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
                      <MDBIcon icon="briefcase" className="icon-color py-4 " />
                      {' '}
                      <div className="data">
                        <h5 className="font-weight-bold dark-grey-text">
                          Line Of Business List{' '}
                        </h5>
                      </div>
                    </div>
                    <MDBCardBody>
                      <TQDataTable
                        striped
                        bordered
                        hover
                        data={this.renderEntities ()}
                      />
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </section>
          </MDBContainer>
          <Modal isOpen={this.state.modal} toggle={this.toggle} size="md">
            <ModalHeader toggle={this.toggle}>
              Delete Line Of Business
            </ModalHeader>
            <ModalBody>
              <h5>Are you sure to delete this record?</h5>
            </ModalBody>
            <ModalFooter>
              <MDBBtn color="primary" onClick={this.deleteEntity}>Yes</MDBBtn>
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
    loading: state.entity.loading,
    entityList: state.entity.entityList,
    status: state.entity.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getEntityList: () => dispatch (actions.entityListProcess ()),
    deleteEntity: (data, cb) => dispatch (actions.entityDelProcess (data, cb)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (EntityList);

// import React, { Component } from 'react';
// import { API, Auth } from 'aws-amplify';
// import { ToastContainer, toast } from 'mdbreact';
// import {connect} from 'react-redux';
// import * as actions from '../../../store/actions';
// import Loader from '../../../components/Loader/Loader';
// import {
//   MDBRow,
//   MDBCardTitle,
//   MDBCardText,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBDropdown,
//   MDBContainer,
//   MDBIcon,
//   MDBDropdownToggle,
//   MDBDropdownMenu,
//   MDBDropdownItem
// } from 'mdbreact';
// import { TQDataTable } from '../../../TQComponents';

// class SubProcessForms extends Component {
//   state = {
//     data: [],
//     processDetails: {},
//     entityDetails: {},
//     processData: [],
//     selectedId:'',
//     loading: true,
//     username: ''
//   };

//   assembleSubProcessForms = () => {
//     let processes = this.state.data.map(item => {
//       return {
//         stepId: item.id,
//         stepName: item.name,
//         formId: item.formId,
//         action: (
//           <MDBDropdown size="sm">
//             <MDBDropdownToggle floating tag="a" color="primary">
//               <MDBIcon icon="fas fa-ellipsis-v" />
//             </MDBDropdownToggle>
//             <MDBDropdownMenu className="fixed-top" basic z-index="10">
//               <MDBDropdownItem onClick={() => this.onEditHandler(item)}>
//                 <MDBIcon icon="edit" className="mr-2" />
//                 Edit
//               </MDBDropdownItem>
//               <MDBDropdownItem divider />
//             </MDBDropdownMenu>
//           </MDBDropdown>
//         )
//       };
//     });
//     return processes;
//   };

//   toggleModal = () => {
//     this.setState({ modal: !this.state.modal });
//   };

//   onEditHandler = item => {
//     console.log('REDIRECT TO ADD ENTITY - EDIT MODE');
//     this.props.history.push(`/settings/subprocesslist/subprocessformslist/addsubprocessforms/${item.id}/${this.state.processDetails.id}`);
//   };

//   onDeleteHandler = item => {
//     console.log('OPEN MODAL ENTITY - DELETE MODE');
//     this.setState({ selectedId: item.id });
//     this.toggleModal();
//   };

//   createRequest = () => {
//     let body = {
//       id: this.state.selectedId,
//       modifiedBy: this.state.username
//     };
//     return body;
//   };

//   getFormsBySubProcessId = async id => {
//     console.log('GET SUB PROCESS FORM LISTTTTTTTTT');
//     let response = await API.get('opsv3', `/subprocdefs/formdefs/${id}`);
//     this.setState({ data: response });
//   };

//   getSubProcessById = async id => {
//     console.log('GET SUB PROCESS BY IDDDDDDDDDDDDDDDD');
//     let response = await API.get('opsv3', `/subprocdefs/${id}`);
//     console.log("Responsee", response);
//     this.setState({ processDetails: response , entityDetails : response.entity });

//   };

//   componentWillMount = async () => {
//     console.log('COMPONENT WILL MOUNT');
//     this.setState({ loading: true });
//     await this.getSubProcessById(this.props.match.params.id);
//     await this.getFormsBySubProcessId(this.props.match.params.id);

//     const userId = localStorage.getItem('userId');
//     this.setState({username:userId});
//     this.setState({ loading: false });
//   };

//   renderSubProcesses = () => {
//     let processData = {
//       columns: [
//         {
//           label: 'Step ID',
//           field: 'stepId',
//           sort: 'asc',
//           width: 150
//         },
//         {
//           label: 'Step Name',
//           field: 'stepName',
//           sort: 'asc',
//           width: 150
//         },
//         {
//           label: 'Form ID',
//           field: 'formId',
//           sort: 'asc',
//           width: 150
//         },
//         {
//           label: 'Action',
//           field: 'action',
//           sort: 'asc',
//           width: 50
//         }
//       ],
//       rows: this.assembleSubProcessForms()
//     };
//     return processData;
//   };
//   render() {
//     console.log("logggggggddddd",this.state.processDetails);
//     return (
//       <div>
//         <Loader load={this.state.loading} />
//         <ToastContainer
//                         hideProgressBar={true}
//                         newestOnTop={true}
//                         autoClose={5000}
//                       />

//         <div id="profile-v1" className="mt-2">
//           <MDBContainer fluid className="mb-5">
//             <section className="section team-section mb-5">
//               <MDBRow center className="">
//                 <MDBCol md="2" />
//                 <MDBCol md="10" className="">
//                   <MDBCard cascade className="cascading-admin-card user-card">
//                     <div className="admin-up d-flex justify-content-start">
//                       <MDBIcon
//                         icon="briefcase"
//                         className="icon-color py-4 "
//                       />{' '}
//                       <div className="data">
//                         <h5 className="font-weight-bold dark-grey-text">
//                           Sub-Process Forms{' '}
//                         </h5>
//                       </div>
//                     </div>

//                     <MDBRow>
//                       <MDBCol md="12">
//                         <MDBContainer fluid className=" mt-3">
//                           <MDBCard className="card-body case-color">
//                             <MDBCardTitle className="">
//                               Sub-Process Details
//                             </MDBCardTitle>
//                             <MDBCardText>
//                               <div className="row ">
//                                 <div className="col-md-4">
//                                   <div className="label">Sub-Process ID</div>
//                                   <div className="value">{this.state.processDetails.id}</div>
//                                 </div>
//                                 <div className="col-md-4">
//                                   <div className="label">Sub-Process Name</div>
//                                   <div className="value">{this.state.processDetails.name}</div>
//                                 </div>
//                                 <div className="col-md-4">
//                                   <div className="label">Process Name</div>
//                                   <div className="value">{this.state.entityDetails.name}</div>
//                                 </div>
//                               </div>
//                             </MDBCardText>
//                           </MDBCard>
//                         </MDBContainer>
//                       </MDBCol>
//                     </MDBRow>
//                     <MDBCardBody>
//                       <TQDataTable
//                         striped
//                         bordered
//                         hover
//                         data={this.renderSubProcesses()}
//                       />
//                     </MDBCardBody>
//                   </MDBCard>
//                 </MDBCol>
//               </MDBRow>
//             </section>
//           </MDBContainer>
//         </div>
//       </div>
//     );
//   }
// }

// export default SubProcessForms;

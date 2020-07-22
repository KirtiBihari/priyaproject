// import React, { Component } from 'react';
// import { ToastContainer, toast } from 'mdbreact';
// import { API, Auth } from 'aws-amplify';
// import {connect} from 'react-redux';
// import * as actions from '../../../store/actions';
// import Loader from '../../../components/Loader/Loader';
// import { FormBuilder, Form } from 'react-formio';
// import checkValidity from '../../../widgets/Validation/Validation';
// import {
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBStepper,
//   MDBStep,
//   MDBContainer,
//   MDBIcon,
//   MDBBtn,
//   MDBCardTitle,
//   MDBCardText,
//   Progress
// } from 'mdbreact';
// import moment from 'moment';

// class AddProcessForms extends Component {
//   state = {
//     formActivePanel1: 1,
//     formActivePanel1Changed: false,
//     progress: 18,
//     checked: 'checked',
//     tab1: false,
//     tab2: false,
//     tab3: false,
//     form: { display: 'form' },
//     events: [
//       {
//         start: new Date(),
//         end: new Date(moment().add(1, 'days')),
//         title: 'Some title'
//       }
//     ],
//     formFields: {},
//     formIsValid: false,
//     loading: false,
//     username: '',
//     processDetails: {},
//     entityDetails: {},
//     data: {}
//   };

//   handleIntakeSchemaChange = schema => {
//     console.log('SCHEMAAAAAAA', schema);
//     this.setState( {form : schema });
//   };

//   getProcessById = async processId => {
//     console.log('GET PROCESS BY IDDDDDDDDDDDDDDDD');
//     let response = await API.get('opsv3', `/procdefs/${processId}`);
//     console.log("Responsee", response);
//     this.setState({ processDetails: response , entityDetails : response.entity });

//   };

//   getFormsByProcessIdTaskId = taskId => async processId => {
//     console.log('GET PROCESS FORM LISTTTTTTTTT');
//     let response = await API.get('opsv3', `/procdefs/formdefs/${taskId}/${processId}`);
//     console.log("DATAA", response[0]);
//     this.setState({ data: response[0] });
//   };

//   componentWillMount = async () => {
//     this.setState({ loading: true });
//     console.log("IDDDDDDDDDDDDDDDDD",this.props.match.params.id);
//     console.log("PROCESS IDDDDDDDDD",this.props.match.params.processId);
//     await this.getProcessById(this.props.match.params.processId);
//     await this.getFormsByProcessIdTaskId(this.props.match.params.id)(this.props.match.params.processId);
//     const userId = localStorage.getItem('userId');
//     this.setState({username:userId});
//     this.setState({ loading: false });
//   };

//   isOrgExists = async id => {
//     this.setState({ loading: true });
//     let response =  await API.get(
//       'opsv3',
//       `/orgs/exists/${id}`
//     );
//     // console.log('Data::::' + JSON.stringify(response));
//     this.setState({ loading: false });
//     return !response;
//   };
//   swapFormActive = a => param => async e => {
//     let valid = true;
//     if (valid) {
//       this.setState({
//         ['formActivePanel' + a]: param,
//         ['formActivePanel' + a + 'Changed']: true,
//         checked: 'checked'
//       });
//       switch (param) {
//         case 1:
//           this.setState({ tab1: true, progress: 18 });
//           break;
//         case 2:
//           this.setState({ tab2: true, progress: 48 });
//           break;
//         case 3:
//           this.setState({ tab3: true, progress: 82 });
//           break;
//         default:
//           break;
//       }
//     }
//   };

//   handleNextPrevClick =  a =>  param => async e => {
//     let valid = true;

//     if (valid) {
//       this.setState({
//         ['formActivePanel' + a]: param,
//         ['formActivePanel' + a + 'Changed']: true,
//         checked: 'checked'
//       });
//       switch (param) {
//         case 1:
//           this.setState({ tab1: true, progress: 18 });
//           break;
//         case 2:
//           this.setState({ tab2: true, progress: 48 });
//           break;
//         case 3:
//           this.setState({ tab3: true, progress: 82 });
//           break;
//         default:
//           break;
//       }
//     }
//   };
//   //Validation Logic
//   validateForm = (formState, formName) => {
//     let valid = true;
//     let validatedElements = checkValidity(formState);
//     this.setState({
//       [formName]: { ...validatedElements }
//     });
//     for (let element in validatedElements) {
//       if (validatedElements[element].valid === true) {
//         valid = valid && validatedElements[element].valid;
//       } else {
//         valid = false;
//       }
//     }
//     return valid;
//   };
//   // All input onChange event
//   handleChange = (evt, type) => {
//     let formElements = {};
//     let updatedFormElement = {};
//     switch (type) {
//       case 'add':
//         formElements = { ...this.state.formFields };
//         break;

//       case 'setting':
//         formElements = { ...this.state.orgSettingsFields };
//         break;
//       default:
//         break;
//     }
//     if (evt.target.id !== '') {
//       updatedFormElement = {
//         ...formElements[evt.currentTarget.id]
//       };
//       updatedFormElement.value = evt.target.value;

//       updatedFormElement.touched = true;
//       formElements[evt.target.id] = updatedFormElement;

//       if (type === 'add') {
//         this.setState({
//           formFields: formElements
//         });
//       } else if (type === 'setting') {
//         this.setState({
//           orgSettingsFields: formElements
//         });
//       }
//     }
//   };

//   createRequest = () => {
//     let body = {
//       procdefExtnId: this.state.processDetails.id,
//       procTaskId: this.state.data.id,
//       procTaskName: this.state.data.name,
//       formId: this.state.data.formId,
//       createdBy: this.state.username,
//       form: this.state.form,
//       status: true
//     };
//     return body;
//   };

//   handleSubmission = async e => {
//     e.preventDefault();
//     let valid=true;
//     if (valid) {
//       this.setState({ loading: true });
//       console.log('ADDING ORG');
//       let requestObj = this.createRequest();
//       const response = await API.post('opsv3', '/procdefs/formdefs/createProcFormDefs', {
//         body: requestObj
//       });
//       console.log('RESPONSE',response);
//       if (response.status !== 'OK') {
//         console.log('Error');
//         toast.error('Please check your input and try again', {
//           position: 'top-right'
//         });
//         this.setState({ loading: false });
//       } else {
//         console.log('Success');
//         toast.success('Process Form Added Sucessfully', {
//           position: 'top-right'
//         });
//         this.setState({ loading: false });
//         setTimeout(() => {
//           this.setState({ loading: false });
//           this.props.history.push(`/settings/processlist/processformslist/${this.state.processDetails.id}`);
//         }, 2000);
//       }
//     }
//   };

//   calculateAutofocus = a => {
//     if (this.state['formActivePanel' + a + 'Changed']) {
//       return true;
//     }
//   };

//   createSelectOptionList = opts => {
//     return opts.map(opt => {
//       return <option value={opt.value}>{opt.label}</option>;
//     });
//   };
//   render() {
//     return (
//       <div id="profile-v1" className="mt-2">
//         <Loader load={this.state.loading} />
//         <MDBContainer fluid className="mb-5">
//           <section className="section team-section mb-5">
//             <MDBRow center className="">
//               <MDBCol md="2" />
//               <MDBCol md="10" className="">
//                 <MDBCard cascade className="cascading-admin-card user-card">
//                   <div className="admin-up d-flex justify-content-start">
//                     <MDBIcon
//                       icon="building"
//                       className="icon-color py-4 "
//                     />{' '}
//                     <div className="data">
//                       <h5 className="font-weight-bold dark-grey-text">
//                         Add Process Template{' '}
//                       </h5>
//                     </div>
//                   </div>
//                   <MDBRow>
//                       <MDBCol md="12">
//                         <MDBContainer fluid className=" mt-3">
//                           <MDBCard className="card-body case-color">
//                             <MDBCardTitle className="">
//                               Process Details
//                             </MDBCardTitle>
//                             <MDBCardText>
//                               <div className="row ">
//                                 <div className="col-md-3">
//                                   <div className="label">Process ID</div>
//                                   <div className="value">{this.state.processDetails.id}</div>
//                                 </div>
//                                 <div className="col-md-3">
//                                   <div className="label">Process Name</div>
//                                   <div className="value">{this.state.processDetails.name}</div>
//                                 </div>
//                                 <div className="col-md-3">
//                                   <div className="label">Task Name</div>
//                                   <div className="value">{this.state.data.name}</div>
//                                 </div>
//                                 <div className="col-md-3">
//                                   <div className="label">Product Name</div>
//                                   <div className="value">{this.state.entityDetails.name}</div>
//                                 </div>
//                               </div>
//                             </MDBCardText>
//                           </MDBCard>
//                         </MDBContainer>
//                       </MDBCol>
//                   </MDBRow>

//                   <MDBCardBody className="wizard-card">
//                     <div className="wizard-navigation">
//                       <div className="progress-with-circle">
//                         <Progress
//                           material
//                           value={this.state.progress}
//                           color="indigo"
//                         />
//                       </div>
//                     </div>

//                     <MDBStepper form className="">
//                       <MDBStep
//                         form
//                         className={
//                           this.state.formActivePanel1 === 1 ? 'active' : ''
//                         }
//                       >
//                         <div
//                           onClick={this.swapFormActive(1)(1)}
//                           className={'tile ' + this.state.checked}
//                         >
//                           <div className={'icon-circle ' + this.state.checked}>
//                             <i className="fa fa-building" />
//                           </div>
//                           Process Template
//                         </div>
//                       </MDBStep>
//                       <MDBStep
//                         form
//                         className={
//                           this.state.formActivePanel1 === 2 ? 'active' : ''
//                         }
//                       >
//                         <div
//                           onClick={this.swapFormActive(1)(2)}
//                           className={
//                             this.state.tab3
//                               ? 'tile ' + this.state.checked
//                               : 'tile '
//                           }
//                         >
//                           <div
//                             className={
//                               this.state.tab2
//                                 ? 'icon-circle checked'
//                                 : 'icon-circle'
//                             }
//                           >
//                             <i className="fa fa-wrench" />
//                           </div>
//                           Preview Template
//                         </div>
//                       </MDBStep>
//                       <MDBStep
//                         form
//                         className={
//                           this.state.formActivePanel1 === 3 ? 'active' : ''
//                         }
//                       >
//                         <div
//                           onClick={this.swapFormActive(1)(3)}
//                           className={
//                             this.state.tab3
//                               ? 'tile ' + this.state.checked
//                               : 'tile '
//                           }
//                         >
//                           <div
//                             className={
//                               this.state.tab3
//                                 ? 'icon-circle checked'
//                                 : 'icon-circle'
//                             }
//                           >
//                             <i className="fa fa-wrench" />
//                           </div>
//                           Control Limits
//                         </div>
//                       </MDBStep>
//                     </MDBStepper>
//                     <form onSubmit={e => this.handleSubmission(e)} noValidate>
//                       <ToastContainer
//                         hideProgressBar={true}
//                         newestOnTop={true}
//                         autoClose={5000}
//                       />
//                       <MDBRow>
//                         {this.state.formActivePanel1 === 1 && (
//                           <MDBCol md="12">
//                             <h3 className="font-weight-bold pl-0 mt-3 mb-0">
//                               <strong>Process Template</strong>
//                             </h3>

//                             <FormBuilder
//                               form={this.state.form}
//                               onChange={schema => this.handleIntakeSchemaChange(schema)}
//                             />
//                             <MDBBtn
//                               rounded
//                               className=" btn btn-primary float-right"
//                               onClick={this.handleNextPrevClick(1)(2)}
//                             >
//                               Next
//                             </MDBBtn>
//                           </MDBCol>
//                         )}
//                         {this.state.formActivePanel1 === 2 && (
//                           <MDBCol md="12">
//                             <h3 className="font-weight-bold pl-0 my-4">
//                               <strong>Preview Template</strong>
//                             </h3>
//                             <MDBRow>
//                               <MDBCol md="12">
//                               <Form
//                                 form={this.state.form}
//                               />
//                               </MDBCol>
//                             </MDBRow>
//                               <MDBBtn
//                                 rounded
//                                 className=" btn btn-primary float-right"
//                                 onClick={this.handleNextPrevClick(1)(3)}
//                               >
//                                 Next
//                               </MDBBtn>
//                               <MDBBtn
//                                 rounded
//                                 className="btn btn-primary float-right"
//                                 onClick={this.handleNextPrevClick(1)(1)}
//                               >
//                                 Previous
//                               </MDBBtn>

//                           </MDBCol>
//                         )}
//                         {this.state.formActivePanel1 === 3 && (
//                           <MDBCol md="12">
//                             <h3 className="font-weight-bold pl-0 my-4">
//                               <strong>Control Limits</strong>
//                             </h3>

//                             <input
//                               type="submit"
//                               value="Submit"
//                               className="btn btn-primary float-right"
//                             />
//                             <MDBBtn
//                               color="mdb-color"
//                               rounded
//                               className="float-right"
//                               onClick={this.handleNextPrevClick(1)(3)}
//                             >
//                               Previous
//                             </MDBBtn>
//                           </MDBCol>
//                         )}
//                       </MDBRow>
//                     </form>
//                   </MDBCardBody>
//                 </MDBCard>
//               </MDBCol>
//             </MDBRow>
//           </section>
//         </MDBContainer>
//       </div>
//     );
//   }
// }

// export default AddProcessForms;

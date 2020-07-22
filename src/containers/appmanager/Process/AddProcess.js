import React, {Component} from 'react';
import {ToastContainer, toast, MDBBreadcrumb, MDBBreadcrumbItem} from 'mdbreact';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import Loader from '../../../components/Loader/Loader';
import checkValidity from '../../../widgets/Validation/Validation';

import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBContainer,
  MDBIcon,
} from 'mdbreact';
import {formFields} from './Process.model';
import {TQInput} from '../../../TQComponents';
import BpmnModelerComponent from '../../../components/bpmn/bpmn.modeler';
import ServiceModal from '../../../components/bpmn/modal/ServiceModal';
import UserTaskModal from '../../../components/bpmn/modal/UserTaskModal';
import ScriptTaskModal from '../../../components/bpmn/modal/ScriptTaskModal';
import DecisionTaskModal
  from '../../../components/bpmn/modal/DecisionTaskModal';
import SubProcessTaskModal
  from '../../../components/bpmn/modal/SubProcessTaskModal';
import {emptyBpmn} from '../../../components/bpmn/default/empty.bpmn';

class AddProcess extends Component {
  state = {
    formFields,
    formIsValid: false,
    xml: emptyBpmn,
    mode: 'Add',
    username: localStorage.getItem ('userId'),
    attachForm: {id: '', name: ''},
  };

  componentDidMount = () => {
    if (this.props.match.params.id !== undefined) {
      this.props.getProcessById (this.props.match.params.id);
      this.setState ({mode: 'Edit'});
      if (this.props.processDetails) {
      }
    }
    if (this.state.mode === 'Add') {
      let form = {...formFields};
      form.ui_processCode.value = '';
      form.ui_processName.value = '';
      this.setState ({formFields: form});
    }
  };
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.processDetails !== this.props.processDetails) {
      let form = {...formFields};
      form.ui_processCode.value = this.props.processDetails.procdefid;
      form.ui_processName.value = this.props.processDetails.name;

      this.setState ({
        formFields: form,
        xml: this.props.processDetails.workflow,
      });
    }
    if (prevProps.isProcessExist !== this.props.isProcessExist) {
      let form = {...this.state.formFields};
      if (this.props.isProcessExist) {
        form.ui_processCode.validationMessage =
          'Please choose a different AppId';
        this.setState ({formFields: form});
      } else {
        form.ui_processCode.validationMessage = '';
        this.setState ({formFields: form});
      }
    }
    if (prevProps.status !== this.props.status) {
      if (this.props.status && this.props.status !== 'OK') {
        toast.error ('Please check your input and try again', {
          position: 'top-right',
        });
      } else {
        if (this.state.mode === 'Add') {
          toast.success ('App Added Sucessfully', {
            position: 'top-right',
          });
        } else {
          toast.success ('App Updated Sucessfully', {
            position: 'top-right',
          });
        }

        setTimeout (() => {
          this.props.history.push ('/appmanager/processlist');
        }, 2000);
      }
    }
  }

  componentWillUnmount () {
    this.props.resetProcess ();
  }
  //Validation Logic
  validateForm = (formState, formName) => {
    let valid = true;
    let validatedElements = checkValidity (formState);
    this.setState ({
      [formName]: {...validatedElements},
    });
    for (let element in validatedElements) {
      if (validatedElements[element].valid === true) {
        valid = valid && validatedElements[element].valid;
      } else {
        valid = false;
      }
    }
    return valid;
  };

  createRequest = () => {
    let body;
    this.modeler.invoke (function (elementRegistry, modeling) {
      // once user updates id in input field
      //var newId = 'SERVICE_TASK__1';

      var serviceTaskShape = elementRegistry.get ('process_id');

      modeling.updateProperties (serviceTaskShape, {
        id: this.state.formFields.ui_processName.value,
      });
    });
    if (this.state.mode === 'Add') {
      body = {
        procdefid: this.state.formFields.ui_processCode.value,
        name: this.state.formFields.ui_processName.value,
        orgid: JSON.parse (localStorage.getItem ('orgs')).id,
        workflow: this.state.xml,
        createdBy: this.state.username,
      };
      this.props.addProcess (body);
    } else {
      body = {
        procdefid: this.state.formFields.ui_processCode.value,
        name: this.state.formFields.ui_processName.value,
        orgid: JSON.parse (localStorage.getItem ('orgs')).id,
        id: this.props.processDetails.id,
        workflow: this.state.xml,
        modifiedBy: this.state.username,
      };
      this.props.updateProcess (body);
    }
    return body;
  };
  handleSaveBPMN = xml => {
    this.setState ({xml: xml});
  };

  handleSubmission = async e => {
    e.preventDefault ();
    const valid = this.validateForm (this.state.formFields, formFields);
    if (valid) {
      let requestObj = this.createRequest ();
      if (this.state.mode === 'Add') {
        this.props.addProcess (requestObj);
      } else {
        this.props.updateProcess (requestObj);
      }
    }
  };
  // All input onChange event
  handleChange = (evt, type) => {
    let formElements = {...this.state.formFields};
    let updatedFormElement = {};

    if (evt.target.id !== '') {
      updatedFormElement = {
        ...formElements[evt.currentTarget.id],
      };
      updatedFormElement.value = evt.target.value;

      updatedFormElement.touched = true;
      formElements[evt.target.id] = updatedFormElement;

      this.setState ({
        formFields: formElements,
      });
    }
  };
  taskToggle = type => {
    switch (type) {
      case 'bpmn:ServiceTask':
        this.setState ({serviceTaskModal: !this.state.serviceTaskModal});
        break;

      case 'bpmn:UserTask':
        this.setState ({userTaskModal: !this.state.userTaskModal});
        break;

      case 'bpmn:BusinessRuleTask':
        this.setState ({decisionTaskModal: !this.state.decisionTaskModal});
        break;

      case 'bpmn:ScriptTask':
        this.setState ({scriptTaskModal: !this.state.scriptTaskModal});
        break;

      case 'bpmn:SubProcess':
        this.setState ({subProcessTaskModal: !this.state.subProcessTaskModal});
        break;

      default:
        break;
    }
  };

  setAttachProcessForm = form => {
    this.setState ({attachForm: {id: form._id, name: form.title}});
    this.taskToggle ('bpmn:UserTask');
  };
  setAttachSubProcessForm = form => {
    this.setState ({attachForm: {id: form.id, name: form.subProcDefId}});
    this.taskToggle ('bpmn:SubProcess');
  };
  setAttachRules = form => {
    this.setState ({attachForm: {id: form.id, name: form.name}});
    this.taskToggle ('bpmn:BusinessRuleTask');
  };
  render () {
    return (
      <>
      <div id="profile-v1" className="mt-2">
        <Loader load={this.state.loading} />
        <MDBContainer fluid className="mb-5">
          <section className="section team-section mb-5">
            <MDBRow center className="">

              <MDBCol className="">
                <MDBCard cascade className="cascading-admin-card user-card">
                  <div className="admin-up d-flex justify-content-start">
                    <MDBIcon icon="cog" className="icon-color py-4 " />
                    {' '}
                    <div className="data">
                      <h5 className="font-weight-bold dark-grey-text">
                        {this.state.mode === 'Add' ? 'Add' : 'Edit'}
                        {' '}
                        App
                        {' '}
                      </h5>
                    </div>
                  </div>
                  <MDBCardBody className="wizard-card">

                    <ToastContainer
                      hideProgressBar={true}
                      newestOnTop={true}
                      autoClose={5000}
                    />
                    <MDBRow>

                      <MDBCol md="12">
                        <h3 className="font-weight-bold pl-0 mt-0 mb-0">
                          <strong>App Information</strong>
                        </h3>
                        <MDBRow>
                          <MDBCol md="5">
                            <TQInput
                              maxLength="20"
                              property={this.state.formFields.ui_processCode}
                              onChange={evt =>
                                this.handleChange (
                                  evt,
                                  this.state.formFields.ui_processCode.form
                                )}
                              onBlur={event => {
                                !this.props.processDetails &&
                                  this.props.checkProcessExist (
                                    event.target.value
                                  );
                              }}
                            />
                          </MDBCol>
                          <MDBCol md="5">
                            <TQInput
                              maxLength="64"
                              property={this.state.formFields.ui_processName}
                              onChange={evt =>
                                this.handleChange (
                                  evt,
                                  this.state.formFields.ui_processName.form
                                )}
                            />
                          </MDBCol>
                        </MDBRow>

                      </MDBCol>

                      <MDBCol md="12">
                        <h3 className="font-weight-bold pl-0 my-0">
                          <strong>Workflow</strong>
                        </h3>

                        <BpmnModelerComponent
                          xml={this.state.xml}
                          getBPMNxml={xml => {
                            this.setState ({xml});
                          }}
                          taskToggle={type => {
                            this.taskToggle (type);
                          }}
                          attachForm={this.state.attachForm}
                          appForm={{appId:this.state.formFields.ui_processCode.value,appName:this.state.formFields.ui_processName.value}}
                        />

                        <input
                          type="submit"
                          value="Submit"
                          className="btn btn-primary float-right"
                          onClick={this.handleSubmission}
                        />

                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>
        <ServiceModal
          modal={this.state.serviceModal}
          toggle={() => this.taskToggle ('bpmn:ServiceTask')}
        />
        <UserTaskModal
          modal={this.state.userTaskModal}
          toggle={() => this.taskToggle ('bpmn:UserTask')}
          setAttachProcessForm={form => this.setAttachProcessForm (form)}
        />
        <ScriptTaskModal
          modal={this.state.scriptTaskModal}
          toggle={() => this.taskToggle ('bpmn:ScriptTask')}
        />
        <DecisionTaskModal
          modal={this.state.decisionTaskModal}
          toggle={() => this.taskToggle ('bpmn:BusinessRuleTask')}
          setAttachRules={this.setAttachRules}
        />
        <SubProcessTaskModal
          modal={this.state.subProcessTaskModal}
          toggle={() => this.taskToggle ('bpmn:SubProcess')}
          setAttachSubProcessForm={this.setAttachSubProcessForm}
        />
      </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  error: state.process.error,
  loading: state.process.loading,
  processDetails: state.process.processDetails,
  isProcessExist: state.process.isProcessExist,
  status: state.process.status,
  entityList: state.entity.entityList,
});

const mapDispatchToProps = dispatch => ({
  getProcessById: id => dispatch (actions.processEditProcess (id)),
  checkProcessExist: id => dispatch (actions.processCheckProcess (id)),
  addProcess: data => dispatch (actions.processAddProcess (data)),
  updateProcess: data => dispatch (actions.processUpdateProcess (data)),
  resetProcess: () => dispatch (actions.processReset ()),
});

export default connect (mapStateToProps, mapDispatchToProps) (AddProcess);

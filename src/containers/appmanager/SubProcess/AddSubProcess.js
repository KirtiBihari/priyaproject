import React, {Component} from 'react';
import {ToastContainer, toast, MDBBtn, MDBIcon} from 'mdbreact';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import Loader from '../../../components/Loader/Loader';
import checkValidity from '../../../widgets/Validation/Validation';
import {MDBRow, MDBCol} from 'mdbreact';

import {
  formFields,
  processSettingsFields,
  selectOptions,
} from './SubProcess.model';
import {TQInput} from '../../../TQComponents';
import CmmnModelerComponent from '../../../components/bpmn/cmmn.modeler';

class AddSubProcess extends Component {
  state = {
    username: localStorage.getItem ('userId'),
    formFields: {...formFields},
    formIsValid: false,
    loading: false,
    humanTaskModal: false,
    mode: 'Add',
  };

  getProcessList = () => {
    let response = this.props.processList;
    let list = [];

    for (var key in response) {
      let val = {value: '', text: ''};

      val.value = response[key].id;
      val.text = response[key].name;
      list.push (val);
    }

    let sOlist = {...this.state.processSettingsFields.ui_process};
    sOlist.options = selectOptions (list);
    this.setState ({
      processSettingsFields: {
        ...processSettingsFields,
        ui_process: sOlist,
      },
    });
  };

  componentDidMount () {
    if (this.props.subProcessId) {
      this.props.getSubProcessById (this.props.subProcessId);
      this.setState ({mode: 'Edit'});
    } else {
      let form = {...formFields};
      form.ui_subProcessCode.value = '';
      form.ui_subProcessName.value = '';
      this.setState ({formFields: form, mode: 'Add'});
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.subProcessDetails !== this.props.subProcessDetails) {
      let form = {...formFields};
      form.ui_subProcessCode.value = this.props.subProcessDetails.subProcDefId;
      form.ui_subProcessName.value = this.props.subProcessDetails.name;

      this.setState ({
        formFields: form,
        xml: this.props.subProcessDetails.workflow,
      });
    }
  }

  createRequest = () => {
    if (this.state.mode === 'Add') {
      return {
        subProcDefId: this.state.formFields.ui_subProcessCode.value,
        orgId: JSON.parse (localStorage.getItem ('orgs')).id,
        name: this.state.formFields.ui_subProcessName.value,
        workflowId: null,
        workflow: this.props.xml,
        createdBy: this.state.username,
        subProcDefStatus: true,
      };
    } else {
      return {
        id: this.props.subProcessDetails.id,
        subProcDefId: this.state.formFields.ui_subProcessCode.value,
        orgId: JSON.parse (localStorage.getItem ('orgs')).id,
        name: this.state.formFields.ui_subProcessName.value,
        workflowId: null,
        workflow: this.props.xml,
        modifiedBy: this.state.username,
        subProcDefStatus: true,
      };
    }
  };

  handleSubmission = async e => {
    e.preventDefault ();
    const valid = this.validateForm (this.state.formFields, formFields);
    if (this.state.mode === 'Add') {
      this.props.checkSubProcessExist (
        this.state.formFields.ui_subProcessCode.value,
        isSubProcessExist => {
          if (isSubProcessExist) {
            let form = {...this.state.formFields};
            form.ui_subProcessCode.validationMessage =
              'Sub Process Code Already Exist';
            this.setState ({formFields: form});
          } else {
            if (valid) {
              this.setState ({loading: true});

              let requestObj = this.createRequest ();

              this.props.addSubProcess (requestObj, status => {
                if (status !== 'OK') {
                  toast.error ('Please check your input and try again', {
                    position: 'top-right',
                  });
                  this.setState ({loading: false});
                } else {
                  toast.success ('Sub-Process Added Sucessfully', {
                    position: 'top-right',
                  });
                  this.setState ({loading: false});
                  setTimeout (() => {
                    this.setState ({loading: false});
                    this.props.toggleAddSubProcess ('');
                  }, 2000);
                }
              });
            }
          }
        }
      );
    } else {
      if (valid) {
        this.setState ({loading: true});

        let requestObj = this.createRequest ();

        this.props.updateSubProcess (requestObj, status => {
          if (status !== 'OK') {
            toast.error ('Please check your input and try again', {
              position: 'top-right',
            });
            this.setState ({loading: false});
          } else {
            toast.success ('Sub-Process Updated Sucessfully', {
              position: 'top-right',
            });
            this.setState ({loading: false});
            setTimeout (() => {
              this.setState ({loading: false});
              this.props.toggleAddSubProcess ('');
            }, 2000);
          }
        });
      }
    }
  };

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

  render () {
    return (
      <div id="profile-v1" className="mt-2">
        <Loader load={this.state.loading} />
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
        <MDBRow>
          <MDBCol md="12">
            <div className="d-flex">
              <div className="font-weight-bold pl-0 mt-0 mb-0 d-flex">
                <strong>Sub-Process Information</strong>
              </div>
              <div className="ml-auto">

                <MDBBtn
                  tag="a"
                  size="sm"
                  floating
                  color="blue"
                  onClick={this.handleSubmission}
                >
                  <MDBIcon icon="save" />
                </MDBBtn>
                <MDBBtn
                  tag="a"
                  floating
                  color="red"
                  size="sm"
                  onClick={this.props.toggleAddSubProcess}
                >
                  <MDBIcon icon="arrow-left" />
                </MDBBtn>
              </div>
            </div>

            <MDBRow>
              <MDBCol md="5">
                <TQInput
                  maxLength="20"
                  property={this.state.formFields.ui_subProcessCode}
                  onChange={evt =>
                    this.handleChange (
                      evt,
                      this.state.formFields.ui_subProcessCode.form
                    )}
                />
              </MDBCol>
              <MDBCol md="5">
                <TQInput
                  maxLength="64"
                  property={this.state.formFields.ui_subProcessName}
                  onChange={evt =>
                    this.handleChange (
                      evt,
                      this.state.formFields.ui_subProcessName.form
                    )}
                />

              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-0">
              <strong>Sub-Process Workflow</strong>
            </h3>

            <CmmnModelerComponent
              xml={this.props.xml}
              getCMMNxml={xml => {
                this.props.setXmlState (xml);
              }}
              taskToggle={type => {
                this.props.taskToggle (type);
              }}
              attachForm={this.props.attachForm}
              appForm={{
                appId: this.state.formFields.ui_subProcessCode.value,
                appName: this.state.formFields.ui_subProcessName.value,
              }}
            />

          </MDBCol>
        </MDBRow>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: state.subprocess.error,
  loading: state.subprocess.loading,
  subProcessDetails: state.subprocess.subProcessDetails,
  isSubProcessExist: state.subprocess.isSubProcessExist,
  status: state.subprocess.status,
});

const mapDispatchToProps = dispatch => ({
  getSubProcessById: (id, cb) =>
    dispatch (actions.subprocessEditProcess (id, cb)),
  checkSubProcessExist: (id, cb) =>
    dispatch (actions.subprocessCheckProcess (id, cb)),
  addSubProcess: (data, cb) =>
    dispatch (actions.subprocessAddProcess (data, cb)),
  updateSubProcess: (data, cb) =>
    dispatch (actions.subprocessUpdateProcess (data, cb)),
});

export default connect (mapStateToProps, mapDispatchToProps) (AddSubProcess);

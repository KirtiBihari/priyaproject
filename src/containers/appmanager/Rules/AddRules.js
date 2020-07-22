import React, {Component} from 'react';
import Loader from '../../../components/Loader/Loader';
import checkValidity from '../../../widgets/Validation/Validation';
import * as actions from '../../../store/actions';
import {ToastContainer, toast} from 'mdbreact';
import {
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBStepper,
  MDBStep,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  Progress,
} from 'mdbreact';
import {connect} from 'react-redux';
import {formFields} from './Rules.model';
import {TQInput, TQSelect} from '../../../TQComponents';
import DmnModelerComponent from '../../../components/bpmn/dmn.modeler';
import {emptyDmn} from '../../../components/bpmn/default/empty.dmn';
class AddRules extends Component {
  state = {
    formFields: {...formFields},
    formIsValid: false,
    loading: false,
    xml: emptyDmn,
    username: localStorage.getItem ('userId'),
  };

  componentDidMount () {
    if (this.props.rulesid) {
      this.props.getRulesById (this.props.rulesid);
      this.setState ({mode: 'Edit'});
    } else {
      let form = {...formFields};
      form.ui_rulesCode.value = '';
      form.ui_rulesName.value = '';
      this.setState ({formFields: form, mode: 'Add'});
    }
  }
  componentDidUpdate (prevProps, prevState) {
    if (prevProps.rulesDetails !== this.props.rulesDetails) {
      let form = {...formFields};
      form.ui_rulesCode.value = this.props.rulesDetails.ruledefId;
      form.ui_rulesName.value = this.props.rulesDetails.name;

      this.setState ({
        formFields: form,
        xml: this.props.rulesDetails.workflow,
      });
    }
  }
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

  createRequest = () => {
    if (this.state.mode === 'Add') {
      return {
        ruledefId: this.state.formFields.ui_rulesCode.value,
        orgId: JSON.parse (localStorage.getItem ('orgs')).id,
        name: this.state.formFields.ui_rulesName.value,
        workflowId: null,
        workflow: this.state.xml,
        createdBy: this.state.username,
      };
    } else {
      return {
        id: this.props.rulesDetails.id,
        ruledefId: this.state.formFields.ui_rulesCode.value,
        orgId: JSON.parse (localStorage.getItem ('orgs')).id,
        name: this.state.formFields.ui_rulesName.value,
        workflowId: null,
        workflow: this.state.xml,
        modifiedBy: this.state.username,
      };
    }
  };

  handleSubmission = e => {
    e.preventDefault ();
    const valid = this.validateForm (this.state.formFields, formFields);
    if (this.state.mode === 'Add') {
      this.props.checkRulesExist (
        this.state.formFields.ui_rulesCode.value,
        isRulesExist => {
          if (isRulesExist) {
            let form = {...this.state.formFields};
            form.ui_rulesCode.validationMessage = 'Rules Code Already Exist';
            this.setState ({formFields: form});
          } else {
            if (valid) {
              this.setState ({loading: true});
              let requestObj = this.createRequest ();
              this.props.addRules (requestObj, status => {
                if (status !== 'OK') {
                  toast.error ('Please check your input and try again', {
                    position: 'top-right',
                  });
                  this.setState ({loading: false});
                } else {
                  toast.success ('Rules Added Sucessfully', {
                    position: 'top-right',
                  });
                  this.setState ({loading: false});
                  setTimeout (() => {
                    this.setState ({loading: false});
                    this.props.toggleAddRules ('');
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

        this.props.updateRules (requestObj, status => {
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
              this.props.toggleAddRules ('');
            }, 2000);
          }
        });
      }
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
                <strong>Rules Information</strong>
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
                  onClick={this.props.toggleAddRules}
                >
                  <MDBIcon icon="arrow-left" />
                </MDBBtn>
              </div>
            </div>
            <MDBRow>
              <MDBCol md="5">
                <TQInput
                  maxLength="20"
                  property={this.state.formFields.ui_rulesCode}
                  onChange={evt =>
                    this.handleChange (
                      evt,
                      this.state.formFields.ui_rulesCode.form
                    )}
                />
              </MDBCol>
              <MDBCol md="5">
                <TQInput
                  maxLength="64"
                  property={this.state.formFields.ui_rulesName}
                  onChange={evt =>
                    this.handleChange (
                      evt,
                      this.state.formFields.ui_rulesName.form
                    )}
                />
              </MDBCol>
            </MDBRow>

          </MDBCol>

          <MDBCol md="12">
            <h3 className="font-weight-bold pl-0 my-0">
              <strong>Rules Workflow</strong>
            </h3>

            <DmnModelerComponent
              xml={this.state.xml}
              getDMMNxml={xml => {
                this.setState ({xml});
              }}
              taskToggle={type => {
                this.taskToggle (type);
              }}
              attachForm={this.state.attachForm}
            />

            />

          </MDBCol>
        </MDBRow>

      </div>
    );
  }
}
const mapStateToProps = state => ({
  error: state.rules.error,
  loading: state.rules.loading,
  rulesDetails: state.rules.rulesDetails,
  isRulesExist: state.rules.isRulesExist,
  status: state.rules.status,
});

const mapDispatchToProps = dispatch => ({
  getRulesById: (id, cb) => dispatch (actions.rulesEditProcess (id, cb)),
  checkRulesExist: (id, cb) => dispatch (actions.rulesCheckProcess (id, cb)),
  addRules: (data, cb) => dispatch (actions.rulesAddProcess (data, cb)),
  updateRules: (data, cb) => dispatch (actions.rulesUpdateProcess (data, cb)),
});

export default connect (mapStateToProps, mapDispatchToProps) (AddRules);

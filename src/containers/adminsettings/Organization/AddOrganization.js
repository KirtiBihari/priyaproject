import React, {Component} from 'react';
import {ToastContainer, toast} from 'mdbreact';
import {connect} from 'react-redux';
import Loader from '../../../components/Loader/Loader';
import checkValidity from '../../../widgets/Validation/Validation';
import * as actions from '../../../store/actions';
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
import moment from 'moment';
import {formFields, orgSettingsFields} from './Org.model';
import {TQInput} from '../../../TQComponents';

class AddOrganization extends Component {
  state = {
    formActivePanel1: 1,
    formActivePanel1Changed: false,
    progress: 18,
    checked: 'checked',
    tab1: false,
    tab2: false,

    form: {display: 'form'},
    events: [
      {
        start: new Date (),
        end: new Date (moment ().add (1, 'days')),
        title: 'Some title',
      },
    ],
    formFields: formFields,
    orgSettingsFields: {...orgSettingsFields},
    formIsValid: false,
    mode: 'Add',
    username: localStorage.getItem ('userId'),
  };

  componentDidMount () {
    if (this.props.match.params.id !== undefined) {
      this.setState ({mode: 'Edit'});
      this.props.getOrgById (this.props.match.params.id, () => {
        if (this.props.orgdetails) {
          let form = {...formFields};
          form.ui_orgCode.value = this.props.orgdetails.id;
          form.ui_orgName.value = this.props.orgdetails.name;
          this.setState ({formFields: form});
        }
      });
    }
  }

  swapFormActive = a => param => async e => {
    let valid = true;
    if (param - 1 === 1) {
      valid = this.validateForm (this.state.formFields, formFields);
    }

    if (valid) {
      this.setState ({
        ['formActivePanel' + a]: param,
        ['formActivePanel' + a + 'Changed']: true,
        checked: 'checked',
      });
      switch (param) {
        case 1:
          this.setState ({tab1: true, progress: 18});
          break;
        case 2:
          this.setState ({tab2: true, progress: 48});
          break;
        case 3:
          this.setState ({tab3: true, progress: 82});
          break;

        default:
          break;
      }
    }
  };

  handleNextPrevClick = a => param => async e => {
    let valid = true;

    if (param - 1 === 1) {
      valid = this.validateForm (this.state.formFields, 'formFields');
      if (valid) {
        if (this.state.mode === 'Add') {
          this.props.checkOrgExist (
            this.state.formFields.ui_orgCode.value,
            () => {
              if (this.props.isOrgExist) {
                let orgCode = {...this.state.formFields.ui_orgCode};
                let formFieldslcl = {...this.state.formFields};
                orgCode.validationMessage = 'Organization Code already exists';
                formFieldslcl.ui_orgCode = orgCode;
                this.setState ({
                  formFields: formFieldslcl,
                });
                valid = false;
              }
            }
          );
        }
      }
    }

    if (valid) {
      this.setState ({
        ['formActivePanel' + a]: param,
        ['formActivePanel' + a + 'Changed']: true,
        checked: 'checked',
      });
      switch (param) {
        case 1:
          this.setState ({tab1: true, progress: 18});
          break;
        case 2:
          this.setState ({tab2: true, progress: 48});
          break;

        default:
          break;
      }
    }
  };
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
  // All input onChange event
  handleChange = (evt, type) => {
    let formElements = {};
    let updatedFormElement = {};
    switch (type) {
      case 'add':
        formElements = {...this.state.formFields};
        break;

      case 'setting':
        formElements = {...this.state.orgSettingsFields};
        break;
      default:
        break;
    }
    if (evt.target.id !== '') {
      updatedFormElement = {
        ...formElements[evt.currentTarget.id],
      };
      updatedFormElement.value = evt.target.value;

      updatedFormElement.touched = true;
      formElements[evt.target.id] = updatedFormElement;

      if (type === 'add') {
        this.setState ({
          formFields: formElements,
        });
      } else if (type === 'setting') {
        this.setState ({
          orgSettingsFields: formElements,
        });
      }
    }
  };

  createRequest = () => {
    let body;
    if (this.state.mode === 'Add') {
      body = {
        id: this.state.formFields.ui_orgCode.value,
        name: this.state.formFields.ui_orgName.value,
        createdBy: this.state.username,
      };
    } else {
      body = {
        id: this.state.formFields.ui_orgCode.value,
        name: this.state.formFields.ui_orgName.value,
        modifiedBy: this.state.username,
      };
    }
    return body;
  };

  handleSubmission = async e => {
    e.preventDefault ();
    console.log (this.state.orgSettingsFields);
    let valid = this.validateForm (
      this.state.orgSettingsFields,
      orgSettingsFields
    );

    if (valid) {
      let requestObj = this.createRequest ();
      if (this.state.mode === 'Add') {
        this.props.addOrg (requestObj, () => {
          if (this.props.status !== 'OK') {
            toast.error ('Please check your input and try again', {
              position: 'top-right',
            });
          } else {
            toast.success ('Organization Added Sucessfully', {
              position: 'top-right',
            });
            setTimeout (() => {
              this.props.history.push ('/org/orglist');
            }, 2000);
          }
        });
      } else {
        this.props.updateOrg (requestObj, () => {
          if (this.props.status !== 'OK') {
            toast.error ('Please check your input and try again', {
              position: 'top-right',
            });
          } else {
            toast.success ('Organization Updated Sucessfully', {
              position: 'top-right',
            });
            setTimeout (() => {
              this.props.history.push ('/org/orglist');
            }, 2000);
          }
        });
      }
    }
  };

  calculateAutofocus = a => {
    if (this.state['formActivePanel' + a + 'Changed']) {
      return true;
    }
  };

  createSelectOptionList = opts => {
    return opts.map (opt => {
      return <option value={opt.value}>{opt.label}</option>;
    });
  };
  render () {
    return (
      <div id="profile-v1" className="mt-2">
        <Loader load={this.props.loading} />
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
                        {this.state.mode} Organization{' '}
                      </h5>
                    </div>
                  </div>
                  <MDBCardBody className="wizard-card">
                    <div className="wizard-navigation">
                      <div className="progress-with-circle">
                        <Progress
                          material
                          value={this.state.progress}
                          color="indigo"
                        />
                      </div>
                    </div>

                    <MDBStepper form className="">
                      <MDBStep
                        form
                        className={
                          this.state.formActivePanel1 === 1 ? 'active' : ''
                        }
                      >
                        <div
                          onClick={this.swapFormActive (1) (1)}
                          className={'tile ' + this.state.checked}
                        >
                          <div className={'icon-circle ' + this.state.checked}>
                            <i className="fa fa-building" />
                          </div>
                          Organization Details
                        </div>
                      </MDBStep>
                      <MDBStep
                        form
                        className={
                          this.state.formActivePanel1 === 2 ? 'active' : ''
                        }
                      >
                        <div
                          onClick={this.swapFormActive (1) (2)}
                          className={
                            this.state.tab2
                              ? 'tile ' + this.state.checked
                              : 'tile '
                          }
                        >
                          <div
                            className={
                              this.state.tab2
                                ? 'icon-circle checked'
                                : 'icon-circle'
                            }
                          >
                            <i className="fa fa-wrench" />
                          </div>
                          Organization Settings
                        </div>
                      </MDBStep>

                    </MDBStepper>
                    <form onSubmit={e => this.handleSubmission (e)} noValidate>
                      <ToastContainer
                        hideProgressBar={true}
                        newestOnTop={true}
                        autoClose={5000}
                      />
                      <MDBRow>
                        {this.state.formActivePanel1 === 1 &&
                          <MDBCol md="12">
                            <h3 className="font-weight-bold pl-0 mt-3 mb-0">
                              <strong>Organization Information</strong>
                            </h3>
                            <MDBRow>
                              <MDBCol md="5">
                                <TQInput
                                  maxlength="20"
                                  property={this.state.formFields.ui_orgCode}
                                  onChange={evt =>
                                    this.handleChange (
                                      evt,
                                      this.state.formFields.ui_orgCode.form
                                    )}
                                />
                              </MDBCol>
                              <MDBCol md="5">
                                <TQInput
                                  maxlength="64"
                                  property={this.state.formFields.ui_orgName}
                                  onChange={evt =>
                                    this.handleChange (
                                      evt,
                                      this.state.formFields.ui_orgName.form
                                    )}
                                />
                              </MDBCol>
                            </MDBRow>

                            <MDBBtn
                              rounded
                              className=" btn btn-primary float-right"
                              onClick={this.handleNextPrevClick (1) (2)}
                            >
                              Next
                            </MDBBtn>
                          </MDBCol>}
                        {this.state.formActivePanel1 === 2 &&
                          <MDBCol md="12">
                            <h3 className="font-weight-bold pl-0 my-4">
                              <strong>Organization Settings</strong>
                            </h3>
                            <MDBRow>
                              <MDBCol md="2">
                                <div className="label">Organization Logo</div>
                              </MDBCol>
                              <MDBCol md="4">
                                <input
                                  color="primary"
                                  type="file"
                                  className="btn btn-primary"
                                  //onChange={e => props.upload(e)}
                                />
                              </MDBCol>
                            </MDBRow>
                            <MDBRow>
                              <MDBCol md="2">
                                <div className="label">Organization Banner</div>
                              </MDBCol>
                              <MDBCol md="4">
                                <input
                                  color="primary"
                                  type="file"
                                  className="btn btn-primary"
                                  //onChange={e => props.upload(e)}
                                />
                              </MDBCol>
                            </MDBRow>

                            <input
                              type="submit"
                              value="Submit"
                              className="btn btn-primary float-right"
                            />

                            <MDBBtn
                              color="mdb-color"
                              rounded
                              className="float-right"
                              onClick={this.handleNextPrevClick (1) (1)}
                            >
                              Previous
                            </MDBBtn>
                          </MDBCol>}

                      </MDBRow>
                    </form>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </section>
        </MDBContainer>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    error: state.org.error,
    loading: state.org.loading,
    orgdetails: state.org.orgDetails,
    isOrgExist: state.org.isOrgExist,
    status: state.org.status,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getOrgById: (id, cb) => dispatch (actions.orgEditProcess (id, cb)),
    checkOrgExist: (id, cb) => dispatch (actions.orgCheckProcess (id, cb)),
    addOrg: (data, cb) => dispatch (actions.orgAddProcess (data, cb)),
    updateOrg: (data, cb) => dispatch (actions.orgUpdateProcess (data, cb)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (AddOrganization);

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
import {formFields, unitSettingsFields, selectOptions} from './Unit.model';
import {TQInput, TQSelect} from '../../../TQComponents';

class AddUnit extends Component {
  state = {
    formActivePanel1: 1,
    formActivePanel1Changed: false,
    progress: 22,
    checked: 'checked',
    tab1: false,
    tab2: false,
    events: [
      {
        start: new Date (),
        end: new Date (moment ().add (1, 'days')),
        title: 'Some title',
      },
    ],
    formFields: {...formFields},
    unitSettingsFields: {...unitSettingsFields},
    formIsValid: false,
    mode: 'Add',
    username: localStorage.getItem ('userId'),
  };
  componentDidMount () {
    this.props.getOrgList (() => {
      this.createOrgList ();
    });
    if (this.props.match.params.id !== undefined) {
      this.setState ({mode: 'Edit'});
      this.props.getUnitById (this.props.match.params.id, () => {
        if (this.props.unitDetails) {
          let form = {...formFields};
          form.ui_unitCode.value = this.props.unitDetails.unitId;
          form.ui_unitName.value = this.props.unitDetails.name;
          let unitSettting = {...this.state.unitSettingsFields};
          unitSettting.ui_org.selected = this.props.unitDetails.org.id;

          this.setState ({formFields: form, unitSettingsFields: unitSettting});
        }
      });
    }
  }
  createOrgList = () => {
    let list = [];
    let OrgList = this.props.orgList;
    for (var key in OrgList) {
      let val = {value: '', text: ''};
      val.value = OrgList[key].id;
      val.text = OrgList[key].name;
      list.push (val);
    }

    let sOlist = {...this.state.unitSettingsFields.ui_org};
    sOlist.options = selectOptions (list);
    this.setState ({
      unitSettingsFields: {
        ...unitSettingsFields,
        ui_org: sOlist,
      },
    });
  };

  // Common Logic for Swap Or Handle
  swapOrHandleNext = (a, param, e) => {
    let valid = true;
    if (param - 1 === 1) {
      valid = this.validateForm (this.state.formFields, formFields);
      if (valid) {
        if (this.state.mode === 'Add') {
          this.props.checkUnitExit (
            this.state.formFields.ui_unitCode.value,
            () => {
              if (this.props.isUnitExist) {
                let unitCode = {...this.state.formFields.ui_unitCode};
                let formFieldslcl = {...this.state.formFields};
                unitCode.validationMessage = 'Function ID already exists';
                formFieldslcl.ui_unitCode = unitCode;
                this.setState ({
                  formFields: formFieldslcl,
                });
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
          this.setState ({tab1: true, progress: 22});
          break;
        case 2:
          this.setState ({tab2: true, progress: 76});
          break;
        default:
          break;
      }
    }
  };

  swapFormActive = a => param => async e => {
    this.swapOrHandleNext (a, param, e);
  };

  handleNextPrevClick = a => param => async e => {
    this.swapOrHandleNext (a, param, e);
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
        formElements = {...this.state.unitSettingsFields};
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
          unitSettingsFields: formElements,
        });
      }
    }
  };

  createRequest = () => {
    let body;
    if (this.state.mode === 'Add') {
      body = {
        id: this.state.formFields.ui_unitCode.value,
        name: this.state.formFields.ui_unitName.value,
        orgId: this.state.unitSettingsFields.ui_org.value,
        createdBy: this.state.username,
      };
    } else {
      body = {
        id: this.props.unitDetails.id,
        unitId: this.state.formFields.ui_unitCode.value,
        name: this.state.formFields.ui_unitName.value,
        orgId: this.state.unitSettingsFields.ui_org.value,
        modifiedBy: this.state.username,
      };
    }
    return body;
  };

  handleSubmission = async e => {
    e.preventDefault ();
    let valid = this.validateForm (
      this.state.unitSettingsFields,
      unitSettingsFields
    );

    if (valid) {
      let requestObj = this.createRequest ();
      if (this.state.mode === 'Add') {
        this.props.createUnit (requestObj, () => {
          if (this.props.status !== 'OK') {
            toast.error ('Please check your input and try again', {
              position: 'top-right',
            });
          } else {
            toast.success ('Function Added Sucessfully', {
              position: 'top-right',
            });
            setTimeout (() => {
              this.props.history.push ('/org/unitlist');
            }, 2000);
          }
        });
      } else {
        this.props.updateUnit (requestObj, () => {
          if (this.props.status !== 'OK') {
            toast.error ('Please check your input and try again', {
              position: 'top-right',
            });
          } else {
            toast.success ('Function Updated Sucessfully', {
              position: 'top-right',
            });
            setTimeout (() => {
              this.props.history.push ('/org/unitlist');
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
  getselectedOrg = val => {
    let unitSettingsFields = {
      ...this.state.unitSettingsFields,
    };
    unitSettingsFields.ui_org.value = val[0];
    this.setState ({unitSettingsFields});
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
                    <MDBIcon icon="sitemap" className="icon-color py-4 " />
                    {' '}
                    <div className="data">
                      <h5 className="font-weight-bold dark-grey-text">
                        {this.state.mode} Function{' '}
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
                            <i className="fa fa-sitemap" />
                          </div>
                          Function Details
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
                            <i className="fa fa-building" />
                          </div>
                          Add Organization
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
                              <strong>Function Information</strong>
                            </h3>
                            <MDBRow>
                              <MDBCol md="5">
                                <TQInput
                                  maxlength="20"
                                  property={this.state.formFields.ui_unitCode}
                                  onChange={evt =>
                                    this.handleChange (
                                      evt,
                                      this.state.formFields.ui_unitCode.form
                                    )}
                                />
                              </MDBCol>
                              <MDBCol md="5">
                                <TQInput
                                  maxlength="64"
                                  property={this.state.formFields.ui_unitName}
                                  onChange={evt =>
                                    this.handleChange (
                                      evt,
                                      this.state.formFields.ui_unitName.form
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
                              <strong>Add Organization</strong>
                            </h3>

                            <MDBRow>
                              <MDBCol md="5">
                                <TQSelect
                                  color="primary"
                                  property={
                                    this.state.unitSettingsFields.ui_org
                                  }
                                  getValue={this.getselectedOrg}
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
    error: state.unit.error,
    loading: state.unit.loading,
    unitDetails: state.unit.unitDetails,
    isUnitExist: state.unit.isUnitExist,
    status: state.unit.status,
    orgList: state.org.orgList,
  };
};

const mapDispatchToProps = dispatch => ({
  getUnitById: (id, cb) => dispatch (actions.unitEditProcess (id, cb)),
  checkUnitExit: (id, cb) => dispatch (actions.unitCheckProcess (id, cb)),
  createUnit: (data, cb) => dispatch (actions.unitAddProcess (data, cb)),
  updateUnit: (data, cb) => dispatch (actions.unitUpdateProcess (data, cb)),
  getOrgList: cb => dispatch (actions.orgListProcess (cb)),
});

export default connect (mapStateToProps, mapDispatchToProps) (AddUnit);

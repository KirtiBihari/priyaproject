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
import {formFields, entitySettingsFields, selectOptions} from './Entity.model';
import {TQInput, TQSelect} from '../../../TQComponents';

class AddEntity extends Component {
  state = {
    formActivePanel1: 1,
    formActivePanel1Changed: false,
    progress: 30,
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
    entitySettingsFields: {...entitySettingsFields},
    formIsValid: false,
    mode: 'Add',
    username: localStorage.getItem ('userId'),
  };
  componentDidMount () {
    this.props.getUnitList (() => {
      this.createUnitList ();
    });
    if (this.props.match.params.id !== undefined) {
      this.setState ({mode: 'Edit'});
      this.props.getEntityById (this.props.match.params.id, () => {
        if (this.props.entityDetails) {
          let form = {...formFields};
          form.ui_entityCode.value = this.props.entityDetails.entityId;
          form.ui_entityName.value = this.props.entityDetails.name;
          let entitySetting = {...this.state.entitySettingsFields};
          entitySetting.ui_unit.selected = this.props.entityDetails.unit.id;
          this.setState ({
            formFields: form,
            entitySettingsFields: entitySetting,
          });
        }
      });
    }
  }
  createUnitList = async () => {
    let list = [];
    let unitList = this.props.unitList;
    for (var key in unitList) {
      let val = {value: '', text: ''};

      val.value = unitList[key].id;
      val.text = unitList[key].name;
      list.push (val);
    }

    let sOlist = {...this.state.entitySettingsFields.ui_unit};
    sOlist.options = selectOptions (list);
    this.setState ({
      entitySettingsFields: {
        ...entitySettingsFields,
        ui_unit: sOlist,
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
          this.props.checkEntityExist (
            this.state.formFields.ui_entityCode.value,
            () => {
              if (this.props.isEntityExist) {
                let entityCode = {...this.state.formFields.ui_entityCode};
                let formFieldslcl = {...this.state.formFields};
                entityCode.validationMessage =
                  'Line Of Business ID already exists';
                formFieldslcl.ui_entityCode = entityCode;
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
          this.setState ({tab1: true, progress: 30});
          break;
        case 2:
          this.setState ({tab2: true, progress: 80});
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
        formElements = {...this.state.entitySettingsFields};
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
          entitySettingsFields: formElements,
        });
      }
    }
  };

  createRequest = () => {
    let body;
    if (this.state.mode === 'Add') {
      body = {
        id: this.state.formFields.ui_entityCode.value,
        name: this.state.formFields.ui_entityName.value,
        unitId: this.state.entitySettingsFields.ui_unit.value,
        createdBy: this.state.username,
      };
    } else {
      body = {
        id: this.props.entityDetails.id,
        entityId: this.state.formFields.ui_entityCode.value,
        name: this.state.formFields.ui_entityName.value,
        unitId: this.state.entitySettingsFields.ui_unit.value,
        modifiedBy: this.state.username,
      };
    }
    return body;
  };

  handleSubmission = async e => {
    e.preventDefault ();
    let valid = this.validateForm (
      this.state.entitySettingsFields,
      entitySettingsFields
    );

    if (valid) {
      this.setState ({loading: true});
      let requestObj = this.createRequest ();
      if (this.state.mode === 'Add') {
        this.props.addEntity (requestObj, () => {
          if (this.props.status !== 'OK') {
            toast.error ('Please check your input and try again', {
              position: 'top-right',
            });
          } else {
            toast.success ('Line Of Business Added Sucessfully', {
              position: 'top-right',
            });
            setTimeout (() => {
              this.props.history.push ('/org/entitylist');
            }, 2000);
          }
        });
      } else {
        this.props.updateEntity (requestObj, () => {
          if (this.props.status !== 'OK') {
            toast.error ('Please check your input and try again', {
              position: 'top-right',
            });
          } else {
            toast.success ('Line Of Business Updated Sucessfully', {
              position: 'top-right',
            });
            setTimeout (() => {
              this.props.history.push ('/org/entitylist');
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
  selectedUnit = val => {
    let entitySettingsFields = {...this.state.entitySettingsFields};
    entitySettingsFields.ui_unit.value = val[0];
    this.setState ({entitySettingsFields});
  };
  render () {
    return (
      <div id="profile-v1" className="mt-2">
        <Loader load={this.props.loading} />
        <MDBContainer fluid className="mb-5">
          <section className="section team-section mb-5">
            <MDBRow center className="">

              <MDBCol md="12" className="">
                <MDBCard cascade className="cascading-admin-card user-card">
                  <div className="admin-up d-flex justify-content-start">
                    <MDBIcon icon="briefcase" className="icon-color py-4 " />
                    {' '}
                    <div className="data">
                      <h5 className="font-weight-bold dark-grey-text">
                        {this.state.mode} Line Of Business{' '}
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
                            <i className="fa fa-briefcase" />
                          </div>
                          Line Of Business Details
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
                            <i className="fa fa-sitemap" />
                          </div>
                          Add Function
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
                              <strong>Line Of Business Information</strong>
                            </h3>
                            <MDBRow>
                              <MDBCol md="5">
                                <TQInput
                                  maxlength="20"
                                  property={this.state.formFields.ui_entityCode}
                                  onChange={evt =>
                                    this.handleChange (
                                      evt,
                                      this.state.formFields.ui_entityCode.form
                                    )}
                                />
                              </MDBCol>
                              <MDBCol md="5">
                                <TQInput
                                  maxlength="64"
                                  property={this.state.formFields.ui_entityName}
                                  onChange={evt =>
                                    this.handleChange (
                                      evt,
                                      this.state.formFields.ui_entityName.form
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
                              <strong>Add Function</strong>
                            </h3>

                            <MDBRow>
                              <MDBCol md="5">
                                <TQSelect
                                  color="primary"
                                  property={
                                    this.state.entitySettingsFields.ui_unit
                                  }
                                  getValue={this.selectedUnit}
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
                              onClick={this.handleNextPrevClick (1) (2)}
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
const mapStateToProps = state => ({
  error: state.entity.error,
  loading: state.entity.loading,
  entityDetails: state.entity.entityDetails,
  isEntityExist: state.entity.isEntityExist,
  status: state.entity.status,
  unitList: state.unit.unitList,
});

const mapDispatchToProps = dispatch => {
  return {
    getEntityById: (id, cb) => dispatch (actions.entityEditProcess (id, cb)),
    checkEntityExist: (id, cb) =>
      dispatch (actions.entityCheckProcess (id, cb)),
    addEntity: (data, cb) => dispatch (actions.entityAddProcess (data, cb)),
    updateEntity: (data, cb) =>
      dispatch (actions.entityUpdateProcess (data, cb)),
    getUnitList: cb => dispatch (actions.unitListProcess (cb)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (AddEntity);

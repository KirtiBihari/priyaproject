import React, {Component} from 'react';
import {ToastContainer, toast} from 'mdbreact';
import {MDBBtn, MDBIcon, MDBInput} from 'mdbreact';
import {FormBuilder, Form} from 'react-formio';
import moment from 'moment';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import {TQInput} from '../../../TQComponents';
class AddForms extends Component {
  state = {
    form: {display: this.props.form || 'form'},
    title: '',
    mode: 'Add',
    preview: false,
    orgId: JSON.parse (localStorage.getItem ('orgs')).id,
  };
  handleIntakeSchemaChange = schema => {
    this.setState ({form: schema});
    console.log (schema);
  };
  onPreviewClick = () => {
    this.setState ({preview: !this.state.preview});
  };
  handleChange = evt => {
    this.setState ({title: evt.target.value});
  };

  onFormSave = () => {
    if (this.state.mode === 'Add') {
      this.props.processFormCheck (this.state.title, isExist => {
        if (!isExist) {
          this.props.createProcessForm (
            {
              ...this.state.form,
              title: this.state.title,
              name: this.state.orgId + '/' + this.state.title,
              path: this.state.orgId + '/' + this.state.title,
            },
            status => {
              if (status === 'OK') {
                toast.success ('Form Created Successfully', {
                  position: 'top-right',
                });
              }
              this.props.history.push ('/appmanager/formslist/');
            }
          );
        } else {
          toast.error ('Please select some different Title', {
            position: 'top-right',
          });
        }
      });
    } else {
      this.props.updateProcessForm (
        {
          ...this.state.form,
          title: this.state.title,
          name: this.state.orgId + '/' + this.state.title,
          path: this.state.orgId + '/' + this.state.title,
        },
        status => {
          if (status === 'OK') {
            toast.success ('Form Updated Successfully', {
              position: 'top-right',
            });
          }
          this.props.history.push ('/appmanager/formslist/');
        }
      );
    }
  };

  componentDidMount () {
    if (this.props.match.params.id) {
      this.setState ({mode: 'Edit', title: ''});

      this.props.editProcessForm (this.props.match.params.id);
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.formDetails !== this.props.formDetails) {
      this.setState ({
        form: this.props.formDetails,
        title: this.props.formDetails.title,
      });
    }
  }
  render () {
    return (
      <React.Fragment>
        {!this.state.preview
          ? <React.Fragment>
              <div className="d-flex ">
                <div>
                  <MDBInput
                    label="Title"
                    onChange={this.handleChange}
                    value={this.state.title}
                    required
                  />
                </div>
                <div className="ml-auto">
                  <MDBBtn
                    tag="a"
                    size="sm"
                    floating
                    color="blue"
                    onClick={this.onPreviewClick}
                  >
                    <MDBIcon icon="eye" />
                  </MDBBtn>
                  <MDBBtn
                    tag="a"
                    size="sm"
                    floating
                    color="blue"
                    onClick={this.onFormSave}
                  >
                    <MDBIcon icon="save" />
                  </MDBBtn>
                  {this.state.preview
                    ? <MDBBtn
                        tag="a"
                        floating
                        color="red"
                        size="sm"
                        onClick={this.props.toggleAddForm}
                      >
                        <MDBIcon icon="arrow-left" />
                      </MDBBtn>
                    : null}
                </div>
              </div>
              <FormBuilder
                form={this.state.form}
                onChange={schema => this.handleIntakeSchemaChange (schema)}
              />

            </React.Fragment>
          : <React.Fragment>
              <div className="d-flex flex-row-reverse">
                <MDBBtn
                  tag="a"
                  floating
                  color="red"
                  size="sm"
                  onClick={this.onPreviewClick}
                >
                  <MDBIcon icon="arrow-left" />
                </MDBBtn>
              </div>
              <Form form={this.state.form} />
            </React.Fragment>}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => ({
  formDetails: state.processform.processFormDetails,
  isFormExist: state.processform.isFormExist,
  status: state.processform.status,
  loading: state.processform.loading,
});

const mapDispatchToProps = dispatch => {
  return {
    createProcessForm: (data, cb) =>
      dispatch (actions.processFormAddProcess (data, cb)),
    editProcessForm: id => dispatch (actions.processFormEditProcess (id)),
    processFormCheck: (id, cb) =>
      dispatch (actions.processFormCheckProcess (id, cb)),
    updateProcessForm: (data, cb) =>
      dispatch (actions.processFormUpdateProcess (data, cb)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (AddForms);

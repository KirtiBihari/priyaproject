import React, { Component } from 'react';
import ContentCard from '../../hoc/ContentCard/ContentCard';
import {
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCard,
  MDBCardTitle,
  MDBCardText
} from 'mdbreact';
import { API, Auth } from 'aws-amplify';
class ProcessHeader extends Component {
  state = {
    brokerName: '',
    brokerAddress: '',
    taskId: null,
    createdBy: '',
    deductible: null,
    policyStartDate: null,
    policyExpirationDate: null,
    formId: 'new',
    function: '',
    insuredAddress: '',
    insuredName: '',
    lastModifiedBy: '',
    lastModifiedDate: new Date(),
    lineOfBusiness: '',
    lineOfBusinesses: [],
    orgAddress: '',
    organizationName: '',
    priority: '',
    process: '',
    processes: [],
    subProcess: '',
    subProcesses: [],
    submissionId: 'new',
    sumInsured: null,
    brokerCode: '',
    createdDate: new Date().toLocaleDateString(),
    request_status: 'Assigned',
    emailFlag: false,
    emailText: 'none',
    assignedTo: '',
    assignedTos: [],
    assignedDate: new Date(),
    response: ['res'],
    loading: null,
    functions: []
  };
  getCaseById = async id => {
    let response = await API.get('opsv3', `/task/${id}`);
    response = response['taskExtn'];
    console.log(response);
    this.setState(response);
    this.setState({ assignedTo: '', request_status: 'Assigned' });
    document.getElementById('policyStartDate').value = new Date(
      this.state.policyStartDate
    ).toLocaleDateString();
    document.getElementById('policyExpirationDate').value = new Date(
      this.state.policyExpirationDate
    ).toLocaleDateString();
  };
  componentDidMount =  () => {
     this.getCaseById(this.props.caseid);
  };
  render() {
    return (
      <div>
        <MDBRow>
          <MDBCol md="2" />
          <MDBCol md="10">
            <MDBContainer fluid className=" mt-3">
              <MDBCard className="card-body case-color">
                <MDBCardTitle className="">
                  Request Details
                </MDBCardTitle>
                <MDBCardText>
                  <div className="row ">
                    <div className="col-md-3">
                      <div className="label">Request ID</div>
                      <div className="value">{this.state.taskId}</div>
                    </div>
                    <div className="col-md-3">
                      <div className="label">Sum Insured</div>
                      <div className="value">{this.state.sumInsured}</div>
                    </div>
                    <div className="col-md-3">
                      <div className="label">Deductible</div>
                      <div className="value">{this.state.deductible}</div>
                    </div>
                    <div className="col-md-3">
                      <div className="label">Organisation</div>
                      <div className="value">{this.state.organizationName}</div>
                    </div>
                  </div>
                </MDBCardText>
              </MDBCard>
            </MDBContainer>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default ProcessHeader;

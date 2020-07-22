/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {
  MDBContainer,
  MDBCard,
  CardBody,
  CardTitle,
  MDBRow,
  MDBCol,
  MDBIcon,
} from 'mdbreact';
class ContentCard extends Component {
  downloadAction = requestID => {
    window.open (
      'https://s3.amazonaws.com/ops-manager-email/' + requestID + '/email'
    );
  };

  render () {
    return (
      <div>
        <div id="profile-v1" className="mt-3">
          <MDBContainer fluid className="mb-5 mt-5">
            <section className="section team-section mb-5">
              <MDBRow center className="">
                <MDBCol md={this.props.md} className="">
                  <MDBCard cascade className="cascading-admin-card user-card">
                    <div className="admin-up d-flex justify-content-start">
                      <MDBIcon
                        icon={this.props.icon}
                        className="icon-color py-4 "
                      />
                      {' '}
                      <div className="data">
                        <h5 className="font-weight-bold dark-grey-text">
                          {this.props.title}{' '}
                        </h5>
                        <div
                          align="right"
                          className="content_icon float-right dark-grey-text"
                          hidden={!this.props.download}
                        >
                          <a
                            href="#"
                            onClick={() =>
                              this.downloadAction (this.props.requestID)}
                          >
                            <i className="fa fa-download ml-1 dark-grey-text" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <CardBody cascade>
                      <CardTitle />
                      {this.props.children}
                    </CardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </section>
          </MDBContainer>
        </div>
      </div>
    );
  }
}

export default ContentCard;

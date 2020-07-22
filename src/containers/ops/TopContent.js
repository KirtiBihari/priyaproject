import React from "react";
import {
  MDBRow,
  MDBCard,
  MDBIcon,
  MDBCol
} from "mdbreact";
import CountUp from "react-countup";

const TopContent = props => {
  const { received, unfinished, finished, missed, assigned } = props.topContent;
  return (
    <div>
      <section>
        <MDBRow>
          <MDBCol className="mb-4">
            <MDBCard cascade className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="chart-pie" className="light-blue lighten-1" />
                <div className="data">
                  <div>RECEIVED</div>
                  <h3 className="font-weight-bold dark-grey-text">
                    <CountUp end={received} />
                  </h3>
                  <p className="font-small grey-text">In Queue</p>
                </div>
              </div>
            </MDBCard>
          </MDBCol>
          <MDBCol className="mb-4">
            <MDBCard cascade className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="clipboard" className="warning-color " />
                <div className="data">
                  <div>ASSIGNED</div>
                  <h3 className="font-weight-bold dark-grey-text">
                    <CountUp end={assigned} />
                  </h3>
                  <p className="font-small grey-text">This Week</p>
                </div>
              </div>
            </MDBCard>
          </MDBCol>

          <MDBCol className="mb-4">
            <MDBCard cascade className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="chart-line" className="purple accent-2" />
                <div className="data">
                  <div>IN PROGRESS</div>
                  <h3 className="font-weight-bold dark-grey-text">
                    <CountUp end={unfinished} />
                  </h3>
                  <p className="font-small grey-text">This Week</p>
                </div>
              </div>
            </MDBCard>
          </MDBCol>

          <MDBCol className="mb-4">
            <MDBCard cascade className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="clock" className="red accent-2" />
                <div className="data">
                  <div>MISSED (SLA)</div>
                  <h3 className="font-weight-bold dark-grey-text">
                    <CountUp end={missed} />
                  </h3>
                  <p className="font-small grey-text">This Week</p>
                </div>
              </div>
            </MDBCard>
          </MDBCol>

          <MDBCol className="mb-4">
            <MDBCard cascade className="cascading-admin-card">
              <div className="admin-up">
                <MDBIcon icon="chart-bar" className="green accent-5" />
                <div className="data">
                  <div>COMPLETED</div>
                  <h3 className="font-weight-bold dark-grey-text">
                    <CountUp end={finished} />
                  </h3>
                  <p className="font-small grey-text">This Week</p>
                </div>
              </div>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </section>
    </div>
  );
};

export default TopContent;

import React from 'react';
import {
  MDBCard,
  MDBCardHeader,
  MDBListGroup,
  MDBListGroupItem
} from 'mdbreact';

const createBody = props => {
  return props.body.map((item, i) => {
    return (
      <MDBListGroupItem key={i}>
        <div className="form-check ">
          <input
            color="color-white"
            type="checkbox"
            id={props.title + i}
            className="form-control form-check-input form-check-input"
            value=""
            onChange={() => props.change(props, item)}
            checked={item.checked}
          />
          <label
            className="form-check-label mr-5"
            htmlFor={props.title + i}
            id={props.title + i}
          >
            {item.name}
          </label>
        </div>
      </MDBListGroupItem>
    );
  });
};
const RolesCard = props => {
  return (
    <div>
      <MDBCard style={{ marginTop: '1rem', height: '250px' }} narrow>
        <MDBCardHeader
          className="light-blue card-body"
          style={{ paddingRight: '1.25rem' }} >
          <div className="form-check ">
            <input
              color="color-accent-blue"
              type="checkbox"
              id={props.title}
              className="form-control form-check-input form-check-input"
              value=""
              checked={props.selectall}
              onChange={() => props.selectallprop(props, props.selectall)}
            />
            <label
              className="form-check-label mr-5"
              htmlFor={props.title}
              id={props.title}
            >
              {props.title}
            </label>
          </div>
        </MDBCardHeader>
        <div className="role-content">
          <MDBListGroup className="list-panel">
            {createBody(props)}
          </MDBListGroup>
        </div>
      </MDBCard>
    </div>
  );
};

export default RolesCard;

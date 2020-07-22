import React from 'react';
import { MDBCard, MDBCardHeader, MDBIcon } from 'mdbreact';
const createRoleList = props => {
  return props.roles.map((role, i) => {
    return (
      <div className="rolescontent" key={i}>
        <div className="rolestitle">{role.rolesName}</div>
        <div className="rolesdesc">
          {role.rolesdesc}
          <div className="rolesaction float-right">
            <MDBIcon
              icon="pencil"
              className="mx-1"
              onClick={() => props.click(role)}
            />

            <MDBIcon
              icon="trash"
              id={i}
              className="mx-1"
              onClick={() => props.delete(role)}
            />
          </div>
        </div>
      </div>
    );
  });
};

const RolesListCard = props => {
  return (
    <div>
      <MDBCard style={{ width: '100%', marginTop: '1rem' }} narrow>
        <MDBCardHeader
          className="light-blue "
          style={{ paddingRight: '1.25rem' }}
        >
          {props.title}
        </MDBCardHeader>
        {createRoleList(props)}
      </MDBCard>
    </div>
  );
};

export default RolesListCard;

import React from 'react';
import './tiles.scss';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  
  MDBIcon,
} from 'mdbreact';
const Tiles = ({color,desc,icon,name,addTabs,to}) => {

  return (
    <React.Fragment>
      <MDBCard className="tiles">
        <MDBCardBody onClick={()=>addTabs(to,name)}>
          <div className="icon-content ">
            <div className="tiles-icon"  style={{background:color}} >
            <MDBIcon  icon={icon}  />
            </div>
            {/* <div className="hamburger" ><MDBIcon icon="align-justify" /></div> */}

          </div>
          <div className="divider" />
          <div className="tiles-content">
            <MDBCardTitle className="text-blue">{name}</MDBCardTitle>
            <p>
             {desc}
            </p>
          </div>

        </MDBCardBody>
      </MDBCard>
    </React.Fragment>
  );
};

export default Tiles;

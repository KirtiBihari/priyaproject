import React from 'react';
import {
  MDBSideNavNav,
  MDBSideNavCat,
  MDBSideNavLink,
  MDBTooltip,
} from 'mdbreact';
const dynamicNav = props => {
  const getIcons = props => {
    let iconTemplate;
    switch (props.status) {
      case 'current':
        iconTemplate = (
          <div className="dform_icon">
            <MDBTooltip placement="left" domElement>
              <i className="fa fa-play-circle blue-text" />
             
            </MDBTooltip>
          </div>
        );
        break;

      case 'success':
        iconTemplate = (
          <div className="dform_icon">
             <MDBTooltip placement="left" domElement>
            <i className="fa fa-check-circle green-text" />
            <span>
                {props.status}
              </span>
            </MDBTooltip>
          </div>
        );
        break;
      case 'failed':
        iconTemplate = (
          <div className="dform_icon">
             <MDBTooltip placement="left" domElement>
            <i className="fa fa-times-circle red-text" />
            <span>
                {props.status}
              </span>
            </MDBTooltip>
          </div>
        );
        break;
      case 'skipped':
        iconTemplate = (
          <div className="dform_icon">
            <MDBTooltip placement="left" domElement>
            <i className="fa fa-ban grey-text" />
            <span>
                {props.status}
              </span>
              </MDBTooltip>
          </div>
        );
        break;

      default:
        iconTemplate = (
          <div className="dform_icon">
            <MDBTooltip placement="left" domElement>
            <i className="far fa-circle " />
            <span>
                {props.status}
              </span>
              </MDBTooltip>
          </div>
        );
        break;
    }
    return iconTemplate;
  };
  const getClassForMenu = menu => {
    if (menu.status === 'current') {
      return 'active';
    } else if ((menu.status = 'disabled')) {
      return 'dform_disabled';
    }
  };
  const createNavLink = props => {
    console.log (props);
    return props.taskModelList.map ((menu, key) => {
      return (
        <MDBSideNavLink
          key={key}
          to={'/case/formstemp/' + props.caseid + '/' + menu.formId + '/'}
          className={getClassForMenu (menu)}
        >

          <span>
            {menu.name}

            {getIcons (menu)}
          </span>

        </MDBSideNavLink>
      );
    });
  };
  return (
    <div>
      <MDBSideNavNav style={{marginTop: '0px'}}>
        <MDBSideNavCat name={props.name} id={props.id} icon={props.icon}>
          {createNavLink (props)}
        </MDBSideNavCat>
      </MDBSideNavNav>
    </div>
  );
};

export default dynamicNav;

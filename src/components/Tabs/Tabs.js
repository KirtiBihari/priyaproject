import React from 'react';
import {MDBIcon} from 'mdbreact';
import './tabs.scss';
import {NavLink, Link} from 'react-router-dom';
const Tabs = props => {
  const {path, tabLinks, closeTabs,clearTabs} = props;
  
  return (
    <React.Fragment>
      <div className="tabs">
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <Link
              to="/home"
              className="nav-link  waves-light  show waves-effect waves-light"
              onClick={clearTabs}
            >

              <MDBIcon icon="home" />
              <span>Home</span>

            </Link>

          </li>
         
            {tabLinks.map ((tab, key) => {
              return (
                <li className="nav-item"   key={key}>
                <NavLink
                  to={`${path}/${tab.to}`}
                
                  className="nav-link  waves-light  show waves-effect waves-light"
                >
                  {tab.title }
                  <button type="button" className="close" aria-label="Close" onClick={($event)=>closeTabs($event,tab.to)}>
                <span aria-hidden="true">&times;</span>
              </button>
                </NavLink>
              
               
              </li>
              );
            })}

        

        </ul>
      </div>

    </React.Fragment>
  );
};

export default Tabs;

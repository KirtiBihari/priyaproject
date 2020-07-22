import React from 'react';
import {MDBInput,MDBTabContent,MDBTabPane,MDBNav,MDBNavItem} from 'mdbreact';
import { BrowserRouter as Router } from 'react-router-dom';
import { is } from 'bpmn-js/lib/util/ModelUtil';
const ElementProperties=(props) =>{

    let {
      element,
      modeler,activeTab,toggleClassicTabs
    } = props;
  
    if (element.labelTarget) {
      element = element.labelTarget;
    }
    const modeling = modeler.get('modeling');
    const updateName=(name)=> {
      modeling.updateLabel(element, name);
    }
  
    const updateProcessSLA=(type,value)=>{
      modeling.updateProperties(element,{
        [type]:value
      })
    }
  
    return (
      <div className="element-properties classic-tabs" key={ element.id }>
        <Router>
          
        <MDBNav className="nav-tabs " color="cyan" >
              <MDBNavItem>
                <div className={`nav-link ${activeTab==='1'?'active':''}`}  onClick={()=>toggleClassicTabs("1")} >
                 
                  Default
                </div>
              </MDBNavItem>

              {is(element,'bpmn:Task') &&
              <MDBNavItem>
                <div  className={`nav-link ${activeTab==='2'?'active':''}`} onClick={()=>toggleClassicTabs("2")} >
                
                  Forms
                </div>
              </MDBNavItem>}
              </MDBNav>
              <MDBTabContent
              className="card mb-5"
              activeItem={activeTab}
            >
              <MDBTabPane tabId="1"> <MDBInput
                  label="Id"
                  type="text"
                  value={element.id}
                  
                />
         <MDBInput
                  label="Name"
                  type="text"
                  value={ element.businessObject.name || ''}
                  onChange={ (event) => {
                    updateName(event.target.value)
                  } }
                  
                />
                {is(element,'bpmn:Participant') &&
         <fieldset>
         <label>Process SLA (Hours)</label>
        <MDBInput
        label="High"
        type="number"
        value={element.businessObject.get('processhigh')}
        onChange={ (event) => {
          updateProcessSLA('processhigh',event.target.value)
        } }
       
  
        
      />
       <MDBInput
        label="Medium"
        type="number"
        value={element.businessObject.get('processmedium')}
        onChange={ (event) => {
          updateProcessSLA('processmedium',event.target.value)
        } }
        
      />
       <MDBInput
        label="Low"
        type="number"
        value={element.businessObject.get('processlow')}
        onChange={ (event) => {
          updateProcessSLA('processlow',event.target.value)
        } }
        
      />
      </fieldset>
        }
   {is(element,'bpmn:Task') &&
   <>
         
         <label>Task SLA (Hours)</label>
        <MDBInput
        label="High"
        type="number"
        value={element.businessObject.get('taskhigh')}
        onChange={ (event) => {
          updateProcessSLA('taskhigh',event.target.value)
        } }
       
  
        
      />
       <MDBInput
        label="Medium"
        type="number"
        value={element.businessObject.get('taskmedium')}
        onChange={ (event) => {
          updateProcessSLA('taskmedium',event.target.value)
        } }
        
      />
       <MDBInput
        label="Low"
        type="number"
        value={element.businessObject.get('tasklow')}
        onChange={ (event) => {
          updateProcessSLA('tasklow',event.target.value)
        } }
        
      />
      
      
       <label>Task Follow SLA (Hours)</label>
      <MDBInput
      label="High"
      type="number"
      value={element.businessObject.get('taskfollowhigh')}
      onChange={ (event) => {
        updateProcessSLA('taskfollowhigh',event.target.value)
      } }
     
  
      
    />
     <MDBInput
      label="Medium"
      type="number"
      value={element.businessObject.get('taskfollowmedium')}
      onChange={ (event) => {
        updateProcessSLA('taskfollowmedium',event.target.value)
      } }
      
    />
     <MDBInput
      label="Low"
      type="number"
      value={element.businessObject.get('taskfollowlow')}
      onChange={ (event) => {
        updateProcessSLA('taskfollowlow',event.target.value)
      } }
      
    />
 
    </>
        }</MDBTabPane>
              <MDBTabPane tabId="2">
              
              <React.Fragment>
                 <MDBInput
      label="FormName"
      type="text"
      disabled
   
      
    />
              </React.Fragment>

              </MDBTabPane>
              </MDBTabContent>
       
       
              </Router>
      </div>
    );
  }
  

export default ElementProperties;
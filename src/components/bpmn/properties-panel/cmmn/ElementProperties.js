import React, {useEffect, useCallback} from 'react';
import {
  MDBInput,
  MDBTabContent,
  MDBTabPane,
  MDBNav,
  MDBNavItem,
} from 'mdbreact';
import {BrowserRouter as Router} from 'react-router-dom';
import {is} from 'cmmn-js/lib/util/ModelUtil';
const ElementProperties = props => {
  let {element, modeler, activeTab, toggleClassicTabs, attachForm} = props;

  if (element.labelTarget) {
    element = element.labelTarget;
  }
  const modeling = modeler.get ('modeling');
  const updateName = name => {
    modeling.updateLabel (element, name);
  };

  const updateElement = useCallback (
    (type, value) => {
      modeling.updateProperties (element, {
        [type]: value,
      });
    },
    [element, modeling]
  );

  useEffect (
    () => {
      if (attachForm.id !== '') {
        if (element.businessObject.definitionRef && element.businessObject.definitionRef.$type === 'cmmn:HumanTask') {
          updateElement ('formname', attachForm.name);
          updateElement ('formid', attachForm.id);
        }
        if (element.businessObject.definitionRef &&
          element.businessObject.definitionRef.$type === 'cmmn:DecisionTask'
        ) {
          updateElement ('rulesname', attachForm.name);
          updateElement ('rulesid', attachForm.id);
        }
        if (element.businessObject.definitionRef && element.businessObject.definitionRef.$type === 'cmmn:ProcessTask') {
          updateElement ('processname', attachForm.name);
          updateElement ('processid', attachForm.id);
        }
        if (element.businessObject.definitionRef && element.businessObject.definitionRef.$type === 'cmmn:CaseTask') {
          updateElement ('casename', attachForm.name);
          updateElement ('caseid', attachForm.id);
        }
        toggleClassicTabs ('2');
      }
    },
    [attachForm, element, updateElement, toggleClassicTabs]
  );
  console.log(is(element, 'cmmn:HumanTask'));
  return (
    <div className="element-properties classic-tabs" key={element.id}>
      <Router>
        <MDBNav className="nav-tabs " color="cyan">
          <MDBNavItem>
            <div
              className={`nav-link ${activeTab === '1' ? 'active' : ''}`}
              onClick={() => toggleClassicTabs ('1')}
            >
              Default
            </div>
          </MDBNavItem>

          {element.businessObject.definitionRef &&
              element.businessObject.definitionRef.$type === 'cmmn:HumanTask' &&
            <MDBNavItem>
              <div
                className={`nav-link ${activeTab === '2' ? 'active' : ''}`}
                onClick={() => toggleClassicTabs ('2')}
              >
                Forms
              </div>
            </MDBNavItem>}
          {element.businessObject.definitionRef &&
              element.businessObject.definitionRef.$type === 'cmmn:DecisionTask' &&
            <MDBNavItem>
              <div
                className={`nav-link ${activeTab === '2' ? 'active' : ''}`}
                onClick={() => toggleClassicTabs ('2')}
              >
                Rules
              </div>
            </MDBNavItem>}
          {element.businessObject.definitionRef &&
              element.businessObject.definitionRef.$type ==='cmmn:CaseTask' &&
            <MDBNavItem>
              <div
                className={`nav-link ${activeTab === '2' ? 'active' : ''}`}
                onClick={() => toggleClassicTabs ('2')}
              >
                Sub Process
              </div>
            </MDBNavItem>}
          {element.businessObject.definitionRef &&
              element.businessObject.definitionRef.$type === 'cmmn:ProcessTask' &&
            <MDBNavItem>
              <div
                className={`nav-link ${activeTab === '2' ? 'active' : ''}`}
                onClick={() => toggleClassicTabs ('2')}
              >
                Process{' '}
              </div>
            </MDBNavItem>}
        </MDBNav>
        <MDBTabContent className="card mb-5" activeItem={activeTab}>
          <MDBTabPane tabId="1">
          {is(element, 'cmmndi:CMMNDiagram') ? (
              <>
               <MDBInput label="App Id" type="text" value={element.id}  disabled/>
            <MDBInput
              label="App Name"
              type="text"
              value={element.businessObject.name || ''}
              onChange={event => {
                updateName(event.target.value);
              }}
            /></>): <>
            <MDBInput label="Id" type="text" value={element.id} />
            <MDBInput
              label="Name"
              type="text"
              value={element.businessObject.name || ''}
              onChange={event => {
                updateName (event.target.value);
              }}
            />
            </>}

          </MDBTabPane>
          <MDBTabPane tabId="2">
            {element.businessObject.definitionRef &&
              element.businessObject.definitionRef.$type ===
                'cmmn:DecisionTask' &&
              <React.Fragment>
                <MDBInput
                  label="Rules Name"
                  type="text"
                  disabled
                  value={element.businessObject.get ('rulesname')}
                />
              </React.Fragment>}
            {element.businessObject.definitionRef &&
              element.businessObject.definitionRef.$type === 'cmmn:HumanTask' &&
              <React.Fragment>
                <MDBInput
                  label="Form Name"
                  type="text"
                  disabled
                  value={element.businessObject.get ('formname')}
                />
              </React.Fragment>}
            {element.businessObject.definitionRef &&
              element.businessObject.definitionRef.$type ===
                'cmmn:ProcessTask' &&
              <React.Fragment>
                <MDBInput
                  label="Process Name"
                  type="text"
                  disabled
                  value={element.businessObject.get ('processname')}
                />
              </React.Fragment>}
            {element.businessObject.definitionRef &&
              element.businessObject.definitionRef.$type === 'cmmn:CaseTask' &&
              <React.Fragment>
                <MDBInput
                  label="SubProcess Name"
                  type="text"
                  disabled
                  value={element.businessObject.get ('casename')}
                />
              </React.Fragment>}
          </MDBTabPane>
        </MDBTabContent>
      </Router>
    </div>
  );
};

export default ElementProperties;

import { is } from 'cmmn-js/lib/util/ModelUtil';

import React, { Component } from 'react';

import './PropertiesView.css';

import ElementProperties from './ElementProperties';

export default class PropertiesView extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedElements: [],
      element: null,
      decisionTaskModal:false,
      scriptTaskModal:false,
      serviceTaskModal:false,
      subProcessTaskModal:false,
      userTaskModal:false,
      activeTab:'1'

    };
  }
  toggleClassicTabs=(tabId)=>{
    this.setState({activeTab:tabId})
      }
  componentDidMount() {

    const {
      modeler,
      taskToggle
      
    } = this.props;

    modeler.on('selection.changed', (e) => {
      this.setState({
        selectedElements: e.newSelection,
        element: e.newSelection[0]
      });
    });

    modeler.on('element.dblclick', (e) => {
      if(e.element.businessObject.definitionRef){
      taskToggle(e.element.businessObject.definitionRef.$type);
      }
    })
     
    modeler.on('element.changed', (e) => {

      const {
        element
      } = e;

      const {
        element: currentElement
      } = this.state;

      if (!currentElement) {
        return;
      }

      // update panel, if currently selected element changed
      if (element.id === currentElement.id) {
        this.setState({
          element
        });
      }

    });
  }
  
  
  render() {

    const {
      modeler
    } = this.props;

    const {
      selectedElements,
      element
    } = this.state;

    return (
      <div>

        {
          selectedElements.length === 1
            && <ElementProperties modeler={ modeler } element={ element } toggleClassicTabs={this.toggleClassicTabs} activeTab={this.state.activeTab} />
        }

        {
          selectedElements.length === 0
            && <span>Please select an element.</span>
        }

        {
          selectedElements.length > 1
            && <span>Please select a single element.</span>
        }
       
       
      </div>
      
    );
  }

}




// helpers ///////////////////

function hasDefinition(event, definitionType) {

  const definitions = event.businessObject.eventDefinitions || [];

  return definitions.some(d => is(d, definitionType));
}
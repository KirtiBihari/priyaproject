import {is} from 'bpmn-js/lib/util/ModelUtil';

import React, {Component} from 'react';

import './PropertiesView.css';

import ElementProperties from './ElementProperties';

export default class PropertiesView extends Component {
  state = {
    selectedElements: [],
    element: null,
    currentElement: null,
    decisionTaskModal: false,
    scriptTaskModal: false,
    serviceTaskModal: false,
    subProcessTaskModal: false,
    userTaskModal: false,
    activeTab: '1',
    isRoot: false,
    rootElement: null,
  };

  toggleClassicTabs = tabId => {
    this.setState ({activeTab: tabId});
  };
  componentDidMount () {
    const {modeler, taskToggle} = this.props;
    var eventBus = modeler.get ('eventBus');

    eventBus.on ('root.added', e => {
      const {element} = e;
      const modeling = modeler.get ('modeling');
      if (this.props.appForm.appId !== '') {
        modeling.updateProperties (element, {
          id: this.props.appForm.appId,
        });
      }
      this.setState ({
        currentElement: element,
        rootElement: element,
        isRoot: true,
      });
    });

    modeler.on ('selection.changed', e => {
      this.setState ({
        selectedElements: e.newSelection,
        element: e.newSelection[0],
      });
    });
    const priority = 10000;
    modeler.on ('element.dblclick', priority, e => {
      taskToggle (e.element.type);
      return false;
    });

    modeler.on ('element.click', e => {
      this.setState ({currentElement: e.element, isRoot: true});
    });

    modeler.on ('element.changed', priority, e => {
      const {element} = e;

      const {element: currentElement} = this.state;

      if (!currentElement) {
        return;
      }

      // update panel, if currently selected element changed
      if (element.id === currentElement.id) {
        this.setState ({
          element,
        });
      }
      return false;
    });
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.appForm !== this.props.appForm) {
      const {modeler} = this.props;
      const modeling = modeler.get ('modeling');
      if (this.props.appForm.appId !== '') {
        modeling.updateProperties (this.state.rootElement, {
          id: this.props.appForm.appId,
          name: this.props.appForm.appName,
        });
      }
    }
  }
  render () {
    const {modeler, attachForm, appForm} = this.props;

    const {selectedElements, element, currentElement, isRoot} = this.state;

    return (
      <div>

        {selectedElements.length === 1 &&
          <ElementProperties
            modeler={modeler}
            element={element}
            toggleClassicTabs={this.toggleClassicTabs}
            activeTab={this.state.activeTab}
            attachForm={attachForm}
            appForm={appForm}
          />}

        {currentElement &&
          isRoot &&
          selectedElements.length === 0 &&
          <ElementProperties
            modeler={modeler}
            element={currentElement}
            toggleClassicTabs={this.toggleClassicTabs}
            activeTab={this.state.activeTab}
            attachForm={attachForm}
          />}

        {selectedElements.length > 1 &&
          <span>Please select a single element.</span>}

      </div>
    );
  }
}

// helpers ///////////////////

function hasDefinition (event, definitionType) {
  const definitions = event.businessObject.eventDefinitions || [];

  return definitions.some (d => is (d, definitionType));
}

import ReactDOM from 'react-dom';
import React from 'react';

import PropertiesView from './PropertiesView';


export default class PropertiesPanel {

  constructor(options) {
    const {
      modeler,
      container,
      taskToggle
    
    } = options;

    ReactDOM.render(
      <PropertiesView modeler={ modeler } taskToggle={taskToggle}/>,
      container
    );
  }
}


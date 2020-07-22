import React, {Component, Fragment} from 'react';
import DmnModeler from 'dmn-js/lib/Modeler';
import EditingTools from './components/EditingTools';
import ZoomControls from './components/ZoomControls';
import 'dmn-js-properties-panel/dist/assets/dmn-js-properties-panel.css';
// import '../../assets/css/bpmn.css';
import 'dmn-js/dist/assets/diagram-js.css';
import 'dmn-js/dist/assets/dmn-js-decision-table-controls.css';
import 'dmn-js/dist/assets/dmn-js-decision-table.css';
import 'dmn-js/dist/assets/dmn-js-drd.css';
import 'dmn-js/dist/assets/dmn-js-literal-expression.css';
import 'dmn-js/dist/assets/dmn-js-shared.css';
import 'dmn-js/dist/assets/dmn-font/css/dmn-embedded.css';
import {emptyDmn} from './default/empty.dmn';
import PropertiesPanel from './properties-panel/dmnn';
let scale = 1;
class DmnModelerComponent extends Component {
  modeler = null;
  state = {
    xml: ``,
  };
  componentDidMount = () => {
    this.modeler = new DmnModeler ({
      container: '#dmncanvas',
      keyboard: {
        bindTo: window,
      },
    });
    new PropertiesPanel ({
      container: this.refs.propertypanel,
      modeler: this.modeler,
      taskToggle: this.props.taskToggle,
      attachForm: this.props.attachForm,
    });
    this.modeler.on ('element.changed', e => {
      this.modeler.saveXML ({format: true}, (err, xml) => {
        this.setState ({xml: xml});
      });
    });
    if (this.props.xml) {
      this.openDmmnDiagram (this.props.xml);
    } else {
      this.newDmmnDiagram ();
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.xml !== prevState.xml) {
      if (typeof this.props.getDMNxml === 'function') {
        this.props.getDMMNxml (this.state.xml);
      }
    }
    if (prevProps !== this.props) {
      new PropertiesPanel ({
        container: this.refs.propertypanel,
        modeler: this.modeler,
        taskToggle: this.props.taskToggle,
        attachForm: this.props.attachForm,
      });
    }
  };
  newDmmnDiagram = () => {
    this.openDmmnDiagram (emptyDmn);
  };
  handleSave = () => {
    this.modeler.saveXML ({format: true}, (err, xml) => {
      this.setState ({xml: xml});
      return xml;
    });
  };
  handleRedo = () => {
    this.modeler.get ('commandStack').redo ();
  };

  handleUndo = () => {
    this.modeler.get ('commandStack').undo ();
  };

  handleZoom = () => {
    this.modeler.get ('canvas').zoom (scale);
  };

  handleZoomIn = () => {
    scale += 0.1;
    this.handleZoom ();
  };

  handleZoomOut = () => {
    if (scale <= 0.3) {
      scale = 0.2;
    } else {
      scale -= 0.1;
    }
    this.handleZoom ();
  };

  handleZoomReset = () => {
    scale = 1;
    this.handleZoom ();
  };

  openDmmnDiagram = xml => {
    this.modeler.importXML (xml, error => {
      if (error) {
        return console.log ('fail import xml');
      }

      var canvas = this.modeler.get ('canvas');

      canvas.zoom ('fit-viewport');
    });
  };
  render () {
    return (
      <Fragment>
        <div className="contentb">
          <div id="dmncanvas" ref="canvas" />
          <div id="properties-panel" ref="propertypanel" />
        </div>
        {/* <EditingTools
          onSave={this.handleSave}
          onRedo={this.handleRedo}
          onUndo={this.handleUndo}
        />
        <ZoomControls
          onZoomIn={this.handleZoomIn}
          onZoomOut={this.handleZoomOut}
          onZoomReset={this.handleZoomReset}
        /> */}
      </Fragment>
    );
  }
}

export default DmnModelerComponent;

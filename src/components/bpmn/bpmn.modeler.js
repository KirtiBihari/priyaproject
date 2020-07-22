import React, {Component, Fragment} from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import {emptyBpmn} from './default/empty.bpmn';
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css';
import '../../assets/css/bpmn.css';
import EditingTools from './components/EditingTools';
import ZoomControls from './components/ZoomControls';
import PropertiesPanel from './properties-panel/bpmn';
let scale = 1;

class BpmnModelerComponent extends Component {
  state = {
    xml: ``,
    serviceModal: false,
  };

  componentDidMount = () => {
    this.modeler = new BpmnModeler ({
      container: this.refs.canvas,
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
      this.openBpmnDiagram (this.props.xml);
    } else {
      this.newBpmnDiagram ();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.xml !== prevState.xml) {
      if (typeof this.props.getBPMNxml === 'function') {
        this.props.getBPMNxml (this.state.xml);
      }
    }
    if (prevProps !== this.props) {
      new PropertiesPanel ({
        container: this.refs.propertypanel,
        modeler: this.modeler,
        taskToggle: this.props.taskToggle,
        attachForm: this.props.attachForm,
        appForm: this.props.appForm,
      });
    }
  };

  newBpmnDiagram = () => {
    this.openBpmnDiagram (emptyBpmn);
  };

  openBpmnDiagram = xml => {
    this.modeler.importXML (xml, error => {
      if (error) {
        return console.log ('fail import xml:-' + error);
      }

      var canvas = this.modeler.get ('canvas');

      canvas.zoom ('fit-viewport');
    });
  };
  handleSave = () => {
    this.modeler.saveXML ({format: true}, (err, xml) => {
      this.setState ({xml: xml});

      // this.props.handleSave(xml);

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

  render = () => {
    return (
      <Fragment>
        <div className="contentb">
          <div id="canvas" ref="canvas" onDropCapture={this.handleSave} />
          <div id="properties-panel" ref="propertypanel" />

        </div>

        <EditingTools
          onSave={this.handleSave}
          onRedo={this.handleRedo}
          onUndo={this.handleUndo}
        />
        <ZoomControls
          onZoomIn={this.handleZoomIn}
          onZoomOut={this.handleZoomOut}
          onZoomReset={this.handleZoomReset}
        />
      </Fragment>
    );
  };
}

export default BpmnModelerComponent;

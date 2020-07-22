import React, {Component, Fragment} from 'react';
import CmmnModeler from 'cmmn-js/lib/Modeler';
import EditingTools from './components/EditingTools';
import ZoomControls from './components/ZoomControls';
import 'cmmn-js-properties-panel/dist/assets/cmmn-js-properties-panel.css';
import 'cmmn-js/dist/assets/diagram-js.css';
import 'cmmn-js/dist/assets/cmmn-font/css/cmmn-embedded.css';
import {emptyCmmn} from './default/empty.cmmn';
import PropertiesPanel from './properties-panel/cmmn';
let scale = 1;
class CmmnModelerComponent extends Component {
  modeler = null;
  state = {
    xml: ``,
  };
  componentDidMount = () => {
    this.modeler = new CmmnModeler ({
      container: '#cmmmcanvas',
      keyboard: {
        bindTo: window,
      },
    });
    new PropertiesPanel ({
      container: this.refs.propertypanel,
      modeler: this.modeler,
      taskToggle: this.props.taskToggle,
      attachForm: this.props.attachForm,
      appForm: this.props.appForm,
    });
    this.modeler.on ('element.changed', e => {
      this.modeler.saveXML ({format: true}, (err, xml) => {
        this.setState ({xml: xml});
      });
    });
    if (this.props.xml) {
      this.openCmmnDiagram (this.props.xml);
    } else {
      this.newCmmnDiagram ();
    }
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.xml !== prevState.xml) {
      if (typeof this.props.getCMMNxml === 'function') {
        this.props.getCMMNxml (this.state.xml);
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
  newCmmnDiagram = () => {
    this.openCmmnDiagram (emptyCmmn);
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

  openCmmnDiagram = xml => {
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
          <div id="cmmmcanvas" ref="canvas" />
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
  }
}

export default CmmnModelerComponent;

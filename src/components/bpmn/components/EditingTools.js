import React from 'react';
import { MDBIcon } from 'mdbreact';
export default ({ onUndo, onRedo, onSave }) => (
  <div className="io-editing-tools" style={{ display: 'block', right: 300 }}>
    <ul className="io-control-list io-horizontal">
      <li className="io-control">
        <button title="undo" onClick={onUndo}>
          <MDBIcon icon="undo" />
        </button>
      </li>
      <li className="io-control">
        <button title="redo" onClick={onRedo}>
          <MDBIcon icon="redo" />
        </button>
      </li>
      {/* <li className="io-control">
        <button title="save" onClick={onSave}>
          <MDBIcon icon="save" />
        </button>
      </li> */}
    </ul>
  </div>
);

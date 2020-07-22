import React from 'react';
import { MDBIcon } from 'mdbreact';
export default ({ onZoomIn, onZoomOut, onZoomReset }) => (
  <div className="io-zoom-controls" style={{ right: 300 }}>
    <ul className="io-zoom-reset io-control io-control-list">
      <li>
        <button title="reset zoom" onClick={onZoomReset}>
          <MDBIcon icon="refresh" />
        </button>
      </li>
    </ul>

    <ul className="io-zoom io-control io-control-list">
      <li>
        <button title="zoom in" onClick={onZoomIn}>
          <MDBIcon icon="plus" />
        </button>
      </li>
      <li>
        <hr />
      </li>
      <li>
        <button href="" title="zoom out" onClick={onZoomOut}>
          <MDBIcon icon="minus" />
        </button>
      </li>
    </ul>
  </div>
);

import React from 'react';
import { Spinner } from 'mdbreact';
import './loader.scss';
const Loader = props => {
  return (
    <div>
      {props.load ? (
        <div className="loading">
          <Spinner big multicolor />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Loader;

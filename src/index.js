import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './containers/app/App';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'glyphicons-only-bootstrap/css/bootstrap.min.css';
import "./assets/scss/mdb-pro.scss";
import './assets/css/default.css';
import './assets/css/builder.css';
import './assets/fontawesome/css/fontawesome.min.css';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from './store/store';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

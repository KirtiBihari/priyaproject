import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {watchAuth,watchHome, watchOps,watchOrganisation, watchAppsManager} from './sagas';

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : null || compose;
const sagaMiddleware = createSagaMiddleware ();
const loggerMiddleware = createLogger ();
const store = createStore (
  reducers,
  composeEnhancers (
    applyMiddleware (thunkMiddleware, loggerMiddleware, sagaMiddleware)
  )
);
sagaMiddleware.run (watchAuth);
sagaMiddleware.run (watchHome);
sagaMiddleware.run (watchOps);
sagaMiddleware.run(watchOrganisation);
sagaMiddleware.run(watchAppsManager);


export default store;

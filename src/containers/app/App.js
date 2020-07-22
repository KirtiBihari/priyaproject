import React from 'react';
import {  Route,BrowserRouter,Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import {alertActions} from '../../store/actions/alertAction';
import {ToastContainer} from 'mdbreact';
import LoginForm from '../authenticator/LoginPage';
import {PrivateRoute} from '../../components/routing/PrivateRoute';
import HomePage from '../home/HomePage';
import * as actions from '../../store/actions';
import NotFound from '../../components/404/NotFound';
import './App.scss';

class App extends React.Component {
 
 
  render () {
    
    return (
      <React.Fragment>
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
        <BrowserRouter> 
        <Switch>
            <Route exact path="/login" component={LoginForm} />
            <PrivateRoute  path="/" component={HomePage} />
            <Route path={'*'} component={NotFound}/>
            </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}
function mapStateToProps (state) {
  return {
    alert: state.error,
    isAuthenticated: state.auth.authtoken !== null,
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch (actions.authCheckState ()),
    alertActions: () => dispatch (alertActions.clear ()),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (App);

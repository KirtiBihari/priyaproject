import React,{Component} from 'react';

import { MDBInput, MDBBtn, toast ,ToastContainer} from 'mdbreact';


import Loader from '../../components/Loader/Loader';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import './login.scss';
class LoginPage extends Component {
  state = {
    isLoading: false,
    username: '',
    password: ''
  };



  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  handleChange = event => {
    
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  handleSubmit = async event => {
    
    event.preventDefault();
    this.props.onAuth(this.state.username, this.state.password,this.redirectTo);

  };
  redirectTo=()=>{
    this.props.history.push('/');
  }
  componentDidUpdate(prevProps, prevState)
  {
    if(prevProps.error!==this.props.error){
    if(this.props.error){
      if(this.props.error=== 'Unauthorized'){
        toast.error('Please Check your Username/Password', {
          position: 'top-right'
        });
        
      }else{
        toast.error(this.props.error, {
          position: 'top-right'
        });
      }
    }
  }
  }

  render() {
    
   
    
    return (
      <div className="bg">
        <Loader load={this.props.loading} />
       
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
        <div className="logo" />
        <div className="abstract" />
        <div className="container ">
          <div className="login-container col-md-10">
            <div className="row">
              <div className="col-md-6 login-form-1">
                <div className="form-group">
                  <div className="applogo" />
                  <div className="apptitle" />
                </div>
                <h6 className="captiontxt">You're in safe hands </h6>

                <ul className="description">
                  <li>Easy to use</li>
                  <li>Delightful to interact with</li>
                  <li>Enhancing the Insurance experience</li>
                </ul>
              </div>

              <div className="col-md-6 login-form">
                <form onSubmit={this.handleSubmit}>
                  <h3>Welcome</h3>
                  <h6>Sign in to your account</h6>

                  <MDBInput
                    type="text"
                    hint="Your name"
                    icon="user"
                    iconclass="icon"
                    id="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    size="md"
                    label="username"
                  />

                  <MDBInput
                    type="password"
                    hint="Your password"
                    icon="lock"
                    iconclass="white-text"
                    id="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    size="md"
                    label="password"
                  />

                  <div className="form-group text-right">
                    <button className="btn btn-link btnForgetPwd" value="Login">
                      Forgot Password?
                    </button>
                  </div>
                  <div className="form-group">
                    <MDBBtn type="submit" className="btnSubmit">
                      Login
                    </MDBBtn>
                  </div>
                  <div className="form-group createacc">
                    New to OpsManager? {''}
                    <button href="#" className="btn btn-link btnForgetPwd" value="Login">
                      Create a New Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          A Product of:{' '}
          <a
            href="http://touchqlik.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="tqlogo" target="_blank" />
          </a>{' '}
          <a href="http://touchqlik.com/">TouchQlik Inc.</a>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authData: state.auth.authtoken,
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password,cb) => dispatch(actions.auth(username, password,cb))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);

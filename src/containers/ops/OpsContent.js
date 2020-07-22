import React, {Component} from 'react';
import {MDBContainer, ToastContainer} from 'mdbreact';
import Loader from '../../components/Loader/Loader';
import TopContent from './TopContent';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';
import RequestList from './RequestList';
import './Ops.scss';
class OpsContent extends Component {
  componentDidMount = () => {
    this.props.getTopContent ();
    this.props.getCaseList ();
    this.props.getRequestList ();
  };
  navigateToAdd = () => {
    this.props.history.push ('/addcase');
  };

  render () {
    return (
      <React.Fragment>
        <Loader load={this.props.loading} />
        <ToastContainer
          hideProgressBar={true}
          newestOnTop={true}
          autoClose={5000}
        />
        <MDBContainer fluid className="mt-2 mx-auto">

          <TopContent topContent={this.props.topContent} />
          <RequestList
            navigate={this.navigateToAdd}
            data={this.props.requestList}
            upload={e => this.onChange (e)}
            edit={prop => this.onEditHandler (prop)}
            download={item => this.downloadAction (item)}
          />
        </MDBContainer>

      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    topContent: state.ops.topContent,
    requestList: state.ops.requestList,
    caseList: state.ops.caseList,
    loading: state.ops.loading,
    error: state.ops.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTopContent: () => dispatch (actions.topContent ()),
    getRequestList: () => dispatch (actions.requestListFetch ()),
    getCaseList: () => dispatch (actions.caseListFetch ()),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (OpsContent);

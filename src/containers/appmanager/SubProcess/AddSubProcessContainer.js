import React, {Component} from 'react';
import AddSubProcess from './AddSubProcess';
import {MDBAnimation} from 'mdbreact';
import HumanTaskModal from './HumanTaskModal';
import {emptyCmmn} from '../../../components/bpmn/default/empty.cmmn';
import DecisionTaskModal from './DecisionTaskModal';
import ProcessTaskModal from './ProcessTaskModal';
import CaseTaskModal from './CaseTaskModal';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
class AddSubProcessContainer extends Component {
  state = {
    type: '',
    xml: emptyCmmn,
    attachForm: {id: '', name: ''},
  };
  taskToggle = type => {
    this.setState ({type: type});
    switch (type) {
      case 'cmmn:HumanTask':
        this.props.setBreadCrum ('Form List');
        break;

      case 'cmmn:DecisionTask':
        this.props.setBreadCrum ('Rules List');
        break;
      case 'cmmn:ProcessTask':
        this.props.setBreadCrum ('Process List');
        break;
      case 'cmmn:CaseTask':
        this.props.setBreadCrum ('SubProcess List');
        break;
      case '':
        this.props.removeBreadCrum ();
        break;

      default:
        break;
    }
  };
  setXmlState = xml => {
    this.setState ({xml});
  };
  componentDidMount () {
    this.props.setHeader ('Add SubProcess');
    this.props.setBreadCrum ('Add Subprocess');
  }
  attachRules = rulesObj => {
    this.setState ({
      type: '',
      attachForm: {name: rulesObj.ruledefId, id: rulesObj.id, type: 'rules'},
    });
    this.props.removeBreadCrum ();
  };
  setAttachProcessForm = form => {
    this.setState ({
      attachForm: {id: form._id, name: form.title, type: 'form'},
      type: '',
    });
    this.props.removeBreadCrum ();
  };
  setAttachProcess = form => {
    this.setState ({
      attachForm: {id: form.id, name: form.procdefid, type: 'process'},
      type: '',
    });
    this.props.removeBreadCrum ();
  };
  setAttachCase = form => {
    this.setState ({
      attachForm: {id: form.id, name: form.name, type: 'case'},
      type: '',
    });
    this.props.removeBreadCrum ();
  };

  render () {
    return (
      <MDBAnimation type="slideInUp">
        <div
          style={
            this.state.type === '' ? {display: 'block'} : {display: 'none'}
          }
        >
          <AddSubProcess
            taskToggle={this.taskToggle}
            toggleAddSubProcess={this.props.toggleAddSubProcess}
            subProcessId={this.props.subProcessId}
            xml={this.state.xml}
            setXmlState={this.setXmlState}
            attachForm={this.state.attachForm}
          />
        </div>
        <div
          style={
            this.state.type === 'cmmn:HumanTask'
              ? {display: 'block'}
              : {display: 'none'}
          }
        >
          <HumanTaskModal
            taskToggle={this.taskToggle}
            setHeader={this.props.setHeader}
            setAttachProcessForm={this.setAttachProcessForm}
          />
        </div>
        <div
          style={
            this.state.type === 'cmmn:DecisionTask'
              ? {display: 'block'}
              : {display: 'none'}
          }
        >
          <DecisionTaskModal
            taskToggle={this.taskToggle}
            setHeader={this.props.setHeader}
            attachRules={this.attachRules}
          />
        </div>
        <div
          style={
            this.state.type === 'cmmn:ProcessTask'
              ? {display: 'block'}
              : {display: 'none'}
          }
        >
          <ProcessTaskModal
            taskToggle={this.taskToggle}
            setHeader={this.props.setHeader}
            setAttachProcess={this.setAttachProcess}
          />
        </div>
        <div
          style={
            this.state.type === 'cmmn:CaseTask'
              ? {display: 'block'}
              : {display: 'none'}
          }
        >
          <CaseTaskModal
            taskToggle={this.taskToggle}
            setHeader={this.props.setHeader}
            setAttachCase={this.setAttachCase}
          />
        </div>
      </MDBAnimation>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  setBreadCrum: pageName => dispatch (actions.setBreadCrum (pageName)),
  removeBreadCrum: () => dispatch (actions.removeBreadCrum ()),
});

export default connect (mapStateToProps, mapDispatchToProps) (
  AddSubProcessContainer
);

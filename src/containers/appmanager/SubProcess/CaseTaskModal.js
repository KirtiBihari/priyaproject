import React, {useState, useEffect} from 'react';
import Loader from '../../../components/Loader/Loader';
import {ToastContainer, toast} from 'mdbreact';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  MDBDropdown,
  MDBBtn,
  MDBIcon,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';
import {TQDataTable} from '../../../TQComponents';
const CaseTaskModal = props => {
  const {getSubProcessList, setHeader} = props;
  const assembleSubProcesses = () => {
    if (props.subProcessList.length > 0) {
      let processes = props.subProcessList.map (item => {
        return {
          subProcessId: item.subProcDefId,
          subProcessName: item.name,

          action: (
            <MDBDropdown size="sm">
              <MDBDropdownToggle floating tag="a" color="primary">
                <MDBIcon icon="fas fa-ellipsis-v" />
              </MDBDropdownToggle>
              <MDBDropdownMenu className="fixed-top" basic z-index="10">
                <MDBDropdownItem onClick={() => props.setAttachCase (item)}>
                  <MDBIcon icon="trash" className="mr-2" />
                  Attach SubProcess
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          ),
        };
      });
      return processes;
    }
  };
  const renderSubProcesses = () => {
    let subProcessData = {
      columns: [
        {
          label: 'Sub-Process ID',
          field: 'subProcessId',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'Sub-Process Name',
          field: 'subProcessName',
          sort: 'asc',
          width: 250,
        },

        {
          label: 'Action',
          field: 'action',
          sort: 'asc',
          width: 50,
        },
      ],
      rows: props.subProcessList ? assembleSubProcesses () : null,
    };
    return subProcessData;
  };
  useEffect (
    () => {
      getSubProcessList ();
      setHeader ('Process List');
    },
    [getSubProcessList, setHeader]
  );
  return (
    <div>
      <Loader load={props.loading} />
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
      />
      <TQDataTable striped bordered hover data={renderSubProcesses ()} />
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.subprocess.loading,
  subProcessList: state.subprocess.subProcessList,
  status: state.subprocess.status,
});

const mapDispatchToProps = dispatch => {
  return {
    getSubProcessList: () => dispatch (actions.subprocessListProcess ()),
    deleteSubProcess: (data, cb) =>
      dispatch (actions.subprocessDelProcess (data, cb)),
  };
};

export default connect (mapStateToProps, mapDispatchToProps) (CaseTaskModal);

import React from 'react';
import {ToastContainer, toast} from 'mdbreact';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import Loader from '../../../components/Loader/Loader';
import {
  MDBDropdown,
  MDBIcon,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
} from 'mdbreact';
import {TQDataTable} from '../../../TQComponents';
import {useEffect} from 'react';
const ProcessList = props => {
  const {getProcessList} = props;
  const assembleProcesses = () => {
    let processes = props.processList.map (item => {
      return {
        processId: item.procdefid,
        processName: item.name,

        action: (
          <MDBDropdown size="sm">
            <MDBDropdownToggle floating tag="a" color="primary">
              <MDBIcon icon="fas fa-ellipsis-v" />
            </MDBDropdownToggle>

            <MDBDropdownMenu className="fixed-top" basic z-index="10">
              <MDBDropdownItem onClick={() => props.setAttachProcess (item)}>
                <MDBIcon icon="edit" className="mr-2" />
                Attach Process
              </MDBDropdownItem>

            </MDBDropdownMenu>
          </MDBDropdown>
        ),
      };
    });
    return processes;
  };

  const renderProcesses = () => {
    let processData = {
      columns: [
        {
          label: 'App ID',
          field: 'processId',
          sort: 'asc',
          width: 150,
        },
        {
          label: 'App Name',
          field: 'processName',
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
      rows: assembleProcesses (),
    };
    return processData;
  };
  useEffect (
    () => {
      getProcessList ();
    },
    [getProcessList]
  );
  return (
    <div>
      <Loader load={props.loading} />
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
      />
      <TQDataTable striped bordered hover data={renderProcesses ()} />
    </div>
  );
};
const mapStateToProps = state => ({
  loading: state.process.loading,
  processList: state.process.processList,
  status: state.process.status,
});

const mapDispatchToProps = dispatch => {
  return {
    getProcessList: () => dispatch (actions.processListProcess ()),
    resetProcess: () => dispatch (actions.processReset ()),
  };
};
export default connect (mapStateToProps, mapDispatchToProps) (ProcessList);

import React, {useState} from 'react';
import {
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBAnimation,
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdbreact';
import SubProcessList
  from '../../../containers/appmanager/SubProcess/SubProcessList';

import AddSubProcessContainer
  from '../../../containers/appmanager/SubProcess/AddSubProcessContainer';
import Breadcrumb from '../../breadcrumb/Breadcrumb';
const SubProcessTaskModal = ({modal, toggle, setAttachSubProcessForm}) => {
  const [addSubProcess, setAddSubProcess] = useState (false);
  const [subProcessId, setSubProcessId] = useState ('');
  const [subProcessForm, setSubProcessForm] = useState ('');
  const [header, setHeader] = useState ('Sub Process Task List');
  const toggleAddSubProcess = item => {
    setAddSubProcess (!addSubProcess);
    if (Object.keys (item).length > 0) {
      setSubProcessId (item.id);
    } else {
      setSubProcessId ('');
    }
    if (addSubProcess) {
      setHeader ('Sub Process Task List');
    }
  };

  return (
    <MDBModal
      isOpen={modal}
      toggle={toggle}
      size="xl"
      fullHeight
      position="right"
    >
      <MDBModalHeader toggle={toggle}>
        {' '}
        {header}

      </MDBModalHeader>
      <MDBModalBody>
        <Breadcrumb />
        {addSubProcess
          ? <MDBAnimation type="slideInUp">
              <AddSubProcessContainer
                toggleAddSubProcess={toggleAddSubProcess}
                subProcessId={subProcessId}
                setHeader={setHeader}
              />
            </MDBAnimation>
          : <SubProcessList
              toggleAddSubProcess={toggleAddSubProcess}
              setAttachSubProcessForm={setAttachSubProcessForm}
            />}
      </MDBModalBody>

    </MDBModal>
  );
};

export default SubProcessTaskModal;

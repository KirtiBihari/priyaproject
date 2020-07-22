import React,{useState} from 'react';
import { MDBAnimation, MDBIcon, MDBBtn } from 'mdbreact';
import ProcessList from './ProcessList';

const ProcessTaskModal = (props) => {
    const [addProcessForm, setAddProcessForm] = useState (false);
  const [editProcessForm, setEditProcessForm] = useState ('');
  const toggleAddForm = item => {
    setAddProcessForm (!addProcessForm);
    if(Object.keys (item).length>0){
        editProcessForm (item._id);
    }else{
        setEditProcessForm ('');
    }
    if(!addProcessForm){
      props.setHeader('Add Process Form ')
    }
    
  };
  if(!addProcessForm){
    props.setHeader('Process List')
  }
    return (
        <>
          {addProcessForm
          ? <MDBAnimation type="slideInUp">
            </MDBAnimation>
          :(
          <React.Fragment>
             <div className="d-flex justify-content-end"><MDBBtn
            tag="a"
            floating
            color="red"
            size="sm"
            onClick={()=>props.taskToggle('')}
          >
            <MDBIcon icon="arrow-left" />
          </MDBBtn></div>
          <div><ProcessList toggleAddForm={toggleAddForm} setAttachProcess ={props.setAttachProcess } /></div></React.Fragment>)
        }   
        </>
    );
};

export default ProcessTaskModal;
import React from 'react';

import CurrencyFormat from 'react-currency-format';
import {
  MDBBtn,
  MDBIcon,
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle
} from 'mdbreact';
import { TQDataTable } from '../../TQComponents';

const RequestList = props => {
  console.log(props.data);
  const assembleCase = () => {
    if(props.data.length >  0) {
      let cases = props.data.map(item => {
        item = item['taskExtn'];
        return {
          casenumber: item.id,
          insured: <div className="text-wrap">{item.insuredName}</div>,
          broker: <div className="text-wrap">{item.brokerName}</div>,
          startDate: new Date(item.startDate).toLocaleDateString(),
          endDate: new Date(item.endDate).toLocaleDateString(),
          sumInsured: (
            (item.sumInsured!==null || item.sumInsured!== undefined)?
            <CurrencyFormat
              value={item.sumInsured}
              displayType={'text'}
              thousandSeparator={true}
            />: <CurrencyFormat
            value={0}
            displayType={'text'}
            thousandSeparator={true}
          />
          ),
          status: (
            <div>
              <b>{item.request_status}</b>
            </div>
          ),
          action: (
            <MDBDropdown size="sm">
              <MDBDropdownToggle  tag="a" color="primary">
                <MDBIcon icon="fas fa-ellipsis-v" />
              </MDBDropdownToggle>
  
              <MDBDropdownMenu className="fixed-top" basic z-index="10">
                <MDBDropdownItem onClick={() => props.edit(item)}>
                  <MDBIcon icon="edit" className="mr-2" />
                  Edit
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <MDBIcon icon="eye" className="mr-2" />
                  View
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <MDBIcon icon="trash" className="mr-2" />
                  Delete
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <MDBIcon icon="times" className="mr-2" />
                  UnClaim
                </MDBDropdownItem>
                <MDBDropdownItem divider />
  
                <MDBDropdownItem onClick={() => props.download(item)}>
                  <MDBIcon icon="download" className="mr-2" />
                  Download
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          )
        };
      });
      return cases;
    }
    
  };

  const caseData = {
    columns: [
      {
        label: 'Request ID',
        field: 'casenumber',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Insured',
        field: 'insured',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Broker',
        field: 'broker',
        sort: 'asc',
        width: 250
      },
      {
        label: 'Policy Start',
        field: 'startDate',
        sort: 'asc',
        width: 50
      },
      {
        label: 'Policy End',
        field: 'endDate',
        sort: 'asc',
        width: 50
      },
      {
        label: 'Sum Insured',
        field: 'sumInsured',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Action',
        field: 'action',
        sort: 'asc',
        width: 10
      }
    ],
    rows: assembleCase()
  };
 
  return (
    <div>
      <div className="float-right ">
        <MDBBtn color="primary" onClick={props.navigate}>
          <MDBIcon icon="plus" className="mr-1" /> Add
        </MDBBtn>

        <input
          color="primary"
          type="file"
          className="btn btn-primary"
          onChange={e => props.upload(e)}
        />
      </div>
      <div className="clearfix" />

      <TQDataTable striped bordered hover data={caseData} />
    </div>
  );
};

export default RequestList;

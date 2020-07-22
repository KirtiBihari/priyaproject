import React, {useState, useEffect} from 'react';
import {MDBModalBody, MDBBreadcrumb, MDBBreadcrumbItem} from 'mdbreact';
import './Breadcrumb.scss';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';

const Breadcrumb = props => {
  useEffect (() => {
    props.getBreadCrum ();
  });

  return (
    <MDBBreadcrumb>
      {props.pageList.map (page => (
        <MDBBreadcrumbItem>{page}</MDBBreadcrumbItem>
      ))}

    </MDBBreadcrumb>
  );
};

const mapStateToProps = state => ({
  pageList: state.breadcrum.pageList,
});

const mapDispatchToProps = dispatch => ({
  getBreadCrum: () => dispatch (actions.getBreadCrum ()),
});

export default connect (mapStateToProps, mapDispatchToProps) (Breadcrumb);

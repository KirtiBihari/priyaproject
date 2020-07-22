import React from 'react';

import Tiles from '../../components/Tiles/Tiles';
import * as actions from '../../store/actions';
import {MDBRow, MDBCollapse} from 'mdbreact';

import {connect} from 'react-redux';
class HomeContent extends React.Component {
    state = {
        collapseID: 'collapse1',
      };

      componentDidMount () {
        this.props.getHomeTilesList ();
      }
      toggleCollapse = collapseID => () =>
      this.setState (prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : '',
      }));
  
    render(){
        const {collapseID} = this.state;
    const {homeTiles,addTabs}=this.props;
    return (
        <React.Fragment>
        <div onClick={this.toggleCollapse ('collapse1')} className="mt-3">

        <div className="collapseHeader">
          {' '}
          <i
            className={
              collapseID === 'collapse1'
                ? 'fa fa-angle-down rotate-icon'
                : 'fa fa-angle-down'
            }
          />
          {' '}
          All Apps
        </div>
      </div>
    
      <MDBCollapse id="collapse1" isOpen={collapseID}>
        
          <MDBRow>
         
          {homeTiles.map((tiles,key) => {
            return <Tiles {...tiles} key={key} addTabs={(to,title)=>addTabs(to,title)} />;
           })}
          
          </MDBRow>
       
      </MDBCollapse>
</React.Fragment>
    );
        }
};
const mapStateToProps = state => {
    return {
      homeTiles: state.home.hometiles,
    };
  };
  
  const mapDispatchToProps = dispatch => ({
    getHomeTilesList: () => dispatch (actions.getHomeTilesList ()),
  });

export default connect (mapStateToProps, mapDispatchToProps) (HomeContent);
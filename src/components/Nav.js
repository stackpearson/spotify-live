import React from 'react';
import {connect} from 'react-redux';
import {logOut} from '../actions/userActions';

const Nav = (props) => {



    return (<>
        <div className='nav-bar'>
            <div className='user-box'>
                <span>{props.userOnProps.user}</span>
                <span className='logout' onClick = {() => props.logOut()}>Logout</span>
            </div>
        </div>
        
    </>)
}

const mapStateToProps = state => {
    return {
        userOnProps: state.userReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    {logOut}
  )(Nav)
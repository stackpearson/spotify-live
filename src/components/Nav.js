import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {logOut} from '../actions/userActions';

const Nav = (props) => {



    return (<>
    
        <div className='nav-bar'>
            <div className='user-box'>
                <span>{props.userOnProps.user}</span>
                <Link to='/' className='logout' onClick = {() => props.logOut()}>Logout</Link>
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
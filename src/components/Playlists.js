import React from 'react';
import {connect} from 'react-redux';

const Playlists = (props) => {
    
    return(<>
        <p>Playlists</p>
    </>)
}

const mapStateToProps = state => {
    return {
        userOnProps: state.userReducer
    }
  }
  
  export default connect(
    mapStateToProps,
    {}
  )(Playlists)
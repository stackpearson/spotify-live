import React, {useEffect} from 'react';
import Login from './Login';
import {getToken} from '../utils/auth-entry';
import Dashboard from './Dashboard';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {connect} from 'react-redux';
import {setUser, setToken} from '../actions/userActions';
import {useHistory} from 'react-router-dom'


function App(props) {

  // let history = useHistory();

 const getUser = () => {
    axiosWithAuth()
    .get('/me')
    .then(info => {
        console.log('succesful get', info)
        props.setUser(info.data.display_name)
    })
    .catch(error => {
        console.log('failed get', error)
    })
  }

  useEffect(() => {
    const hash = getToken();
    window.location.hash = '';
    const _token = hash.access_token
    localStorage.setItem('auth-token', _token)
    props.setToken(_token)
    getUser()
  }, [])

  // useEffect(() => {
  //   history.pushState()
  // }, [props.authToken])


  return (
    <div className="App">
      {props.userOnProps.authToken ? (
        <Dashboard />
      ):(
        <Login />
        )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
      userOnProps: state.userReducer
  }
}

export default connect(
  mapStateToProps,
  {setUser, setToken}
)(App)
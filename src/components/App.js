import React, {useEffect} from 'react';
import Login from './Login';
import PrivateRoute from '../utils/PrivateRoute';
import {getToken} from '../utils/auth-entry';
import Dashboard from './Dashboard';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import {connect} from 'react-redux';
import {setUser, setToken} from '../actions/userActions';
import {Route, Switch, useHistory} from 'react-router-dom';


function App(props) {

  let history = useHistory();

 const getUser = () => {
    axiosWithAuth()
    .get('/me')
    .then(info => {
        console.log('succesful get', info)
        props.setUser(info.data.display_name)
        history.push('/dashboard')
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




  return (<>
    <Switch>
      <Route exact path='/' component={Login} />
      <PrivateRoute path='/dashboard' component={Dashboard} />
    </Switch>
  </>);

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
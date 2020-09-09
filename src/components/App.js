import React, {useEffect} from 'react';
import Login from './Login';
import {getToken} from '../utils/auth-entry';
import Dashboard from './Dashboard';


function App() {

  useEffect(() => {
    const hash = getToken();
    window.location.hash = '';
    const _token = hash.access_token
    localStorage.setItem('auth-token', _token)
  }, [])

  return (
    <div className="App">
      {localStorage.getItem('auth-token') ? (
        // <Login />
        <Dashboard />
      ):(

        // <Dashboard />
        <Login />

        )}
      
      
    </div>
  );
}

export default App;

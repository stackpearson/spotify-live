import React from 'react';
import {loginUrl} from '../utils/auth-entry';

const Login = () => {

    return (<>
        <button><a href={loginUrl}>Login with spotify</a></button>
    </>)
}

export default Login;
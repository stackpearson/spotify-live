import React from 'react';
import {loginUrl} from '../utils/auth-entry';

const Login = () => {

    return (<>
        <div className='login-page'>
            <div className='login-container'>
                <div>
                    <img className='img' src='https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg' alt='spotify logo' />
                </div>
                <h1>Dive into your spotify data!</h1>
                <div className='link-container'><a href={loginUrl} className='login-link'>Login With Spotify</a></div>
            </div>
        </div >
    </>)
}

export default Login;
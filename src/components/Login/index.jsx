import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Login.css';

const Login = props => {

    const onClickLogin = () => {
        window.location.href = "/home"
    }
    return (
        <div className="page-login">
            <div className="login-app">
                <div className="login-app-left">
                    <div className="content-login">
                        <h3>Welcome to Edu-TN</h3>
                        
                        <div className="content-text-field">
                            <TextField id="filled-basic" label="Username" variant="filled" />
                        </div>

                        <div className="content-text-field">
                            <TextField
                                id="filled-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                variant="filled"
                            />
                        </div>
                    
                        <div className="content-button">
                            <Button variant="contained" color="primary" onClick={onClickLogin}>
                                Login
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="login-app-right"></div>
            </div>
        </div>
        
    );
};

export default Login;
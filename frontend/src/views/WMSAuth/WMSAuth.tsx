import { FormGroup, Form, FormLabel, FormControl } from 'react-bootstrap';
import { BannerContainer, ConfirmButton, FormContainer } from './WMSAuth.styles';
import React, { useEffect, useState } from 'react';
import { LoadingAnimation } from '../ResetPassword/ResetPassword.styles';
import { authorizeWMS, postLogin } from '../../apis/ldapManager';
import './WMSAuth.css';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import Notification from '../../components/Notification/Notification';

export const WMSAuth = () => {
    const { target } = useParams();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isWaiting, setIsWaiting] = useState(false);
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    console.log(target);

    const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setLoginError('');
        setIsWaiting(true);
        const response = await authorizeWMS(username, password);
        console.log(response);
        console.log(target);
        if (response.error) {
            setLoginError(response.error.toString());
            setIsWaiting(false);
        } else {
            console.log(response);
            setIsWaiting(false);
            if (target) {
                window.location.href = `http://${target}`;
            }
        }
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         navigate('/admin/users');
    //     }
    // }, [token, navigate]);
    return (
        <>
            <Notification message={loginError} setMessage={setLoginError} />
            <FormContainer>
                <BannerContainer>WMS Authentication</BannerContainer>
                <Form className="form">
                    <FormGroup className="formGroup">
                        <FormLabel>Username</FormLabel>
                        <FormControl
                            placeholder="Enter password"
                            className="formInput"
                            onChange={handleUsernameChange}
                        />
                    </FormGroup>
                    <FormGroup className="formGroup">
                        <FormLabel>Password</FormLabel>
                        <FormControl
                            type="password"
                            placeholder="Confirm password"
                            className="formInput"
                            onChange={handlePasswordChange}
                        />
                    </FormGroup>

                    <ConfirmButton onClick={handleSubmit}>Login</ConfirmButton>
                    {isWaiting && <LoadingAnimation />}
                </Form>
            </FormContainer>
        </>
    );
};

export default WMSAuth;

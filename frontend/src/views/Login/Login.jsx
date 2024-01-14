import { FormGroup, Form, FormLabel, FormControl } from "react-bootstrap";
import { BannerContainer, ConfirmButton, FormContainer } from "./Login.styles";
import React, { useEffect, useState } from "react";
import { LoadingAnimation } from "../ResetPassword/ResetPassword.styles";
import "./Login.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import Notification from "../../components/Notification/Notification";

export const Login = () => {
    const { token, setToken } = useOutletContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isWaiting, setIsWaiting] = useState(false);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        setIsWaiting(true);
        // const response = await postLogin(username, password);
        // if (response.error) {
        //     setLoginError(response.error.toString());
        //     setIsWaiting(false);
        // } else {
        //     setToken(response.token);
        //     localStorage.setItem("token", response.token);
        //     setIsWaiting(false);
        //     navigate("/admin/users");
        // }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/admin/users");
        }
    }, [token, navigate]);
    return (
        <>
            <Notification message={loginError} setMessage={setLoginError} />
            <FormContainer>
                <BannerContainer>LDAP Admin Panel</BannerContainer>
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

                    <ConfirmButton onClick={handleSubmit}>Confirm</ConfirmButton>
                    {isWaiting && <LoadingAnimation />}
                </Form>
            </FormContainer>
        </>
    );
};

export default Login;

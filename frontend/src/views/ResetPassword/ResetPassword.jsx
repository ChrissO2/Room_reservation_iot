import { FormGroup, Form, FormLabel, FormControl } from "react-bootstrap";
import {
    BannerContainer,
    ConfirmButton,
    FormContainer,
    LoadingAnimation,
} from "./ResetPassword.styles";
import React, { useEffect, useState } from "react";
import { postResetPassword } from "../../apis/ldapManager";
import "./ResetPassword.css";
import Notification from "../../components/Notification/Notification";
import { useNavigate } from "react-router-dom";

const passwordMismatchError = "Passwords do not match";
const passwordLengthError = "Password must be at least 8 characters long";

const getRequestID = () => {
    return window.location.pathname.split("/").pop();
};

export const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState(passwordLengthError);
    const [requestConfirmationStatus, setRequestConfirmationStatus] =
        useState("default");
    const [requestConfirmationMessage, setRequestConfirmationMessage] =
        useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestId = getRequestID();
        setRequestConfirmationStatus("loading");

        postResetPassword(requestId, password).then((response) => {
            console.log(response);
            if (response.error) {
                setRequestConfirmationStatus("error");
                setRequestConfirmationMessage(response.error.toString());
            } else {
                setRequestConfirmationStatus("success");
                setRequestConfirmationMessage(response.message);
            }
        });
    };

    const handlePasswordValidation = (passwordA, passwordB) => {
        if (passwordA.length < 8) {
            setPasswordError(passwordLengthError);
        } else if (passwordA !== passwordB) {
            setPasswordError(passwordMismatchError);
        } else {
            setPasswordError("");
        }
    };

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        handlePasswordValidation(newPassword, confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const newPassword = e.target.value;
        setConfirmPassword(newPassword);
        handlePasswordValidation(newPassword, password);
    };

    useEffect(() => {
        if (requestConfirmationStatus === "success") {
            setTimeout(() => {
                navigate("/our-services");
            }, 1000);
        }
    }, [requestConfirmationStatus, navigate]);

    return (
        <>
            <Notification
                message={requestConfirmationMessage}
                setMessage={setRequestConfirmationMessage}
            />
            <FormContainer>
                <BannerContainer>Reset Password</BannerContainer>
                <Form className="form">
                    <FormGroup className="formGroup">
                        <FormLabel>New Password</FormLabel>
                        <FormControl
                            type="password"
                            placeholder="Enter password"
                            className="formInput"
                            onChange={handlePasswordChange}
                        />
                    </FormGroup>
                    <FormGroup className="formGroup">
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl
                            type="password"
                            placeholder="Confirm password"
                            className="formInput"
                            onChange={handleConfirmPasswordChange}
                        />
                        {passwordError && (
                            <FormLabel className="formError">{passwordError}</FormLabel>
                        )}
                    </FormGroup>

                    <ConfirmButton disabled={passwordError !== ""} onClick={handleSubmit}>
                        Confirm
                    </ConfirmButton>
                </Form>
                {requestConfirmationStatus === "loading" && <LoadingAnimation />}
            </FormContainer>
        </>
    );
};

export default ResetPassword;

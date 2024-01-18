import { FormGroup, Form, FormLabel, FormControl } from "react-bootstrap";
import { BannerContainer, ConfirmButton, FormContainer } from "./Login.styles";
import React, { useEffect, useState } from "react";
import { LoadingAnimation } from "../ResetPassword/ResetPassword.styles";
import "./Login.css";
import { useNavigate, useOutletContext } from "react-router-dom";
import { NotificationContext } from "../../components/Notification/NotifcationProvider";
import Notification from "../../components/Notification/Notification";
import meetingAxios, {
  login,
  MeetingRoomAxios,
} from "../../apis/meetingRoomAxios.js";

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
    try {
      const response = await login(username, password);
      console.log(response);
      setToken(response.data.access);
      localStorage.setItem("token", response.data.access);
      setIsWaiting(false);
      navigate("/meetings");
    } catch {
      setIsWaiting(false);
      setLoginError("Niepoprawne dane logowania");
    }
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
      navigate("/meetings");
    }
  }, [token, navigate]);
  return (
    <>
      <Notification message={loginError} setMessage={setLoginError} />
      <FormContainer>
        <BannerContainer>Meeting Room System</BannerContainer>
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

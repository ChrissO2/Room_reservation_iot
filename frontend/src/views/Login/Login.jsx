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
import { useAuth } from "../../components/Auth/AuthProvider";

export const Login = () => {
  const { token, setToken } = useAuth();

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
        <BannerContainer>System rezerwacji sal</BannerContainer>
        <Form className="form">
          <FormGroup className="formGroup">
            <FormLabel>Nazwa użytkownika</FormLabel>
            <FormControl
              placeholder="Enter password"
              className="formInput"
              onChange={handleUsernameChange}
            />
          </FormGroup>
          <FormGroup className="formGroup">
            <FormLabel>Hasło</FormLabel>
            <FormControl
              type="password"
              placeholder="Confirm password"
              className="formInput"
              onChange={handlePasswordChange}
            />
          </FormGroup>

          <ConfirmButton onClick={handleSubmit}>Zaloguj</ConfirmButton>
          {isWaiting && <LoadingAnimation />}
        </Form>
      </FormContainer>
    </>
  );
};

export default Login;

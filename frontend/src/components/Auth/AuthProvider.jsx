import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getMeetings } from "../../apis/meetingRoomAxios";

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const AuthContext = createContext({
    token: "",
    setToken: () => { },
});

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const PrivateRoute = () => {
    const { token, setToken } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        getMeetings(token).catch(() => {
            localStorage.setItem("token", "");
            setToken("");
            navigate("/");
        });
    }, []);

    if (!token) {
        navigate("/");
    }

    return <Outlet />;
};

export default AuthProvider;

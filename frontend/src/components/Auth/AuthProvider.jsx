import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

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

const AuthProvider = () => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        }
    }, [navigate, setToken, token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            <Outlet context={{ token, setToken }} />
        </AuthContext.Provider>
    );
};
export default AuthProvider;

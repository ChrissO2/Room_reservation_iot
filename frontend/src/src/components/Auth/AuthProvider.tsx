import React, { createContext, useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getUsers } from '../../apis/ldapManager';

interface AuthContextInterface {
    token: string;
    setToken: (token: string) => void;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const AuthContext = createContext<AuthContextInterface>({ token: '', setToken: () => {} });

const AuthProvider = () => {
    const [token, setToken] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');
        }
        getUsers(token).then((response) => {
            if (response.error) {
                navigate('/');
            } else {
                setToken(token!);
            }
        });
    }, [navigate, setToken, token]);

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            <Outlet context={{ token, setToken }} />
        </AuthContext.Provider>
    );
};
export default AuthProvider;

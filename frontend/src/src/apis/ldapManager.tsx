import axios, { AxiosError } from 'axios';
import { User } from '../views/AdminPanel/UsersList/UsersList';

const API_URL =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_LDAP_API_PROD_URL
        : process.env.REACT_APP_LDAP_API_DEV_URL;

export const LdapManagerAxios = (token?: string, customHeaders?: Object) => {
    return axios.create({
        baseURL: API_URL,
        withCredentials: true,
        headers: customHeaders
            ? { ...customHeaders, ...getAuthenticationHeaders(token) }
            : getAuthenticationHeaders(token),
    });
};
const getAuthenticationHeaders = (token?: string) => {
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token || ''}`,
    };
};

export const axiosDecorator = (axiosFunction: Function) => {
    return async (...args: any) => {
        try {
            const response = await axiosFunction(...args);
            return response.data;
        } catch (e: unknown) {
            const error = e as AxiosError;
            if (error.response) {
                return { error: error.response.data };
            }
            return { error: error };
        }
    };
};
export const postLogin = axiosDecorator(async (username: string, password: string) => {
    return await LdapManagerAxios().post('/login', {
        username,
        password,
    });
});
export const postResetPassword = axiosDecorator(async (requestId: string, password: string) => {
    return await LdapManagerAxios().post('/password-reset', {
        requestId,
        password,
    });
});

export const getUsers = axiosDecorator(async (token: string) => {
    return await LdapManagerAxios(token).get('/admin/search-users');
});

export const getGroups = axiosDecorator(async (token: string) => {
    return await LdapManagerAxios(token).get('/admin/search-groups');
});

export const postAddUser = axiosDecorator(async (token: string, user: User) => {
    return await LdapManagerAxios(token).post('/admin/add-user', {
        ...user,
    });
});

export const postModifyUser = axiosDecorator(async (token: string, user: User) => {
    return await LdapManagerAxios(token).post('/admin/modify-user', {
        ...user,
    });
});

export const postGenerateRestorePasswordLink = axiosDecorator(async (token: string, user: User) => {
    return await LdapManagerAxios(token).post('/admin/create-request-link', {
        ...user,
    });
});

export const getPasswordResetRequests = axiosDecorator(async (token: string) => {
    return await LdapManagerAxios(token).get('/admin/password-reset-requests');
});

export const deleteUser = axiosDecorator(async (token: string, userId: string) => {
    return await LdapManagerAxios(token).delete(`/admin/delete-user?id=${userId}`);
});

export const deletePasswordResetRequest = axiosDecorator(async (token: string, requestId: string) => {
    return await LdapManagerAxios(token).delete(`/admin/deactivate-request-link?id=${requestId}`);
});

export const authorizeWMS = axiosDecorator(async (username: string, password: string, target: string) => {
    console.log('Passed target: ' + target);
    return await LdapManagerAxios().post('/wms-login', {
        username,
        password,
    });
});

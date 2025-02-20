import { createContext, useContext, useEffect, useState } from 'react';  
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface AuthProps {
    authState: { token: string | null; authenticated: boolean | null; user_id: string | null };
    onRegister: (email: string, password: string, first_name: string, last_name: string, phone_number: string, location: string, date_of_birth: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<any>;
    onVerifyEmail: (email: string, otp: string) => Promise<any>;
    onSendOTP: (email: string) => Promise<any>;
    onResetPassword: (email: string, newPassword: string) => Promise<any>;
    onChangePassword: (oldPassword: string, newPassword: string) => Promise<any>;
    initialized: boolean;
}

const TOKEN_KEY = 'my-token';
export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;
const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
        user_id: string | null;
    }>({
        token: null,
        authenticated: null,
        user_id: null
    });
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const loadToken = async () => {
            const data = await SecureStore.getItemAsync(TOKEN_KEY);
            if (data) {
                const object = JSON.parse(data);
                setAuthState({
                    token: object.token,
                    authenticated: true,
                    user_id: object.user.id
                });
            }
            setInitialized(true);
        };
        loadToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const { data } = await axios.post(`${API_URL}/login`, { email, password });
            setAuthState({ token: data.token, authenticated: true, user_id: data.user.id });
            await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(data));
            return data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.msg || error.message || 'Login failed';
            return { error: true, msg: errorMessage };
        }
    };
    

    const register = async (email: string, password: string, first_name: string, last_name: string, phone_number: string, location: string, date_of_birth: string) => {
        try {
            const { data } = await axios.post(`${API_URL}/register`, { email, password, first_name, last_name, phone_number, location, date_of_birth });
            setAuthState({ token: data.token, authenticated: true, user_id: data.user.id });
            await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(data));
            return data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.msg || error.message || 'Registration failed';
            return { error: true, msg: errorMessage };
        }
    };
    
    // const verifyEmail = async (email: string) => {
    //     return axios.post(`${API_URL}/verify-email`, { email }).then(res => res.data);
    // };

    const verifyEmail = async (email: string, otp: string) => {
        return axios.post(`${API_URL}/verify-email`, { email, otp }).then(res => res.data);
    };
    
    const sendOTP = async (email: string) => {
        return axios.post(`${API_URL}/send-otp`, { email }).then(res => res.data);
    };

    const resetPassword = async (email: string, newPassword: string) => {
        return axios.post(`${API_URL}/reset-password`, { email, newPassword }).then(res => res.data);
    };

    const changePassword = async (oldPassword: string, newPassword: string) => {
        return axios.post(`${API_URL}/change-password`, { oldPassword, newPassword }).then(res => res.data);
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setAuthState({ token: null, authenticated: false, user_id: null });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onVerifyEmail: verifyEmail,
        onSendOTP: sendOTP,
        onResetPassword: resetPassword,
        onChangePassword: changePassword,
        authState,
        initialized
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};




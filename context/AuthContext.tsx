import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface AuthProps {
    authState: { token: string | null; authenticated: boolean | null; user_id: string | null; user?: any };
    onRegister: (email: string, password: string, first_name: string, last_name: string, phone_number: string, location: string, date_of_birth: string) => Promise<any>;
    onLogin: (email: string, password: string) => Promise<any>;
    onLogout: () => Promise<any>;
    onVerifyEmail: (email: string, otp: string) => Promise<any>;
    onSendOTP: (email: string) => Promise<any>;
    onResetPassword: (email: string, newPassword: string) => Promise<any>;
    onChangePassword: (oldPassword: string, newPassword: string) => Promise<any>;
    getUserProfile: (userId: string) => Promise<any>;
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
        user?: any;
    }>({
        token: null,
        authenticated: null,
        user_id: null,
        user: null
    });

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const loadAuthData = async () => {
            const storedData = await SecureStore.getItemAsync(TOKEN_KEY);
            if (storedData) {
                const authData = JSON.parse(storedData);

                // Fetch updated user profile before setting auth state
                const userDetails = await getUserProfile(authData.user_id);
                
                const updatedAuthData = {
                    ...authData,
                    user: userDetails || null
                };

                setAuthState(updatedAuthData);
                await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(updatedAuthData)); // Save updated data
            }
            setInitialized(true);
        };
        loadAuthData();
    }, []);

    // Fetch user profile
    const getUserProfile = async (userId: string) => {
    try {
        const { data } = await axios.get(`http://52.14.158.219:5000/api/auth/users/view/${userId}`);

        if (!data) return null;

        // Retrieve existing auth state
        const storedData = await SecureStore.getItemAsync(TOKEN_KEY);
        const authData = storedData ? JSON.parse(storedData) : {};

        // Update stored auth data with fetched user profile
        const updatedAuthData = {
            ...authData,
            user: data
        };

        await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(updatedAuthData)); // Save updated auth data
        
        return data;
    } catch (error: any) {
        console.error("Error fetching user profile:", error);
        return null;
    }
};


    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(`http://52.14.158.219:5000/api/auth/login`, { email, password });
       console.log('====================================');
       console.log("response login auth", response);
       console.log('====================================');
            if (!response.data || !response.data.user) {
                console.error("Invalid login response:", response.data);
                return { error: true, msg: "Invalid credentials!" };
            }
    
            const userDetails = await getUserProfile(response.data.user.id);
    
            const authData = { 
                token: response.data.token, 
                authenticated: true, 
                user_id: response.data.user.id,  
                user: userDetails 
            };
    
            setAuthState(authData); 
            await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(authData));
    
            return authData;
        } catch (error: any) {
            console.error("Login failed:", error?.response?.data || error.message);
            return { error: true, msg: "Login failed. Check your credentials and try again." };
        }
    };
    

    const register = async (email: string, password: string, first_name: string, last_name: string, phone_number: string, location: string, date_of_birth: string) => {
        try {
            const { data } = await axios.post(`http://52.14.158.219:5000/api/auth/register`, { email, password, first_name, last_name, phone_number, location, date_of_birth });
            
            if (!data.user || !data.user.id) {
                throw new Error("User ID is missing from the response.");
            }

            const userDetails = await getUserProfile(data.user.id); // Fetch user profile

            const authData = { 
                token: data.token, 
                authenticated: true, 
                user_id: data.user.id,  
                user: userDetails 
            };

            setAuthState(authData); // Update state
            await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(authData)); // Store updated auth data

            return authData;
        } catch (error: any) {
            console.error("Registration Error:", error);
            return { error: true, msg: error.response?.data?.msg || "Registration failed" };
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        setAuthState({ token: null, authenticated: false, user_id: null, user: null });
    };

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        onVerifyEmail: (email: string, otp: string) => axios.post(`${API_URL}/verify-email`, { email, otp }).then(res => res.data),
        onSendOTP: (email: string) => axios.post(`${API_URL}/send-otp`, { email }).then(res => res.data),
        onResetPassword: (email: string, newPassword: string) => axios.post(`${API_URL}/reset-password`, { email, newPassword }).then(res => res.data),
        onChangePassword: (oldPassword: string, newPassword: string) => axios.post(`${API_URL}/change-password`, { oldPassword, newPassword }).then(res => res.data),
        authState,
        initialized,
        getUserProfile
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


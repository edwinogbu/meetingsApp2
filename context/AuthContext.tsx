import { createContext, useContext, useEffect, useState } from 'react'; 
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

interface AuthProps {
    authState: { userToken: string | null; authenticated: boolean | null; userData: any | null };
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

const USER_TOKEN_KEY = 'userToken';
const USER_DATA_KEY = 'userData';
export const API_URL = "http://172.20.80.1:5000/api/auth/";
// export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;
const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: any) => {
    const [authState, setAuthState] = useState<{ userToken: string | null; authenticated: boolean | null; userData: any | null }>({
        userToken: null,
        authenticated: null,
        userData: null
    });

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const loadAuthState = async () => {
            console.log("Loading authentication state...");
            const userToken = await SecureStore.getItemAsync(USER_TOKEN_KEY);
            const userData = await SecureStore.getItemAsync(USER_DATA_KEY);

            console.log("Retrieved token:", userToken);
            console.log("Retrieved userData:", userData);

            if (userToken && userData) {
                setAuthState({
                    userToken,
                    authenticated: true,
                    userData: JSON.parse(userData),
                });
            }
            setInitialized(true);
        };
        loadAuthState();
    }, []);

    const onRegister = async (...args) => {
        console.log("Registering user with args:", args);
        try {
            const { data } = await axios.post(`${API_URL}/register`, { ...args });
            console.log("Registration successful:", data);
            await SecureStore.setItemAsync(USER_TOKEN_KEY, String(data.userToken));
            await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData));
            setAuthState({ userToken: data.userToken, authenticated: true, userData: data.userData });
            return data;
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    };

    const onLogin = async (email, password) => {
        console.log("Logging in user:", email);
        try {
            const { data } = await axios.post(`${API_URL}/login`, { email, password });
            console.log("Login successful:", data);

            await SecureStore.setItemAsync(USER_TOKEN_KEY, data.userToken ? String(data.userToken) : "");
            await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData || {}));

            setAuthState({ userToken: data.userToken, authenticated: true, userData: data.userData });
            return data;
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const onLogout = async () => {
        console.log("Logging out user...");
        await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
        await SecureStore.deleteItemAsync(USER_DATA_KEY);
        setAuthState({ userToken: null, authenticated: false, userData: null });
        console.log("User logged out successfully.");
    };

    const onVerifyEmail = async (email, otp) => {
        console.log("Verifying email:", email);
        try {
            const { data } = await axios.post(`${API_URL}/verify-email`, { email, otp });
            console.log("Email verification successful:", data);
            return data;
        } catch (error) {
            console.error("Email verification error:", error);
            throw error;
        }
    };

    const onSendOTP = async (email) => {
        console.log("Sending OTP to:", email);
        try {
            const { data } = await axios.post(`${API_URL}/send-otp`, { email });
            return data;
        } catch (error) {
            console.error("OTP sending error:", error);
            throw error;
        }
    };

    const onResetPassword = async (email, newPassword) => {
        console.log("Resetting password for:", email);
        try {
            const { data } = await axios.post(`${API_URL}/reset-password`, { email, newPassword });
            console.log("Password reset successful:", data);
            return data;
        } catch (error) {
            console.error("Password reset error:", error);
            throw error;
        }
    };

    const onChangePassword = async (oldPassword, newPassword) => {
        console.log("Changing password...");
        try {
            const { data } = await axios.post(`${API_URL}/change-password`, { oldPassword, newPassword });
            console.log("Password change successful:", data);
            await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData));
            setAuthState((prevState) => ({ ...prevState, userData: data.userData }));
            return data;
        } catch (error) {
            console.error("Password change error:", error);
            throw error;
        }
    };

    const getUserProfile = async (userId) => {
        console.log("Fetching user profile for ID:", userId);
        try {
            const { data } = await axios.get(`${API_URL}/user-profile/${userId}`);
            console.log("User profile retrieved:", data);
            await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData));
            setAuthState((prevState) => ({ ...prevState, userData: data.userData }));
            return data;
        } catch (error) {
            console.error("User profile retrieval error:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ authState, onRegister, onLogin, onLogout, onVerifyEmail, onSendOTP, onResetPassword, onChangePassword, getUserProfile, initialized }}>
            {children}
        </AuthContext.Provider>
    );
};


// import { createContext, useContext, useEffect, useState } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import axios from 'axios';

// interface AuthProps {
//     authState: { token: string | null; authenticated: boolean | null; user_id: string | null; user?: any };
//     onRegister: (email: string, password: string, first_name: string, last_name: string, phone_number: string, location: string, date_of_birth: string) => Promise<any>;
//     onLogin: (email: string, password: string) => Promise<any>;
//     onLogout: () => Promise<any>;
//     onVerifyEmail: (email: string, otp: string) => Promise<any>;
//     onSendOTP: (email: string) => Promise<any>;
//     onResetPassword: (email: string, newPassword: string) => Promise<any>;
//     onChangePassword: (oldPassword: string, newPassword: string) => Promise<any>;
//     getUserProfile: (userId: string) => Promise<any>;
//     initialized: boolean;
// }

// const TOKEN_KEY = 'my-token';
// export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;
// const AuthContext = createContext<Partial<AuthProps>>({});

// export const useAuth = () => {
//     return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }: any) => {
//     const [authState, setAuthState] = useState<{
//         token: string | null;
//         authenticated: boolean | null;
//         user_id: string | null;
//         user?: any;
//     }>({
//         token: null,
//         authenticated: null,
//         user_id: null,
//         user: null
//     });

//     const [initialized, setInitialized] = useState(false);

//     useEffect(() => {
//         const loadAuthData = async () => {
//             const storedData = await SecureStore.getItemAsync(TOKEN_KEY);
//             if (storedData) {
//                 const authData = JSON.parse(storedData);

//                 // Fetch updated user profile before setting auth state
//                 const userDetails = await getUserProfile(authData.user_id);
                
//                 const updatedAuthData = {
//                     ...authData,
//                     user: userDetails || null
//                 };

//                 setAuthState(updatedAuthData);
//                 await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(updatedAuthData)); // Save updated data
//             }
//             setInitialized(true);
//         };
//         loadAuthData();
//     }, []);

//     // Fetch user profile
//     const getUserProfile = async (userId: string) => {
//     try {
//         const { data } = await axios.get(`http://52.14.158.219:5000/api/auth/users/view/${userId}`);

//         if (!data) return null;

//         // Retrieve existing auth state
//         const storedData = await SecureStore.getItemAsync(TOKEN_KEY);
//         const authData = storedData ? JSON.parse(storedData) : {};

//         // Update stored auth data with fetched user profile
//         const updatedAuthData = {
//             ...authData,
//             user: data
//         };

//         await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(updatedAuthData)); // Save updated auth data
        
//         return data;
//     } catch (error: any) {
//         console.error("Error fetching user profile:", error);
//         return null;
//     }
// };


//     const login = async (email: string, password: string) => {
//         try {
//             const response = await axios.post(`http://52.14.158.219:5000/api/auth/login`, { email, password });
//        console.log('====================================');
//        console.log("response login auth", response);
//        console.log('====================================');
//             if (!response.data || !response.data.user) {
//                 console.error("Invalid login response:", response.data);
//                 return { error: true, msg: "Invalid credentials!" };
//             }
    
//             const userDetails = await getUserProfile(response.data.user.id);
    
//             const authData = { 
//                 token: response.data.token, 
//                 authenticated: true, 
//                 user_id: response.data.user.id,  
//                 user: userDetails 
//             };
    
//             setAuthState(authData); 
//             await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(authData));
    
//             return authData;
//         } catch (error: any) {
//             console.error("Login failed:", error?.response?.data || error.message);
//             return { error: true, msg: "Login failed. Check your credentials and try again." };
//         }
//     };
    

//     const register = async (email: string, password: string, first_name: string, last_name: string, phone_number: string, location: string, date_of_birth: string) => {
//         try {
//             const { data } = await axios.post(`http://52.14.158.219:5000/api/auth/register`, { email, password, first_name, last_name, phone_number, location, date_of_birth });
            
//             if (!data.user || !data.user.id) {
//                 throw new Error("User ID is missing from the response.");
//             }

//             const userDetails = await getUserProfile(data.user.id); // Fetch user profile

//             const authData = { 
//                 token: data.token, 
//                 authenticated: true, 
//                 user_id: data.user.id,  
//                 user: userDetails 
//             };

//             setAuthState(authData); // Update state
//             await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(authData)); // Store updated auth data

//             return authData;
//         } catch (error: any) {
//             console.error("Registration Error:", error);
//             return { error: true, msg: error.response?.data?.msg || "Registration failed" };
//         }
//     };

//     const logout = async () => {
//         await SecureStore.deleteItemAsync(TOKEN_KEY);
//         setAuthState({ token: null, authenticated: false, user_id: null, user: null });
//     };

//     const value = {
//         onRegister: register,
//         onLogin: login,
//         onLogout: logout,
//         onVerifyEmail: (email: string, otp: string) => axios.post(`${API_URL}/verify-email`, { email, otp }).then(res => res.data),
//         onSendOTP: (email: string) => axios.post(`${API_URL}/send-otp`, { email }).then(res => res.data),
//         onResetPassword: (email: string, newPassword: string) => axios.post(`${API_URL}/reset-password`, { email, newPassword }).then(res => res.data),
//         onChangePassword: (oldPassword: string, newPassword: string) => axios.post(`${API_URL}/change-password`, { oldPassword, newPassword }).then(res => res.data),
//         authState,
//         initialized,
//         getUserProfile
//     };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };


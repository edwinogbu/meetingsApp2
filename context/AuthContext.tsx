// import { createContext, useContext, useEffect, useState } from 'react'; 
// import * as SecureStore from 'expo-secure-store';
// import axios from 'axios';

// interface AuthProps {
//     authState: { userToken: string | null; authenticated: boolean | null; userData: any | null };
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

// const USER_TOKEN_KEY = 'userToken';
// const USER_DATA_KEY = 'userData';
// export const API_URL = "http://172.20.80.1:5000/api/auth/";
// // export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;
// const AuthContext = createContext<Partial<AuthProps>>({});

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }: any) => {
//     const [authState, setAuthState] = useState<{ userToken: string | null; authenticated: boolean | null; userData: any | null }>({
//         userToken: null,
//         authenticated: null,
//         userData: null
//     });

//     const [initialized, setInitialized] = useState(false);

//     useEffect(() => {
//         const loadAuthState = async () => {
//             console.log("Loading authentication state...");
//             const userToken = await SecureStore.getItemAsync(USER_TOKEN_KEY);
//             const userData = await SecureStore.getItemAsync(USER_DATA_KEY);

//             console.log("Retrieved token:", userToken);
//             console.log("Retrieved userData:", userData);

//             if (userToken && userData) {
//                 setAuthState({
//                     userToken,
//                     authenticated: true,
//                     userData: JSON.parse(userData),
//                 });
//             }
//             setInitialized(true);
//         };
//         loadAuthState();
//     }, []);

//     // const onRegister = async (...args) => {
//     //     console.log("Registering user with args:", args);
//     //     try {
//     //         const { data } = await axios.post(`http://172.20.80.1:5000/api/auth/register`, { ...args });
//     //         console.log("Registration successful:", data);
//     //         await SecureStore.setItemAsync(USER_TOKEN_KEY, String(data.userToken));
//     //         await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData));
//     //         setAuthState({ userToken: data.userToken, authenticated: true, userData: data.userData });
//     //         return data;
//     //     } catch (error) {
//     //         console.error("Registration error:", error);
//     //         throw error;
//     //     }
//     // };

//     const onRegister = async (...args) => {
//         console.log("Registering user with args:", args);
//         try {
//             const { data } = await axios.post(
//                 `http://172.20.80.1:5000/api/auth/register`,
//                 { ...args },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${authState?.userToken || ''}`
//                     }
//                 }
//             );
    
//             console.log("Registration successful:", data);
//             await SecureStore.setItemAsync(USER_TOKEN_KEY, String(data.userToken));
//             await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData));
//             setAuthState({ userToken: data.userToken, authenticated: true, userData: data.userData });
    
//             return data;
//         } catch (error) {
//             console.error("Registration error:", error);
//             throw error;
//         }
//     };


//     // const onLogin = async (email, password) => {
//     //     console.log("Logging in user:", email);
//     //     try {
//     //         const { data } = await axios.post(
//     //             `${API_URL}login`,
//     //             { email, password },
//     //             {
//     //                 headers: {
//     //                     "Content-Type": "application/json",
//     //                     Accept: "application/json",
//     //                 },
//     //             }
//     //         );
    
//     //         if (!data.userToken || !data.userData) {
//     //             throw new Error("Invalid login response, missing token or user data");
//     //         }
    
//     //         await SecureStore.setItemAsync(USER_TOKEN_KEY, String(data.userToken));
//     //         await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData));
    
//     //         setAuthState({ userToken: data.userToken, authenticated: true, userData: data.userData });
    
//     //         console.log("Login successful:", data);
//     //         return data;
//     //     } catch (error) {
//     //         console.error("Login error:", error.response?.data?.message || error.message);
//     //         throw error;
//     //     }
//     // };
    
    
//     // const onLogin = async (email, password) => {
//     //     console.log("Logging in user:", email);
//     //     try {
//     //         const { data } = await axios.post(`${API_URL}/login`, { email, password });
//     //         console.log("Login successful:", data);

//     //         await SecureStore.setItemAsync(USER_TOKEN_KEY, data.userToken ? String(data.userToken) : "");
//     //         await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData || {}));

//     //         setAuthState({ userToken: data.userToken, authenticated: true, userData: data.userData });
//     //         return data;
//     //     } catch (error) {
//     //         console.error("Login error:", error);
//     //         throw error;
//     //     }
//     // };

//     useEffect(() => {
//         const loadStoredAuth = async () => {
//             const token = await SecureStore.getItemAsync(USER_TOKEN_KEY);
//             const userData = await SecureStore.getItemAsync(USER_DATA_KEY);

//             if (token && userData) {
//                 setAuthState({
//                     userToken: token,
//                     authenticated: true,
//                     userData: JSON.parse(userData),
//                 });
//             }
//         };

//         loadStoredAuth();
//     }, []);

//     const onLogin = async (email, password) => {
//         console.log("Logging in user:", email);
//         try {
//             const { data } = await axios.post(
//                 `${API_URL}login`,
//                 { email, password },
//                 {
//                     headers: {
//                         "Content-Type": "application/json",
//                         Accept: "application/json",
//                     },
//                 }
//             );

//             if (!data.userToken || !data.userData) {
//                 throw new Error("Invalid login response, missing token or user data");
//             }

//             await SecureStore.setItemAsync(USER_TOKEN_KEY, String(data.userToken));
//             await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData));

//             setAuthState({ userToken: data.userToken, authenticated: true, userData: data.userData });

//             console.log("Login successful:", data);
//             return data;
//         } catch (error) {
//             console.error("Login error:", error.response?.data?.message || error.message);
//             throw error;
//         }
//     };

//     const onLogout = async () => {
//         console.log("Logging out user...");
//         try {
//             await SecureStore.deleteItemAsync(USER_TOKEN_KEY);
//             await SecureStore.deleteItemAsync(USER_DATA_KEY);
//             setAuthState({ userToken: null, authenticated: false, userData: null });
//             console.log("Logout successful");
//         } catch (error) {
//             console.error("Logout error:", error.message);
//         }
//     };


//     const onVerifyEmail = async (email, otp) => {
//         console.log("Verifying email:", email);
//         try {
//             const { data } = await axios.post(`${API_URL}/verify-email`, { email, otp });
//             console.log("Email verification successful:", data);
//             return data;
//         } catch (error) {
//             console.error("Email verification error:", error);
//             throw error;
//         }
//     };

//     const onSendOTP = async (email) => {
//         console.log("Sending OTP to:", email);
//         try {
//             const { data } = await axios.post(`${API_URL}/send-otp`, { email });
//             return data;
//         } catch (error) {
//             console.error("OTP sending error:", error);
//             throw error;
//         }
//     };

//     const onResetPassword = async (email, newPassword) => {
//         console.log("Resetting password for:", email);
//         try {
//             const { data } = await axios.post(`${API_URL}/reset-password`, { email, newPassword });
//             console.log("Password reset successful:", data);
//             return data;
//         } catch (error) {
//             console.error("Password reset error:", error);
//             throw error;
//         }
//     };

//     const onChangePassword = async (oldPassword, newPassword) => {
//         console.log("Changing password...");
//         try {
//             const { data } = await axios.post(`${API_URL}/change-password`, { oldPassword, newPassword });
//             console.log("Password change successful:", data);
//             await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData));
//             setAuthState((prevState) => ({ ...prevState, userData: data.userData }));
//             return data;
//         } catch (error) {
//             console.error("Password change error:", error);
//             throw error;
//         }
//     };

//     const getUserProfile = async (userId) => {
//         console.log("Fetching user profile for ID:", userId);
//         try {
//             const { data } = await axios.get(`${API_URL}/user-profile/${userId}`);
//             console.log("User profile retrieved:", data);
//             await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data.userData));
//             setAuthState((prevState) => ({ ...prevState, userData: data.userData }));
//             return data;
//         } catch (error) {
//             console.error("User profile retrieval error:", error);
//             throw error;
//         }
//     };

//     return (
//         <AuthContext.Provider value={{ authState, onRegister, onLogin, onLogout, onVerifyEmail, onSendOTP, onResetPassword, onChangePassword, getUserProfile, initialized }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


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



// import { createContext, useContext, useEffect, useState } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import axios from 'axios';

// interface AuthProps {
//     authState: { token: string | null; chatToken: string | null; authenticated: boolean | null; user_id: string | null; user?: any };
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

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }: any) => {
//     const [authState, setAuthState] = useState<{
//         token: string | null;
//         chatToken: string | null;
//         authenticated: boolean | null;
//         user_id: string | null;
//         user?: any;
//     }>({
//         token: null,
//         chatToken: null,
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
//                 const userDetails = await getUserProfile(authData.user_id);

//                 const updatedAuthData = {
//                     ...authData,
//                     user: userDetails || null
//                 };

//                 setAuthState(updatedAuthData);
//                 await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(updatedAuthData));
//             }
//             setInitialized(true);
//         };
//         loadAuthData();
//     }, []);

//     const getUserProfile = async (userId: string) => {
//         try {
//             const { data } = await axios.get(`${API_URL}/api/auth/users/view/${userId}`);
//             if (!data) return null;

//             const storedData = await SecureStore.getItemAsync(TOKEN_KEY);
//             const authData = storedData ? JSON.parse(storedData) : {};

//             const updatedAuthData = { ...authData, user: data };
//             await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(updatedAuthData));

//             return data;
//         } catch (error: any) {
//             console.error("Error fetching user profile:", error);
//             return null;
//         }
//     };

//     const login = async (email: string, password: string) => {
//         try {
//             const response = await axios.post(
//                 `${API_URL}/api/auth/login`, 
//                 { email, password },
//                 { headers: { 'Content-Type': 'application/json' } } // Added headers
//             );
    
//             if (!response.data || !response.data.user) {
//                 console.error("Invalid login response:", response.data);
//                 return { error: true, msg: "Invalid credentials!" };
//             }
    
//             const userDetails = await getUserProfile(response.data.user.id);
    
//             const authData = {
//                 token: response.data.token,
//                 chatToken: response.data.chatToken,
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
//             const { data } = await axios.post(
//                 `${API_URL}/api/auth/register`, 
//                 { email, password, first_name, last_name, phone_number, location, date_of_birth },
//                 { headers: { 'Content-Type': 'application/json' } } // Added headers
//             );
    
//             if (!data.user || !data.user.id) {
//                 throw new Error("User ID is missing from the response.");
//             }
    
//             const userDetails = await getUserProfile(data.user.id);
    
//             const authData = {
//                 token: data.token,
//                 chatToken: data.chatToken,
//                 authenticated: true,
//                 user_id: data.user.id,
//                 user: userDetails
//             };
    
//             setAuthState(authData);
//             await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(authData));
    
//             return authData;
//         } catch (error: any) {
//             console.error("Registration Error:", error);
//             return { error: true, msg: error.response?.data?.msg || "Registration failed" };
//         }
//     };

    
//     // const login = async (email: string, password: string) => {
//     //     try {
//     //         const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

//     //         if (!response.data || !response.data.user) {
//     //             console.error("Invalid login response:", response.data);
//     //             return { error: true, msg: "Invalid credentials!" };
//     //         }

//     //         const userDetails = await getUserProfile(response.data.user.id);

//     //         const authData = {
//     //             token: response.data.token,
//     //             chatToken: response.data.chatToken, // Store chat token
//     //             authenticated: true,
//     //             user_id: response.data.user.id,
//     //             user: userDetails
//     //         };

//     //         setAuthState(authData);
//     //         await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(authData));

//     //         return authData;
//     //     } catch (error: any) {
//     //         console.error("Login failed:", error?.response?.data || error.message);
//     //         return { error: true, msg: "Login failed. Check your credentials and try again." };
//     //     }
//     // };

//     // const register = async (email: string, password: string, first_name: string, last_name: string, phone_number: string, location: string, date_of_birth: string) => {
//     //     try {
//     //         const { data } = await axios.post(`${API_URL}/api/auth/register`, { email, password, first_name, last_name, phone_number, location, date_of_birth });

//     //         if (!data.user || !data.user.id) {
//     //             throw new Error("User ID is missing from the response.");
//     //         }

//     //         const userDetails = await getUserProfile(data.user.id);

//     //         const authData = {
//     //             token: data.token,
//     //             chatToken: data.chatToken, // Include chat token
//     //             authenticated: true,
//     //             user_id: data.user.id,
//     //             user: userDetails
//     //         };

//     //         setAuthState(authData);
//     //         await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(authData));

//     //         return authData;
//     //     } catch (error: any) {
//     //         console.error("Registration Error:", error);
//     //         return { error: true, msg: error.response?.data?.msg || "Registration failed" };
//     //     }
//     // };

//     const logout = async () => {
//         await SecureStore.deleteItemAsync(TOKEN_KEY);
//         setAuthState({ token: null, chatToken: null, authenticated: false, user_id: null, user: null });
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



// import { createContext, useContext, useEffect, useState } from 'react';
// import * as SecureStore from 'expo-secure-store'; 

// interface AuthProps {
// 	authState: { 
// 		token: string | null; 
// 		chatToken: string | null;
// 		authenticated: boolean | null; 
// 		user_id: string | null; 
// 	};
// 	onRegister: (email: string, password: string, first_name: string, last_name: string, phone_number: string, location: string, date_of_birth: string) => Promise<any>;
// 	onLogin: (email: string, password: string) => Promise<any>;
// 	onLogout: () => Promise<any>;
// 	initialized: boolean;
// }

// const TOKEN_KEY = 'my-token';
// const CHAT_TOKEN_KEY = 'chat-token';
// export const API_URL = 'http:// 172.20.80.1:5000/api/auth';
// // export const API_URL = process.env.EXPO_PUBLIC_SERVER_URL;
// const AuthContext = createContext<Partial<AuthProps>>({});

// export const useAuth = () => {
// 	return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }: any) => {
// 	const [authState, setAuthState] = useState<{
// 		token: string | null;
// 		chatToken: string | null;
// 		authenticated: boolean | null;
// 		user_id: string | null;
// 	}>(
// 		{
// 			token: null,
// 			chatToken: null,
// 			authenticated: null,
// 			user_id: null
// 		}
// 	);
// 	const [initialized, setInitialized] = useState(false);

// 	useEffect(() => {
// 		const loadToken = async () => {
// 			const data = await SecureStore.getItemAsync(TOKEN_KEY);
// 			const chatData = await SecureStore.getItemAsync(CHAT_TOKEN_KEY);

// 			if (data) {
// 				const object = JSON.parse(data);
// 				setAuthState({
// 					token: object.token,
// 					chatToken: chatData || null,
// 					authenticated: true,
// 					user_id: object.user.id
// 				});
// 			}
// 			setInitialized(true);
// 		};
// 		loadToken();
// 	}, []);

// 	const login = async (email: string, password: string) => {
// 		try {
// 			const result = await fetch(`${API_URL}/login`, {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json'
// 				},
// 				body: JSON.stringify({ email, password })
// 			});

// 			const json = await result.json();

// 			setAuthState({
// 				token: json.token,
// 				chatToken: json.chatToken,
// 				authenticated: true,
// 				user_id: json.user.id
// 			});

// 			await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(json));
// 			await SecureStore.setItemAsync(CHAT_TOKEN_KEY, json.chatToken);

// 			return result;
// 		} catch (e) {
// 			return { error: true, msg: (e as any).response?.data?.msg || 'Login failed' };
// 		}
// 	};

// 	const register = async (email: string, password: string, first_name: string, last_name: string, phone_number: string, location: string, date_of_birth: string) => {
// 		try {
// 			const result = await fetch(`${API_URL}/register`, {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json'
// 				},
// 				body: JSON.stringify({ email, password, first_name, last_name, phone_number, location, date_of_birth })
// 			});

// 			const json = await result.json();
// 			console.log('register:', json);

// 			setAuthState({
// 				token: json.token,
// 				chatToken: json.chatToken,
// 				authenticated: true,
// 				user_id: json.user.id
// 			});

// 			await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(json));
// 			await SecureStore.setItemAsync(CHAT_TOKEN_KEY, json.chatToken);

// 			return json;
// 		} catch (e) {
// 			return { error: true, msg: (e as any).response?.data?.msg || 'Registration failed' };
// 		}
// 	};

// 	const logout = async () => {
// 		await SecureStore.deleteItemAsync(TOKEN_KEY);
// 		await SecureStore.deleteItemAsync(CHAT_TOKEN_KEY);

// 		setAuthState({
// 			token: null,
// 			chatToken: null,
// 			authenticated: false,
// 			user_id: null
// 		});
// 	};

// 	const value = {
// 		onRegister: register,
// 		onLogin: login,
// 		onLogout: logout,
// 		authState,
// 		initialized
// 	};

// 	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };



import { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthProps {
  authState: { 
    token: string | null; 
    chatToken: string | null;
    authenticated: boolean | null; 
    user_id: string | null; 
  };
  onRegister: (
    email: string, 
    password: string, 
    first_name: string, 
    last_name: string, 
    phone_number: string, 
    location: string, 
    date_of_birth: string
  ) => Promise<any>;
  onLogin: (email: string, password: string) => Promise<any>;
  onLogout: () => Promise<void>;
  initialized: boolean;
}

const TOKEN_KEY = 'my-token';
const CHAT_TOKEN_KEY = 'chat-token';
export const API_URL = 'http://172.20.80.1:5000/api/auth';

const AuthContext = createContext<Partial<AuthProps>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState({
    token: null,
    chatToken: null,
    authenticated: null,
    user_id: null
  });
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const data = await SecureStore.getItemAsync(TOKEN_KEY);
        const chatData = await SecureStore.getItemAsync(CHAT_TOKEN_KEY);

        if (data) {
          const object = JSON.parse(data);
          setAuthState({
            token: object?.token || null,
            chatToken: object?.chatData || null,
            // authenticated:true,
            authenticated: !!object?.chatToken,
            user_id: object?.user?.id || null
          });
		  setInitialized(true);
        }
      } catch (error) {
        console.error('Error loading auth token:', error);
      } finally {
        setInitialized(true);
      }
    };
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) throw new Error('Login failed');

      const json = await response.json();
      if (!json?.token || !json?.chatToken) throw new Error('Invalid login response');

      // Store user details & Stream Chat token
      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(json));
      await SecureStore.setItemAsync(CHAT_TOKEN_KEY, json.chatToken);

      setAuthState({
        token: json.token,
        chatToken: json.chatToken,
        authenticated: true,
        user_id: json?.user?.id || null
      });

      return json;
    } catch (error) {
      console.error('Login error:', error);
      return { error: true, msg: error.message || 'Login failed' };
    }
  };

  const register = async (
    email: string, 
    password: string, 
    first_name: string, 
    last_name: string, 
    phone_number: string, 
    location: string, 
    date_of_birth: string
  ) => {
    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, first_name, last_name, phone_number, location, date_of_birth })
      });

      if (!response.ok) throw new Error('Registration failed');

      const json = await response.json();
      if (!json?.token || !json?.chatToken) throw new Error('Invalid registration response');

      // Store user details & Stream Chat token
      await SecureStore.setItemAsync(TOKEN_KEY, JSON.stringify(json));
      await SecureStore.setItemAsync(CHAT_TOKEN_KEY, json.chatToken);

      setAuthState({
        token: json.token,
        chatToken: json.chatToken,
        authenticated: true,
        user_id: json?.user?.id || null
      });

      return json;
    } catch (error) {
      console.error('Registration error:', error);
      return { error: true, msg: error.message || 'Registration failed' };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      await SecureStore.deleteItemAsync(CHAT_TOKEN_KEY);
      setAuthState({
        token: null,
        chatToken: null,
        authenticated: false,
        user_id: null
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ onRegister: register, onLogin: login, onLogout: logout, authState, initialized }}>
      {children}
    </AuthContext.Provider>
  );
};

// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";
// import { useColorScheme } from "@/components/useColorScheme";
// import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { OverlayProvider } from "stream-chat-expo";
// import Toast from "react-native-toast-message";
// import { useRouter, useSegments } from "expo-router";
// import Constants from "expo-constants";
// import * as SecureStore from "expo-secure-store";
// import jwtDecode from "jwt-decode";

// export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   initialRouteName: "index",
// };

// const STREAM_KEY = Constants.expoConfig?.extra?.STREAM_ACCESS_KEY;

// if (!STREAM_KEY) {
//   console.warn("Warning: STREAM_KEY is missing from app.json. Video features may not work.");
// }

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <InitialLayout />
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// }

// function InitialLayout() {
//   const { authState, initialized } = useAuth();
//   const [client, setClient] = useState(null);
//   const [secureAuth, setSecureAuth] = useState(null);
//   const segments = useSegments();
//   const router = useRouter();

//   // Function to verify token
//   const isTokenValid = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       return decoded.exp * 1000 > Date.now(); // Check if token is expired
//     } catch (error) {
//       return false;
//     }
//   };

//   // Fetch secure authentication data from SecureStore
//   useEffect(() => {
//     async function fetchSecureAuth() {
//       try {
//         const token = await SecureStore.getItemAsync("userToken");
//         const userData = await SecureStore.getItemAsync("userData");

//         if (token && userData) {
//           const parsedUser = JSON.parse(userData);
//           if (isTokenValid(token) && parsedUser?.id) {
//             setSecureAuth({ token, user: parsedUser });
//           } else {
//             await SecureStore.deleteItemAsync("userToken");
//             await SecureStore.deleteItemAsync("userData");
//             setSecureAuth(null);
//           }
//         }
//       } catch (error) {
//         console.error("Error retrieving authentication data:", error);
//       }
//     }

//     fetchSecureAuth();
//   }, []);

//   // Protect drawer routes from unauthorized users
//   useEffect(() => {
//     if (!initialized && !secureAuth) return;

//     const isInDrawer = segments[0] === "(drawer)";
//     const isAuthenticated = authState?.authenticated || !!secureAuth;

//     if (isAuthenticated) {
//       if (!isInDrawer) router.replace("/(drawer)/(inside)");
//     } else {
//       if (client) {
//         client.disconnectUser();
//         setClient(null);
//       }
//       router.replace("/");
//     }
//   }, [initialized, authState, secureAuth]);

//   // Initialize StreamVideoClient
//   useEffect(() => {
//     let clientInstance = null;
//     const token = authState?.token || secureAuth?.token;
//     const user = authState?.user || secureAuth?.user;

//     if (token && user?.id && STREAM_KEY) {
//       try {
//         clientInstance = new StreamVideoClient({
//           apiKey: STREAM_KEY,
//           user: { id: String(user.id) }, // Ensure user ID is a string
//           token,
//         });
//         setClient(clientInstance);
//       } catch (e) {
//         console.error("Error creating StreamVideoClient:", e);
//       }
//     }

//     return () => {
//       if (clientInstance) {
//         clientInstance.disconnectUser();
//         setClient(null);
//       }
//     };
//   }, [authState, secureAuth]);

//   return (
//     <ThemeProvider value={useColorScheme() === "dark" ? DarkTheme : DefaultTheme}>
//       {!secureAuth ? (
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="index" options={{ title: "Welcome" }} />
//           <Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
//           <Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
//           <Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
//         </Stack>
//       ) : (
//         <StreamVideo client={client}>
//           <OverlayProvider>
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//             </Stack>
//             <Toast />
//           </OverlayProvider>
//         </StreamVideo>
//       )}
//     </ThemeProvider>
//   );
// }


// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";
// import { useColorScheme } from "@/components/useColorScheme";
// import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { OverlayProvider } from "stream-chat-expo";
// import Toast from "react-native-toast-message";
// import { useRouter, useSegments } from "expo-router";
// import Constants from "expo-constants"; // ✅ Import expo-constants

// export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   initialRouteName: "(drawer)",
// };

// // ✅ Get STREAM_ACCESS_KEY from app.json
// const STREAM_KEY = Constants.expoConfig?.extra?.STREAM_ACCESS_KEY;

// if (!STREAM_KEY) {
//   console.warn("Warning: STREAM_KEY is missing from app.json. Video features may not work.");
// }

// // ✅ Prevent splash screen auto-hide
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <InitialLayout />
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// }

// function InitialLayout() {
//   const { authState, initialized } = useAuth();
//   const [client, setClient] = useState(null);
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!initialized) return;

//     const inAuthGroup = segments[0] === "(drawer)";

//     if (authState?.authenticated && !inAuthGroup) {
//       router.replace("/(drawer)/(inside)");
//     } else if (!authState?.authenticated) {
//       client?.disconnectUser();
//       setClient(null);
//       router.replace("/");
//     }
//   }, [initialized, authState]);

//   useEffect(() => {
//     let clientInstance = null;

//     if (authState?.authenticated && authState.token && STREAM_KEY) {
//       const user = { id: authState.user_id || "" };

//       try {
//         clientInstance = new StreamVideoClient({
//           apiKey: STREAM_KEY,
//           user,
//           token: authState.token,
//         });
//         setClient(clientInstance);
//       } catch (e) {
//         console.error("Error creating StreamVideoClient:", e);
//       }
//     }

//     return () => {
//       if (clientInstance) {
//         clientInstance.disconnectUser();
//         setClient(null);
//       }
//     };
//   }, [authState]);

//   return (
//     <ThemeProvider value={useColorScheme() === "dark" ? DarkTheme : DefaultTheme}>
//       {!client ? (
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="index" options={{ title: "Welcome" }} />
//           <Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
//           <Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
//           <Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
//         </Stack>
//       ) : (
//         <StreamVideo client={client}>
//           <OverlayProvider>
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//               {/* <Stack.Screen name="(drawer)/(inside)" options={{ headerShown: false }} /> */}
//               {/* <Stack.Screen name="(room)/[id]" options={{ title: "Room" }} /> */}
//             </Stack>
//             <Toast />
//           </OverlayProvider>
//         </StreamVideo>
//       )}
//     </ThemeProvider>
//   );
// }


// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";
// import { useColorScheme } from "@/components/useColorScheme";
// import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { OverlayProvider } from "stream-chat-expo";
// import Toast from "react-native-toast-message";
// import { useRouter, useSegments } from "expo-router";
// import Constants from "expo-constants"; 


// export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   initialRouteName: "(drawer)",
// };

// // const STREAM_KEY = process.env.STREAM_KEY;
// const STREAM_KEY = Constants.expoConfig?.extra?.STREAM_KEY;

// if (!STREAM_KEY) {
//   console.warn("Warning: STREAM_KEY is missing from .env. Video features may not work.");
// }

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <InitialLayout />
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// }

// function InitialLayout() {
//   const { authState, initialized } = useAuth();
//   const [client, setClient] = useState(null);
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!initialized) return;

//     const inAuthGroup = segments[0] === "(drawer)";
//     const isAuthenticated = authState?.authenticated && authState?.userToken;

//     if (isAuthenticated && !inAuthGroup) {
//       router.replace("/(drawer)/(inside)");
//     } else if (!isAuthenticated) {
//       client?.disconnectUser();
//       setClient(null);
//       router.replace("/");
//     }
//   }, [initialized, authState]);

//   useEffect(() => {
//     let clientInstance = null;
//     const isAuthenticated = authState?.authenticated && authState?.userToken;

//     if (isAuthenticated && STREAM_KEY) {
//       const user = { id: authState.user_id || "" };
//       try {
//         clientInstance = new StreamVideoClient({
//           apiKey: STREAM_KEY,
//           user,
//           token: authState.userToken,
//         });
//         setClient(clientInstance);
//       } catch (e) {
//         console.error("Error creating StreamVideoClient:", e);
//       }
//     }

//     return () => {
//       if (clientInstance) {
//         clientInstance.disconnectUser();
//         setClient(null);
//       }
//     };
//   }, [authState]);

//   return (
//     <ThemeProvider value={useColorScheme() === "dark" ? DarkTheme : DefaultTheme}>
//       {!client ? (
//         <Stack screenOptions={{ headerShown: false }}>
          // <Stack.Screen name="index" options={{ title: "Welcome" }} />
          // <Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
          // <Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
          // <Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
//         </Stack>
//       ) : (
//         <StreamVideo client={client}>
//           <OverlayProvider>
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//               <Stack.Screen name="(drawer)/(inside)" options={{ headerShown: false }} />
//               <Stack.Screen name="(room)/[id]" options={{ title: "Room" }} />
//             </Stack>
//             <Toast />
//           </OverlayProvider>
//         </StreamVideo>
//       )}
//     </ThemeProvider>
//   );
// }


import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
import { AuthProvider, useAuth } from '../context/AuthContext';  // ✅ Ensure correct import
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { OverlayProvider } from 'stream-chat-expo';
import Toast from 'react-native-toast-message';
import type { User } from '@stream-io/video-react-native-sdk';
import Constants from 'expo-constants';

// const STREAM_KEY = Constants.expoConfig?.extra?.STREAM_KEY;
const STREAM_KEY = Constants.expoConfig?.extra?.STREAM_ACCESS_KEY;

const InitialLayout: React.FC = (): JSX.Element => {  // ✅ Explicit return type
	const { authState, initialized } = useAuth();
	const [client, setClient] = useState<StreamVideoClient | null>(null);
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (!initialized) return;

		const currentSegment = segments.length > 0 ? segments[0] : '';
		const inAuthGroup = currentSegment === '(drawer)' || currentSegment === '(inside)';
		const inRoom = currentSegment === 'room';

		if (authState?.authenticated) {
			if (!inAuthGroup && !inRoom) {
				router.replace('/(drawer)/(inside)');
			}
		} else {
			if (client) {
				client.disconnectUser().catch(err => console.error('Error disconnecting:', err));
			}
			router.replace('/');
		}
	}, [initialized, authState, client]);

	useEffect(() => {
		if (!STREAM_KEY) {
			console.error('STREAM_KEY is missing! Check environment variables.');
			return;
		}

		if (authState?.authenticated && authState.chatToken && typeof authState.user_id === 'string' && authState.user_id.trim() !== '') {
			const user: User = { id: authState.user_id.trim() };

			try {
				const streamClient = new StreamVideoClient({
					apiKey: STREAM_KEY,
					user,
					token: authState.chatToken,
				});
				setClient(streamClient);
			} catch (e) {
				console.error('Error creating StreamVideoClient:', e);
			}
		} else {
			setClient(null);
		}
	}, [authState]);

	useEffect(() => {
		return () => {
			if (client) {
				client.disconnectUser().catch(err => console.error('Error disconnecting client:', err));
			}
		};
	}, [client]);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			{client ? (
				<StreamVideo client={client}>
					<OverlayProvider>
						<Slot />
						<Toast />
					</OverlayProvider>
				</StreamVideo>
			) : (
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
					<Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
					<Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
				</Stack>
			)}
		</GestureHandlerRootView>
	);
};

const RootLayout: React.FC = (): JSX.Element => {
	return (
		<AuthProvider>  
			<InitialLayout />
		</AuthProvider>
	);
};

export default RootLayout;


// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { Slot, Stack, useRouter, useSegments } from 'expo-router';
// import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { OverlayProvider } from 'stream-chat-expo';
// import Toast from 'react-native-toast-message';
// import type { User } from '@stream-io/video-react-native-sdk';
// import Constants from 'expo-constants';

// const STREAM_KEY = Constants.expoConfig?.extra?.STREAM_KEY;

// const InitialLayout: React.FC = (): JSX.Element => {  // ✅ FIXED: Corrected return type
// 	const { authState, initialized } = useAuth();
// 	const [client, setClient] = useState<StreamVideoClient | null>(null);
// 	const segments = useSegments();
// 	const router = useRouter();

// 	useEffect(() => {
// 		if (!initialized) return;

// 		const currentSegment = segments.length > 0 ? segments[0] : '';
// 		const inAuthGroup = currentSegment === '(drawer)' || currentSegment === '(inside)';
// 		const inRoom = currentSegment === 'room';

// 		if (authState?.authenticated) {
// 			if (!inAuthGroup && !inRoom) {
// 				router.replace('/(drawer)/(inside)');
// 			}
// 		} else {
// 			if (client) {
// 				client.disconnectUser().catch(err => console.error('Error disconnecting:', err));
// 			}
// 			router.replace('/');
// 		}
// 	}, [initialized, authState, client]);

// 	useEffect(() => {
// 		if (!STREAM_KEY) {
// 			console.error('STREAM_KEY is missing! Check environment variables.');
// 			return;
// 		}

// 		if (authState?.authenticated && authState.chatToken && typeof authState.user_id === 'string' && authState.user_id.trim() !== '') {
// 			const user: User = { id: authState.user_id.trim() };

// 			try {
// 				const streamClient = new StreamVideoClient({
// 					apiKey: STREAM_KEY,
// 					user,
// 					token: authState.chatToken,
// 				});
// 				setClient(streamClient);
// 			} catch (e) {
// 				console.error('Error creating StreamVideoClient:', e);
// 			}
// 		} else {
// 			setClient(null);
// 		}
// 	}, [authState]);

// 	useEffect(() => {
// 		return () => {
// 			if (client) {
// 				client.disconnectUser().catch(err => console.error('Error disconnecting client:', err));
// 			}
// 		};
// 	}, [client]);

// 	return (
// 		<GestureHandlerRootView style={{ flex: 1 }}>
// 			{client ? (
// 				<StreamVideo client={client}>
// 					<OverlayProvider>
// 						<Slot />
// 						<Toast />
// 					</OverlayProvider>
// 				</StreamVideo>
// 			) : (
// 				<Stack>
// 					<Stack.Screen name="index" options={{ headerShown: false }} />
// 					<Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
// 					<Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
// 					<Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
// 				</Stack>
// 			)}
// 		</GestureHandlerRootView>
// 	);
// };

// const RootLayout: React.FC = (): JSX.Element => {
// 	return (
// 		<AuthProvider>
// 			<InitialLayout />
// 		</AuthProvider>
// 	);
// };

// export default RootLayout;



// import 'react-native-gesture-handler';
// import React, { useEffect, useState } from 'react';
// import { Slot, Stack, useRouter, useSegments } from 'expo-router';
// import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { OverlayProvider } from 'stream-chat-expo';
// import Toast from 'react-native-toast-message';
// import type { User } from '@stream-io/video-react-native-sdk';
// import { STREAM_KEY } from '@env'; // ✅ Load from .env

// const InitialLayout = () => {
// 	const { authState, initialized } = useAuth();
// 	const [client, setClient] = useState<StreamVideoClient | null>(null);
// 	const segments = useSegments();
// 	const router = useRouter();

// 	console.log('🚀 Initializing Layout...');
// 	console.log('Auth State:', authState);
// 	console.log('Initialized:', initialized);
// 	console.log('Current Segments:', segments);

// 	// Determine navigation state
// 	useEffect(() => {
// 		if (!initialized) return;

// 		const currentSegment = segments.length > 0 ? segments[0] : '';
// 		const inAuthGroup = currentSegment === '(drawer)' || currentSegment === '(inside)';
// 		const inRoom = currentSegment === 'room';

// 		console.log('📍 Navigation Debugging');
// 		console.log('Current Segment:', currentSegment);
// 		console.log('In Auth Group:', inAuthGroup);
// 		console.log('In Room:', inRoom);

// 		if (authState?.authenticated) {
// 			console.log('✅ User is authenticated');
// 			if (!inAuthGroup && !inRoom) {
// 				console.log('🔄 Redirecting to /(drawer)/(inside)');
// 				router.replace('/(drawer)/(inside)');
// 			}
// 		} else {
// 			console.log('🚪 User is not authenticated, logging out...');
// 			if (client) {
// 				console.log('🔌 Disconnecting StreamVideoClient...');
// 				client.disconnectUser().catch(err => console.error('❌ Error disconnecting:', err));
// 			}
// 			router.replace('/');
// 		}
// 	}, [initialized, authState, client]);

// 	// Initialize StreamVideoClient using chatToken
// 	useEffect(() => {
// 		console.log('🔑 Stream Key Loaded:', STREAM_KEY);

// 		if (!STREAM_KEY) {
// 			console.error('❌ STREAM_KEY is missing! Check your .env file.');
// 			return;
// 		}

// 		// ✅ Ensure `authState.user_id` is valid before initializing StreamVideoClient
// 		if (authState?.authenticated && authState.chatToken && typeof authState.user_id === 'string' && authState.user_id.trim() !== '') {
// 			console.log('✅ Initializing StreamVideoClient...');
// 			console.log('User ID:', authState.user_id);
// 			console.log('Chat Token:', authState.chatToken);

// 			const user: User = { id: authState.user_id.trim() };

// 			try {
// 				const streamClient = new StreamVideoClient({
// 					apiKey: STREAM_KEY,
// 					user,
// 					token: authState.chatToken, // Use chatToken
// 				});
// 				console.log('🎉 StreamVideoClient initialized successfully:', streamClient);
// 				setClient(streamClient);
// 			} catch (e) {
// 				console.error('❌ Error creating StreamVideoClient:', e);
// 			}
// 		} else {
// 			console.log('🔻 No valid authentication or chat token found, setting client to null.');
// 			setClient(null);
// 		}
// 	}, [authState]);

// 	// Cleanup StreamVideoClient when component unmounts
// 	useEffect(() => {
// 		return () => {
// 			if (client) {
// 				console.log('🛑 Cleaning up StreamVideoClient...');
// 				client.disconnectUser().catch(err => console.error('❌ Error disconnecting client:', err));
// 			}
// 		};
// 	}, [client]);

// 	// Render layout conditionally
// 	return (
// 		<GestureHandlerRootView style={{ flex: 1 }}>
// 			{client ? (
// 				<StreamVideo client={client}>
// 					<OverlayProvider>
// 						<Slot />
// 						<Toast />
// 					</OverlayProvider>
// 				</StreamVideo>
// 			) : (
// 				<Stack>
// 					<Stack.Screen name="index" options={{ headerShown: false }} />
// 					<Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
// 					<Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
// 					<Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
// 				</Stack>
// 			)}
// 		</GestureHandlerRootView>
// 	);
// };

// // Wrap with AuthProvider
// const RootLayout = () => {
// 	return (
// 		<AuthProvider>
// 			<InitialLayout />
// 		</AuthProvider>
// 	);
// };

// export default RootLayout;

// import 'react-native-gesture-handler'; 
// import React, { useEffect, useState } from 'react';
// import { Slot, Stack, useRouter, useSegments } from 'expo-router';
// import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { OverlayProvider } from 'stream-chat-expo';
// import Toast from 'react-native-toast-message';
// import type { User } from '@stream-io/video-react-native-sdk';

// const STREAM_KEY = process.env.STREAM_KEY;

// const InitialLayout = () => {
// 	const { authState, initialized } = useAuth();
// 	const [client, setClient] = useState<StreamVideoClient | null>(null);
// 	const segments = useSegments();
// 	const router = useRouter();

// 	console.log('🚀 Initializing Layout...');
// 	console.log('Auth State:', authState);
// 	console.log('Initialized:', initialized);
// 	console.log('Current Segments:', segments);

// 	// Determine navigation state
// 	useEffect(() => {
// 		if (!initialized) return;

// 		const currentSegment = segments.length > 0 ? segments[0] : '';
// 		const inAuthGroup = currentSegment === '(drawer)' || currentSegment === '(inside)';
// 		const inRoom = currentSegment === 'room';

// 		console.log('📍 Navigation Debugging');
// 		console.log('Current Segment:', currentSegment);
// 		console.log('In Auth Group:', inAuthGroup);
// 		console.log('In Room:', inRoom);

// 		if (authState?.authenticated) {
// 			console.log('✅ User is authenticated');
// 			if (!inAuthGroup && !inRoom) {
// 				console.log('🔄 Redirecting to /(drawer)/(inside)');
// 				router.replace('/(drawer)/(inside)');
// 			}
// 		} else {
// 			console.log('🚪 User is not authenticated, logging out...');
// 			if (client) {
// 				console.log('🔌 Disconnecting StreamVideoClient...');
// 				client.disconnectUser();
// 			}
// 			router.replace('/');
// 		}
// 	}, [initialized, authState, client]);

// 	// Initialize StreamVideoClient using chatToken
// 	useEffect(() => {
// 		console.log("Stream Key Loaded:", STREAM_KEY);

// 		if (!STREAM_KEY) {
// 			console.error('❌ STREAM_KEY is missing! Check your environment variables.');
// 			return;
// 		}

// 		if (authState?.authenticated && authState.chatToken) {
// 			console.log('🔑 Initializing StreamVideoClient...');
// 			console.log('STREAM_KEY:', STREAM_KEY);
// 			console.log('User ID:', authState.user_id);
// 			console.log('Chat Token:', authState.chatToken);

// 			const user: User = { id: authState.user_id! };

// 			try {
// 				const streamClient = new StreamVideoClient({
// 					apiKey: STREAM_KEY!,
// 					user,
// 					token: authState.chatToken, // Use chatToken
// 				});
// 				console.log('✅ StreamVideoClient initialized successfully:', streamClient);
// 				setClient(streamClient);
// 			} catch (e) {
// 				console.error('❌ Error creating StreamVideoClient:', e);
// 			}
// 		} else {
// 			console.log('🔻 No authentication or chat token found, setting client to null.');
// 			setClient(null);
// 		}
// 	}, [authState]);

// 	// Cleanup StreamVideoClient when component unmounts
// 	useEffect(() => {
// 		return () => {
// 			if (client) {
// 				console.log('🛑 Cleaning up StreamVideoClient...');
// 				client.disconnectUser();
// 			}
// 		};
// 	}, [client]);

// 	// Render layout conditionally
// 	return (
// 		<>
// 			{client ? (
// 				<StreamVideo client={client}>
// 					<OverlayProvider>
// 						<Slot />
// 						<Toast />
// 					</OverlayProvider>
// 				</StreamVideo>
// 			) : (
// 				<Stack>
// 					<Stack.Screen name="index" options={{ headerShown: false }} />
// 					<Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
// 					<Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
// 					<Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
// 				</Stack>
// 			)}
// 		</>
// 	);
// };

// // Wrap with AuthProvider
// const RootLayout = () => {
// 	return (
// 		<AuthProvider>
// 			<GestureHandlerRootView style={{ flex: 1 }}>
// 				<InitialLayout />
// 			</GestureHandlerRootView>
// 		</AuthProvider>
// 	);
// };

// export default RootLayout;




// import 'react-native-gesture-handler'; 
// import React, { useEffect, useState } from 'react';
// import { Slot, Stack, useRouter, useSegments } from 'expo-router';
// import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { OverlayProvider } from 'stream-chat-expo';
// import Toast from 'react-native-toast-message';
// import type { User } from '@stream-io/video-react-native-sdk';

// const STREAM_KEY = process.env.STREAM_KEY;

// const InitialLayout = () => {
// 	const { authState, initialized } = useAuth();
// 	const [client, setClient] = useState<StreamVideoClient | null>(null);
// 	const segments = useSegments();
// 	const router = useRouter();

// 	console.log('🚀 Initializing Layout...');
// 	console.log('Auth State:', authState);
// 	console.log('Initialized:', initialized);
// 	console.log('Current Segments:', segments);

// 	// Determine navigation state
// 	useEffect(() => {
// 		if (!initialized) return;

// 		const currentSegment = segments.length > 0 ? segments[0] : '';
// 		const inAuthGroup = currentSegment === '(drawer)' || currentSegment === '(inside)';
// 		const inRoom = currentSegment === 'room';

// 		console.log('📍 Navigation Debugging');
// 		console.log('Current Segment:', currentSegment);
// 		console.log('In Auth Group:', inAuthGroup);
// 		console.log('In Room:', inRoom);

// 		if (authState?.authenticated) {
// 			console.log('✅ User is authenticated');
// 			if (!inAuthGroup && !inRoom) {
// 				console.log('🔄 Redirecting to /(drawer)/(inside)');
// 				router.replace('/(drawer)/(inside)');
// 			}
// 		} else {
// 			console.log('🚪 User is not authenticated, logging out...');
// 			if (client) {
// 				console.log('🔌 Disconnecting StreamVideoClient...');
// 				client.disconnectUser();
// 			}
// 			router.replace('/');
// 		}
// 	}, [initialized, authState, client]);

// 	// Initialize StreamVideoClient using chatToken
// 	useEffect(() => {
// 		console.log("Stream Key Loaded:", STREAM_KEY);

// 		if (authState?.authenticated && authState.chatToken) {
// 			console.log('🔑 Initializing StreamVideoClient...');
// 			console.log('STREAM_KEY:', STREAM_KEY);
// 			console.log('User ID:', authState.user_id);
// 			console.log('Chat Token:', authState.chatToken);

// 			const user: User = { id: authState.user_id! };

// 			if (!STREAM_KEY) {
// 				console.error('❌ STREAM_KEY is missing! Check your environment variables.');
// 				return;
// 			}

// 			try {
// 				const streamClient = new StreamVideoClient({
// 					apiKey: STREAM_KEY!,
// 					user,
// 					token: authState.chatToken, // Use chatToken
// 				});
// 				console.log('✅ StreamVideoClient initialized successfully:', streamClient);
// 				setClient(streamClient);
// 			} catch (e) {
// 				console.error('❌ Error creating StreamVideoClient:', e);
// 			}
// 		} else {
// 			console.log('🔻 No authentication or chat token found, setting client to null.');
// 			setClient(null);
// 		}
// 	}, [authState]);

// 	// Render layout conditionally
// 	return (
// 		<>
// 			{client ? (
// 				<StreamVideo client={client}>
// 					<OverlayProvider>
// 						<Slot />
// 						<Toast />
// 					</OverlayProvider>
// 				</StreamVideo>
// 			) : (
// 				<Stack>
// 					<Stack.Screen name="index" options={{ headerShown: false }} />
// 					<Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
// 					<Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
// 					<Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
// 				</Stack>
// 			)}
// 		</>
// 	);
// };

// // Wrap with AuthProvider
// const RootLayout = () => {
// 	return (
// 		<AuthProvider>
// 			<GestureHandlerRootView style={{ flex: 1 }}>
// 				<InitialLayout />
// 			</GestureHandlerRootView>
// 		</AuthProvider>
// 	);
// };

// export default RootLayout;


// import 'react-native-gesture-handler'; 
// import React, { useEffect, useState } from 'react';
// import { Slot, Stack, useRouter, useSegments } from 'expo-router';
// import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { OverlayProvider } from 'stream-chat-expo';
// import Toast from 'react-native-toast-message';
// import type { User } from '@stream-io/video-react-native-sdk';

// const STREAM_KEY = process.env.EXPO_PUBLIC_STREAM_ACCESS_KEY;

// const InitialLayout = () => {
// 	const { authState, initialized } = useAuth();
// 	const [client, setClient] = useState<StreamVideoClient | null>(null);
// 	const segments = useSegments();
// 	const router = useRouter();

// 	// Determine navigation state
// 	useEffect(() => {
// 		if (!initialized) return;

// 		const inAuthGroup = segments[0] === '(drawer)' || segments[0] === '(inside)';
// 		const inRoom = segments[0] === 'room';

// 		if (authState?.authenticated) {
// 			// Allow direct access to meeting rooms
// 			if (!inAuthGroup && !inRoom) {
// 				router.replace('/(drawer)/(inside)');
// 			}
// 		} else {
// 			// Logout: Disconnect Stream client
// 			client?.disconnectUser();
// 			router.replace('/');
// 		}
// 	}, [initialized, authState]);

// 	// Initialize StreamVideoClient using chatToken
// 	useEffect(() => {
// 		if (authState?.authenticated && authState.chatToken) {
// 			const user: User = { id: authState.user_id! };

// 			try {
// 				const streamClient = new StreamVideoClient({
// 					apiKey: STREAM_KEY!,
// 					user,
// 					token: authState.chatToken, // Use chatToken
// 				});
// 				setClient(streamClient);
// 			} catch (e) {
// 				console.error('Error creating StreamVideoClient:', e);
// 			}
// 		} else {
// 			setClient(null);
// 		}
// 	}, [authState]);

// 	// Render layout conditionally
// 	return (
// 		<>
// 			{client ? (
// 				<StreamVideo client={client}>
// 					<OverlayProvider>
// 						<Slot />
// 						<Toast />
// 					</OverlayProvider>
// 				</StreamVideo>
// 			) : (
// 				<Stack>
// 			<Stack.Screen name="index" options={{ headerShown: false }} />
//           {/* <Stack.Screen name="index" options={{ title: "Welcome" }} /> */}
//           <Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
//           <Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
//           <Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
				
// 				</Stack>
// 			)}
// 		</>
// 	);
// };

// // Wrap with AuthProvider
// const RootLayout = () => {
// 	return (
// 		<AuthProvider>
// 			<GestureHandlerRootView style={{ flex: 1 }}>
// 				<InitialLayout />
// 			</GestureHandlerRootView>
// 		</AuthProvider>
// 	);
// };

// export default RootLayout;

// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";
// import { useColorScheme } from "@/components/useColorScheme";
// import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { OverlayProvider } from "stream-chat-expo";
// import Toast from "react-native-toast-message";
// import { useRouter, useSegments } from "expo-router";

// // ✅ Load environment variables using @expo/env
// import "@expo/env";

// export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   initialRouteName: "(drawer)",
// };

// // ✅ Use STREAM_ACCESS_KEY from process.env
// const STREAM_KEY = process.env.STREAM_ACCESS_KEY;

// if (!STREAM_KEY) {
//   console.warn("Warning: STREAM_KEY is missing from .env. Video features may not work.");
// }

// // ✅ Prevent splash screen auto-hide
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <InitialLayout />
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// }

// function InitialLayout() {
//   const { authState, initialized } = useAuth();
//   const [client, setClient] = useState(null);
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!initialized) return;

//     const inAuthGroup = segments[0] === "(drawer)";

//     if (authState?.authenticated && !inAuthGroup) {
//       router.replace("/(drawer)/(inside)");
//     } else if (!authState?.authenticated) {
//       client?.disconnectUser();
//       setClient(null);
//       router.replace("/");
//     }
//   }, [initialized, authState]);

//   useEffect(() => {
//     let clientInstance = null;

//     if (authState?.authenticated && authState.token && STREAM_KEY) {
//       const user = { id: authState.user_id || "" };

//       try {
//         clientInstance = new StreamVideoClient({
//           apiKey: STREAM_KEY,
//           user,
//           token: authState.token,
//         });
//         setClient(clientInstance);
//       } catch (e) {
//         console.error("Error creating StreamVideoClient:", e);
//       }
//     }

//     return () => {
//       if (clientInstance) {
//         clientInstance.disconnectUser();
//         setClient(null);
//       }
//     };
//   }, [authState]);

//   return (
//     <ThemeProvider value={useColorScheme() === "dark" ? DarkTheme : DefaultTheme}>
//       {!client ? (
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="index" options={{ title: "Welcome" }} />
//           <Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
//           <Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
//           <Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
//         </Stack>
//       ) : (
//         <StreamVideo client={client}>
//           <OverlayProvider>
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//               <Stack.Screen name="(drawer)/(inside)" options={{ headerShown: false }} />
//               <Stack.Screen name="(room)/[id]" options={{ title: "Room" }} />
//             </Stack>
//             <Toast />
//           </OverlayProvider>
//         </StreamVideo>
//       )}
//     </ThemeProvider>
//   );
// }


// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";
// import { useColorScheme } from "@/components/useColorScheme";
// import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-native-sdk";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { OverlayProvider } from "stream-chat-expo";
// import Toast from "react-native-toast-message";
// import Constants from "expo-constants";
// import { useRouter, useSegments } from "expo-router";

// export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   initialRouteName: "(drawer)",
// };

// // ✅ Handle STREAM_KEY safely (No TypeScript needed)
// const STREAM_KEY = Constants.expoConfig?.extra?.STREAM_ACCESS_KEY;

// if (!STREAM_KEY) {
//   console.warn("Warning: STREAM_KEY is missing from Expo config. Video features may not work.");
// }

// // ✅ Prevent splash screen auto-hide
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <InitialLayout />
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// }

// function InitialLayout() {
//   const { authState, initialized } = useAuth();
//   const [client, setClient] = useState(null);
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!initialized) return;

//     const inAuthGroup = segments[0] === "(drawer)";

//     if (authState?.authenticated && !inAuthGroup) {
//       router.replace("/(drawer)/(inside)");
//     } else if (!authState?.authenticated) {
//       client?.disconnectUser();
//       setClient(null);
//       router.replace("/");
//     }
//   }, [initialized, authState]);

//   useEffect(() => {
//     let clientInstance = null;

//     if (authState?.authenticated && authState.token && STREAM_KEY) {
//       const user = { id: authState.user_id || "" }; // ✅ No TypeScript type needed

//       try {
//         clientInstance = new StreamVideoClient({
//           apiKey: STREAM_KEY,
//           user,
//           token: authState.token,
//         });
//         setClient(clientInstance);
//       } catch (e) {
//         console.error("Error creating StreamVideoClient:", e);
//       }
//     }

//     return () => {
//       if (clientInstance) {
//         clientInstance.disconnectUser();
//         setClient(null);
//       }
//     };
//   }, [authState]);

//   return (
//     <ThemeProvider value={useColorScheme() === "dark" ? DarkTheme : DefaultTheme}>
//       {!client ? (
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="index" options={{ title: "Welcome" }} />
//           <Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
//           <Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
//           <Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />
//         </Stack>
//       ) : (
//         <StreamVideo client={client}>
//           <OverlayProvider>
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//               <Stack.Screen name="(drawer)/(inside)" options={{ headerShown: false }} />
//               <Stack.Screen name="(room)/[id]" options={{ title: "Room" }} />
//             </Stack>
//             <Toast />
//           </OverlayProvider>
//         </StreamVideo>
//       )}
//     </ThemeProvider>
//   );
// }


// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect, useState } from 'react';
// import 'react-native-reanimated';
// import { useColorScheme } from '@/components/useColorScheme';
// import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-native-sdk';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { OverlayProvider } from 'stream-chat-expo';
// import Toast from 'react-native-toast-message';
// import Constants from 'expo-constants';
// import { useRouter, useSegments } from 'expo-router';

// export { ErrorBoundary } from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: '(drawer)',
// };

// // ✅ Safely handle STREAM_KEY
// const STREAM_KEY: string | undefined = Constants.expoConfig?.extra?.STREAM_ACCESS_KEY;
// if (!STREAM_KEY) {
//   console.warn('Warning: STREAM_KEY is missing from Expo config. Video features may not work.');
// }

// // ✅ Prevents splash screen from auto-hiding
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <InitialLayout />
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// }

// function InitialLayout() {
//   const { authState, initialized } = useAuth();
//   const [client, setClient] = useState<StreamVideoClient | null>(null);
//   const segments = useSegments();
//   const router = useRouter();

//   // ✅ Redirect based on authentication state
//   useEffect(() => {
//     if (!initialized) return;

//     const inAuthGroup = segments[0] === '(drawer)'; // Checking if user is inside protected routes

//     if (authState?.authenticated && !inAuthGroup) {
//       router.replace('/(drawer)/(inside)');
//     } else if (!authState?.authenticated) {
//       client?.disconnectUser();
//       setClient(null);
//       router.replace('/');
//     }
//   }, [initialized, authState]);

//   // ✅ Initialize StreamVideoClient only for authenticated users
//   useEffect(() => {
//     let clientInstance: StreamVideoClient | null = null;

//     if (authState?.authenticated && authState.token && STREAM_KEY) {
//       const user: User = { id: authState.user_id! };

//       try {
//         clientInstance = new StreamVideoClient({
//           apiKey: STREAM_KEY,
//           user,
//           token: authState.token,
//         });
//         setClient(clientInstance);
//       } catch (e) {
//         console.error('Error creating StreamVideoClient:', e);
//       }
//     }

//     return () => {
//       clientInstance?.disconnectUser();
//       setClient(null);
//     };
//   }, [authState]);

//   return (
//     <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
//       {!client ? (
//         // ✅ Non-authenticated screens
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="index" options={{ title: 'Welcome' }} />
//           <Stack.Screen name="signInScreen" options={{ title: 'Sign In' }} />
//           <Stack.Screen name="signUpScreen" options={{ title: 'Sign Up' }} />
//           <Stack.Screen name="verificationScreen" options={{ title: 'Verify Account' }} />
//         </Stack>
//       ) : (
//         // ✅ Authenticated screens (after sign-in/sign-up & verification)
//         <StreamVideo client={client}>
//           <OverlayProvider>
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//               <Stack.Screen name="(drawer)/(inside)" options={{ headerShown: false }} />
//               <Stack.Screen name="(room)/[id]" options={{ title: 'Room' }} />
//             </Stack>
//             <Toast />
//           </OverlayProvider>
//         </StreamVideo>
//       )}
//     </ThemeProvider>
//   );
// }


// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect, useState } from 'react';
// import 'react-native-reanimated';
// import { useColorScheme } from '@/components/useColorScheme';
// import { StreamVideo, StreamVideoClient, User } from '@stream-io/video-react-native-sdk';
// import { AuthProvider, useAuth } from '../context/AuthContext';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { OverlayProvider } from 'stream-chat-expo';
// import Toast from 'react-native-toast-message';
// import Constants from 'expo-constants';
// import { useRouter, useSegments } from 'expo-router';

// export { ErrorBoundary } from 'expo-router';

// export const unstable_settings = {
//   initialRouteName: '(drawer)',
// };

// SplashScreen.preventAutoHideAsync();

// const STREAM_KEY = Constants.expoConfig?.extra?.STREAM_ACCESS_KEY;

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <InitialLayout />
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// }

// function InitialLayout() {
//   const { authState, initialized } = useAuth();
//   const [client, setClient] = useState<StreamVideoClient | null>(null);
//   const segments = useSegments();
//   const router = useRouter();

//   /** Handle Navigation Based on Authentication */
//   useEffect(() => {
//     if (!initialized) return;

//     const inAuthGroup = segments[0] === '(drawer)';
//     if (authState?.authenticated && !inAuthGroup) {
//       router.replace('/(drawer)/(inside)');
//     } else if (!authState?.authenticated) {
//       client?.disconnectUser();
//       setClient(null);
//       router.replace('/');
//     }
//   }, [initialized, authState]);

//   /** Handle Stream Client Setup */
//   useEffect(() => {
//     let clientInstance: StreamVideoClient | null = null;

//     if (authState?.authenticated && authState.token) {
//       const user: User = { id: authState.user_id! };

//       try {
//         clientInstance = new StreamVideoClient({
//           apiKey: STREAM_KEY!,
//           user,
//           token: authState.token,
//         });

//         setClient(clientInstance);
//       } catch (e) {
//         console.error('Error creating StreamVideoClient:', e);
//       }
//     }

//     return () => {
//       clientInstance?.disconnectUser();
//       setClient(null);
//     };
//   }, [authState]);

//   return (
//     <ThemeProvider value={useColorScheme() === 'dark' ? DarkTheme : DefaultTheme}>
//       {!authState?.authenticated ? (
//         /** Unauthenticated Users: Show Authentication Screens */
//         <Stack screenOptions={{ headerShown: false }}>
//           <Stack.Screen name="index" options={{ title: 'Welcome' }} />
//           <Stack.Screen name="signInScreen" options={{ title: 'Sign In' }} />
//           <Stack.Screen name="signUpScreen" options={{ title: 'Sign Up' }} />
//           <Stack.Screen name="verificationScreen" options={{ title: 'Verify Account' }} />
//         </Stack>
//       ) : (
//         /** Authenticated Users: Show App Screens */
//         <StreamVideo client={client!}>
//           <OverlayProvider>
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="(drawer)" />
//               <Stack.Screen name="(drawer)/(inside)" />
//               <Stack.Screen name="(room)/[id]" options={{ title: 'Room' }} />
//             </Stack>
//             <Toast />
//           </OverlayProvider>
//         </StreamVideo>
//       )}
//     </ThemeProvider>
//   );
// }


// import FontAwesome from "@expo/vector-icons/FontAwesome";
// import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import { Stack } from "expo-router";
// import * as SplashScreen from "expo-splash-screen";
// import { useEffect, useState } from "react";
// import "react-native-reanimated";
// import { useColorScheme } from "@/components/useColorScheme";
// import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";
// import { AuthProvider, useAuth } from "../context/AuthContext";
// import { GestureHandlerRootView } from "react-native-gesture-handler";
// import { OverlayProvider } from "stream-chat-expo";
// import Toast from "react-native-toast-message";
// import Constants from "expo-constants";
// import { useRouter, useSegments } from "expo-router";
// import { StreamVideo, StreamVideoClient, User } from "@stream-io/video-react-native-sdk";


// export { ErrorBoundary } from "expo-router";

// export const unstable_settings = {
//   initialRouteName: "(drawer)",
// };

// SplashScreen.preventAutoHideAsync();

// const STREAM_KEY = Constants.expoConfig?.extra?.STREAM_ACCESS_KEY;

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <GestureHandlerRootView style={{ flex: 1 }}>
//         <InitialLayout />
//       </GestureHandlerRootView>
//     </AuthProvider>
//   );
// }

// function InitialLayout() {
//   const { authState, initialized } = useAuth();
//   const [client, setClient] = useState<StreamVideoClient | null>(null);
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!initialized) return;

//     const isAuthScreen = ["index", "signInScreen", "signUpScreen", "verificationScreen"].includes(segments[0]);
//     const isProtectedScreen = segments[0] === "(drawer)" || segments[0] === "(room)";

//     if (!authState?.authenticated) {
//       // Redirect to authentication screens if not authenticated
//       client?.disconnectUser();
//       setClient(null);
//       if (isProtectedScreen) {
//         router.replace("/index");
//       }
//     } else if (!isAuthScreen) {
//       // If authenticated, redirect to the main app
//       router.replace("/(drawer)/(inside)");
//     }
//   }, [initialized, authState, segments]);

//   useEffect(() => {
//     let clientInstance: StreamVideoClient | null = null;
//     if (authState?.authenticated && authState.token) {
//       const user: User = { id: authState.user_id! };
//       try {
//         clientInstance = new StreamVideoClient({ apiKey: STREAM_KEY!, user, token: authState.token });
//         setClient(clientInstance);
//       } catch (e) {
//         console.error("Error creating client:", e);
//       }
//     }
//     return () => {
//       clientInstance?.disconnectUser();
//       setClient(null);
//     };
//   }, [authState]);

//   return (
//     <ThemeProvider value={useColorScheme() === "dark" ? DarkTheme : DefaultTheme}>
//       {!client ? (
//         <Stack screenOptions={{ headerShown: false }}>
//           {/* Authentication Screens - Always accessible */}
//           <Stack.Screen name="index" options={{ title: "Welcome" }} />
//           <Stack.Screen name="signInScreen" options={{ title: "Sign In" }} />
//           <Stack.Screen name="signUpScreen" options={{ title: "Sign Up" }} />
//           <Stack.Screen name="verificationScreen" options={{ title: "Verify Account" }} />

//           {/* Protected Screens - Require authentication */}
//           {authState?.authenticated && (
//             <>
//               <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//               <Stack.Screen name="(drawer)/(inside)" options={{ headerShown: false }} />
//               <Stack.Screen name="(room)/[id]" options={{ title: "Room" }} />
//             </>
//           )}
//         </Stack>
//       ) : (
//         <StreamVideo client={client}>
//           <OverlayProvider>
//             <Stack screenOptions={{ headerShown: false }}>
//               <Stack.Screen name="(drawer)/(inside)" />
//             </Stack>
//             <Toast />
//           </OverlayProvider>
//         </StreamVideo>
//       )}
//     </ThemeProvider>
//   );
// }


// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/components/useColorScheme';

// export { ErrorBoundary } from 'expo-router';

// // Set the initial route to the (inside) folder, which contains the main tabs.
// export const unstable_settings = {
//   initialRouteName: '(drawer)',
// };

// // Prevent splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack screenOptions={{ headerShown: false }}>
//         {/* Authentication & Onboarding Screens */}
//         <Stack.Screen name="index" options={{ title: 'Welcome' }} />
//         <Stack.Screen name="signInScreen" options={{ title: 'Sign In' }} />
//         <Stack.Screen name="signUpScreen" options={{ title: 'Sign Up' }} />
//         <Stack.Screen name="verificationScreen" options={{ title: 'Verify Account' }} />

//         {/* Main Tab Navigation (inside contains tabs) */}
//         {/* <Stack.Screen name="(inside)" /> */}

//           {/* Drawer Navigation (Wrapping Only Tabs) */}
//         <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
//         <Stack.Screen name="(drawer)/(inside)" options={{ headerShown: false }} />
//         <Stack.Screen name="(room)/[id]" options={{ title: 'Room' }} />

//       </Stack>
//     </ThemeProvider>
//   );
// }



// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/components/useColorScheme';

// export {
//   // Catch any errors thrown by the Layout component.
//   ErrorBoundary,
// } from 'expo-router';

// export const unstable_settings = {
//   // Ensure that reloading on `/modal` keeps a back button present.
//   initialRouteName: '(tabs)',
// };

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [loaded, error] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     ...FontAwesome.font,
//   });

//   // Expo Router uses Error Boundaries to catch errors in the navigation tree.
//   useEffect(() => {
//     if (error) throw error;
//   }, [error]);

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return <RootLayoutNav />;
// }

// function RootLayoutNav() {
//   const colorScheme = useColorScheme();

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
//       </Stack>
//     </ThemeProvider>
//   );
// }



    // app
    // ├── (drawer) 
    // |       ├──-- (inside)               # Folder for tab screens
    // |       |    ├── (room)  
    // |       │    │    ├── [id].tsx       # Dynamic room screen
    // |       │    │    ├── _layout.tsx    # Layout for (room)
    // |       │    ├── layout.tsx         # Tab Layout Configuration  
    // |       │    ├── profileScreen.tsx  
    // |       │    ├── recordedMeetingsScreen.tsx  
    // |       │    ├── index.tsx          # Default tab screen (e.g., Home)
    // ├── index.tsx              # Default screen (e.g., onboardingScreen)
    // ├── VerificationScreen.tsx  
    // ├── signUpScreen.tsx  
    // ├── signInScreen.tsx  
    // ├── _layout.tsx            # Root layout for expo-router

//     app
// ├── (drawer)                      # Drawer navigation folder
// │   ├── (inside)                  # Folder for tab screens
// │   │   ├── (room)                # Dynamic room screen
// │   │   │   ├── [id].tsx          # Room screen with dynamic ID
// │   │   │   ├── _layout.tsx       # Layout for (room)
// │   │   ├── layout.tsx            # Tab Layout Configuration
// │   │   ├── home.tsx              # Home tab screen
// │   │   ├── liveMeetings.tsx      # Live meetings tab screen
// │   │   ├── recordedMeetings.tsx  # Recorded meetings tab screen
// │   │   ├── profileScreen.tsx     # Profile tab screen
// │   │   ├── index.tsx             # Default tab screen (redirect to home)
// │   ├── favourites.tsx            # Favourites drawer screen
// │   ├── settings.tsx              # Settings drawer screen
// │   ├── changePasswordScreen.tsx  # Change password drawer screen
// │   ├── layout.tsx                # Drawer Layout Configuration
// ├── index.tsx                     # Default screen (e.g., onboardingScreen)
// ├── VerificationScreen.tsx  
// ├── signUpScreen.tsx  
// ├── signInScreen.tsx  
// ├── _layout.tsx                    # Root layout for expo-router




// app
// ├── (drawer)
// │   ├── (inside)                 # Tab navigation screens
// │   │   ├── home.tsx
// │   │   ├── liveMeetings.tsx
// │   │   ├── recordedMeetings.tsx
// │   │   ├── profileScreen.tsx
// │   │   ├── index.tsx            # Redirect to home
// │   │   ├── layout.tsx           # Tab layout
// │   ├── favourites.tsx           
// │   ├── settings.tsx             
// │   ├── changePasswordScreen.tsx  
// │   ├── layout.tsx                # Drawer layout
// │
// ├── (room)                        # Move room outside of (inside)
// │   ├── [id].tsx                  
// │   ├── _layout.tsx                
// │
// ├── index.tsx                     
// ├── _layout.tsx                    

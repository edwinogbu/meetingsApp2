import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';

export { ErrorBoundary } from 'expo-router';

// Set the initial route to the (inside) folder, which contains the main tabs.
export const unstable_settings = {
  initialRouteName: '(inside)',
};

// Prevent splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Authentication & Onboarding Screens */}
        <Stack.Screen name="index" options={{ title: 'Welcome' }} />
        <Stack.Screen name="signInScreen" options={{ title: 'Sign In' }} />
        <Stack.Screen name="signUpScreen" options={{ title: 'Sign Up' }} />
        <Stack.Screen name="verificationScreen" options={{ title: 'Verify Account' }} />

        {/* Main Tab Navigation (inside contains tabs) */}
        <Stack.Screen name="(inside)" />
      </Stack>
    </ThemeProvider>
  );
}



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



// /app
//   ├── (inside)               # Folder for tab screens
//   │   ├── (room)  
//   │   │   ├── [id].tsx       # Dynamic room screen
//   │   │   ├── _layout.tsx    # Layout for (room)
//   │   ├── layout.tsx         # Tab Layout Configuration  
//   │   ├── profileScreen.tsx  
//   │   ├── recordedMeetingsScreen.tsx  
//   │   ├── index.tsx          # Default tab screen (e.g., Home)
//   ├── index.tsx              # Default screen (e.g., onboardingScreen)
//   ├── VerificationScreen.tsx  
//   ├── signUpScreen.tsx  
//   ├── signInScreen.tsx  
//   ├── _layout.tsx            # Root layout for expo-router

import React, { useState } from 'react';
import { StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
import { Tabs } from 'expo-router';
import {
  MaterialIcons,
  FontAwesome5,
  AntDesign,
  Ionicons,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { DrawerToggleButton } from '@react-navigation/drawer';

interface IconProps {
  color?: string;
  focused?: boolean;
}

// Define tab icons
const icons: Record<string, (props: IconProps) => JSX.Element> = {
  home: (props) => <MaterialIcons name="dashboard" size={26} {...props} />,
  liveMeetings: (props) => <FontAwesome5 name="broadcast-tower" size={22} {...props} />,
  recordedMeetings: (props) => <MaterialIcons name="video-library" size={26} {...props} />,
  profileScreen: (props) => <AntDesign name="user" size={26} {...props} />,
};

// Theme colors
const primaryColor = '#6D00B3';
const secondaryColor = '#6C00B1';

const TabLayout: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const router = useRouter();

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: [
          styles.tabBar,
          { backgroundColor: darkTheme ? primaryColor : '#FFF' },
        ],
        tabBarActiveTintColor: secondaryColor,
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, focused }) => {
          const Icon = icons[route.name];
          return Icon ? <Icon color={color} focused={focused} /> : null;
        },
        tabBarLabelStyle: {
          ...styles.tabLabel,
          color: darkTheme ? '#FFF' : primaryColor,
        },
        tabBarButton: (props) => <Pressable android_ripple={{ color: '#ddd' }} {...props} />,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
        headerTintColor: '#FFF',
        headerShown: true,
        headerTitle:
          route.name === 'home'
            ? 'Start Meeting'
            : route.name === 'liveMeetings'
            ? 'Live Meetings'
            : route.name === 'recordedMeetings'
            ? 'Recorded Meetings'
            : route.name === 'profileScreen'
            ? 'Profile'
            : 'Video Conference',
        headerRight: () => (
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={toggleTheme}>
              <Ionicons
                name={darkTheme ? 'sunny-outline' : 'moon-outline'}
                size={24}
                color="#FFF"
              />
            </TouchableOpacity>
          </View>
        ),
        headerLeft: () => <DrawerToggleButton tintColor="#FFF" />,
      })}
    >
      <Tabs.Screen name="home" options={{ title: 'Start' }} />
      <Tabs.Screen name="liveMeetings" options={{ title: 'Live Meetings' }} />
      <Tabs.Screen name="recordedMeetings" options={{ title: 'Recorded' }} />
      <Tabs.Screen name="profileScreen" options={{ title: 'Profile' }} />
    </Tabs>
  );
};

// Styles
const styles = StyleSheet.create({
  tabBar: {
    borderTopWidth: 0,
    height: 60,
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'System',
    marginBottom: 4,
  },
  header: {
    backgroundColor: primaryColor,
    shadowColor: 'transparent',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerRight: {
    marginRight: 15,
  },
});

export default TabLayout;


// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Pressable,
//   TouchableOpacity,
// } from 'react-native';
// import { Tabs } from 'expo-router';
// import {
//   MaterialIcons,
//   FontAwesome5,
//   AntDesign,
//   Ionicons,
// } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import { DrawerToggleButton } from '@react-navigation/drawer';

// interface IconProps {
//   color?: string;
//   focused?: boolean;
// }

// // Updated icons for video conferencing app
// const icons: Record<string, (props: IconProps) => JSX.Element> = {
//   home: (props) => (
//     <MaterialIcons
//       name="video-call"
//       size={26}
//       {...props}
//       style={{ backgroundColor: '#1A1A36', color: '#FFFFFF' }}
//     />
//   ),
//   liveMeetings: (props) => (
//     <FontAwesome5
//       name="broadcast-tower"
//       size={22}
//       {...props}
//       style={{ backgroundColor: '#1A1A36', color: '#FFFFFF' }}
//     />
//   ),
//   recordedMeetings: (props) => (
//     <MaterialIcons
//       name="video-library"
//       size={26}
//       {...props}
//       style={{ backgroundColor: '#1A1A36', color: '#FFFFFF' }}
//     />
//   ),
//   profileScreen: (props) => (
//     <AntDesign
//       name="user"
//       size={26}
//       {...props}
//       style={{ backgroundColor: '#1A1A36', color: '#FFFFFF' }}
//     />
//   ),
// };

// const primaryColor = '#FF8A00';
// const secondaryColor = '#FF9800';

// const TabLayout: React.FC = () => {
//   const [theme, setTheme] = useState<string>('light');
//   const router = useRouter();

//   const toggleTheme = (): void => {
//     setTheme((prevTheme) => (prevTheme === 'light' ? primaryColor : 'light'));
//   };

//   return (
//     <Tabs
//       screenOptions={({ route }) => ({
//         tabBarStyle: [
//           styles.tabBar,
//           { backgroundColor: theme === 'light' ? '#FFF' : primaryColor },
//         ],
//         tabBarActiveTintColor: secondaryColor,
//         tabBarInactiveTintColor: '#888',
//         tabBarIcon: ({ color, focused }) => {
//           const Icon = icons[route.name];
//           return Icon ? <Icon color={color} focused={focused} /> : null;
//         },
//         tabBarLabelStyle: {
//           ...styles.tabLabel,
//           color: theme === primaryColor ? '#FFF' : primaryColor,
//         },
//         tabBarButton: (props) => <Pressable android_ripple={{ color: '#ddd' }} {...props} />,
//         headerStyle: styles.header,
//         headerTitleStyle: styles.headerTitle,
//         headerShown: true,
//         headerTitle:
//           route.name === 'home'
//             ? 'Start Meeting'
//             : route.name === 'liveMeetings'
//             ? 'Live Meetings'
//             : route.name === 'recordedMeetings'
//             ? 'Recorded Meetings'
//             : route.name === 'profileScreen'
//             ? 'Profile'
//             : 'Video Conference',
//         headerRight: () => (
//           <View style={styles.headerRight}>
//             <TouchableOpacity onPress={toggleTheme}>
//               <Ionicons
//                 name={theme === 'light' ? 'moon-outline' : 'sunny-outline'}
//                 size={24}
//                 color="#FFF"
//               />
//             </TouchableOpacity>
//           </View>
//         ),
//         headerLeft: () => <DrawerToggleButton tintColor="#000" />,
//       })}
//     >
//       <Tabs.Screen name="home" options={{ title: 'Start' }} />
//       <Tabs.Screen name="liveMeetings" options={{ title: 'Live' }} />
//       <Tabs.Screen name="recordedMeetings" options={{ title: 'Recorded' }} />
//       <Tabs.Screen name="profileScreen" options={{ title: 'Profile' }} />
//     </Tabs>
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: '#FFF',
//     borderTopWidth: 0,
//     height: 60,
//     paddingTop: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 5,
//   },
//   tabLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     fontFamily: 'System',
//     marginBottom: 4,
//   },
//   header: {
//     backgroundColor: primaryColor,
//     shadowColor: 'transparent',
//   },
//   headerTitle: {
//     color: '#FFF',
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   headerRight: {
//     marginRight: 15,
//   },
// });

// export default TabLayout;


// import { Tabs } from 'expo-router';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { useColorScheme } from '@/components/useColorScheme'; // Ensure this is correctly defined
// import Colors from '@/constants/Colors'; // Ensure this is correctly defined

// // Define type for TabBarIcon props
// interface TabBarIconProps {
//   name: React.ComponentProps<typeof FontAwesome>['name'];
//   color: string;
// }

// // Tab bar icons
// function TabBarIcon(props: TabBarIconProps) {
//   return <FontAwesome size={24} {...props} />;
// }

// export default function Page() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint, // Tint color based on color scheme
//         headerShown: false, // Hide headers for cleaner navigation
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profileScreen"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="recordedMeetingsScreen"
//         options={{
//           title: 'Meetings',
//           tabBarIcon: ({ color }) => <TabBarIcon name="video-camera" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }


// import { Tabs } from 'expo-router';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { useColorScheme } from '@/components/useColorScheme';
// import Colors from '@/constants/Colors';

// // Tab bar icons
// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
//   return <FontAwesome size={24} {...props} />;
// }

// export default function Page() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false, // Hide headers for cleaner navigation
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="profileScreen"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
//         }}
//       />
//       <Tabs.Screen
//         name="recordedMeetingsScreen"
//         options={{
//           title: 'Meetings',
//           tabBarIcon: ({ color }) => <TabBarIcon name="video-camera" color={color} />,
//         }}
//       />
//     </Tabs>
//   );
// }


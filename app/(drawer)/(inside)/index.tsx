import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import io, { Socket } from 'socket.io-client';

// Get screen width & height
const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// Define colors
const COLORS = {
  primary: '#6D00B3',
  white: '#FFFFFF',
  lightGray: '#E0E0E0',
  buttonBackground: '#4B0082',
};

// Socket server URL
const SOCKET_SERVER_URL = 'http://your-server-ip:3001';

// Define Room interface
interface Room {
  id: string;
  name: string;
  img: any; // Image source type for React Native
}

// Define CustomButtonProps interface
interface CustomButtonProps {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
  primary?: boolean;
}

// Custom Button Component
const CustomButton: React.FC<CustomButtonProps> = ({ onPress, icon, text, primary = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, primary ? styles.primaryButton : styles.secondaryButton]}
      activeOpacity={0.85}
      onPress={onPress}
    >
      <Ionicons name={icon} size={24} color={COLORS.white} />
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_SERVER_URL);

    // Request live rooms
    socket.emit('get-live-rooms');

    // Listen for updates on live rooms
    socket.on('live-rooms', (data: Room[]) => {
      setRooms(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Start a new meeting
  const startNewMeeting = (): void => {
    const newMeetingId: string = Math.random().toString(36).substring(7);
    router.push(`/room/${newMeetingId}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../../assets/images/logo.jpeg')} style={styles.logo} />
        <Text style={styles.appTitle}>BornwithWealth Connect</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.headerButtons}>
        <CustomButton onPress={startNewMeeting} icon="videocam-outline" text="Start Live" primary />
        <CustomButton onPress={() => {}} icon="enter-outline" text="Join by ID" />
      </View>

      {/* Features Section */}
      <View style={styles.featureButtons}>
        <CustomButton onPress={() => {}} icon="chatbubble-ellipses-outline" text="Chat Rooms" />
        <CustomButton onPress={() => {}} icon="compass-outline" text="Explore" />
        <CustomButton onPress={() => {}} icon="calendar-outline" text="Schedule Live" />
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Live Streaming Rooms</Text>
        <View style={styles.line} />
      </View>

      {/* Live Rooms */}
      <View style={styles.roomGrid}>
        {rooms.map((room) => (
          <TouchableOpacity key={room.id} activeOpacity={0.85} onPress={() => router.push(`/room/${room.id}`)}>
            <ImageBackground source={room.img} style={styles.image} imageStyle={styles.imageStyle}>
              <View style={styles.overlay}>
                <Text style={styles.roomText}>{room.name}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 25,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  featureButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
  },
  secondaryButton: {
    backgroundColor: COLORS.buttonBackground,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#fff',
  },
  dividerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  roomGrid: {
    flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
  },
  image: {
    width: WIDTH > HEIGHT ? WIDTH / 3.5 : WIDTH - 40,
    height: 230,
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
  },
  imageStyle: {
    borderRadius: 14,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 14,
  },
  roomText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
  },
});

export default HomeScreen;


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import io from 'socket.io-client';

// const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// const COLORS = {
//   primary: '#6D00B3',
//   white: '#FFFFFF',
//   lightGray: '#E0E0E0',
//   buttonBackground: '#4B0082',
// };

// const SOCKET_SERVER_URL = 'http://your-server-ip:3001';

// export default function HomeScreen() {
//   const router = useRouter();
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const socket = io(SOCKET_SERVER_URL);

//     socket.emit('get-live-rooms');

//     socket.on('live-rooms', (data) => {
//       setRooms(data);
//     });

//     return () => {
//       socket.off('live-rooms');
//       socket.disconnect();
//     };
//   }, []);

//   const startNewMeeting = () => {
//     const newMeetingId = Math.random().toString(36).substring(7);
//     router.push(`/room/${newMeetingId}`);
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.header}>
//         <Image source={require('../../../assets/images/logo.jpeg')} style={styles.logo} />
//         <Text style={styles.appTitle}>BornwithWealth Connect</Text>
//       </View>

//       <View style={styles.headerButtons}>
//         <CustomButton onPress={startNewMeeting} icon="videocam-outline" text="Start Live" primary />
//         <CustomButton onPress={() => {}} icon="enter-outline" text="Join by ID" />
//       </View>

//       <View style={styles.featureButtons}>
//         <CustomButton onPress={() => {}} icon="chatbubble-ellipses-outline" text="Chat Rooms" />
//         <CustomButton onPress={() => {}} icon="compass-outline" text="Explore" />
//         <CustomButton onPress={() => {}} icon="calendar-outline" text="Schedule Live" />
//       </View>

//       <View style={styles.divider}>
//         <View style={styles.line} />
//         <Text style={styles.dividerText}>Live Streaming Rooms</Text>
//         <View style={styles.line} />
//       </View>

//       <View style={styles.roomGrid}>
//         {rooms.length === 0 ? (
//           <Text style={styles.noRoomsText}>No Live Rooms Available</Text>
//         ) : (
//           rooms.map((room) => (
//             <TouchableOpacity
//               key={room.id}
//               activeOpacity={0.85}
//               onPress={() => router.push(`/room/${room.id}`)}
//             >
//               <ImageBackground
//                 source={{ uri: room.img }}
//                 style={styles.image}
//                 imageStyle={styles.imageStyle}
//               >
//                 <View style={styles.overlay}>
//                   <Text style={styles.roomText}>{room.name}</Text>
//                 </View>
//               </ImageBackground>
//             </TouchableOpacity>
//           ))
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const CustomButton = ({ onPress, icon, text, primary }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     style={[styles.button, primary && styles.primaryButton]}
//     activeOpacity={0.7}
//   >
//     <Ionicons name={icon} size={24} color={COLORS.white} />
//     <Text style={styles.buttonText}>{text}</Text>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     paddingHorizontal: 20,
//   },
//   contentContainer: {
//     paddingBottom: 30,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 20,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//     marginRight: 10,
//     borderRadius: 25,
//     borderColor: '#FFFFFF',
//     borderWidth: 1,
//   },
//   appTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   headerButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   featureButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.buttonBackground,
//     padding: 10,
//     borderRadius: 8,
//     justifyContent: 'center',
//     width: WIDTH / 2.5,
//   },
//   primaryButton: {
//     backgroundColor: COLORS.primary,
//   },
//   buttonText: {
//     color: COLORS.white,
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 8,
//   },
//   divider: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   line: {
//     flex: 1,
//     height: 1.5,
//     backgroundColor: '#fff',
//   },
//   dividerText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 15,
//   },
//   roomGrid: {
//     flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 20,
//   },
//   image: {
//     width: WIDTH > HEIGHT ? WIDTH / 3.5 : WIDTH - 40,
//     height: 230,
//     borderRadius: 14,
//     overflow: 'hidden',
//     elevation: 8,
//     shadowColor: '#000',
//   },
//   imageStyle: {
//     borderRadius: 14,
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     borderRadius: 14,
//   },
//   roomText: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 10,
//     textAlign: 'center',
//   },
//   noRoomsText: {
//     color: '#fff',
//     fontSize: 18,
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Dimensions,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import io from 'socket.io-client';

// const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// const COLORS = {
//   primary: '#6D00B3',
//   white: '#FFFFFF',
//   lightGray: '#E0E0E0',
//   buttonBackground: '#4B0082',
// };

// const SOCKET_SERVER_URL = 'http://your-server-ip:3001';

// export default function HomeScreen() {
//   const router = useRouter();
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const socket = io(SOCKET_SERVER_URL);
//     socket.emit('get-live-rooms');

//     socket.on('live-rooms', (data) => {
//       setRooms(data);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const startNewMeeting = () => {
//     const newMeetingId = Math.random().toString(36).substring(7);
//     router.push(`/room/${newMeetingId}`);
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       <View style={styles.header}>
//         <Image source={require('../../../assets/images/logo.jpeg')} style={styles.logo} />
//         <Text style={styles.appTitle}>BornwithWealth Connect</Text>
//       </View>

//       <View style={styles.headerButtons}>
//         <CustomButton onPress={startNewMeeting} icon="videocam-outline" text="Start Live" primary />
//         <CustomButton onPress={() => {}} icon="enter-outline" text="Join by ID" />
//       </View>

//       <View style={styles.featureButtons}>
//         <CustomButton onPress={() => {}} icon="chatbubble-ellipses-outline" text="Chat Rooms" />
//         <CustomButton onPress={() => {}} icon="compass-outline" text="Explore" />
//         <CustomButton onPress={() => {}} icon="calendar-outline" text="Schedule Live" />
//       </View>

//       <View style={styles.divider}>
//         <View style={styles.line} />
//         <Text style={styles.dividerText}>Live Streaming Rooms</Text>
//         <View style={styles.line} />
//       </View>

//       <View style={styles.roomGrid}>
//         {rooms.map((room) => (
//           <TouchableOpacity key={room.id} activeOpacity={0.85} onPress={() => router.push(`/room/${room.id}`)}>
//             <ImageBackground source={room.img} style={styles.image} imageStyle={styles.imageStyle}>
//               <View style={styles.overlay}>
//                 <Text style={styles.roomText}>{room.name}</Text>
//               </View>
//             </ImageBackground>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     paddingHorizontal: 20,
//   },
//   contentContainer: {
//     paddingBottom: 30,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 20,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//     marginRight: 10,
//     borderRadius: 25,
//     borderColor: '#FFFFFF',
//     borderWidth: 1,
//   },
//   appTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   headerButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 10,
//   },
//   featureButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   divider: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   line: {
//     flex: 1,
//     height: 1.5,
//     backgroundColor: '#fff',
//   },
//   dividerText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginHorizontal: 15,
//   },
//   roomGrid: {
//     flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//     gap: 20,
//   },
//   image: {
//     width: WIDTH > HEIGHT ? WIDTH / 3.5 : WIDTH - 40,
//     height: 230,
//     borderRadius: 14,
//     overflow: 'hidden',
//     elevation: 8,
//     shadowColor: '#000',
//   },
//   imageStyle: {
//     borderRadius: 14,
//   },
//   overlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//     borderRadius: 14,
//   },
//   roomText: {
//     color: '#fff',
//     fontSize: 22,
//     fontWeight: 'bold',
//     textShadowColor: 'rgba(0, 0, 0, 0.75)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 10,
//     textAlign: 'center',
//   },
// });


// import React, { useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import io from 'socket.io-client';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const COLORS = {
//   primary: '#6D00B3',
//   secondary: '#6C00B1',
//   white: '#FFFFFF',
//   lightGray: '#E0E0E0',
//   buttonBackground: '#4B0082',
// };

// const SOCKET_SERVER_URL = 'http://your-server-ip:3001'; // Replace with actual server URL

// export default function Page() {
//   const router = useRouter();
//   const [upcomingMeetings, setUpcomingMeetings] = useState([]);

//   useEffect(() => {
//     const socket = io(SOCKET_SERVER_URL);
//     socket.emit('get-upcoming-meetings');

//     socket.on('upcoming-meetings', (data) => {
//       setUpcomingMeetings(data);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const startNewMeeting = () => {
//     const newMeetingId = Math.random().toString(36).substring(7);
//     router.push(`/room/${newMeetingId}`);
//   };

//   const renderMeetingItem = ({ item }) => (
//     <View style={styles.meetingCard}>
//       <View style={styles.meetingInfo}>
//         <Text style={styles.meetingTitle}>{item.name}</Text>
//         <Text style={styles.meetingTime}>{item.time}</Text>
//       </View>
//       <TouchableOpacity
//         style={styles.joinButton}
//         onPress={() => router.push(`/room/${item.id}`)}
//       >
//         <Ionicons name="videocam" size={24} color={COLORS.white} />
//         <Text style={styles.joinButtonText}>Join</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Welcome to Your Meetings</Text>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.actionButton} onPress={startNewMeeting}>
//           <MaterialIcons name="video-call" size={30} color={COLORS.white} />
//           <Text style={styles.buttonText}>Start Meeting</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/liveMeetings')}>
//           <Ionicons name="people" size={30} color={COLORS.white} />
//           <Text style={styles.buttonText}>Join Meeting</Text>
//         </TouchableOpacity>
//       </View>

//       <Text style={styles.subHeader}>Upcoming Meetings</Text>
//       {upcomingMeetings.length === 0 ? (
//         <Text style={styles.noMeetings}>No upcoming meetings</Text>
//       ) : (
//         <FlatList
//           data={upcomingMeetings}
//           keyExtractor={(item) => item.id}
//           renderItem={renderMeetingItem}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: COLORS.primary,
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: COLORS.white,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 20,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.buttonBackground,
//     padding: 12,
//     borderRadius: 10,
//     flex: 1,
//     justifyContent: 'center',
//     marginHorizontal: 5,
//   },
//   buttonText: {
//     color: COLORS.white,
//     fontSize: 16,
//     marginLeft: 8,
//   },
//   subHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: COLORS.white,
//     marginBottom: 10,
//   },
//   noMeetings: {
//     color: COLORS.white,
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   meetingCard: {
//     flexDirection: 'row',
//     backgroundColor: COLORS.secondary,
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   meetingInfo: {
//     flex: 1,
//   },
//   meetingTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: COLORS.white,
//   },
//   meetingTime: {
//     fontSize: 14,
//     color: COLORS.lightGray,
//     marginTop: 4,
//   },
//   joinButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: COLORS.buttonBackground,
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//   },
//   joinButtonText: {
//     color: COLORS.white,
//     fontSize: 16,
//     marginLeft: 8,
//   },
// });


// import { 
//     View,
//     StyleSheet,
//     ScrollView,
//     Text,
//     Image,
//     ImageBackground,
//     TouchableOpacity,
//     Dimensions,
//     Alert
// } from 'react-native';
// import { rooms } from '../../../assets/data/rooms';
// import { Link, useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { memo } from 'react';

// type CustomButtonProps = {
//     onPress: () => void;
//     icon: keyof typeof Ionicons.glyphMap;
//     text: string;
//     primary?: boolean;
// };

// const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// const CustomButton: React.FC<CustomButtonProps> = ({ onPress, icon, text, primary }) => (
//     <TouchableOpacity 
//         onPress={onPress} 
//         style={[styles.button, primary ? styles.buttonPrimary : styles.buttonSecondary]} 
//         activeOpacity={0.9}
//     >
//         <Ionicons name={icon} size={18} color="#fff" />
//         <Text style={styles.buttonText}>{text}</Text>
//     </TouchableOpacity>
// );

// const Page = memo(() => {
//     const router = useRouter();

//     const onStartMeeting = () => {
//         const randomId = Math.floor(Math.random() * 1000000000).toString();
//         router.push(`/../../(room)/${randomId}`);
//     };

//     const onJoinMeeting = () => {
//         Alert.prompt(
//             'Join Meeting',
//             'Enter your Call ID:',
//             (id) => {
//                 if (id && id.trim() !== '') {
//                     router.push(`/(drawer)/(inside)/(room)/${id}`);
//                 }
//             },
//             'plain-text'
//         );
//     };

//     return (
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//             <View style={styles.header}>
//                 <Image source={require('../../../assets/images/logo.jpeg')} style={styles.logo} />
//                 <Text style={styles.appTitle}>BornwithWealth Connect</Text>
//             </View>

//             <View style={styles.headerButtons}>
//                 <CustomButton onPress={onStartMeeting} icon="videocam-outline" text="Start Live" primary />
//                 <CustomButton onPress={onJoinMeeting} icon="enter-outline" text="Join by ID" />
//             </View>

//             <View style={styles.featureButtons}>
//                 <CustomButton onPress={() => {}} icon="chatbubble-ellipses-outline" text="Chat Rooms" />
//                 <CustomButton onPress={() => {}} icon="compass-outline" text="Explore" />
//                 <CustomButton onPress={() => {}} icon="calendar-outline" text="Schedule Live" />
//             </View>

//             <View style={styles.divider}>
//                 <View style={styles.line} />
//                 <Text style={styles.dividerText}>Live Streaming Rooms</Text>
//                 <View style={styles.line} />
//             </View>

//             <View style={styles.roomGrid}>
//                 {rooms.map((room) => (
//                     <Link key={room.id} href={`../../(room)/${room.id}`} asChild>
//                         <TouchableOpacity activeOpacity={0.85}>
//                             <ImageBackground source={room.img} style={styles.image} imageStyle={styles.imageStyle}>
//                                 <View style={styles.overlay}>
//                                     <Text style={styles.roomText}>{room.name}</Text>
//                                 </View>
//                             </ImageBackground>
//                         </TouchableOpacity>
//                     </Link>
//                 ))}
//             </View>
//         </ScrollView>
//     );
// });

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#121212',
//         paddingHorizontal: 20,
//     },
//     contentContainer: {
//         paddingBottom: 30,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         paddingVertical: 20,
//     },
//     logo: {
//         width: 50,
//         height: 50,
//         resizeMode: 'contain',
//         marginRight: 10,
//         borderRadius:25,
//         borderColor:'#FFFFFF',
//         borderWidth:1,
//     },
//     appTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     headerButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 10,
//     },
//     featureButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 15,

//     },
//     button: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginHorizontal: 5,
//         paddingVertical: 14,
//         paddingHorizontal:14,
//         borderRadius: 10,
//         elevation: 5,
//         shadowColor: '#fff',
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.25,
//         shadowRadius: 5,
//         borderColor:'#4CAF50',
//        borderWidth:1,
//     },
//     buttonPrimary: {
//         backgroundColor: '#6c00b2',
//         // backgroundColor: '#8E00FF',
//         borderColor: '#FFFFFF',
//         borderWidth: 1,
//     },
//     buttonSecondary: {
//         backgroundColor: '#115f84',
//         // backgroundColor: '#0055A4',
//     },
//     buttonText: {
//         fontSize: 12,
//         fontWeight: '400',
//         color: '#fff',
//         marginLeft: 2,
//     },
//     divider: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 20,
//     },
//     line: {
//         flex: 1,
//         height: 1.5,
//         backgroundColor: '#fff',
//     },
//     dividerText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginHorizontal: 15,
//     },
//     roomGrid: {
//         flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//         gap: 20,
//     },
//     image: {
//         width: WIDTH > HEIGHT ? WIDTH / 3.5 : WIDTH - 40,
//         height: 230,
//         borderRadius: 14,
//         overflow: 'hidden',
//         elevation: 8,
//         shadowColor: '#000',
//     },
//     imageStyle: {
//         borderRadius: 14,
//     },
//     overlay: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0,0,0,0.4)',
//         borderRadius: 14,
//     },
//     roomText: {
//         color: '#fff',
//         fontSize: 22,
//         fontWeight: 'bold',
//         textShadowColor: 'rgba(0, 0, 0, 0.75)',
//         textShadowOffset: { width: 1, height: 1 },
//         textShadowRadius: 10,
//         textAlign: 'center',
//     },
// });

// export default Page;


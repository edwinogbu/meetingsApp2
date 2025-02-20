import { 
    View,
    StyleSheet,
    ScrollView,
    Text,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    Alert
} from 'react-native';
import { rooms } from '../../assets/data/rooms';
import { Link, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { memo } from 'react';

type CustomButtonProps = {
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
    text: string;
    primary?: boolean;
};

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

const CustomButton: React.FC<CustomButtonProps> = ({ onPress, icon, text, primary }) => (
    <TouchableOpacity 
        onPress={onPress} 
        style={[styles.button, primary ? styles.buttonPrimary : styles.buttonSecondary]} 
        activeOpacity={0.9}
    >
        <Ionicons name={icon} size={26} color="#fff" />
        <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
);

const Page = memo(() => {
    const router = useRouter();

    const onStartMeeting = () => {
        const randomId = Math.floor(Math.random() * 1000000000).toString();
        router.push(`/inside/room/${randomId}`);
    };

    const onJoinMeeting = () => {
        Alert.prompt(
            'Join Meeting',
            'Enter your Call ID:',
            (id) => {
                if (id && id.trim() !== '') {
                    router.push(`/inside/room/${id}`);
                }
            },
            'plain-text'
        );
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.header}>
                <Image source={require('../../assets/images/logo.jpeg')} style={styles.logo} />
                <Text style={styles.appTitle}>Ludo StreamConnect</Text>
            </View>

            <View style={styles.headerButtons}>
                <CustomButton onPress={onStartMeeting} icon="videocam-outline" text="Start Live" primary />
                <CustomButton onPress={onJoinMeeting} icon="enter-outline" text="Join by ID" />
            </View>

            <View style={styles.featureButtons}>
                <CustomButton onPress={() => {}} icon="chatbubble-ellipses-outline" text="Chat Rooms" />
                <CustomButton onPress={() => {}} icon="compass-outline" text="Explore Streams" />
                <CustomButton onPress={() => {}} icon="calendar-outline" text="Schedule Live" />
            </View>

            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>Live Streaming Rooms</Text>
                <View style={styles.line} />
            </View>

            <View style={styles.roomGrid}>
                {rooms.map((room) => (
                    <Link key={room.id} href={`/inside/room/${room.id}`} asChild>
                        <TouchableOpacity activeOpacity={0.85}>
                            <ImageBackground source={room.img} style={styles.image} imageStyle={styles.imageStyle}>
                                <View style={styles.overlay}>
                                    <Text style={styles.roomText}>{room.name}</Text>
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>
                    </Link>
                ))}
            </View>
        </ScrollView>
    );
});

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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        paddingVertical: 14,
        borderRadius: 12,
        elevation: 5,
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
    },
    buttonPrimary: {
        backgroundColor: '#8E00FF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
    },
    buttonSecondary: {
        backgroundColor: '#0055A4',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 10,
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

export default Page;


// import { 
//     View,
//     StyleSheet,
//     ScrollView,
//     Text,
//     ImageBackground,
//     TouchableOpacity,
//     Dimensions,
//     Alert
// } from 'react-native';
// import { rooms } from '../../assets/data/rooms';
// import { Link, useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { memo } from 'react';

// const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

// interface CustomButtonProps {
//     onPress: () => void;
//     icon: keyof typeof Ionicons.glyphMap;
//     text: string;
//     primary?: boolean;
// }

// const CustomButton: React.FC<CustomButtonProps> = ({ onPress, icon, text, primary }) => (
//     <TouchableOpacity 
//         onPress={onPress} 
//         style={[styles.button, primary ? styles.buttonPrimary : styles.buttonSecondary]} 
//         activeOpacity={0.9}
//     >
//         <Ionicons name={icon} size={26} color="#fff" />
//         <Text style={styles.buttonText}>{text}</Text>
//     </TouchableOpacity>
// );

// const Page = memo(() => {
//     const router = useRouter();

//     const onStartMeeting = () => {
//         const randomId = Math.floor(Math.random() * 1000000000).toString();
//         router.push(`/inside/room/${randomId}`);
//     };

//     const onJoinMeeting = () => {
//         Alert.prompt(
//             'Join Meeting',
//             'Enter your Call ID:',
//             (id) => {
//                 if (id && id.trim() !== '') {
//                     router.push(`/inside/room/${id}`);
//                 }
//             },
//             'plain-text'
//         );
//     };

//     return (
//         <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//             <View style={styles.headerButtons}>
//                 <CustomButton onPress={onStartMeeting} icon="videocam-outline" text="Start Live" primary />
//                 <CustomButton onPress={onJoinMeeting} icon="enter-outline" text="Join by ID" />
//             </View>

//             <View style={styles.divider}>
//                 <View style={styles.line} />
//                 <Text style={styles.dividerText}>Live Streaming Rooms</Text>
//                 <View style={styles.line} />
//             </View>

//             <View style={styles.roomGrid}>
//                 {rooms.map((room) => (
//                     <Link key={room.id} href={`/inside/room/${room.id}`} asChild>
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
//         backgroundColor: '#121212',  // Dark theme for live streaming look
//         paddingHorizontal: 20,
//     },
//     contentContainer: {
//         paddingBottom: 30,
//     },
//     headerButtons: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginTop: 20,
//     },
//     button: {
//         flex: 1,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginHorizontal: 10,
//         paddingVertical: 16,
//         borderRadius: 12,
//         elevation: 5,
//         shadowColor: '#fff',
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.25,
//         shadowRadius: 5,
//     },
//     buttonPrimary: {
//         backgroundColor: '#8E00FF',  // Neon purple glow effect
//         borderColor: '#FFFFFF',
//         borderWidth: 1,
//     },
//     buttonSecondary: {
//         backgroundColor: '#0055A4',  // Deep blue for contrast
//     },
//     buttonText: {
//         fontSize: 18,
//         fontWeight: '600',
//         color: '#fff',
//         marginLeft: 10,
//     },
//     divider: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 30,
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

// import {
// 	View,
// 	StyleSheet,
// 	ScrollView,
// 	Text,
// 	ImageBackground,
// 	TouchableOpacity,
// 	Dimensions,
// 	Alert
// } from 'react-native';
// import { rooms } from '../../assets/data/rooms';
// import { Link, useRouter } from 'expo-router';
// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// import { Ionicons } from '@expo/vector-icons';
// import {Colors} from '../../constants/Colors';

// const Page = () => {
// 	const router = useRouter();

// 	// Create random id and navigate to the room
// 	const onStartMeeting = async () => {
// 		const randomId = Math.floor(Math.random() * 1000000000).toString();
// 		router.push(`/(tabs)/(room)/${randomId}`);
// 	};

// 	// Prompt user to enter a call id and navigate to the room
// 	const onJoinMeeting = () => {
// 		Alert.prompt(
// 			'Join',
// 			'Please enter your Call ID:',
// 			(id) => {
// 				console.log('Joining call: ', id);
// 				router.push(`/(tabs)/(room)/${id}`);
// 			},
// 			'plain-text'
// 		);
// 	};

// 	return (
// 		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
// 			<View
// 				style={{
// 					flexDirection: 'row',
// 					justifyContent: 'space-between'
// 				}}
// 			>
// 				<TouchableOpacity onPress={onStartMeeting} style={styles.button}>
// 					<Ionicons name="videocam-outline" size={24} />
// 					<Text style={styles.buttonText}>Start new Meeting</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity onPress={onJoinMeeting} style={styles.button}>
// 					<Ionicons name="business-outline" size={24} />
// 					<Text style={styles.buttonText}>Join Meeting by ID</Text>
// 				</TouchableOpacity>
// 			</View>

// 			<View style={styles.divider}>
// 				<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#000' }} />
// 				<Text style={{ fontSize: 18 }}>or join public room</Text>
// 				<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#000' }} />
// 			</View>

// 			<View style={styles.wrapper}>
// 				{rooms.map((room, index) => (
// 					<Link href={`/(tabs)/(room)/${room.id}`} key={index} asChild>
// 						<TouchableOpacity>
// 							<ImageBackground
// 								key={index}
// 								source={room.img}
// 								style={styles.image}
// 								imageStyle={{ borderRadius: 10 }}
// 							>
// 								<View style={styles.overlay}>
// 									<Text style={styles.text}>{room.name}</Text>
// 								</View>
// 							</ImageBackground>
// 						</TouchableOpacity>
// 					</Link>
// 				))}
// 			</View>
// 		</ScrollView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff'
// 	},
// 	wrapper: {
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
// 		gap: 20
// 	},
// 	button: {
// 		flex: 1,
// 		gap: 10,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor: Colors.secondary,
// 		margin: 20,
// 		padding: 30,
// 		borderRadius: 10
// 	},
// 	buttonText: {
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		marginRight: 10
// 	},
// 	divider: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		gap: 10,
// 		marginHorizontal: 20,
// 		marginTop: 20,
// 		marginBottom: 40
// 	},

// 	image: {
// 		width: WIDTH > HEIGHT ? WIDTH / 4 - 30 : WIDTH - 40,
// 		height: 300
// 	},
// 	overlay: {
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		bottom: 0,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: 'rgba(0,0,0,0.4)',
// 		borderRadius: 10
// 	},
// 	text: {
// 		color: '#fff',
// 		fontSize: 30,
// 		fontWeight: 'bold',
// 		textAlign: 'center'
// 	}
// });

// export default Page;

// import React, { useState } from 'react'; 
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   TextInput,
//   Animated,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

// const HomeScreen = () => {
//   const router = useRouter();
//   const [rooms, setRooms] = useState([
//     { id: '123', name: 'Crypto Traders', type: 'private' },
//     { id: '456', name: 'Tech Talk', type: 'public' },
//     { id: '789', name: 'AI Discussion', type: 'private' },
//   ]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [roomId, setRoomId] = useState('');

//   const filteredRooms = rooms.filter(room =>
//     room.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

// //   const joinRoom = (roomId) => {
// //     router.push(`/(tabs)/(room)/${roomId}`);
// //   };

// const joinRoom = (roomId: string) => {
// 	router.push(`/(tabs)/(room)/${roomId}`);
//   };
  
// //   const createRoom = (type) => {
// //     const newRoomId = Math.random().toString(36).substring(7);
// //     const newRoomName = `Room ${rooms.length + 1}`;
// //     setRooms([...rooms, { id: newRoomId, name: newRoomName, type }]);
// //     Alert.alert('Room Created', `You have created "${newRoomName}"`, [{ text: 'OK' }]);
// //   };

//   const createRoom = (type: string) => {
// 	const newRoomId = Math.random().toString(36).substring(7);
// 	const newRoomName = `Room ${rooms.length + 1}`;
// 	setRooms([...rooms, { id: newRoomId, name: newRoomName, type }]);
// 	Alert.alert('Room Created', `You have created "${newRoomName}"`, [{ text: 'OK' }]);
//   };
  

// //   const deleteRoom = (roomId) => {
// //     setRooms(rooms.filter(room => room.id !== roomId));
// //   };

//   const deleteRoom = (roomId: string) => {
// 	setRooms(rooms.filter(room => room.id !== roomId));
//   };
  

// //   const renderRightActions = (progress, dragX, roomId) => {
// //     const scale = dragX.interpolate({
// //       inputRange: [-100, 0],
// //       outputRange: [1, 0],
// //       extrapolate: 'clamp',
// //     });

// 	const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>, roomId: string) => {
// 		const scale = dragX.interpolate({
// 		  inputRange: [-100, 0],
// 		  outputRange: [1, 0],
// 		  extrapolate: 'clamp',
// 		});

//     return (
//       <TouchableOpacity onPress={() => deleteRoom(roomId)} style={styles.deleteButton}>
//         <Animated.View style={{ transform: [{ scale }] }}>
//           <Ionicons name="trash-outline" size={24} color="#FFF" />
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Join or Start a Meeting</Text>

//         <View style={styles.inputContainer}>
//           <TextInput
//             style={styles.input}
//             placeholder="Enter Room ID"
//             placeholderTextColor="#888"
//             value={roomId}
//             onChangeText={setRoomId}
//           />
//           <TouchableOpacity style={styles.joinButton} onPress={() => joinRoom(roomId)}>
//             <Text style={styles.joinText}>Join Room</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.createButton} onPress={() => createRoom('private')}>
//             <Text style={styles.createText}>Create Private Room</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.createButton} onPress={() => createRoom('public')}>
//             <Text style={styles.createText}>Create Public Room</Text>
//           </TouchableOpacity>
//         </View>

//         <Text style={styles.roomCount}>{filteredRooms.length} Rooms Available</Text>

//         <FlatList
//           data={filteredRooms}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <Swipeable renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}>
//               <View style={[styles.roomItem, item.type === 'public' ? styles.publicRoom : styles.privateRoom]}>
//                 <View style={styles.roomInfo}>
//                   <MaterialIcons name="forum" size={20} color="#FFF" />
//                   <Text style={styles.roomName}>{item.name}</Text>
//                 </View>
//                 <TouchableOpacity style={styles.joinButton} onPress={() => joinRoom(item.id)}>
//                   <Ionicons name="log-in-outline" size={20} color="white" />
//                   <Text style={styles.joinText}>Join</Text>
//                 </TouchableOpacity>
//               </View>
//             </Swipeable>
//           )}
//         />
// 		<TouchableOpacity onPress={() => router.push('/recordedMeetingsScreen')} style={styles.viewRecordingsButton}>
// 		<Ionicons name="play-circle-outline" size={24} color="white" />
// 		<Text style={styles.viewRecordingsText}>View Recordings</Text>
// 		</TouchableOpacity>

//       </View>
//     </GestureHandlerRootView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000033',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFF',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   input: {
//     flex: 1,
//     backgroundColor: '#1A1A36',
//     color: '#FFF',
//     padding: 10,
//     borderRadius: 8,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   createButton: {
//     flex: 1,
//     backgroundColor: '#FF9800',
//     paddingVertical: 12,
//     borderRadius: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },
//   createText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   roomCount: {
//     color: '#FFF',
//     fontSize: 14,
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   roomItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   publicRoom: {
//     backgroundColor: '#1A1A36',
//   },
//   privateRoom: {
//     backgroundColor: '#292946',
//   },
//   roomInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   roomName: {
//     fontSize: 16,
//     color: '#FFF',
//     marginLeft: 10,
//   },
//   joinButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4CAF50',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   joinText: {
//     color: 'white',
//     fontSize: 14,
//     marginLeft: 5,
//   },
//   deleteButton: {
//     backgroundColor: '#D32F2F',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 70,
//     height: '100%',
//     borderRadius: 10,
//   },
//   viewRecordingsButton: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		backgroundColor: '#FF9800',
// 		paddingVertical: 12,
// 		borderRadius: 10,
// 		justifyContent: 'center',
// 		marginTop: 20,
// 	  },
// 	  viewRecordingsText: {
// 		color: 'white',
// 		fontSize: 16,
// 		marginLeft: 5,
// 	  },
// });


// import React, { useState } from 'react'; 
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   TextInput,
//   Animated,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';

// const HomeScreen = () => {
//   const router = useRouter();
//   const [rooms, setRooms] = useState([
//     { id: '123', name: 'Crypto Traders' },
//     { id: '456', name: 'Tech Talk' },
//     { id: '789', name: 'AI Discussion' },
//   ]);
//   const [searchQuery, setSearchQuery] = useState('');

//   const filteredRooms = rooms.filter(room =>
//     room.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const joinRoom = (roomId: string) => {
//     router.push(`/room/${roomId}`);
//   };

//   const createRoom = () => {
//     const newRoomId = Math.random().toString(36).substring(7);
//     const newRoomName = `Room ${rooms.length + 1}`;
    
//     setRooms([...rooms, { id: newRoomId, name: newRoomName }]);
    
//     Alert.alert('Room Created', `You have created "${newRoomName}"`, [{ text: 'OK' }]);
//   };

//   const deleteRoom = (roomId: string) => {
//     setRooms(rooms.filter(room => room.id !== roomId));
//   };

//   const renderRightActions = (progress: any, dragX: any, roomId: string) => {
//     const scale = dragX.interpolate({
//       inputRange: [-100, 0],
//       outputRange: [1, 0],
//       extrapolate: 'clamp',
//     });

//     return (
//       <TouchableOpacity onPress={() => deleteRoom(roomId)} style={styles.deleteButton}>
//         <Animated.View style={{ transform: [{ scale }] }}>
//           <Ionicons name="trash-outline" size={24} color="#FFF" />
//         </Animated.View>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Join a Conversation</Text>
        
//         <View style={styles.searchContainer}>
//           <Ionicons name="search" size={20} color="#888" />
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search rooms..."
//             placeholderTextColor="#888"
//             value={searchQuery}
//             onChangeText={setSearchQuery}
//           />
//         </View>

//         <Text style={styles.roomCount}>{filteredRooms.length} Rooms Available</Text>

//         {filteredRooms.length > 0 ? (
//           <FlatList
//             data={filteredRooms}
//             keyExtractor={(item) => item.id}
//             renderItem={({ item }) => (
//               <Swipeable
//                 renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item.id)}
//               >
//                 <View style={styles.roomItem}>
//                   <View style={styles.roomInfo}>
//                     <MaterialIcons name="forum" size={20} color="#FFF" />
//                     <Text style={styles.roomName}>{item.name}</Text>
//                   </View>
//                   <TouchableOpacity style={styles.joinButton} onPress={() => joinRoom(item.id)}>
//                     <Ionicons name="log-in-outline" size={20} color="white" />
//                     <Text style={styles.joinText}>Join</Text>
//                   </TouchableOpacity>
//                 </View>
//               </Swipeable>
//             )}
//           />
//         ) : (
//           <Text style={styles.noRoomsText}>No matching rooms found.</Text>
//         )}

//         <TouchableOpacity style={styles.createButton} onPress={createRoom}>
//           <Ionicons name="add-circle-outline" size={24} color="white" />
//           <Text style={styles.createText}>Create New Room</Text>
//         </TouchableOpacity>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000033',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#1A1A36',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 8,
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   searchInput: {
//     flex: 1,
//     color: '#FFF',
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   roomCount: {
//     color: '#FFF',
//     fontSize: 14,
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   roomItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#1A1A36',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   roomInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   roomName: {
//     fontSize: 16,
//     color: '#FFF',
//     marginLeft: 10,
//   },
//   joinButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4CAF50',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   joinText: {
//     color: 'white',
//     fontSize: 14,
//     marginLeft: 5,
//   },
//   createButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FF9800',
//     paddingVertical: 12,
//     borderRadius: 10,
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   createText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   noRoomsText: {
//     color: '#BBB',
//     textAlign: 'center',
//     marginTop: 20,
//   },
//   deleteButton: {
//     backgroundColor: '#D32F2F',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 70,
//     height: '100%',
//     borderRadius: 10,
//   },
// });


// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
// } from 'react-native';
// import { useRouter } from 'expo-router';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';

// const HomeScreen = () => {
//   const router = useRouter();

//   // Sample room list
//   const [rooms, setRooms] = useState([
//     { id: '123', name: 'Crypto Traders' },
//     { id: '456', name: 'Tech Talk' },
//     { id: '789', name: 'AI Discussion' },
//   ]);

//   const joinRoom = (roomId: string) => {
//     router.push(`/room/${roomId}`);
//   };

//   const createRoom = () => {
//     const newRoomId = Math.random().toString(36).substring(7);
//     const newRoomName = `Room ${rooms.length + 1}`;
    
//     setRooms([...rooms, { id: newRoomId, name: newRoomName }]);
    
//     Alert.alert('Room Created', `You have created "${newRoomName}"`, [{ text: 'OK' }]);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Join a Conversation</Text>
//       {rooms.length > 0 ? (
//         <FlatList
//           data={rooms}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => (
//             <View style={styles.roomItem}>
//               <View style={styles.roomInfo}>
//                 <MaterialIcons name="forum" size={20} color="#FFF" />
//                 <Text style={styles.roomName}>{item.name}</Text>
//               </View>
//               <TouchableOpacity style={styles.joinButton} onPress={() => joinRoom(item.id)}>
//                 <Ionicons name="log-in-outline" size={20} color="white" />
//                 <Text style={styles.joinText}>Join</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         />
//       ) : (
//         <Text style={styles.noRoomsText}>No rooms available. Create one below.</Text>
//       )}
//       <TouchableOpacity style={styles.createButton} onPress={createRoom}>
//         <Ionicons name="add-circle-outline" size={24} color="white" />
//         <Text style={styles.createText}>Create New Room</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default HomeScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000033',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#FFF',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   roomItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#1A1A36',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//     alignItems: 'center',
//   },
//   roomInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   roomName: {
//     fontSize: 16,
//     color: '#FFF',
//     marginLeft: 10,
//   },
//   joinButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#4CAF50',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//   },
//   joinText: {
//     color: 'white',
//     fontSize: 14,
//     marginLeft: 5,
//   },
//   createButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FF9800',
//     paddingVertical: 12,
//     borderRadius: 10,
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   createText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   noRoomsText: {
//     color: '#BBB',
//     textAlign: 'center',
//     marginTop: 20,
//   },
// });




// import {
// 	View,
// 	StyleSheet,
// 	ScrollView,
// 	Text,
// 	ImageBackground,
// 	TouchableOpacity,
// 	Dimensions,
// 	Alert,
// 	TextInput,
// 	Modal
// } from 'react-native';
// import { useState } from 'react';
// import { rooms } from '../../assets/data/rooms';
// import { Link, useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { Colors } from '../../constants/Colors'; // Ensure this exists

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const HomeScreen = () => {
// 	const router = useRouter();
// 	const [callId, setCallId] = useState('');
// 	const [modalVisible, setModalVisible] = useState(false);

// 	// Create random id and navigate to the room
// 	const onStartMeeting = () => {
// 		const randomId = Math.floor(Math.random() * 1000000000).toString();
// 		router.push(`/(inside)/(room)/${randomId}`);
// 	};

// 	// Open modal for Join Meeting
// 	const onJoinMeeting = () => {
// 		setModalVisible(true);
// 	};

// 	const handleJoinMeeting = () => {
// 		if (callId.trim()) {
// 			setModalVisible(false);
// 			router.push(`/(inside)/(room)/${callId}`);
// 		} else {
// 			Alert.alert('Error', 'Please enter a valid Call ID.');
// 		}
// 	};

// 	return (
// 		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
// 			<View style={styles.buttonContainer}>
// 				<TouchableOpacity onPress={onStartMeeting} style={styles.button}>
// 					<Ionicons name="videocam-outline" size={24} color="#fff" />
// 					<Text style={styles.buttonText}>Start New Meeting</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity onPress={onJoinMeeting} style={styles.button}>
// 					<Ionicons name="business-outline" size={24} color="#fff" />
// 					<Text style={styles.buttonText}>Join Meeting by ID</Text>
// 				</TouchableOpacity>
// 			</View>

// 			{/* Join Meeting Modal */}
// 			<Modal visible={modalVisible} transparent animationType="slide">
// 				<View style={styles.modalContainer}>
// 					<View style={styles.modalContent}>
// 						<Text style={styles.modalTitle}>Enter Call ID</Text>
// 						<TextInput
// 							style={styles.input}
// 							placeholder="Enter Call ID"
// 							placeholderTextColor="#999"
// 							value={callId}
// 							onChangeText={setCallId}
// 						/>
// 						<View style={styles.modalButtons}>
// 							<TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
// 								<Text style={styles.buttonText}>Cancel</Text>
// 							</TouchableOpacity>
// 							<TouchableOpacity onPress={handleJoinMeeting} style={styles.joinButton}>
// 								<Text style={styles.buttonText}>Join</Text>
// 							</TouchableOpacity>
// 						</View>
// 					</View>
// 				</View>
// 			</Modal>
// 		</ScrollView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff'
// 	},
// 	buttonContainer: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		marginHorizontal: 20
// 	},
// 	button: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor: Colors.secondary, // Ensure this exists
// 		margin: 10,
// 		padding: 15,
// 		borderRadius: 10
// 	},
// 	buttonText: {
// 		fontSize: 16,
// 		fontWeight: 'bold',
// 		color: '#fff',
// 		marginLeft: 10
// 	},
// 	modalContainer: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: 'rgba(0, 0, 0, 0.5)'
// 	},
// 	modalContent: {
// 		width: '80%',
// 		backgroundColor: '#fff',
// 		padding: 20,
// 		borderRadius: 10,
// 		alignItems: 'center'
// 	},
// 	modalTitle: {
// 		fontSize: 18,
// 		fontWeight: 'bold',
// 		marginBottom: 10
// 	},
// 	input: {
// 		width: '100%',
// 		height: 40,
// 		borderWidth: 1,
// 		borderColor: '#ccc',
// 		borderRadius: 5,
// 		paddingHorizontal: 10,
// 		marginBottom: 10
// 	},
// 	modalButtons: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		width: '100%'
// 	},
// 	cancelButton: {
// 		flex: 1,
// 		alignItems: 'center',
// 		backgroundColor: '#999',
// 		padding: 10,
// 		marginRight: 5,
// 		borderRadius: 5
// 	},
// 	joinButton: {
// 		flex: 1,
// 		alignItems: 'center',
// 		backgroundColor: Colors.secondary,
// 		padding: 10,
// 		marginLeft: 5,
// 		borderRadius: 5
// 	}
// });

// export default HomeScreen;


// import {
// 	View,
// 	StyleSheet,
// 	ScrollView,
// 	Text,
// 	ImageBackground,
// 	TouchableOpacity,
// 	Dimensions,
// 	Alert,
// 	TextInput
// } from 'react-native';
// import { useState } from 'react';
// import { rooms } from '../../assets/data/rooms';
// import { Link, useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import { Colors } from '../../constants/Colors'; // Fix import

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const HomeScreen = () => {
// 	const router = useRouter();
// 	const [callId, setCallId] = useState('');
// 	const [modalVisible, setModalVisible] = useState(false);

// 	// Create random id and navigate to the room
// 	const onStartMeeting = () => {
// 		const randomId = Math.floor(Math.random() * 1000000000).toString();
// 		router.push(`/(inside)/(room)/${randomId}`);
// 	};

// 	// Android-compatible Join Meeting
// 	const onJoinMeeting = () => {
// 		Alert.alert(
// 			'Join Meeting',
// 			'Please enter your Call ID:',
// 			[
// 				{
// 					text: 'Cancel',
// 					style: 'cancel'
// 				},
// 				{
// 					text: 'Join',
// 					onPress: () => {
// 						if (callId.trim()) {
// 							router.push(`/(inside)/(room)/${callId}`);
// 						} else {
// 							Alert.alert('Error', 'Please enter a valid Call ID.');
// 						}
// 					}
// 				}
// 			],
// 			'plain-text'
// 		);
// 	};

// 	return (
// 		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
// 			<View style={styles.buttonContainer}>
// 				<TouchableOpacity onPress={onStartMeeting} style={styles.button}>
// 					<Ionicons name="videocam-outline" size={24} color="#fff" />
// 					<Text style={styles.buttonText}>Start New Meeting</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity onPress={onJoinMeeting} style={styles.button}>
// 					<Ionicons name="business-outline" size={24} color="#fff" />
// 					<Text style={styles.buttonText}>Join Meeting by ID</Text>
// 				</TouchableOpacity>
// 			</View>

// 			<View style={styles.divider}>
// 				<View style={styles.line} />
// 				<Text style={styles.dividerText}>or join a public room</Text>
// 				<View style={styles.line} />
// 			</View>

// 			<View style={styles.wrapper}>
// 				{rooms.map((room, index) => (
// 					<Link href={`/(inside)/(room)/${room.id}`} key={index} asChild>
// 						<TouchableOpacity>
// 							<ImageBackground source={room.img} style={styles.image} imageStyle={{ borderRadius: 10 }}>
// 								<View style={styles.overlay}>
// 									<Text style={styles.text}>{room.name}</Text>
// 								</View>
// 							</ImageBackground>
// 						</TouchableOpacity>
// 					</Link>
// 				))}
// 			</View>
// 		</ScrollView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff'
// 	},
// 	buttonContainer: {
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		marginHorizontal: 20
// 	},
// 	button: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor: Colors.secondary, // Ensure this exists
// 		margin: 10,
// 		padding: 15,
// 		borderRadius: 10
// 	},
// 	buttonText: {
// 		fontSize: 16,
// 		fontWeight: 'bold',
// 		color: '#fff',
// 		marginLeft: 10
// 	},
// 	divider: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		marginHorizontal: 20,
// 		marginTop: 20,
// 		marginBottom: 40
// 	},
// 	line: {
// 		flex: 1,
// 		height: 1,
// 		backgroundColor: '#000'
// 	},
// 	dividerText: {
// 		fontSize: 16,
// 		marginHorizontal: 10
// 	},
// 	wrapper: {
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
// 		gap: 20
// 	},
// 	image: {
// 		width: WIDTH > HEIGHT ? WIDTH / 4 - 30 : WIDTH - 40,
// 		height: 300
// 	},
// 	overlay: {
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		bottom: 0,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: 'rgba(0,0,0,0.4)',
// 		borderRadius: 10
// 	},
// 	text: {
// 		color: '#fff',
// 		fontSize: 24,
// 		fontWeight: 'bold',
// 		textAlign: 'center'
// 	}
// });

// export default HomeScreen;


// import {
// 	View,
// 	StyleSheet,
// 	ScrollView,
// 	Text,
// 	ImageBackground,
// 	TouchableOpacity,
// 	Dimensions,
// 	Alert
// } from 'react-native';
// import { rooms } from '../../assets/data/rooms';
// import { Link, useRouter } from 'expo-router';
// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// import { Ionicons } from '@expo/vector-icons';
// import Colors from '../../constants/Colors';

// const HomeScreen = () => {
// 	const router = useRouter();

// 	// Create random id and navigate to the room
// 	const onStartMeeting = async () => {
// 		const randomId = Math.floor(Math.random() * 1000000000).toString();
// 		router.push(`/(inside)/(room)/${randomId}`);
// 	};

// 	// Prompt user to enter a call id and navigate to the room
// 	const onJoinMeeting = () => {
// 		Alert.prompt(
// 			'Join',
// 			'Please enter your Call ID:',
// 			(id) => {
// 				console.log('Joining call: ', id);
// 				router.push(`/(inside)/(room)/${id}`);
// 			},
// 			'plain-text'
// 		);
// 	};

// 	return (
// 		<ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
// 			<View
// 				style={{
// 					flexDirection: 'row',
// 					justifyContent: 'space-between'
// 				}}
// 			>
// 				<TouchableOpacity onPress={onStartMeeting} style={styles.button}>
// 					<Ionicons name="videocam-outline" size={24} />
// 					<Text style={styles.buttonText}>Start new Meeting</Text>
// 				</TouchableOpacity>

// 				<TouchableOpacity onPress={onJoinMeeting} style={styles.button}>
// 					<Ionicons name="business-outline" size={24} />
// 					<Text style={styles.buttonText}>Join Meeting by ID</Text>
// 				</TouchableOpacity>
// 			</View>

// 			<View style={styles.divider}>
// 				<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#000' }} />
// 				<Text style={{ fontSize: 18 }}>or join public room</Text>
// 				<View style={{ flex: 1, height: StyleSheet.hairlineWidth, backgroundColor: '#000' }} />
// 			</View>

// 			<View style={styles.wrapper}>
// 				{rooms.map((room, index) => (
// 					<Link href={`/(inside)/(room)/${room.id}`} key={index} asChild>
// 						<TouchableOpacity>
// 							<ImageBackground
// 								key={index}
// 								source={room.img}
// 								style={styles.image}
// 								imageStyle={{ borderRadius: 10 }}
// 							>
// 								<View style={styles.overlay}>
// 									<Text style={styles.text}>{room.name}</Text>
// 								</View>
// 							</ImageBackground>
// 						</TouchableOpacity>
// 					</Link>
// 				))}
// 			</View>
// 		</ScrollView>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff'
// 	},
// 	wrapper: {
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
// 		gap: 20
// 	},
// 	button: {
// 		flex: 1,
// 		gap: 10,
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		backgroundColor: Colors.secondary,
// 		margin: 20,
// 		padding: 30,
// 		borderRadius: 10
// 	},
// 	buttonText: {
// 		fontSize: 20,
// 		fontWeight: 'bold',
// 		marginRight: 10
// 	},
// 	divider: {
// 		flexDirection: 'row',
// 		alignItems: 'center',
// 		gap: 10,
// 		marginHorizontal: 20,
// 		marginTop: 20,
// 		marginBottom: 40
// 	},

// 	image: {
// 		width: WIDTH > HEIGHT ? WIDTH / 4 - 30 : WIDTH - 40,
// 		height: 300
// 	},
// 	overlay: {
// 		position: 'absolute',
// 		top: 0,
// 		left: 0,
// 		right: 0,
// 		bottom: 0,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: 'rgba(0,0,0,0.4)',
// 		borderRadius: 10
// 	},
// 	text: {
// 		color: '#fff',
// 		fontSize: 30,
// 		fontWeight: 'bold',
// 		textAlign: 'center'
// 	}
// });

// export default HomeScreen;

// import { View, Text, StyleSheet } from 'react-native'
// import React from 'react'

// export default function HomeScreen() {
//   return (
//     <View style={styles.container}>
//       <Text  style={styles.welcome}> coming soon!</Text>
//     </View>
//   )
// }



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: "100%",
//     width: "100%",
//     justifyContent: "center",
//     resizeMode: "cover",
//     position: "absolute",
//     flexDirection: "column",
//   },

//   welcome: {
//     justifyContent: "center",
//     resizeMode: "cover",
//     position: "absolute",
//     flexDirection: "column",
    
//   },


// });

// import * as React from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   StatusBar,
//   TextInput,
//   TouchableOpacity,
// } from "react-native";
// import { Video, AVPlaybackStatus } from "expo-av";

// export default function HomeScreen() {
//   const video = React.useRef(null);
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   React.useEffect(() => {
//     if (video) {
//       video.current.playAsync();
//     }
//   }, [video]);

//   return (
//     <>
//       <View style={styles.container}>
//         <Video
//           ref={video}
//           style={styles.video}
//           source={{
//             // uri: "https://www.goldcast.io/platform?wvideo=s9t62tej71",
//             // uri: "https://res.cloudinary.com/demo/video/upload/c_fill,g_auto:faces,h_150,w_150/r_20/v1/docs/walking_talking.mp4",
//             uri: "https://res.cloudinary.com/dh6l45sly/video/upload/v1655354939/awereactnative/react-native-background-video/dywts2_jqjvu2.mp4",
//           }}
//           isLooping
//           resizeMode="cover"
//         />
//       </View>
//       <View style={styles.containerSub}>
//         <StatusBar style="auto" />
//         <View style={styles.inputView}>
//           <TextInput
//             style={styles.TextInput}
//             placeholder="Email."
//             placeholderTextColor="#003f5c"
//             onChangeText={(email) => setEmail(email)}
//           />
//         </View>

//         <View style={styles.inputView}>
//           <TextInput
//             style={styles.TextInput}
//             placeholder="Password."
//             placeholderTextColor="#003f5c"
//             secureTextEntry={true}
//             onChangeText={(password) => setPassword(password)}
//           />
//         </View>

//         <TouchableOpacity>
//           <Text style={styles.forgot_button}>Forgot Password?</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.loginBtn}>
//           <Text style={styles.loginText}>LOGIN</Text>
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: "100%",
//     width: "100%",
//     justifyContent: "center",
//     resizeMode: "cover",
//     position: "absolute",
//     width: "100%",
//     flexDirection: "column",
//   },
//   video: {
//     alignSelf: "center",
//     width: "100%",
//     height: "100%",
//   },
//   buttons: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   containerSub: {
//     flex: 1,
//     backgroundColor: 'rgba(52, 52, 52, 0.7)',
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   image: {
//     marginBottom: 40,
//   },

//   inputView: {
//     backgroundColor: "white",
//     borderRadius: 30,
//     width: "70%",
//     height: 45,
//     marginBottom: 20,

//     alignItems: "center",
//   },

//   TextInput: {
//     height: 50,
//     flex: 1,
//     padding: 10,
//     marginLeft: 20,
//   },

//   forgot_button: {
//     height: 30,
//     marginBottom: 30,
//     backgroundColor: 'rgba(52, 52, 52, 0.1)',
//     textAlign: 'center',
//     color: 'yellow'
//   },

//   loginBtn: {
//     width: "80%",
//     borderRadius: 25,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//     backgroundColor: "white",
//   },
// });


// import { Image, StyleSheet, Platform } from 'react-native';

// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
//           Press{' '}
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: 'cmd + d',
//               android: 'cmd + m',
//               web: 'F12'
//             })}
//           </ThemedText>{' '}
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           Tap the Explore tab to learn more about what's included in this starter app.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           When you're ready, run{' '}
//           <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
//           <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });

// import { View, Text, Button, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function Page() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>🏠 Home Screen</Text>
//       <Button title="Go to Profile" onPress={() => router.push('/(inside)/profileScreen')} />
//       <Button title="Go to Meetings" onPress={() => router.push('/(inside)/recordedMeetingsScreen')} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

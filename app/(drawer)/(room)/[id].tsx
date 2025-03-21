// import { View, Text } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import React from 'react';

// export default function RoomPage() {
//     const { id } = useLocalSearchParams<{ id: string }>();

//     return (
//         <View>
//             <Text>Room Page: {id}</Text>
//         </View>
//     );
// }

// import { View, StyleSheet, Dimensions } from 'react-native'; 
// import React, { useEffect, useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';

// import Spinner from 'react-native-loading-spinner-overlay';
// import {
//   Call,
//   CallContent,
//   StreamCall,
//   useStreamVideoClient
// } from '@stream-io/video-react-native-sdk';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const Page = () => {
//   const [call, setCall] = useState<Call | null>(null);
//   const client = useStreamVideoClient();
//   const { id } = useLocalSearchParams<{ id: string }>();

//   console.log("Client:", client);
//   console.log("Call ID:", id);

//   useEffect(() => {
//     if (!client || !id || call) return;

//     const joinCall = async () => {
//       try {
//         const callInstance = client.call('default', id);
//         await callInstance.join({ create: true });
//         setCall(callInstance);
//       } catch (error) {
//         console.error("Failed to join call:", error);
//       }
//     };

//     joinCall();
//   }, [client, id]);

//   if (!call) return <Spinner visible={true} />; // Show spinner if call is not yet joined

//   return (
//     <View style={{ flex: 1 }}>
//       <StreamCall call={call}>
//         <CallContent />
//       </StreamCall>
//     </View>
//   );
// };

// export default Page;


// import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Text } from 'react-native'; 
// import React, { useEffect, useState, useCallback } from 'react';
// import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

// import Spinner from 'react-native-loading-spinner-overlay';
// import {
// 	Call,
// 	CallContent,
// 	StreamCall,
// 	StreamVideoEvent,
// 	useStreamVideoClient
// } from '@stream-io/video-react-native-sdk';
// import Toast from 'react-native-toast-message';

// import { Ionicons } from '@expo/vector-icons';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const Page = () => {
// 	const { id } = useLocalSearchParams<{ id: string }>();
// 	const router = useRouter();
// 	const navigation = useNavigation();

// 	const [call, setCall] = useState<Call | null>(null);
// 	const client = useStreamVideoClient();

// 	// Join the call
// 	useEffect(() => {
// 		if (!client || call) return;

// 		const joinCall = async () => {
// 			try {
// 				const newCall = client.call('default', id);
// 				await newCall.join({ create: true });
// 				setCall(newCall);
// 			} catch (error) {
// 				console.error("Error joining call:", error);
// 			}
// 		};

// 		joinCall();
// 	}, [client, call, id]);

// 	// Share meeting link
// 	const shareMeeting = useCallback(() => {
// 		Share.share({
// 			message: `Join my meeting: myapp://(inside)/(room)/${id}`
// 		});
// 	}, [id]);

// 	// Navigate back home on hangup
// 	const goToHomeScreen = useCallback(() => {
// 		router.back();
// 	}, [router]);

// 	useEffect(() => {
// 		navigation.setOptions({
// 			headerRight: () => (
// 				<TouchableOpacity onPress={shareMeeting}>
// 					<Ionicons name="share-outline" size={24} color="white" />
// 				</TouchableOpacity>
// 			)
// 		});

// 		if (!client) return;

// 		// Listen to call events
// 		const handleEvent = (event: StreamVideoEvent) => {
// 			console.log(event);

// 			if (event.type === 'call.session_participant_joined') {
// 				const user = event.participant?.user?.name || "Unknown User";
// 				Toast.show({
// 					text1: 'User joined',
// 					text2: `Say hello to ${user} 👋`
// 				});
// 			}

// 			if (event.type === 'call.session_participant_left') {
// 				const user = event.participant?.user?.name || "Unknown User";
// 				Toast.show({
// 					text1: 'User left',
// 					text2: `Say goodbye to ${user} 👋`
// 				});
// 			}
// 		};

// 		const unsubscribe = client.on?.('all', handleEvent);

// 		return () => {
// 			unsubscribe?.();
// 		};
// 	}, [client, navigation, shareMeeting]);

// 	if (!call) return <Spinner visible />;

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<StreamCall call={call}>
// 				<View style={styles.container}>
// 					<CallContent onHangupCallHandler={goToHomeScreen} layout="grid" />
// 					{WIDTH > HEIGHT ? (
// 						<View style={styles.videoContainer}>
// 							<Text>Tablet chat</Text>
// 						</View>
// 					) : (
// 						<Text>Mobile chat</Text>
// 					)}
// 				</View>
// 			</StreamCall>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		flexDirection: WIDTH > HEIGHT ? 'row' : 'column'
// 	},
// 	videoContainer: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		textAlign: 'center',
// 		backgroundColor: '#fff'
// 	}
// });

// export default Page;


// import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Text } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

// import Spinner from 'react-native-loading-spinner-overlay';
// import {
// 	Call,
// 	CallContent,
// 	StreamCall,
// 	StreamVideoEvent,
// 	useStreamVideoClient
// } from '@stream-io/video-react-native-sdk';
// import Toast from 'react-native-toast-message';

// import { Ionicons } from '@expo/vector-icons';
// import CustomBottomSheet from '../../../components/CustomBottomSheet';
// import ChatView from '../../../components/ChatView';
// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const Page = () => {
// 	const { id } = useLocalSearchParams<{ id: string }>();
// 	const router = useRouter();
// 	const navigation = useNavigation();

// 	const [call, setCall] = useState<Call | null>(null);
// 	const client = useStreamVideoClient();

// 	useEffect(() => {
// 		if (!client) {
// 			console.error("StreamVideoClient is not initialized.");
// 			return;
// 		}
	
// 		navigation.setOptions({
// 			headerRight: () => (
// 				<TouchableOpacity onPress={shareMeeting}>
// 					<Ionicons name="share-outline" size={24} color="white" />
// 				</TouchableOpacity>
// 			)
// 		});
	
// 		// Listen to call events
// 		const unsubscribe = client.on?.('all', (event: StreamVideoEvent) => {
// 			console.log(event);
	
// 			if (event.type === 'call.reaction_new') {
// 				console.log(`New reaction: ${event.reaction}`);
// 			}
	
// 			if (event.type === 'call.session_participant_joined') {
// 				const user = event.participant?.user?.name;
// 				Toast.show({
// 					text1: 'User joined',
// 					text2: `Say hello to ${user} 👋`
// 				});
// 			}
	
// 			if (event.type === 'call.session_participant_left') {
// 				const user = event.participant?.user?.name;
// 				Toast.show({
// 					text1: 'User left',
// 					text2: `Say goodbye to ${user} 👋`
// 				});
// 			}
// 		});
	
// 		// Stop the listener when the component unmounts
// 		return () => {
// 			unsubscribe?.();
// 		};
// 	}, [client]);
	

// 	// Join the call
// 	useEffect(() => {
// 		if (!client || call) return;

// 		const joinCall = async () => {
// 			const call = client!.call('default', id);
// 			await call.join({ create: true });
// 			setCall(call);
// 		};

// 		joinCall();
// 	}, [call]);

// 	useEffect(() => {
// 		navigation.setOptions({
// 			headerRight: () => (
// 				<TouchableOpacity onPress={shareMeeting}>
// 					<Ionicons name="share-outline" size={24} color="white" />
// 				</TouchableOpacity>
// 			)
// 		});

// 		// Listen to call events
// 		const unsubscribe = client!.on('all', (event: StreamVideoEvent) => {
// 			console.log(event);

// 			if (event.type === 'call.reaction_new') {
// 				console.log(`New reaction: ${event.reaction}`);
// 			}

// 			if (event.type === 'call.session_participant_joined') {
// 				console.log(`New user joined the call: ${event.participant}`);
// 				const user = event.participant.user.name;
// 				Toast.show({
// 					text1: 'User joined',
// 					text2: `Say hello to ${user} 👋`
// 				});
// 			}

// 			if (event.type === 'call.session_participant_left') {
// 				console.log(`Someone left the call: ${event.participant}`);
// 				const user = event.participant.user.name;
// 				Toast.show({
// 					text1: 'User left',
// 					text2: `Say goodbye to ${user} 👋`
// 				});
// 			}
// 		});

// 		// Stop the listener when the component unmounts
// 		return () => {
// 			unsubscribe();
// 		};
// 	}, []);

// 	// Navigate back home on hangup
// 	const goToHomeScreen = async () => {
// 		router.back();
// 	};

// 	// Share the meeting link
// 	const shareMeeting = async () => {
// 		Share.share({
// 			message: `Join my meeting: myapp://(inside)/(room)/${id}`
// 		});
// 	};

// 	if (!call) return null;

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<Spinner visible={!call} />

// 			<StreamCall call={call}>
// 				<View style={styles.container}>
// 					<CallContent onHangupCallHandler={goToHomeScreen} layout="grid" />

// 					{WIDTH > HEIGHT ? (
// 						<View style={styles.videoContainer}>
// 							<Text>Tablet chat</Text>
// 						</View>
// 					) : (
// 						<Text>Mobile chat</Text>
// 					)}
// 				</View>
// 			</StreamCall>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		flexDirection: WIDTH > HEIGHT ? 'row' : 'column'
// 	},
// 	videoContainer: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		textAlign: 'center',
// 		backgroundColor: '#fff'
// 	},

// 	topView: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#fff'
// 	}
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
// import Colors from '../../constants/Colors';

// const Page = () => {
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

// export default Page;

// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { CallContent, StreamCall, Call, StreamReactionType } from '@stream-io/video-react-native-sdk'; 

// import CustomCallControls from '../../components/CustomCallControls';
// import CustomTopView from '../../components/CustomTopView';
// import { reactions } from '../../components/CustomCallControls';
// import CustomBottomSheet from '../../components/CustomBottomSheet';
// import ChatView from '../../components/ChatView';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// interface PageProps {
//   call: Call | null;
//   id: string;
//   goToHomeScreen: () => void;
// }

// const Page: React.FC<PageProps> = ({ call, id, goToHomeScreen }) => {
//   if (!call) return <Spinner visible={true} />;

//   return (
//     <View style={{ flex: 1 }}>
//       <StreamCall call={call}>
//         <View style={styles.container}>
          
//           {/* ✅ Render CustomTopView here, separately */}
//           <CustomTopView />

//           <CallContent
//             onHangupCallHandler={goToHomeScreen}
//             CallControls={CustomCallControls}
//             supportedReactions={reactions}
//             layout="grid"
//           />

//           {WIDTH > HEIGHT ? (
//             <View style={styles.videoContainer}>
//               <ChatView channelId={id} />
//             </View>
//           ) : (
//             <CustomBottomSheet channelId={id} />
//           )}
//         </View>
//       </StreamCall>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
//   },
//   videoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   topView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });

// export default Page;


// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { CallContent, StreamCall, Call, StreamReactionType } from '@stream-io/video-react-native-sdk'; 

// import CustomCallControls from '../../../components/CustomCallControls';
// import CustomTopView from '../../../components/CustomTopView';
// import { reactions } from '../../../components/CustomCallControls';
// import CustomBottomSheet from '../../../components/CustomBottomSheet';
// import ChatView from '../../../components/ChatView';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// interface PageProps {
//   call: Call | null;
//   id: string;
//   goToHomeScreen: () => void;
// }

// const Page: React.FC<PageProps> = ({ call, id, goToHomeScreen }) => {
//   if (!call) return <Spinner visible={true} />;

//   return (
//     <View style={{ flex: 1 }}>
//       <StreamCall call={call}>
//         <View style={styles.container}>
//           <CallContent
//             onHangupCallHandler={goToHomeScreen}
//             CallControls={CustomCallControls}
//             supportedReactions={reactions}  // ✅ Kept this as it is valid
//             layout="grid"
//           />

//           {WIDTH > HEIGHT ? (
//             <View style={styles.videoContainer}>
//               <ChatView channelId={id} />
//             </View>
//           ) : (
//             <CustomBottomSheet channelId={id} />
//           )}
//         </View>
//       </StreamCall>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
//   },
//   videoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     textAlign: 'center',
//     backgroundColor: '#fff',
//   },
//   topView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });

// export default Page;


// import React from 'react';
// import { View, StyleSheet, Dimensions } from 'react-native';
// import Spinner from 'react-native-loading-spinner-overlay';
// import { CallContent, StreamCall, Call } from '@stream-io/video-react-native-sdk'; // ✅ Import Call type

// import CustomCallControls from '../../../components/CustomCallControls';
// import CustomTopView from '../../../components/CustomTopView';
// import { reactions } from '../../../components/CustomCallControls';
// import CustomBottomSheet from '../../../components/CustomBottomSheet';
// import ChatView from '../../../components/ChatView';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// interface PageProps {
//   call: Call | null;
//   id: string;
//   goToHomeScreen: () => void;
// }

// const Page: React.FC<PageProps> = ({ call, id, goToHomeScreen }) => {
//   if (!call) return <Spinner visible={true} />;

//   return (
//     <View style={{ flex: 1 }}>
//       <StreamCall call={call}>
//         <View style={styles.container}>
//           <CallContent
//             onHangupCallHandler={goToHomeScreen}
//             CallControls={CustomCallControls}
//             CallTopView={CustomTopView}
//             supportedReactions={reactions}
//             layout="grid"
//           />

//           {WIDTH > HEIGHT ? (
//             <View style={styles.videoContainer}>
//               <ChatView channelId={id} />
//             </View>
//           ) : (
//             <CustomBottomSheet channelId={id} />
//           )}
//         </View>
//       </StreamCall>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: WIDTH > HEIGHT ? 'row' : 'column',
//   },
//   videoContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     textAlign: 'center',
//     backgroundColor: '#fff',
//   },
//   topView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
// });

// export default Page;



// import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Text } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

// import Spinner from 'react-native-loading-spinner-overlay';
// import {
// 	Call,
// 	CallContent,
// 	StreamCall,
// 	StreamVideoEvent,
// 	useStreamVideoClient
// } from '@stream-io/video-react-native-sdk';
// import Toast from 'react-native-toast-message';
// import { Ionicons } from '@expo/vector-icons';
// import CustomBottomSheet from '../../../components/CustomBottomSheet';
// import ChatView from '../../../components/ChatView';

// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const Page = () => {
// 	const { id } = useLocalSearchParams<{ id: string }>();
// 	const router = useRouter();
// 	const navigation = useNavigation();

// 	const [call, setCall] = useState<Call | null>(null);
// 	const client = useStreamVideoClient();

// 	// Join the call
// 	useEffect(() => {
// 		if (!client || call) return;

// 		const joinCall = async () => {
// 			try {
// 				const newCall = client.call('default', id);
// 				await newCall.join({ create: true });
// 				setCall(newCall);
// 			} catch (error) {
// 				console.error('Error joining call:', error);
// 			}
// 		};

// 		joinCall();
// 	}, [client, id]);

// 	useEffect(() => {
// 		navigation.setOptions({
// 			headerRight: () => (
// 				<TouchableOpacity onPress={shareMeeting}>
// 					<Ionicons name="share-outline" size={24} color="white" />
// 				</TouchableOpacity>
// 			)
// 		});

// 		// Listen to call events
// 		if (!client) return;

// 		const unsubscribe = client.on('all', (event: StreamVideoEvent) => {
// 			console.log(event);

// 			if (event.type === 'call.reaction_new') {
// 				console.log(`New reaction: ${event.reaction}`);
// 			}

// 			if (event.type === 'call.session_participant_joined') {
// 				const user = event.participant?.user?.name || 'A user';
// 				Toast.show({
// 					text1: 'User joined',
// 					text2: `Say hello to ${user} 👋`
// 				});
// 			}

// 			if (event.type === 'call.session_participant_left') {
// 				const user = event.participant?.user?.name || 'A user';
// 				Toast.show({
// 					text1: 'User left',
// 					text2: `Say goodbye to ${user} 👋`
// 				});
// 			}
// 		});

// 		// Cleanup listener on unmount
// 		return () => {
// 			if (unsubscribe) unsubscribe();
// 		};
// 	}, [client]);

// 	// Navigate back home on hangup
// 	const goToHomeScreen = async () => {
// 		router.back();
// 	};

// 	// Share the meeting link
// 	const shareMeeting = async () => {
// 		try {
// 			await Share.share({
// 				message: `Join my meeting: myapp://(inside)/(room)/${id}`
// 			});
// 		} catch (error) {
// 			console.error('Error sharing meeting:', error);
// 		}
// 	};

// 	if (!call) return <Spinner visible={!call} />;

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<StreamCall call={call}>
// 				<View style={styles.container}>
// 					<CallContent onHangupCallHandler={goToHomeScreen} layout="grid" />

// 					{WIDTH > HEIGHT ? (
// 						<View style={styles.videoContainer}>
// 							<ChatView channelId={id} />
// 						</View>
// 					) : (
// 						<CustomBottomSheet channelId={id} />
// 					)}
// 				</View>
// 			</StreamCall>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		flexDirection: WIDTH > HEIGHT ? 'row' : 'column'
// 	},
// 	videoContainer: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		textAlign: 'center',
// 		backgroundColor: '#fff'
// 	},
// 	topView: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#fff'
// 	}
// });

// export default Page;


// import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Text } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';

// import Spinner from 'react-native-loading-spinner-overlay';
// import {
// 	Call,
// 	CallContent,
// 	StreamCall,
// 	StreamVideoEvent,
// 	useStreamVideoClient
// } from '@stream-io/video-react-native-sdk';
// import Toast from 'react-native-toast-message';

// import { Ionicons } from '@expo/vector-icons';
// import CustomBottomSheet from '../../../components/CustomBottomSheet';
// import ChatView from '../../../components/ChatView';
// const WIDTH = Dimensions.get('window').width;
// const HEIGHT = Dimensions.get('window').height;

// const Page = () => {
// 	const { id } = useLocalSearchParams<{ id: string }>();
// 	const router = useRouter();
// 	const navigation = useNavigation();

// 	const [call, setCall] = useState<Call | null>(null);
// 	const client = useStreamVideoClient();

// 	// Join the call
// 	useEffect(() => {
// 		if (!client || call) return;

// 		const joinCall = async () => {
// 			const call = client!.call('default', id);
// 			await call.join({ create: true });
// 			setCall(call);
// 		};

// 		joinCall();
// 	}, [call]);

// 	useEffect(() => {
// 		navigation.setOptions({
// 			headerRight: () => (
// 				<TouchableOpacity onPress={shareMeeting}>
// 					<Ionicons name="share-outline" size={24} color="white" />
// 				</TouchableOpacity>
// 			)
// 		});

// 		// Listen to call events
// 		const unsubscribe = client!.on('all', (event: StreamVideoEvent) => {
// 			console.log(event);

// 			if (event.type === 'call.reaction_new') {
// 				console.log(`New reaction: ${event.reaction}`);
// 			}

// 			if (event.type === 'call.session_participant_joined') {
// 				console.log(`New user joined the call: ${event.participant}`);
// 				const user = event.participant.user.name;
// 				Toast.show({
// 					text1: 'User joined',
// 					text2: `Say hello to ${user} 👋`
// 				});
// 			}

// 			if (event.type === 'call.session_participant_left') {
// 				console.log(`Someone left the call: ${event.participant}`);
// 				const user = event.participant.user.name;
// 				Toast.show({
// 					text1: 'User left',
// 					text2: `Say goodbye to ${user} 👋`
// 				});
// 			}
// 		});

// 		// Stop the listener when the component unmounts
// 		return () => {
// 			unsubscribe();
// 		};
// 	}, []);

// 	// Navigate back home on hangup
// 	const goToHomeScreen = async () => {
// 		router.back();
// 	};

// 	// Share the meeting link
// 	const shareMeeting = async () => {
// 		Share.share({
// 			message: `Join my meeting: myapp://(inside)/(room)/${id}`
// 		});
// 	};

// 	if (!call) return null;

// 	return (
// 		<View style={{ flex: 1 }}>
// 			<Spinner visible={!call} />

// 			<StreamCall call={call}>
// 				<View style={styles.container}>
// 					<CallContent onHangupCallHandler={goToHomeScreen} layout="grid" />

// 					{WIDTH > HEIGHT ? (
// 						<View style={styles.videoContainer}>
// 							<Text>Tablet chat</Text>
// 						</View>
// 					) : (
// 						<Text>Mobile chat</Text>
// 					)}
// 				</View>
// 			</StreamCall>
// 		</View>
// 	);
// };

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		flexDirection: WIDTH > HEIGHT ? 'row' : 'column'
// 	},
// 	videoContainer: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		textAlign: 'center',
// 		backgroundColor: '#fff'
// 	},

// 	topView: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		backgroundColor: '#fff'
// 	}
// });

// export default Page;

// import { View, Text, StyleSheet } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';

// export default function Page() {
//   const { id } = useLocalSearchParams(); // Get room ID

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>📅 Room ID: {id}</Text>
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


import { View, StyleSheet, Dimensions, TouchableOpacity, Share, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import Spinner from 'react-native-loading-spinner-overlay';
import {
	Call,
	CallContent,
	StreamCall,
	StreamVideoEvent,
	useStreamVideoClient
} from '@stream-io/video-react-native-sdk';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Page = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const navigation = useNavigation();
	const [call, setCall] = useState<Call | null>(null);
	const client = useStreamVideoClient();

	console.log('Component rendered. Current Call:', call);
	console.log('Client instance:', client);

	// Join the call
	useEffect(() => {
		if (!client) {
			console.log('Client is not ready yet.');
			return;
		}
		if (call) {
			console.log('Call already joined. Skipping...');
			return;
		}

		const joinCall = async () => {
			try {
				console.log(`Attempting to join call with ID: ${id}`);
				const newCall = client.call('default', id);
				await newCall.join({ create: true });
				setCall(newCall);
				console.log('Successfully joined call:', newCall);
			} catch (error) {
				console.error('Error joining call:', error);
			}
		};

		joinCall();
	}, [client, call, id]);

	// Event listener for call updates
	useEffect(() => {
		if (!client) {
			console.log('Client not ready for event listener.');
			return;
		}

		const unsubscribe = client.on('all', (event: StreamVideoEvent) => {
			console.log('Event received:', event);

			if (event.type === 'call.session_participant_joined') {
				console.log(`User joined the call: ${event.participant}`);
				const user = event.participant?.user?.name || 'Unknown User';
				Toast.show({
					text1: 'User joined',
					text2: `Say hello to ${user} 👋`
				});
			}

			if (event.type === 'call.session_participant_left') {
				console.log(`User left the call: ${event.participant}`);
				const user = event.participant?.user?.name || 'Unknown User';
				Toast.show({
					text1: 'User left',
					text2: `Say goodbye to ${user} 👋`
				});
			}
		});

		console.log('Event listener attached.');

		// Cleanup event listener
		return () => {
			console.log('Removing event listener.');
			unsubscribe?.();
		};
	}, [client]);

	// Navigate back home on hangup
	const goToHomeScreen = async () => {
		console.log('Navigating back to home screen.');
		router.back();
	};

	// Share the meeting link
	const shareMeeting = async () => {
		const shareMessage = `Join my meeting: myapp://(inside)/(room)/${id}`;
		console.log('Sharing meeting link:', shareMessage);
		await Share.share({
			message: shareMessage
		});
	};

	if (!call) {
		console.log('Call is not ready yet. Showing spinner.');
		return <Spinner visible />;
	}

	return (
		<View style={{ flex: 1 }}>
			<StreamCall call={call}>
				<View style={styles.container}>
					<CallContent onHangupCallHandler={goToHomeScreen} layout="grid" />

					{WIDTH > HEIGHT ? (
						<View style={styles.videoContainer}>
							<Text>Tablet chat</Text>
						</View>
					) : (
						<Text>Mobile chat</Text>
					)}
				</View>
			</StreamCall>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: WIDTH > HEIGHT ? 'row' : 'column'
	},
	videoContainer: {
		flex: 1,
		justifyContent: 'center',
		textAlign: 'center',
		backgroundColor: '#fff'
	},
	topView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff'
	}
});

export default Page;

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';

// Define color palette
const COLORS = {
  primary: '#6D00B3',
  secondary: '#6C00B1',
  white: '#FFFFFF',
  lightGray: '#E0E0E0',
  buttonBackground: '#4B0082',
};

const SOCKET_SERVER_URL = 'http://your-server-ip:3001'; // Replace with your actual server URL

export default function LiveMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.emit('get-live-meetings');

    socket.on('live-meetings', (data) => {
      setMeetings(data);
      setLoading(false);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleJoinMeeting = (roomId) => {
    router.push(`/room/${roomId}`);
  };

  const renderMeetingItem = ({ item }) => (
    <View style={styles.meetingCard}>
      <View style={styles.meetingInfo}>
        <Text style={styles.meetingTitle}>{item.name}</Text>
        <Text style={styles.meetingHost}>Host: {item.host}</Text>
        <Text style={styles.participants}>Participants: {item.participants}</Text>
      </View>
      <TouchableOpacity style={styles.joinButton} onPress={() => handleJoinMeeting(item.id)}>
        <Ionicons name="videocam" size={24} color={COLORS.white} />
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Live Meetings</Text>

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.white} />
      ) : meetings.length === 0 ? (
        <Text style={styles.noMeetings}>No active meetings</Text>
      ) : (
        <FlatList
          data={meetings}
          keyExtractor={(item) => item.id}
          renderItem={renderMeetingItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  meetingCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  meetingInfo: {
    flex: 1,
  },
  meetingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  meetingHost: {
    fontSize: 14,
    color: COLORS.lightGray,
    marginTop: 4,
  },
  participants: {
    fontSize: 14,
    color: COLORS.lightGray,
  },
  joinButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.buttonBackground,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  joinButtonText: {
    color: COLORS.white,
    fontSize: 16,
    marginLeft: 8,
  },
  noMeetings: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 16,
    marginTop: 20,
  },
});


// import React, { useEffect, useState, useCallback } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   TextInput,
//   Button,
// } from 'react-native';

// interface LiveMeeting {
//   id: string;
//   name: string;
//   members: number;
// }

// const LiveMeetingsScreen: React.FC = () => {
//   const [liveMeetings, setLiveMeetings] = useState<LiveMeeting[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [meetingName, setMeetingName] = useState<string>('');

//   // Fetch live meetings from backend
//   const fetchLiveMeetings = useCallback(async () => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://172.20.80.1:5000/api/liveMeeting/live-meetings');
//       const data = await response.json();

//       if (data.success) {
//         setLiveMeetings(data.meetings);
//       } else {
//         console.error('Failed to fetch meetings:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching live meetings:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchLiveMeetings();
//   }, [fetchLiveMeetings]);

//   // Function to create a new meeting
//   const createMeeting = async () => {
//     if (!meetingName.trim()) return alert('Meeting name cannot be empty');

//     try {
//       const response = await fetch('http://172.20.80.1:5000/api/liveMeeting/live-meetings', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: meetingName, userId: 'YOUR_USER_ID' }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setMeetingName('');
//         fetchLiveMeetings();
//       } else {
//         alert('Error creating meeting: ' + data.message);
//       }
//     } catch (error) {
//       console.error('Error creating meeting:', error);
//     }
//   };

//   // Renders each live meeting item
//   const renderItem = ({ item }: { item: LiveMeeting }) => (
//     <TouchableOpacity style={styles.itemContainer}>
//       <Text style={styles.itemTitle}>{item.name}</Text>
//       <Text style={styles.itemSubtitle}>{item.members} members</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Live Meetings</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Meeting Name"
//         value={meetingName}
//         onChangeText={setMeetingName}
//       />
//       <Button title="Create Meeting" onPress={createMeeting} />

//       {loading ? (
//         <ActivityIndicator size="large" color="#FF8A00" style={styles.loader} />
//       ) : liveMeetings.length === 0 ? (
//         <Text style={styles.noMeetingsText}>No live meetings available</Text>
//       ) : (
//         <FlatList
//           data={liveMeetings}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#F5F5F5',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//   },
//   itemContainer: {
//     padding: 16,
//     backgroundColor: '#FFF',
//     borderRadius: 5,
//     marginBottom: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   itemSubtitle: {
//     fontSize: 14,
//     color: '#666',
//   },
//   noMeetingsText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 18,
//     color: '#666',
//   },
//   loader: {
//     marginTop: 20,
//   },
// });

// export default LiveMeetingsScreen;


// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   FlatList,
//   TouchableOpacity,
//   ActivityIndicator,
//   TextInput,
//   Button,
// } from 'react-native';

// interface LiveMeeting {
//   id: string;
//   name: string;
//   members: number;
// }

// const LiveMeetingsScreen: React.FC = () => {
//   const [liveMeetings, setLiveMeetings] = useState<LiveMeeting[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [meetingName, setMeetingName] = useState<string>('');

//   useEffect(() => {
//     fetchLiveMeetings();
//   }, []);

//   const fetchLiveMeetings = async () => {
//     try {
//       const response = await fetch('http://YOUR_BACKEND_URL/live-meetings');
//       const data = await response.json();
//       setLiveMeetings(data.meetings);
//     } catch (error) {
//       console.error('Error fetching live meetings:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const createMeeting = async () => {
//     if (!meetingName) return;
    
//     try {
//       const response = await fetch('http://YOUR_BACKEND_URL/live-meetings', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: meetingName, userId: 'YOUR_USER_ID' }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         setMeetingName('');
//         fetchLiveMeetings();
//       } else {
//         alert('Error creating meeting');
//       }
//     } catch (error) {
//       console.error('Error creating meeting:', error);
//     }
//   };

//   const renderItem = ({ item }: { item: LiveMeeting }) => (
//     <TouchableOpacity style={styles.itemContainer}>
//       <Text style={styles.itemTitle}>{item.name}</Text>
//       <Text style={styles.itemSubtitle}>{item.members} members</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Live Meetings</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Enter Meeting Name"
//         value={meetingName}
//         onChangeText={setMeetingName}
//       />
//       <Button title="Create Meeting" onPress={createMeeting} />

//       {loading ? (
//         <ActivityIndicator size="large" color="#FF8A00" />
//       ) : liveMeetings.length === 0 ? (
//         <Text style={styles.noMeetingsText}>No live meetings available</Text>
//       ) : (
//         <FlatList
//           data={liveMeetings}
//           keyExtractor={(item) => item.id}
//           renderItem={renderItem}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 5,
//   },
//   itemContainer: {
//     padding: 16,
//     borderBottomColor: '#ccc',
//     borderBottomWidth: 1,
//   },
//   itemTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   itemSubtitle: {
//     fontSize: 14,
//     color: '#666',
//   },
//   noMeetingsText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 18,
//   },
// });

// export default LiveMeetingsScreen;

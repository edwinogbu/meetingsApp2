import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Button,
} from 'react-native';

interface LiveMeeting {
  id: string;
  name: string;
  members: number;
}

const LiveMeetingsScreen: React.FC = () => {
  const [liveMeetings, setLiveMeetings] = useState<LiveMeeting[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [meetingName, setMeetingName] = useState<string>('');

  // Fetch live meetings from backend
  const fetchLiveMeetings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://172.20.80.1:5000/api/liveMeeting/live-meetings');
      const data = await response.json();

      if (data.success) {
        setLiveMeetings(data.meetings);
      } else {
        console.error('Failed to fetch meetings:', data.message);
      }
    } catch (error) {
      console.error('Error fetching live meetings:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLiveMeetings();
  }, [fetchLiveMeetings]);

  // Function to create a new meeting
  const createMeeting = async () => {
    if (!meetingName.trim()) return alert('Meeting name cannot be empty');

    try {
      const response = await fetch('http://172.20.80.1:5000/api/liveMeeting/live-meetings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: meetingName, userId: 'YOUR_USER_ID' }),
      });

      const data = await response.json();
      if (data.success) {
        setMeetingName('');
        fetchLiveMeetings();
      } else {
        alert('Error creating meeting: ' + data.message);
      }
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  // Renders each live meeting item
  const renderItem = ({ item }: { item: LiveMeeting }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemSubtitle}>{item.members} members</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Meetings</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Meeting Name"
        value={meetingName}
        onChangeText={setMeetingName}
      />
      <Button title="Create Meeting" onPress={createMeeting} />

      {loading ? (
        <ActivityIndicator size="large" color="#FF8A00" style={styles.loader} />
      ) : liveMeetings.length === 0 ? (
        <Text style={styles.noMeetingsText}>No live meetings available</Text>
      ) : (
        <FlatList
          data={liveMeetings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemContainer: {
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  noMeetingsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
  loader: {
    marginTop: 20,
  },
});

export default LiveMeetingsScreen;


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

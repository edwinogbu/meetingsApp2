import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, ActivityIndicator, 
  StyleSheet, TextInput, Alert 
} from 'react-native';
import { Video } from 'expo-av';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

// Define color palette
const COLORS = {
  primary: '#6D00B3',
  secondary: '#6C00B1',
  white: '#FFFFFF',
  lightGray: '#E0E0E0',
  buttonBackground: '#4B0082',
};

const SERVER_URL = 'http://your-server-ip:3001'; // Replace with your actual server URL

export default function RecordedMeetings() {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchRecordedMeetings();
  }, []);

  const fetchRecordedMeetings = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/get-recorded-meetings`);
      const data = await response.json();
      setRecordings(data);
    } catch (error) {
      console.error('Error fetching recorded meetings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayVideo = (videoUrl) => {
    router.push({ pathname: '/videoPlayer', params: { url: videoUrl } });
  };

  const handleDownloadVideo = async (videoUrl, fileName) => {
    const fileUri = `${FileSystem.documentDirectory}${fileName}`;
    try {
      const downloadResumable = FileSystem.createDownloadResumable(videoUrl, fileUri);
      await downloadResumable.downloadAsync();
      Alert.alert('Download Complete', `File saved to ${fileUri}`);
    } catch (error) {
      Alert.alert('Download Failed', 'Could not download the video');
      console.error(error);
    }
  };

  const handleDeleteRecording = async (id) => {
    Alert.alert('Delete Recording', 'Are you sure you want to delete this recording?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: async () => {
          try {
            await fetch(`${SERVER_URL}/delete-recording/${id}`, { method: 'DELETE' });
            setRecordings(recordings.filter((rec) => rec.id !== id));
          } catch (error) {
            console.error('Error deleting recording:', error);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const filteredRecordings = recordings.filter((rec) =>
    rec.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRecordingItem = ({ item }) => (
    <View style={styles.recordingCard}>
      <Video
        source={{ uri: item.videoUrl }}
        style={styles.videoThumbnail}
        useNativeControls
        resizeMode="cover"
      />
      <View style={styles.recordingInfo}>
        <Text style={styles.meetingTitle}>{item.name}</Text>
        <Text style={styles.meetingDate}>{new Date(item.date).toLocaleDateString()}</Text>
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => handlePlayVideo(item.videoUrl)}>
            <Ionicons name="play-circle" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDownloadVideo(item.videoUrl, `${item.name}.mp4`)}>
            <Ionicons name="download" size={28} color={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteRecording(item.id)}>
            <Ionicons name="trash" size={28} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recorded Meetings</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search by meeting name..."
        placeholderTextColor={COLORS.lightGray}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.white} />
      ) : filteredRecordings.length === 0 ? (
        <Text style={styles.noRecordings}>No recorded meetings found</Text>
      ) : (
        <FlatList
          data={filteredRecordings}
          keyExtractor={(item) => item.id}
          renderItem={renderRecordingItem}
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
  searchBar: {
    backgroundColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    color: COLORS.white,
  },
  recordingCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  videoThumbnail: {
    width: 100,
    height: 60,
    borderRadius: 8,
  },
  recordingInfo: {
    flex: 1,
    marginLeft: 15,
  },
  meetingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  meetingDate: {
    fontSize: 14,
    color: COLORS.lightGray,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 8,
    justifyContent: 'space-around',
  },
  noRecordings: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: 16,
    marginTop: 20,
  },
});


// import React, { useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert, Button } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useEvent } from 'expo';
// import { useVideoPlayer, VideoView } from 'expo-video';
// // import { Video } from 'expo-av';
// import { Video, ResizeMode } from 'expo-av';


// const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

// export default function recordedMeetingsScreen() {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [recordings, setRecordings] = useState([
//     { id: '1', title: 'Crypto Webinar', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', date: '2024-07-01' },
//     { id: '2', title: 'Tech Conference 2024', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', date: '2024-07-03' },
//     { id: '3', title: 'AI & Future', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', date: '2024-07-05' },
//   ]);

//   const player = useVideoPlayer(videoSource, player => {
//     player.loop = true;
//     player.play();
//   });
//   const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

//   const filteredRecordings = recordings.filter(recording =>
//     recording.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const deleteRecording = (id:string) => {
//     setRecordings(recordings.filter(recording => recording.id !== id));
//     Alert.alert('Deleted', 'Recording has been removed.');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Past Meetings & Conferences</Text>
      

//       {/* Search Bar */}
//       <View style={styles.searchContainer}>
//         <Ionicons name="search" size={20} color="#888" />
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search recordings..."
//           placeholderTextColor="#888"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//       </View>

//       {/* List of Recordings */}
//       <FlatList
//         data={filteredRecordings}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.recordingItem}>
//             <Text style={styles.recordingTitle}>{item.title}</Text>
//             <Text style={styles.dateText}>{item.date}</Text>
//             <Video source={{ uri: item.videoUrl }} useNativeControls 
//             resizeMode={ResizeMode.CONTAIN}
//             style={styles.videoPlayer} />
//             <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecording(item.id)}>
//               <Ionicons name="trash-outline" size={20} color="white" />
//               <Text style={styles.deleteText}>Delete</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#6D00B3',
//     padding: 20,
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: '#FFF',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   videoContainer: {
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   video: {
//     width: 350,
//     height: 275,
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
//   recordingItem: {
//     backgroundColor: '#F0F8FF',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 10,
//   },
//   recordingTitle: {
//     fontSize: 16,
//     color: '#6C00B1',
//     fontWeight: 'bold',
//   },
//   dateText: {
//     color: '#BBB',
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   videoPlayer: {
//     width: '100%',
//     height: 200,
//     borderRadius: 10,
//     padding: 15,
//     marginBottom: 10,
//   },
//   deleteButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#D32F2F',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 5,
//     marginTop: 10,
//     alignSelf: 'center',
//   },
//   deleteText: {
//     color: 'white',
//     fontSize: 14,
//     marginLeft: 5,
//   },
// });


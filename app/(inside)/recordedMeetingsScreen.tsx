import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Alert, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
// import { Video } from 'expo-av';
import { Video, ResizeMode } from 'expo-av';


const videoSource = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function recordedMeetingsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recordings, setRecordings] = useState([
    { id: '1', title: 'Crypto Webinar', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', date: '2024-07-01' },
    { id: '2', title: 'Tech Conference 2024', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', date: '2024-07-03' },
    { id: '3', title: 'AI & Future', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', date: '2024-07-05' },
  ]);

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
    player.play();
  });
  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

  const filteredRecordings = recordings.filter(recording =>
    recording.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const deleteRecording = (id:string) => {
    setRecordings(recordings.filter(recording => recording.id !== id));
    Alert.alert('Deleted', 'Recording has been removed.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Past Meetings & Conferences</Text>
      

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search recordings..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* List of Recordings */}
      <FlatList
        data={filteredRecordings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.recordingItem}>
            <Text style={styles.recordingTitle}>{item.title}</Text>
            <Text style={styles.dateText}>{item.date}</Text>
            <Video source={{ uri: item.videoUrl }} useNativeControls 
            resizeMode={ResizeMode.CONTAIN}
            style={styles.videoPlayer} />
            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRecording(item.id)}>
              <Ionicons name="trash-outline" size={20} color="white" />
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6D00B3',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 15,
  },
  videoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  video: {
    width: 350,
    height: 275,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1A1A36',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFF',
    marginLeft: 8,
    fontSize: 14,
  },
  recordingItem: {
    backgroundColor: '#F0F8FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  recordingTitle: {
    fontSize: 16,
    color: '#6C00B1',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#BBB',
    fontSize: 12,
    marginBottom: 10,
  },
  videoPlayer: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
});


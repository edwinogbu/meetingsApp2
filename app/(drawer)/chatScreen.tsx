// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { io } from 'socket.io-client';
import moment from 'moment';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SOCKET_SERVER_URL = 'http://your-server-ip:3001';

// Avatar placeholders
const MALE_AVATAR = require('../assets/male-avatar.png');
const FEMALE_AVATAR = require('../assets/female-avatar.png');

const ChatScreen = () => {
  const router = useRouter();
  const { id: roomId } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    const loadUser = async () => {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        
        // Determine avatar based on gender
        parsedUser.avatar = parsedUser.gender === 'female' ? FEMALE_AVATAR : MALE_AVATAR;
        
        setUser(parsedUser);
      } else {
        router.push('/login');
      }
    };

    loadUser();
    socket.emit('join-room', roomId);

    socket.on('chat-messages', (data) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMessages(data);
      flatListRef.current?.scrollToEnd({ animated: true });
    });

    socket.on('new-message', (newMessage) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMessages((prev) => [...prev, newMessage]);
      flatListRef.current?.scrollToEnd({ animated: true });
      socket.emit('message-seen', { roomId, messageId: newMessage.id });
    });

    socket.on('typing', () => {
      setTyping(true);
      setTimeout(() => setTyping(false), 2000);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const sendMessage = () => {
    if (message.trim() === '' || !user) return;

    const newMessage = {
      id: Math.random().toString(),
      text: message,
      sender: user.username,
      avatar: user.avatar, // Use the gender-based avatar
      timestamp: new Date().toISOString(),
      seen: false,
    };

    const socket = io(SOCKET_SERVER_URL);
    socket.emit('send-message', { roomId, message: newMessage });
    setMessage('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.roomTitle}>Chat Room {roomId}</Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messageList}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Image source={item.avatar} style={styles.avatar} />
            <View style={styles.messageBox}>
              <Text style={styles.sender}>{item.sender}</Text>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timestamp}>{moment(item.timestamp).format('h:mm A')}</Text>
            </View>
          </View>
        )}
      />
      {typing && <Text style={styles.typingText}>Someone is typing...</Text>}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          placeholderTextColor="#EAEAEA"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#6D00B3' },
  roomTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginLeft: 10 },
  messageContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 6 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  messageBox: { backgroundColor: '#1E1E1E', padding: 12, borderRadius: 10 },
  sender: { fontSize: 14, fontWeight: 'bold', color: '#EAEAEA' },
  messageText: { fontSize: 16, color: '#fff' },
  timestamp: { fontSize: 12, color: '#B0B0B0', marginTop: 5 },
  inputContainer: { flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: '#333' },
  input: { flex: 1, color: '#fff', padding: 10, borderRadius: 5, backgroundColor: '#444' },
  sendButton: { marginLeft: 10 },
  typingText: { color: '#EAEAEA', textAlign: 'center', marginBottom: 10 },
});

export default ChatScreen;


// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   LayoutAnimation,
//   UIManager,
//   Linking,
// } from 'react-native';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import { Ionicons } from '@expo/vector-icons';
// import io, { Socket } from 'socket.io-client';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import moment from 'moment';

// // Enable smooth animations for Android
// if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
//   UIManager.setLayoutAnimationEnabledExperimental(true);
// }

// const SOCKET_SERVER_URL = 'http://your-server-ip:3001';

// interface Message {
//   id: string;
//   text: string;
//   sender: string;
//   avatar: string;
//   timestamp: string;
//   seen: boolean;
//   reaction?: string;
// }

// const ChatScreen: React.FC = () => {
//   const router = useRouter();
//   const { id: roomId } = useLocalSearchParams<{ id: string }>();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState<string>('');
//   const [user, setUser] = useState<{ username: string; avatar: string } | null>(null);
//   const [typing, setTyping] = useState(false);
//   const flatListRef = useRef<FlatList<Message>>(null);

//   useEffect(() => {
//     const socket: Socket = io(SOCKET_SERVER_URL);

//     const loadUser = async () => {
//       const storedUser = await AsyncStorage.getItem('user');
//       if (storedUser) {
//         setUser(JSON.parse(storedUser));
//       } else {
//         router.push('/login');
//       }
//     };

//     loadUser();

//     socket.emit('join-room', roomId);

//     socket.on('chat-messages', (data: Message[]) => {
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//       setMessages(data);
//       flatListRef.current?.scrollToEnd({ animated: true });
//     });

//     socket.on('new-message', (newMessage: Message) => {
//       LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//       setMessages((prev) => [...prev, newMessage]);
//       flatListRef.current?.scrollToEnd({ animated: true });

//       // Emit message seen event
//       socket.emit('message-seen', { roomId, messageId: newMessage.id });
//     });

//     socket.on('typing', () => {
//       setTyping(true);
//       setTimeout(() => setTyping(false), 2000);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, [roomId]);

//   const sendMessage = () => {
//     if (message.trim() === '' || !user) return;

//     const newMessage: Message = {
//       id: Math.random().toString(),
//       text: message,
//       sender: user.username,
//       avatar: user.avatar,
//       timestamp: new Date().toISOString(),
//       seen: false,
//     };

//     const socket: Socket = io(SOCKET_SERVER_URL);
//     socket.emit('send-message', { roomId, message: newMessage });

//     setMessage('');
//   };

//   const handleLongPress = (messageId: string) => {
//     // Add a quick reaction (❤️) when long-pressed
//     const updatedMessages = messages.map((msg) =>
//       msg.id === messageId ? { ...msg, reaction: '❤️' } : msg
//     );
//     setMessages(updatedMessages);
//   };

//   const formatMessageText = (text: string) => {
//     const urlRegex = /(https?:\/\/[^\s]+)/g;
//     return text.split(urlRegex).map((part, index) =>
//       urlRegex.test(part) ? (
//         <Text key={index} style={styles.link} onPress={() => Linking.openURL(part)}>
//           {part}
//         </Text>
//       ) : (
//         part
//       )
//     );
//   };

//   return (
//     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => router.back()}>
//           <Ionicons name="arrow-back" size={28} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.roomTitle}>Chat Room {roomId}</Text>
//       </View>

//       {/* Chat Messages */}
//       <FlatList
//         ref={flatListRef}
//         data={messages}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={styles.messageList}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onLongPress={() => handleLongPress(item.id)}
//             style={[styles.messageContainer, item.sender === user?.username && styles.myMessage]}
//           >
//             <Image source={{ uri: item.avatar }} style={styles.avatar} />
//             <View style={[styles.messageBox, item.sender === user?.username && styles.myMessageBox]}>
//               <Text style={styles.sender}>{item.sender}</Text>
//               <Text style={styles.messageText}>{formatMessageText(item.text)}</Text>
//               {item.reaction && <Text style={styles.reaction}>{item.reaction}</Text>}
//               <Text style={styles.timestamp}>
//                 {moment(item.timestamp).format('h:mm A')} {item.seen ? '✅✅' : '✅'}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       {/* Typing Indicator */}
//       {typing && (
//         <View style={styles.typingIndicator}>
//           <Text style={styles.typingText}>Someone is typing...</Text>
//         </View>
//       )}

//       {/* Message Input */}
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Type a message..."
//           placeholderTextColor="#EAEAEA"
//           value={message}
//           onChangeText={(text) => {
//             setMessage(text);
//             const socket: Socket = io(SOCKET_SERVER_URL);
//             socket.emit('typing', roomId);
//           }}
//         />
//         <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
//           <Ionicons name="send" size={22} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// // Styles
// // const styles = StyleSheet.create({
// //   container: { flex: 1, backgroundColor: '#121212' },
// //   header: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#6D00B3', borderBottomLeftRadius: 15, borderBottomRightRadius: 15 },
// //   roomTitle: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginLeft: 10 },
// //   messageContainer: { flexDirection: 'row', alignItems: 'flex-start', marginVertical: 6 },
// //   myMessage: { flexDirection: 'row-reverse' },
// //   myMessageBox: { backgroundColor: '#6D00B3' },
// //   reaction: { fontSize: 18, marginTop: 5 },
// //   link: { color: '#1E90FF', textDecorationLine: 'underline' },
// // });

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#121212', // Dark background
//     },
  
//     /* ======= HEADER ======= */
//     header: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       paddingVertical: 15,
//       paddingHorizontal: 20,
//       backgroundColor: '#6D00B3', // Purple header
//       borderBottomLeftRadius: 15,
//       borderBottomRightRadius: 15,
//       elevation: 4, // Shadow effect for Android
//       shadowColor: '#000',
//       shadowOpacity: 0.2,
//       shadowRadius: 5,
//       shadowOffset: { width: 0, height: 3 },
//     },
//     roomTitle: {
//       fontSize: 20,
//       fontWeight: 'bold',
//       color: '#fff',
//       marginLeft: 10,
//     },
  
//     /* ======= CHAT MESSAGE LIST ======= */
//     messageList: {
//       paddingHorizontal: 10,
//       paddingBottom: 15,
//     },
//     messageContainer: {
//       flexDirection: 'row',
//       alignItems: 'flex-start',
//       marginVertical: 6,
//       maxWidth: '80%',
//       alignSelf: 'flex-start',
//     },
//     myMessage: {
//       alignSelf: 'flex-end',
//       flexDirection: 'row-reverse',
//     },
//     avatar: {
//       width: 40,
//       height: 40,
//       borderRadius: 20,
//       marginRight: 10,
//     },
  
//     /* ======= MESSAGE BUBBLE ======= */
//     messageBox: {
//       backgroundColor: '#1E1E1E',
//       padding: 12,
//       borderRadius: 10,
//       shadowColor: '#000',
//       shadowOpacity: 0.1,
//       shadowRadius: 2,
//       shadowOffset: { width: 0, height: 1 },
//     },
//     myMessageBox: {
//       backgroundColor: '#6D00B3', // Purple bubble for user messages
//     },
//     sender: {
//       fontSize: 14,
//       fontWeight: 'bold',
//       color: '#EAEAEA',
//       marginBottom: 4,
//     },
//     messageText: {
//       fontSize: 16,
//       color: '#fff',
//     },
//     reaction: {
//       fontSize: 18,
//       marginTop: 5,
//     },
//     timestamp: {
//       fontSize: 12,
//       color: '#B0B0B0',
//       marginTop: 5,
//       alignSelf: 'flex-end',
//     },
  
//     /* ======= TYPING INDICATOR ======= */
//     typingIndicator: {
//       paddingHorizontal: 15,
//       paddingVertical: 5,
//       alignSelf: 'flex-start',
//       backgroundColor: '#2C2C2C',
//       borderRadius: 10,
//       marginHorizontal: 10,
//     },
//     typingText: {
//       fontSize: 14,
//       color: '#EAEAEA',
//     },
  
//     /* ======= MESSAGE INPUT ======= */
//     inputContainer: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       padding: 10,
//       backgroundColor: '#1E1E1E',
//       borderTopWidth: 1,
//       borderTopColor: '#2C2C2C',
//     },
//     input: {
//       flex: 1,
//       backgroundColor: '#2C2C2C',
//       color: '#fff',
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//       borderRadius: 20,
//       fontSize: 16,
//       marginRight: 10,
//     },
//     sendButton: {
//       backgroundColor: '#6D00B3',
//       padding: 10,
//       borderRadius: 20,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
  
//     /* ======= LINK STYLING ======= */
//     link: {
//       color: '#1E90FF',
//       textDecorationLine: 'underline',
//     },
//   });
  
// export default ChatScreen;

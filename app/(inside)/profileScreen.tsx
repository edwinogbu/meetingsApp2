import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const ProfileScreen = () => {
  const [editing, setEditing] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "Sir Bola",
    last_name: "Ayo",
    email: "ayo@gmail.com",
    phone_number: "123-456-7890",
    location: "New York, USA",
    date_of_birth: "1990-01-01",
    profileImage: "https://via.placeholder.com/150",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={["#8E00FF", "#0055A4"]} style={styles.header}>
        <Image source={{ uri: formData.profileImage }} style={styles.profileImage} />
        <Text style={styles.userName}>
          {formData.first_name} {formData.last_name}
        </Text>
        <TouchableOpacity onPress={() => setEditing(!editing)} style={styles.editButton}>
          <Ionicons name={editing ? "checkmark-circle-outline" : "create-outline"} size={26} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.detailsContainer}>
        <ProfileField label="Email" value={formData.email} editable={false} />
        <ProfileField label="Phone" value={formData.phone_number} editable={editing} onChangeText={(val) => handleInputChange("phone_number", val)} />
        <ProfileField label="Location" value={formData.location} editable={editing} onChangeText={(val) => handleInputChange("location", val)} />
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerContainer}>
          <ProfileField label="Date of Birth" value={formData.date_of_birth} editable={false} />
          <Ionicons name="calendar-outline" size={20} color="#aaa" style={styles.calendarIcon} />
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date(formData.date_of_birth)}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) handleInputChange("date_of_birth", selectedDate.toISOString().split("T")[0]);
          }}
        />
      )}
    </ScrollView>
  );
};


interface ProfileFieldProps {
  label: string;
  value: string;
  editable?: boolean;
  onChangeText?: (text: string) => void;
}

// const ProfileField = ({ label, value, editable = false, onChangeText }) => (
  const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, editable = false, onChangeText }) => (

  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    {editable ? (
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
      />
    ) : (
      <Text style={styles.value}>{value}</Text>
    )}
  </View>
);

// const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, editable = false, onChangeText }) => (
//   <View>
//     <Text>{label}</Text>
//     {editable ? (
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         style={{ borderBottomWidth: 1, color: "#fff" }}
//       />
//     ) : (
//       <Text>{value}</Text>
//     )}
//   </View>
// );


const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#F5F5F5", flexGrow: 1 },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  editButton: {
    position: "absolute",
    right: 20,
    top: 20,
    backgroundColor: "rgba(255,255,255,0.3)",
    padding: 8,
    borderRadius: 20,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  fieldContainer: {
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  label: {
    fontSize: 14,
    color: "#777",
    fontWeight: "500",
    marginBottom: 3,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    fontSize: 16,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#8E00FF",
    paddingVertical: 2,
  },
  datePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendarIcon: {
    position: "absolute",
    right: 0,
    top: 18,
  },
});

export default ProfileScreen;


// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator 
// } from "react-native";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { useAuth } from "../../context/AuthContext";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Ionicons } from "@expo/vector-icons";
// import * as SecureStore from 'expo-secure-store';

// const ProfileScreen = () => {
//   const router = useRouter();
//   const { authState } = useAuth();
//   const [user, setUser] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         if (!authState?.user_id) return; // Ensure authState exists before accessing user_id

//         setLoading(true);

//         // Check if profile is already cached in SecureStore
//         const storedUserProfile = await SecureStore.getItemAsync("userProfile");
//         if (storedUserProfile) {
//           setUser(JSON.parse(storedUserProfile));
//         } else {
//           // Fetch from API if not in SecureStore
//           const response = await fetch(`https://yourapi.com/users/${authState.user_id}`);
//           if (!response.ok) throw new Error("Failed to fetch profile");

//           const data = await response.json();
//           setUser(data);
//           await SecureStore.setItemAsync("userProfile", JSON.stringify(data)); // Cache it
//         }
//       } catch (error) {
//         console.error("Failed to fetch user profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [authState?.user_id]);  // Depend on user_id

//   const [formData, setFormData] = useState({
//     first_name: "Sir Bola",
//     last_name: "Ayo",
//     email: "ayo@gmail.com",
//     phone_number: "123-456-7890",
//     location: "New York, USA",
//     date_of_birth: "1990-01-01",
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         first_name: user.first_name || "Sir Bola",
//         last_name: user.last_name || "Ayo",
//         email: user.email || "ayo@gmail.com",
//         phone_number: user.phone_number || "123-456-7890",
//         location: user.location || "New York, USA",
//         date_of_birth: user.date_of_birth || "1990-01-01",
//       });
//     }
//   }, [user]); // Update form when user data changes

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const saveProfile = async () => {
//     try {
//       if (!authState?.user_id) return;

//       const response = await fetch(`https://yourapi.com/users/${authState.user_id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         console.error("Profile update failed", await response.text());
//         return;
//       }

//       await SecureStore.setItemAsync("userProfile", JSON.stringify(formData));
//       setUser(formData);
//       setEditing(false);
//     } catch (error) {
//       console.error("Profile update failed", error);
//     }
//   };

//   if (!authState) {
//     return <Text>Loading authentication...</Text>; // Ensure authState is loaded
//   }

//   if (loading) {
//     return <ActivityIndicator size="large" color="#8E00FF" />;
//   }

//   if (!user) {
//     return <Text>Error loading profile</Text>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <LinearGradient colors={["#8E00FF", "#0055A4"]} style={styles.header}>
//         <Image source={{ uri: user.profileImage || "https://via.placeholder.com/150" }} style={styles.profileImage} />
//         <Text style={styles.userName}>{formData.first_name} {formData.last_name}</Text>
//         <TouchableOpacity onPress={() => setEditing(!editing)} style={styles.editButton}>
//           <Ionicons name={editing ? "checkmark-circle-outline" : "create-outline"} size={24} color="#fff" />
//         </TouchableOpacity>
//       </LinearGradient>

//       <View style={styles.detailsContainer}>
//         <ProfileField label="Email" value={formData.email} editable={false} />
//         <ProfileField label="Phone" value={formData.phone_number} editable={editing} onChangeText={(val) => handleInputChange("phone_number", val)} />
//         <ProfileField label="Location" value={formData.location} editable={editing} onChangeText={(val) => handleInputChange("location", val)} />
//         <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//           <ProfileField label="Date of Birth" value={formData.date_of_birth} editable={false} />
//         </TouchableOpacity>
//       </View>

//       {showDatePicker && (
//         <DateTimePicker
//           value={new Date(formData.date_of_birth)}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) handleInputChange("date_of_birth", selectedDate.toISOString().split('T')[0]);
//           }}
//         />
//       )}

//       {editing && (
//         <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         </TouchableOpacity>
//       )}
//     </ScrollView>
//   );
// };

// interface ProfileFieldProps {
//   label: string;
//   value: string;
//   editable?: boolean;
//   onChangeText?: (text: string) => void;
// }

// const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, editable = false, onChangeText }) => (
//   <View>
//     <Text>{label}</Text>
//     {editable ? (
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         style={{ borderBottomWidth: 1, color: "#fff" }}
//       />
//     ) : (
//       <Text>{value}</Text>
//     )}
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   header: { alignItems: "center", padding: 30, borderRadius: 10 },
//   profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#fff" },
//   userName: { fontSize: 22 },
//   editButton: { position: "absolute", right: 20, top: 20 },
//   detailsContainer: { marginTop: 20 },
//   saveButton: { backgroundColor: "#0055A4", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 20 },
//   saveButtonText: { color: "#fff", fontWeight: "bold" },
// });

// export default ProfileScreen;


// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView 
// } from "react-native";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { useAuth } from "../../context/AuthContext";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Ionicons } from "@expo/vector-icons";
// import * as SecureStore from 'expo-secure-store';

// const ProfileScreen = () => {
//   const router = useRouter();
//   const { authState } = useAuth();
//   const [user, setUser] = useState<any>(null);
//   const [editing, setEditing] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const storedUserProfile = await SecureStore.getItemAsync("userProfile");
//         if (storedUserProfile) {
//           setUser(JSON.parse(storedUserProfile));
//         }
//       } catch (error) {
//         console.error("Failed to fetch user profile from SecureStore:", error);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const [formData, setFormData] = useState({
//     first_name: user?.first_name || "Sir Bola",
//     last_name: user?.last_name || "Ayo",
//     email: user?.email || "ayo@gmail.com",
//     phone_number: user?.phone_number || "123-456-7890",
//     location: user?.location || "New York, USA",
//     date_of_birth: user?.date_of_birth || "1980-01-01",
//   });

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         first_name: user.first_name || "Sir Bola",
//         last_name: user.last_name || "Ayo",
//         email: user.email || "ayo@gmail.com",
//         phone_number: user.phone_number || "123-456-7890",
//         location: user.location || "New York, USA",
//         date_of_birth: user.date_of_birth || "1990-01-01",
//       });
//     }
//   }, [user]);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const saveProfile = async () => {
//     try {
//       await SecureStore.setItemAsync("userProfile", JSON.stringify(formData));
//       setUser(formData);
//       setEditing(false);
//     } catch (error) {
//       console.error("Profile update failed", error);
//     }
//   };

//   if (!user) {
//     return <Text>Loading profile...</Text>;
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <LinearGradient colors={["#8E00FF", "#0055A4"]} style={styles.header}>
//         <Image source={{ uri: user.profileImage || "https://via.placeholder.com/150" }} style={styles.profileImage} />
//         <Text style={styles.userName}>{formData.first_name} {formData.last_name}</Text>
//         <TouchableOpacity onPress={() => setEditing(!editing)} style={styles.editButton}>
//           <Ionicons name={editing ? "checkmark-circle-outline" : "create-outline"} size={24} color="#fff" />
//         </TouchableOpacity>
//       </LinearGradient>
//       <View style={styles.detailsContainer}>
//         <ProfileField label="Email" value={formData.email} editable={false} />
//         <ProfileField label="Phone" value={formData.phone_number} editable={editing} onChangeText={(val) => handleInputChange("phone_number", val)} />
//         <ProfileField label="Location" value={formData.location} editable={editing} onChangeText={(val) => handleInputChange("location", val)} />
//         <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//           <ProfileField label="Date of Birth" value={formData.date_of_birth} editable={false} />
//         </TouchableOpacity>
//       </View>
//       {showDatePicker && (
//         <DateTimePicker
//           value={new Date(formData.date_of_birth)}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) handleInputChange("date_of_birth", selectedDate.toISOString().split('T')[0]);
//           }}
//         />
//       )}
//       {editing && (
//         <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         </TouchableOpacity>
//       )}
//     </ScrollView>
//   );
// };

// interface ProfileFieldProps {
//   label: string;
//   value: string;
//   editable?: boolean;
//   onChangeText?: (text: string) => void;
// }

// const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, editable = false, onChangeText }) => {
//   return (
//       <View>
//           <Text>{label}</Text>
//           {editable ? (
//               <TextInput
//                   value={value}
//                   onChangeText={onChangeText}
//                   style={{ borderBottomWidth: 1, color: '#fff' }}
//               />
//           ) : (
//               <Text>{value}</Text>
//           )}
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   header: { alignItems: "center", padding: 30, borderRadius: 10 },
//   profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#fff" },
//   userName: { fontSize: 22 },
//   editButton: { position: "absolute", right: 20, top: 20 },
//   detailsContainer: { marginTop: 20 },
//   saveButton: { backgroundColor: "#0055A4", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 20 },
//   saveButtonText: { color: "#fff", fontWeight: "bold" },
// });

// export default ProfileScreen;


// import React, { useState } from "react";
// import { 
//   View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView 
// } from "react-native";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { useAuth } from "../../context/AuthContext";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Ionicons } from "@expo/vector-icons";
// import * as SecureStore from 'expo-secure-store';
// import axios from 'axios';

// const ProfileScreen = () => {
//   const router = useRouter();
//   const { user } = useAuth();
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     first_name: user?.first_name || "John",
//     last_name: user?.last_name || "Doe",
//     email: user?.email || "johndoe@example.com",
//     phone_number: user?.phone_number || "123-456-7890",
//     location: user?.location || "New York, USA",
//     date_of_birth: user?.date_of_birth || "1990-01-01",
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };
  

//   const saveProfile = async () => {
//     try {
//       await axios.post("https://api.example.com/update-profile", formData);
//       await SecureStore.setItemAsync("userProfile", JSON.stringify(formData));
//       setEditing(false);
//     } catch (error) {
//       console.error("Profile update failed", error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <LinearGradient colors={["#8E00FF", "#0055A4"]} style={styles.header}>
//         <Image source={{ uri: "https://via.placeholder.com/150" }} style={styles.profileImage} />
//         <Text style={styles.userName}>{formData.first_name} {formData.last_name}</Text>
//         <TouchableOpacity onPress={() => setEditing(!editing)} style={styles.editButton}>
//           <Ionicons name={editing ? "checkmark-circle-outline" : "create-outline"} size={24} color="#fff" />
//         </TouchableOpacity>
//       </LinearGradient>
//       <View style={styles.detailsContainer}>
//         <ProfileField label="Email" value={formData.email} editable={false} />
//         <ProfileField label="Phone" value={formData.phone_number} editable={editing} onChangeText={(val) => handleInputChange("phone_number", val)} />
//         <ProfileField label="Location" value={formData.location} editable={editing} onChangeText={(val) => handleInputChange("location", val)} />
//         <TouchableOpacity onPress={() => setShowDatePicker(true)}>
//           <ProfileField label="Date of Birth" value={formData.date_of_birth} editable={false} />
//         </TouchableOpacity>
//       </View>
//       {showDatePicker && (
//         <DateTimePicker
//           value={new Date(formData.date_of_birth)}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) handleInputChange("date_of_birth", selectedDate.toISOString().split('T')[0]);
//           }}
//         />
//       )}
//       {editing && (
//         <TouchableOpacity onPress={saveProfile} style={styles.saveButton}>
//           <Text style={styles.saveButtonText}>Save Changes</Text>
//         </TouchableOpacity>
//       )}
//     </ScrollView>
//   );
// };

// // const ProfileField = ({ label, value, editable, onChangeText }) => (
// //   <View style={styles.profileField}>
// //     <Text style={styles.label}>{label}</Text>
// //     {editable ? (
// //       <TextInput style={styles.input} value={value} onChangeText={onChangeText} />
// //     ) : (
// //       <Text style={styles.value}>{value}</Text>
// //     )}
// //   </View>
// // );

// interface ProfileFieldProps {
//   label: string;
//   value: string;
//   editable?: boolean;
//   onChangeText?: (text: string) => void;
// }

// const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, editable = false, onChangeText }) => {
//   return (
//       <View>
//           <Text>{label}</Text>
//           {editable ? (
//               <TextInput
//                   value={value}
//                   onChangeText={onChangeText}
//                   style={{ borderBottomWidth: 1, color: '#fff' }}
//               />
//           ) : (
//               <Text>{value}</Text>
//           )}
//       </View>
//   );
// };


// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   header: { alignItems: "center", padding: 30, borderRadius: 10 },
//   profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#fff" },
//   userName: { fontSize: 22, color: "#fff", fontWeight: "bold", marginVertical: 10 },
//   editButton: { position: "absolute", top: 20, right: 20 },
//   detailsContainer: { backgroundColor: "#fff", padding: 20, borderRadius: 10, marginTop: -20 },
//   profileField: { marginBottom: 15 },
//   label: { fontSize: 14, color: "#666" },
//   value: { fontSize: 16, fontWeight: "500", color: "#000" },
//   input: { fontSize: 16, borderBottomWidth: 1, borderBottomColor: "#ccc", paddingVertical: 5 },
//   saveButton: { backgroundColor: "#8E00FF", padding: 12, borderRadius: 8, marginTop: 20, alignItems: "center" },
//   saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
// });

// export default ProfileScreen;



// import { View, Text, Button, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function profileScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>👤 Profile Screen</Text>
//       <Button title="Go to Home" onPress={() => router.push('/(inside)/index')} />
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


// import { View, Text } from 'react-native'
// import React from 'react'

// export default function profileScreen() {
//   return (
//     <View>
//       <Text>profileScreen</Text>
//     </View>
//   )
// }
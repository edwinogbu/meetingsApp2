import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import DateTimePicker from "@react-native-community/datetimepicker";

interface UserProfile {
  id: string; // Added user ID
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  location: string;
  date_of_birth: string;
  profileImage?: string;
}

const ProfileScreen = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<UserProfile | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserData = await SecureStore.getItemAsync("userData");
        if (storedUserData) {
          const parsedData = JSON.parse(storedUserData);
          setUserData(parsedData);
          setUpdatedUser(parsedData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!updatedUser || !userData?.id) return;

    try {
      const response = await fetch(
        `http://52.14.158.219:5000/api/auth/users/update/${userData.id}`, // Use user ID instead of email
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      const result = await response.json();

      if (result.success) {
        await SecureStore.setItemAsync("userData", JSON.stringify(updatedUser)); // Update SecureStore
        setUserData(updatedUser);
        setEditing(false);
        Alert.alert("Success", "Profile updated successfully!");
      } else {
        Alert.alert("Error", result.message);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#6C00B1" style={styles.loader} />;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient colors={["#6D00B3", "#6C00B1"]} style={styles.header}>
          <View style={styles.imageContainer}>
            <Image source={require("../../assets/images/logo.jpeg")} style={styles.logo} />
          </View>
          <Text style={styles.headerText}>Edit Your Profile</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput
            style={styles.input}
            value={updatedUser?.first_name}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser!, first_name: text })}
            editable={editing}
            placeholder="First Name"
          />
          <TextInput
            style={styles.input}
            value={updatedUser?.last_name}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser!, last_name: text })}
            editable={editing}
            placeholder="Last Name"
          />
          <TextInput
            style={[styles.input, styles.disabledInput]}
            value={updatedUser?.email}
            editable={false}
            placeholder="Email"
          />
          <TextInput
            style={styles.input}
            value={updatedUser?.phone_number}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser!, phone_number: text })}
            editable={editing}
            placeholder="Phone Number"
          />
          <TextInput
            style={styles.input}
            value={updatedUser?.location}
            onChangeText={(text) => setUpdatedUser({ ...updatedUser!, location: text })}
            editable={editing}
            placeholder="Location"
          />

          <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)} disabled={!editing}>
            <Ionicons name="calendar" size={20} color="#fff" />
            <Text style={styles.dateText}>{updatedUser?.date_of_birth || "Select Date of Birth"}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={new Date(updatedUser?.date_of_birth || Date.now())}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setUpdatedUser({ ...updatedUser!, date_of_birth: selectedDate.toISOString().split("T")[0] });
                }
              }}
            />
          )}

          {!editing ? (
            <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
              <Text style={styles.buttonText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    width: "100%",
    height: "32%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "400",
    color: "#fff",
  },
  formContainer: {
    width: "100%",
    marginTop: 20,
    padding: 20,
    backgroundColor: "#6D00B3",
    borderRadius: 10,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
    borderColor: "#4CAF50",
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 40,
    overflow: "hidden",
  },
  input: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 12,
    color: "#000",
  },
  disabledInput: {
    opacity: 0.7,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6D00B3",
    padding: 12,
    borderRadius: 10,
    width: "90%",
    marginBottom: 12,
  },
  dateText: {
    color: "#fff",
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#ffffff",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: "#6C00B1",
    fontWeight: "bold",
    fontSize: 16,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default ProfileScreen;


// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, Alert, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView,Platform 
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import * as SecureStore from "expo-secure-store";
// import DateTimePicker from "@react-native-community/datetimepicker";

// interface UserProfile {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   location: string;
//   date_of_birth: string;
//   profileImage?: string;
// }

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState<UserProfile | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [error, setError] = useState("");
  

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const storedUserData = await SecureStore.getItemAsync("userData");
//         if (storedUserData) {
//           const parsedData = JSON.parse(storedUserData);
//           setUserData(parsedData);
//           setUpdatedUser(parsedData);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleUpdateProfile = async () => {
//     try {
//       const response = await fetch(
//         `http://52.14.158.219:5000/api/auth/users/update/${userData?.email}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedUser),
//         }
//       );
//       const result = await response.json();
//       if (result.success) {
//         await SecureStore.setItemAsync("userData", JSON.stringify(updatedUser));
//         setUserData(updatedUser);
//         setEditing(false);
//         Alert.alert("Success", "Profile updated successfully!");
//       } else {
//         Alert.alert("Error", result.message);
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to update profile.");
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#6C00B1" style={styles.loader} />;
//   }

//   return (
//     // <ScrollView contentContainerStyle={styles.scrollView}>
//     //     <LinearGradient colors={["#6C00B1", "#52008B"]} style={styles.header}>
//     //     <View style={styles.imageContainer}>
//     //       <Image 
//     //         source={{ uri: userData?.profileImage || "https://via.placeholder.com/150" }} 
//     //         style={styles.profileImage} 
//     //       />
//     //       <TouchableOpacity style={styles.cameraIcon}>
//     //         <Ionicons name="camera" size={24} color="white" />
//     //       </TouchableOpacity>

//     //     </View>
//     //       </LinearGradient>
//     // <View style={styles.formContainer}>
//     <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
//       <ScrollView contentContainerStyle={styles.container}>
//         <LinearGradient colors={["#6D00B3", "#6C00B1"]} style={styles.header}>
           
//           <View style={styles.imageContainer}>
//           <Image source={require("../../assets/images/logo.jpeg")} style={styles.logo} />
//           </View>
//           <Text style={styles.headerText}>Create Your Account</Text>
//         </LinearGradient>

//         <View style={styles.formContainer}>
//           {error ? <Text style={styles.errorText}>{error}</Text> : null}
//         <TextInput 
//           style={styles.input} 
//           value={updatedUser?.first_name}
//           onChangeText={(text) => setUpdatedUser({ ...updatedUser!, first_name: text })}
//           editable={editing}
//           placeholder="First Name"
//         />
//         <TextInput 
//           style={styles.input} 
//           value={updatedUser?.last_name}
//           onChangeText={(text) => setUpdatedUser({ ...updatedUser!, last_name: text })}
//           editable={editing}
//           placeholder="Last Name"
//         />
//         <TextInput 
//           style={[styles.input, styles.disabledInput]} 
//           value={updatedUser?.email}
//           editable={false} 
//           placeholder="Email"
//         />
//         <TextInput 
//           style={styles.input} 
//           value={updatedUser?.phone_number}
//           onChangeText={(text) => setUpdatedUser({ ...updatedUser!, phone_number: text })}
//           editable={editing}
//           placeholder="Phone Number"
//         />
//         <TextInput 
//           style={styles.input} 
//           value={updatedUser?.location}
//           onChangeText={(text) => setUpdatedUser({ ...updatedUser!, location: text })}
//           editable={editing}
//           placeholder="Location"
//         />

//         <TouchableOpacity 
//           style={styles.datePicker} 
//           onPress={() => setShowDatePicker(true)}
//           disabled={!editing}
//         >
//           <Ionicons name="calendar" size={20} color="#fff" />
//           <Text style={styles.dateText}>{updatedUser?.date_of_birth || "Select Date of Birth"}</Text>
//         </TouchableOpacity>
        
//         {showDatePicker && (
//           <DateTimePicker
//             value={new Date(updatedUser?.date_of_birth || Date.now())}
//             mode="date"
//             display={Platform.OS === "ios" ? "spinner" : "default"}
//             onChange={(event, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) {
//                 setUpdatedUser({ ...updatedUser!, date_of_birth: selectedDate.toISOString().split("T")[0] });
//               }
//             }}
//           />
//         )}

//         {!editing ? (
//           <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
//             <Text style={styles.buttonText}>Edit Profile</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={styles.button}>
//             <Text style={styles.buttonText}>Save Changes</Text>
//           </TouchableOpacity>
//         )}
//      </View>
//       </ScrollView>
//       </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#f5f5f5",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//   },
//   header: {
//     width: "100%",
//     height: "32%",
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: "400",
//     color: "#fff",
//   },
//   headerTextBold: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   formContainer: {
//     width: "100%",
//         marginTop: 20,
//         padding: 20,
//         backgroundColor: "#6D00B3",
//         borderRadius: 10,
//         shadowColor: "#FFFFFF",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 5,
//   },
//   scrollView: {
//     alignItems: "center",
//     paddingVertical: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 20,
//   },
//   logo: { 
//     width: 80,
//     height: 80,
//     resizeMode: "contain",
//     marginBottom: 10,
//     borderColor: "#4CAF50",
//     backgroundColor:"#FFFFFF",
//     borderWidth: 2, // Adds a visible border
//     borderRadius: 40, // Half of width & height for a perfect circle
//     overflow: "hidden", // Ensures the image stays within the rounded shape
//   },
//   profileImage: {
//     width: 130,
//     height: 130,
//     borderRadius: 65,
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   cameraIcon: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     backgroundColor: "#6C00B1",
//     padding: 8,
//     borderRadius: 15,
//   },
//   input: {
//     width: "90%",
//     height: 50,
//     backgroundColor: "#f2f0fo",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     marginBottom: 12,
//     color: "#fff",
//   },
//   disabledInput: {
//     opacity: 0.7,
//   },
//   datePicker: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#6D00B3",
//     padding: 12,
//     borderRadius: 10,
//     width: "90%",
//     marginBottom: 12,
//   },
//   dateText: {
//     color: "#fff",
//     marginLeft: 10,
//   },
//   button: {
//     backgroundColor: "#ffffff",
//     paddingVertical: 14,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//     marginTop: 15,
//   },
//   buttonText: {
//     color: "#6C00B1",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   loader: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   errorText: {
//     color: "red",
//     fontSize: 14,
//     textAlign: "center",
//     marginBottom: 10,
//   },
// });

// export default ProfileScreen;




// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator, Platform 
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import * as SecureStore from "expo-secure-store";

// interface UserProfile {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   location: string;
//   date_of_birth: string;
//   profileImage?: string;
// }

// const ProfileScreen = () => {
//   const [userData, setUserData] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState<UserProfile | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const storedUserData = await SecureStore.getItemAsync("userData");
//         if (storedUserData) {
//           const parsedData = JSON.parse(storedUserData);
//           setUserData(parsedData);
//           setUpdatedUser(parsedData);
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleUpdateProfile = async () => {
//     if (!updatedUser) return;
//     try {
//       const response = await fetch(`http://52.14.158.219:5000/api/auth/users/update/${userData?.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedUser),
//       });
//       const result = await response.json();
//       if (result.success) {
//         await SecureStore.setItemAsync("userData", JSON.stringify(updatedUser));
//         setUserData(updatedUser);
//         setEditing(false);
//       } else {
//         console.error("Error updating profile:", result.message);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#6C00B1" style={{ flex: 1, justifyContent: "center" }} />;
//   }

//   return (
//     <LinearGradient colors={["#6C00B1", "#6D00B3"]} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: userData?.profileImage || "https://via.placeholder.com/150" }} style={styles.profileImage} />
//         </View>

//         <TextInput style={styles.input} value={updatedUser?.first_name} onChangeText={(text) => setUpdatedUser({ ...updatedUser!, first_name: text })} editable={editing} placeholder="First Name" />
//         <TextInput style={styles.input} value={updatedUser?.last_name} onChangeText={(text) => setUpdatedUser({ ...updatedUser!, last_name: text })} editable={editing} placeholder="Last Name" />
//         <TextInput style={[styles.input, styles.disabledInput]} value={updatedUser?.email} editable={false} placeholder="Email" />
//         <TextInput style={styles.input} value={updatedUser?.phone_number} onChangeText={(text) => setUpdatedUser({ ...updatedUser!, phone_number: text })} editable={editing} placeholder="Phone Number" />
//         <TextInput style={styles.input} value={updatedUser?.location} onChangeText={(text) => setUpdatedUser({ ...updatedUser!, location: text })} editable={editing} placeholder="Location" />

//         <TouchableOpacity style={styles.datePicker} onPress={() => setShowDatePicker(true)} disabled={!editing}>
//           <Ionicons name="calendar" size={20} color="#fff" />
//           <Text style={styles.dateText}>{updatedUser?.date_of_birth || "Select Date of Birth"}</Text>
//         </TouchableOpacity>

//         {showDatePicker && (
//           <DateTimePicker
//             value={new Date(updatedUser?.date_of_birth || Date.now())}
//             mode="date"
//             display={Platform.OS === "ios" ? "spinner" : "default"}
//             onChange={(event, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) {
//                 setUpdatedUser({ ...updatedUser!, date_of_birth: selectedDate.toISOString().split("T")[0] });
//               }
//             }}
//           />
//         )}

//         {!editing ? (
//           <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
//             <Text style={styles.buttonText}>Edit Profile</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
//             <Text style={styles.buttonText}>Save Changes</Text>
//           </TouchableOpacity>
//         )}
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollView: { alignItems: "center", paddingVertical: 20 },
//   imageContainer: { marginBottom: 20 },
//   profileImage: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: "#fff" },
//   input: { width: "90%", height: 50, backgroundColor: "#ffffff30", borderRadius: 8, paddingHorizontal: 15, marginBottom: 10, color: "#fff" },
//   disabledInput: { opacity: 0.6 },
//   datePicker: { flexDirection: "row", alignItems: "center", backgroundColor: "#6D00B3", padding: 10, borderRadius: 8, width: "90%", marginBottom: 10 },
//   dateText: { color: "#fff", marginLeft: 10 },
//   button: { backgroundColor: "#ffffff", paddingVertical: 12, paddingHorizontal: 25, borderRadius: 8, marginTop: 10 },
//   buttonText: { color: "#6C00B1", fontWeight: "bold" },
// });

// export default ProfileScreen;


// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator, Alert, Platform 
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useAuth } from "../../context/AuthContext";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Ionicons } from "@expo/vector-icons";
// import * as SecureStore from "expo-secure-store";
// import axios from "axios";

// interface UserProfile {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   location: string;
//   date_of_birth: string;
//   profileImage?: string;
// }

// const ProfileScreen = () => {
//   const { authState, getUserProfile } = useAuth();
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [updatedUser, setUpdatedUser] = useState<UserProfile | null>(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);
// console.log('====================================');
// console.log("authState", authState);
// console.log('====================================');
//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (authState?.user_id) {
//         const userData = await getUserProfile?.(authState.user_id);
//         console.log('====================================');
//         console.log("profile user data", userData);
//         console.log('====================================');
//         setUser(userData);
//         setUpdatedUser(userData);
//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, [authState?.user_id]);

//   const handleUpdateProfile = async () => {
//     try {
//       if (!authState?.user_id || !updatedUser) return;

//       const { data } = await axios.put(
//         `http://52.14.158.219:5000/api/auth/users/update/${authState.user_id}`,
//         updatedUser
//       );

//       setUser(data);
//       setEditing(false);

//       // Update SecureStore
//       const storedData = await SecureStore.getItemAsync('my-token');
//       const authData = storedData ? JSON.parse(storedData) : {};
//       const updatedAuthData = { ...authData, user: data };

//       await SecureStore.setItemAsync('my-token', JSON.stringify(updatedAuthData));

//       Alert.alert("Success", "Profile updated successfully!");
//     } catch (error) {
//       console.error("Update Profile Error:", error);
//       Alert.alert("Error", "Failed to update profile. Try again.");
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#6C00B1" style={{ flex: 1, justifyContent: "center" }} />;
//   }

//   return (
//     <LinearGradient colors={["#6C00B1", "#6D00B3"]} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollView}>
//         {/* Profile Image */}
//         <View style={styles.imageContainer}>
//           <Image 
//             source={{ uri: user?.profileImage || "https://via.placeholder.com/150" }} 
//             style={styles.profileImage} 
//           />
//           <TouchableOpacity style={styles.cameraIcon}>
//             <Ionicons name="camera" size={24} color="white" />
//           </TouchableOpacity>
//         </View>

//         {/* User Details */}
//         <TextInput 
//           style={styles.input} 
//           value={updatedUser?.first_name}
//           onChangeText={(text) => setUpdatedUser({ ...updatedUser!, first_name: text })}
//           editable={editing}
//           placeholder="First Name"
//           placeholderTextColor="#ddd"
//         />
//         <TextInput 
//           style={styles.input} 
//           value={updatedUser?.last_name}
//           onChangeText={(text) => setUpdatedUser({ ...updatedUser!, last_name: text })}
//           editable={editing}
//           placeholder="Last Name"
//           placeholderTextColor="#ddd"
//         />
//         <TextInput 
//           style={[styles.input, styles.disabledInput]} 
//           value={updatedUser?.email}
//           editable={false} 
//           placeholder="Email"
//         />
//         <TextInput 
//           style={styles.input} 
//           value={updatedUser?.phone_number}
//           onChangeText={(text) => setUpdatedUser({ ...updatedUser!, phone_number: text })}
//           editable={editing}
//           placeholder="Phone Number"
//           placeholderTextColor="#ddd"
//         />
//         <TextInput 
//           style={styles.input} 
//           value={updatedUser?.location}
//           onChangeText={(text) => setUpdatedUser({ ...updatedUser!, location: text })}
//           editable={editing}
//           placeholder="Location"
//           placeholderTextColor="#ddd"
//         />

//         {/* Date of Birth */}
//         <TouchableOpacity 
//           style={styles.datePicker} 
//           onPress={() => setShowDatePicker(true)}
//           disabled={!editing}
//         >
//           <Ionicons name="calendar" size={20} color="#fff" />
//           <Text style={styles.dateText}>{updatedUser?.date_of_birth || "Select Date of Birth"}</Text>
//         </TouchableOpacity>
        
//         {showDatePicker && (
//           <DateTimePicker
//             value={new Date(updatedUser?.date_of_birth || Date.now())}
//             mode="date"
//             display={Platform.OS === "ios" ? "spinner" : "default"}
//             onChange={(event, selectedDate) => {
//               setShowDatePicker(false);
//               if (selectedDate) {
//                 setUpdatedUser({ ...updatedUser!, date_of_birth: selectedDate.toISOString().split("T")[0] });
//               }
//             }}
//           />
//         )}

//         {/* Buttons */}
//         {!editing ? (
//           <TouchableOpacity style={styles.button} onPress={() => setEditing(true)}>
//             <Text style={styles.buttonText}>Edit Profile</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
//             <Text style={styles.buttonText}>Save Changes</Text>
//           </TouchableOpacity>
//         )}
//       </ScrollView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   scrollView: {
//     alignItems: "center",
//     paddingVertical: 20,
//   },
//   imageContainer: {
//     position: "relative",
//     marginBottom: 20,
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     borderWidth: 3,
//     borderColor: "#fff",
//   },
//   cameraIcon: {
//     position: "absolute",
//     bottom: 0,
//     right: 0,
//     backgroundColor: "#6C00B1",
//     padding: 6,
//     borderRadius: 15,
//   },
//   input: {
//     width: "90%",
//     height: 50,
//     backgroundColor: "#ffffff30",
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     marginBottom: 10,
//     color: "#fff",
//   },
//   disabledInput: {
//     opacity: 0.6,
//   },
//   datePicker: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#6D00B3",
//     padding: 10,
//     borderRadius: 8,
//     width: "90%",
//     marginBottom: 10,
//   },
//   dateText: {
//     color: "#fff",
//     marginLeft: 10,
//   },
//   button: {
//     backgroundColor: "#ffffff",
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   buttonText: {
//     color: "#6C00B1",
//     fontWeight: "bold",
//   },
// });

// export default ProfileScreen;

// import React, { useState, useEffect } from "react";
// import { 
//   View, Text, Image, TouchableOpacity, StyleSheet, TextInput, ScrollView, ActivityIndicator, Alert, Platform 
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useAuth } from "../../context/AuthContext";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { Ionicons } from "@expo/vector-icons";
// import * as SecureStore from "expo-secure-store";
// import axios from "axios";

// interface UserProfile {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   location: string;
//   date_of_birth: string;
//   profileImage?: string;
// }

// const ProfileScreen = () => {
//   const { authState } = useAuth();
//   console.log("Stored Data:", authState);

//   const [formData, setFormData] = useState<UserProfile>({
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//     location: "",
//     date_of_birth: "",
//     profileImage: "",
//   });
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         if (!authState?.user_id) return; // Ensure authState exists before accessing user_id

//         setLoading(true);
//         console.log("Fetching user profile...");
//         const storedData = await SecureStore.getItemAsync("my-token");
//         if (storedData) {
//           const parsedData = JSON.parse(storedData);
//           console.log("Stored Data:", parsedData);
//           console.log("Auth Data:", authState?.user_id);
//           const { token, user_id } = parsedData;
//           if (token && user_id) {
//             const response = await axios.get(
//               `http://52.14.158.219:5000/api/auth/users/view/${authState?.user_id}`,
//               { headers: { Authorization: `Bearer ${token}` } }
//             );
//             console.log("User Profile Data:", response.data);
//             setFormData(response.data);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         Alert.alert("Error", "Failed to fetch profile details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUserProfile();
//   }, []);

//   const handleInputChange = (key: keyof UserProfile, value: string) => {
//     console.log(`Updating ${key}:`, value);
//     setFormData((prevState) => ({ ...prevState, [key]: value }));
//   };

//   const saveProfile = async () => {
//     try {
//       setLoading(true);
//       console.log("Saving profile with data:", formData);
//       const storedData = await SecureStore.getItemAsync("my-token");
//       if (storedData) {
//         const { token, user_id } = JSON.parse(storedData);
//         await axios.put(
//           `http://52.14.158.219:5000/api/auth/users/update/${authState?.user_id}`,
//           formData,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         console.log("Profile updated successfully");
//         Alert.alert("Success", "Profile updated successfully");
//         setEditing(false);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       Alert.alert("Error", "Failed to update profile");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <ActivityIndicator size="large" color="#8E00FF" />;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <LinearGradient colors={["#8E00FF", "#0055A4"]} style={styles.header}>
//         <Image
//           source={{ uri: formData.profileImage || "https://via.placeholder.com/100" }}
//           style={styles.profileImage}
//         />
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
//           <ProfileField label="Date of Birth" value={formData.date_of_birth || "Not set"} editable={false} />
//         </TouchableOpacity>
//       </View>

//       {showDatePicker && (
//         <DateTimePicker
//           value={formData.date_of_birth ? new Date(formData.date_of_birth) : new Date()}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowDatePicker(false);
//             if (selectedDate) handleInputChange("date_of_birth", selectedDate.toISOString().split("T")[0]);
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

// const ProfileField: React.FC<ProfileFieldProps> = ({ label, value, editable, onChangeText }) => (
//   <View style={styles.fieldContainer}>
//     <Text style={styles.label}>{label}</Text>
//     {editable ? (
//       <TextInput value={value} onChangeText={onChangeText} style={styles.input} />
//     ) : (
//       <Text selectable style={styles.text}>{value}</Text>
//     )}
//   </View>
// );
// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   header: { alignItems: "center", padding: 30, borderRadius: 10 },
//   profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#fff" },
//   userName: { fontSize: 22, color: "#fff", marginTop: 10 },
//   editButton: { position: "absolute", right: 20, top: 20 },
//   detailsContainer: { marginTop: 20 },
//   fieldContainer: { marginBottom: 15 },
//   label: { fontSize: 14, color: "#888" },
//   text: { fontSize: 16, color: "#fff" },
//   input: { borderBottomWidth: 1, fontSize: 16, color: "#fff" },
//   saveButton: { backgroundColor: "#0055A4", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 20 },
//   saveButtonText: { color: "#fff", fontWeight: "bold" },
// });

// export default ProfileScreen;

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

// // Define the expected structure of user data
// interface UserProfile {
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone_number: string;
//   location: string;
//   date_of_birth: string;
//   profileImage?: string;
// }

// const ProfileScreen = () => {
//   const router = useRouter();
//   const { authState } = useAuth();
//   const [user, setUser] = useState<UserProfile | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [editing, setEditing] = useState(false);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         if (!authState?.user_id) return;

//         setLoading(true);

//         // Check if profile is already cached
//         const storedUserProfile = await SecureStore.getItemAsync("userProfile");
//         if (storedUserProfile) {
//           setUser(JSON.parse(storedUserProfile));
//         } else {
//           // Fetch from API
//           const response = await fetch(`http://52.14.158.219:5000/api/auth/users/view/${authState.user_id}`);
//           if (!response.ok) throw new Error("Failed to fetch profile");

//           const data: UserProfile = await response.json();
//           setUser(data);
//           await SecureStore.setItemAsync("userProfile", JSON.stringify(data));
//         }
//       } catch (error) {
//         console.error("Failed to fetch user profile:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, [authState?.user_id]);

//   const [formData, setFormData] = useState<UserProfile>({
//     first_name: "Sir Bola",
//     last_name: "Ayo",
//     email: "ayo@gmail.com",
//     phone_number: "123-456-7890",
//     location: "New York, USA",
//     date_of_birth: "1990-01-01",
//     profileImage: "",
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
//         profileImage: user.profileImage || "https://via.placeholder.com/150",
//       });
//     }
//   }, [user]);

//   const handleInputChange = (field: keyof UserProfile, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//   };

//   const saveProfile = async () => {
//     try {
//       if (!authState?.user_id) return;

//       const response = await fetch(`http://52.14.158.219:5000/api/auth/users/update/${authState.user_id}`, {
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
//     return <Text>Loading authentication...</Text>;
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
//         <Image source={{ uri: formData.profileImage }} style={styles.profileImage} />
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
//   <View style={styles.fieldContainer}>
//     <Text style={styles.label}>{label}</Text>
//     {editable ? (
//       <TextInput
//         value={value}
//         onChangeText={onChangeText}
//         style={styles.input}
//       />
//     ) : (
//       <Text style={styles.text}>{value}</Text>
//     )}
//   </View>
// );

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   header: { alignItems: "center", padding: 30, borderRadius: 10 },
//   profileImage: { width: 100, height: 100, borderRadius: 50, borderWidth: 2, borderColor: "#fff" },
//   userName: { fontSize: 22, color: "#fff" },
//   editButton: { position: "absolute", right: 20, top: 20 },
//   detailsContainer: { marginTop: 20 },
//   fieldContainer: { marginBottom: 15 },
//   label: { fontSize: 14, color: "#888" },
//   text: { fontSize: 16, color: "#fff" },
//   input: { borderBottomWidth: 1, fontSize: 16, color: "#fff" },
//   saveButton: { backgroundColor: "#0055A4", padding: 10, borderRadius: 5, alignItems: "center", marginTop: 20 },
//   saveButtonText: { color: "#fff", fontWeight: "bold" },
// });

// export default ProfileScreen;


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
//           const response = await fetch(`http://52.14.158.219:5000/api/auth/users/view/${authState.user_id}`);
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

//       const response = await fetch(`http://52.14.158.219:5000/api/auth/users/update/${authState.user_id}`, {
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
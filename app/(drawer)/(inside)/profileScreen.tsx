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
        `http://172.20.80.1:5000/api/auth/users/update/${userData.id}`, // Use user ID instead of email
        // `http://52.14.158.219:5000/api/auth/users/update/${userData.id}`, // Use user ID instead of email
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
            <Image source={require("../../../assets/images/logo.jpeg")} style={styles.logo} />
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

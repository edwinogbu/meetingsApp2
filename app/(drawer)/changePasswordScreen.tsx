import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const { width } = Dimensions.get("window");

const changePasswordScreen = () => {
  const router = useRouter();
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError("All fields are required!");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match!");
      return;
    }
    
    setLoading(true);
    setError("");
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const { data } = await axios.post(
        "http://52.14.158.219:5000/api/auth/change-password",
        { oldPassword: form.oldPassword, newPassword: form.newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (!data.success) {
        setError(data.message || "Password change failed!");
        return;
      }
      router.replace("/(inside)/index");
    } catch (err) {
      setError("An error occurred. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#6D00B3", "#6C00B1"]} style={styles.header}>
        <Text style={styles.headerText}>Change Password</Text>
      </LinearGradient>
      <View style={styles.formContainer}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Old Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={form.oldPassword}
          onChangeText={(text) => setForm({ ...form, oldPassword: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={form.newPassword}
          onChangeText={(text) => setForm({ ...form, newPassword: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword}
          value={form.confirmPassword}
          onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Change Password</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  formContainer: { flex: 1, alignItems: "center", paddingTop: 30 },
  input: {
    width: width * 0.85,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  button: {
    width: width * 0.85,
    height: 50,
    backgroundColor: "#6C00B1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "red", fontSize: 14, marginBottom: 10 },
});

export default changePasswordScreen;

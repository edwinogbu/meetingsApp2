import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const ResetPasswordScreen = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://52.14.158.219:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });
      const result = await response.json();
      
      if (response.ok && result.success) {
        Alert.alert("Success", "Password reset successful.");
        router.replace("/login");
      } else {
        Alert.alert("Error", result.msg || "Failed to reset password.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#6D00B3", "#6C00B1"]} style={styles.header}>
        <Text style={styles.headerText}>Reset Password</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <TextInput style={[styles.input, styles.disabledInput]} value={email} editable={false} />
        <TextInput style={styles.input} placeholder="Enter OTP" onChangeText={setOtp} keyboardType="numeric" />
        <TextInput style={styles.input} placeholder="New Password" onChangeText={setNewPassword} secureTextEntry />
        <TextInput style={styles.input} placeholder="Confirm Password" onChangeText={setConfirmPassword} secureTextEntry />

        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    width: "100%",
    height: 150,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: { fontSize: 24, fontWeight: "bold", color: "#ffffff" },
  formContainer: { flex: 1, alignItems: "center", paddingTop: 30 },
  input: {
    width: width * 0.85,
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 12,
    textAlign: "center",
  },
  disabledInput: { backgroundColor: "#e6e6e6", color: "#999" },
  button: {
    width: width * 0.85,
    height: 50,
    backgroundColor: "#6D00B3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ResetPasswordScreen;

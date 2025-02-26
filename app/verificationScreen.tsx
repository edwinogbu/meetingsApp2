import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const VerificationScreen = () => {
  const router = useRouter();
  const { email: passedEmail } = useLocalSearchParams<{ email?: string }>();

  const [email] = useState(passedEmail || ""); 
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleInputChange = (text: string, index: number) => {
    if (text.length > 1) text = text.charAt(0);
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      Alert.alert("Invalid OTP", "Please enter the full 6-digit code.");
      return;
    }

    try {
      const response = await fetch("http://52.14.158.219:5000/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        Alert.alert("Success", "Your email has been verified!");
        router.replace("/(inside)/index");
      } else {
        Alert.alert("Verification Failed", result.msg || "Invalid OTP.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient colors={["#6D00B3", "#6C00B1"]} style={styles.header}>
        <Image
          source={require("../assets/images/logo.jpeg")}
          style={styles.logo}
        />
      </LinearGradient>

      <View style={styles.formContainer}>
        <Text style={styles.verificationTitle}>Verification</Text>
        <Text style={styles.subText}>
          Enter the 6-digit verification code sent to your email
        </Text>

        <TextInput
          style={styles.emailInput}
          value={email}
          editable={false}
          placeholder="Email"
        />

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              style={styles.inputBox}
              placeholder="-"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              maxLength={1}
              textAlign="center"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
          <Text style={styles.verifyButtonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    width: "100%",
    height: 150,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 25,
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  verificationTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6C00B1",
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
    width: width * 0.9,
  },
  emailInput: {
    width: width * 0.85,
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    color: "#666",
    marginBottom: 10,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  inputBox: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: "#ccc",
    marginHorizontal: 5,
  },
  verifyButton: {
    width: width * 0.85,
    height: 50,
    backgroundColor: "#6D00B3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  verifyButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default VerificationScreen;


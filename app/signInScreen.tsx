import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const { width } = Dimensions.get("window");

const SignInScreen = () => {
  const router = useRouter();
  const { onLogin } = useAuth(); // Get login function from AuthContext
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);



const handleLogin = async () => {
  if (!onLogin) {
    console.error("Auth context not initialized");
    setError("Authentication service is unavailable.");
    return;
  }

  if (!form.email || !form.password) {
    setError("All fields are required!");
    return;
  }

  setLoading(true);
  setError("");

  try {
    await onLogin?.(form.email, form.password);  // Added optional chaining
    router.replace("/(drawer)/(inside)/");
  } catch (err) {
    console.error("Login error:", err);
    setError(err.message || "Login failed.");
  } finally {
    setLoading(false);
  }
};


  // const handleLogin = async () => {
  //   if (!form.email || !form.password) {
  //     setError("All fields are required!");
  //     console.error("Validation Error: Missing fields.");
  //     return;
  //   }

  //   setLoading(true);
  //   setError("");

  //   try {
  //     const { data } = await axios.post(
  //       "http://172.20.80.1:5000/api/auth/login",
  //       // "http://172.18.240.1:5000/api/auth/login",
  //       // "http://52.14.158.219:5000/api/auth/login",
  //       { email: form.email, password: form.password },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //       }
  //     );

  //     console.log("Server Response:", data);

  //     if (!data.success) {
  //       setError(data.message || "Login failed!");
  //       return;
  //     }

  //     await SecureStore.setItemAsync("userToken", String(data.token));
  //     await SecureStore.setItemAsync("userData", JSON.stringify(data.user));

  //     console.log("User logged in successfully:", data.user);
  //     // router.replace("/(drawer)/(inside)/index");

  //     console.log("Redirecting to:", "/(drawer)/(inside)/index");
  //     router.replace("/(drawer)/(inside)/");


  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       console.error("Axios Error:", err.response?.data || err.message);
  //       setError(err.response?.data?.message || "Login failed due to a server error.");
  //     } else if (err instanceof Error) {
  //       console.error("Error:", err.message);
  //       setError(err.message || "Something went wrong. Try again!");
  //     } else {
  //       console.error("Unknown Error:", err);
  //       setError("An unexpected error occurred.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#6D00B3", "#6C00B1"]} style={styles.header}>
        <View style={{backgroundColor:"#FFFFFF", borderRadius:40}}>
          <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Welcome Back to</Text>
        <Text style={styles.headerTextBold}>BornwithWealth</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <Text style={styles.signinTitle}>Sign In</Text>
        <Text style={styles.subText}>Enter your credentials to continue</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#888"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => setForm({ ...form, email: text })}
        />
        
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons
              name={showPassword ? "visibility" : "visibility-off"}
              size={24}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.signinButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signinButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.signupText}>
          Don't have an account?
          <Text
            style={styles.signupLink}
            onPress={() => router.replace("/signUpScreen")}
          >
            {" "} Signup
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
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
  headerTextBold: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  formContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: 30,
  },
  signinTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6C00B1",
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: "#676",
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
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
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: width * 0.85,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  signinButton: {
    width: width * 0.85,
    height: 50,
    backgroundColor: "#6C00B1",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  signinButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 15,
    fontSize: 14,
    color: "#666",
  },
  signupLink: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginBottom: 10,
    backgroundColor:"#FFFFFF"
  },
});

export default SignInScreen;


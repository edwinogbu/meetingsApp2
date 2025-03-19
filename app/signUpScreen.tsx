import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


const signUpScreen = () => {
  const router = useRouter();
  const { onRegister } = useAuth();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    password: "",
    location: "",
    date_of_birth: new Date(),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

    
    // const handleSignUp = async () => {
    //   // ✅ Validate input fields
    //   if (!form.first_name || !form.last_name || !form.email || !form.phone_number || !form.password || !form.location || !form.date_of_birth) {
    //     setError("All fields are required!");
    //     console.error("Validation Error: Missing fields.");
    //     return;
    //   }
    
    //   setLoading(true);
    //   setError("");
    
    //   try {
    //     // ✅ Send sign-up request
    //     const { data } = await axios.post(
    //       "http://172.18.240.1:5000/api/auth/register",
    //       // "http://52.14.158.219:5000/api/auth/register",
    //       {
    //         first_name: form.first_name,
    //         last_name: form.last_name,
    //         email: form.email,
    //         phone_number: form.phone_number,
    //         password: form.password,
    //         location: form.location,
    //         date_of_birth: form.date_of_birth.toISOString().split("T")[0], // Convert Date to YYYY-MM-DD
    //       },
    //       {
    //         headers: {
    //           "Content-Type": "application/json",
    //           Accept: "application/json",
    //         },
    //       }
    //     );
    
    //     console.log("Server Response:", data);
    
    //     // ✅ Handle API response
    //     if (!data.success) {
    //       setError(data.message || "Registration failed!");
    //       return;
    //     }
    
    //     // ✅ Securely store user data & token
    //     await SecureStore.setItemAsync("userToken", String(data.token));
    //     await SecureStore.setItemAsync("userData", JSON.stringify(data.user));
    
    //     console.log("User registered and stored successfully:", data.user);
    
    //     // ✅ Navigate to verification screen
    //     router.replace({ pathname: "/verificationScreen", params: { email: form.email } });
    
    //   } catch (err) {
    //     // ✅ Handle different types of errors properly
    //     if (axios.isAxiosError(err)) {
    //       console.error("Axios Error:", err.response?.data || err.message);
    //       setError(err.response?.data?.message || "Registration failed due to a server error.");
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
    

    const handleSignUp = async () => {
      if (!onRegister) {
        console.error("Auth context not initialized");
        setError("Authentication service is unavailable.");
        return;
      }
    
      if (!form.first_name || !form.last_name || !form.email || !form.phone_number || !form.password || !form.location || !form.date_of_birth) {
        setError("All fields are required!");
        console.error("Validation Error: Missing fields.");
        return;
      }
    
      setLoading(true);
      setError("");
    
      try {
        // ✅ Convert date_of_birth to YYYY-MM-DD format
        const formattedDOB = form.date_of_birth.toISOString().split("T")[0];
    
        await onRegister?.(
          form.email,
          form.password,
          form.first_name,
          form.last_name,
          form.phone_number,
          form.location,
          formattedDOB // Pass formatted date
        );
    
        router.replace("/(drawer)/(inside)/");
      } catch (err) {
        console.error("Registration error:", err);
        setError(err.message || "Registration failed.");
      } finally {
        setLoading(false);
      }
    };
    
    
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient colors={["#6D00B3", "#6C00B1"]} style={styles.header}>
            
          <View style={styles.imageContainer}>
          <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} />


            <Text style={styles.companyName}>Ludo Consult</Text>
          </View>
          <Text style={styles.headerText}>Create Your Account</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TextInput style={styles.input} placeholder="First Name" value={form.first_name} onChangeText={(text) => setForm({ ...form, first_name: text })} />
          <TextInput style={styles.input} placeholder="Last Name" value={form.last_name} onChangeText={(text) => setForm({ ...form, last_name: text })} />
          <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={form.email} onChangeText={(text) => setForm({ ...form, email: text })} />
          <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={form.phone_number} onChangeText={(text) => setForm({ ...form, phone_number: text })} />
          
          <View style={styles.passwordContainer}>
            <TextInput style={[styles.input, { flex: 1 }]} placeholder="Password" secureTextEntry={!showPassword} value={form.password} onChangeText={(text) => setForm({ ...form, password: text })} />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
            </TouchableOpacity>
          </View>

          
        <View style={{flexDirection:'row', alignItems: "center",
            backgroundColor: "#f0f0f0",
            borderRadius: 8,
            paddingHorizontal: 10,  marginBottom: 15,   marginTop: 15,}}>
                <TextInput style={styles.input} placeholder="Enter:  country, state and city?" value={form.location} onChangeText={(text) => setForm({ ...form, location: text })} />
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={styles.dateText}>{form.date_of_birth.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
        <DateTimePicker
            value={form.date_of_birth}
            mode="date"
            display="default"
            onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setForm({ ...form, date_of_birth: date }); // Ensuring date updates correctly
            }}
        />
        )}


          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signupButtonText}>Sign Up</Text>}
          </TouchableOpacity>
          {/* Sign In Redirect */}
         <Text style={styles.signinText}>
           Already have an account?
           <Text
             style={styles.signinLink}
             onPress={() => router.replace("/signInScreen")}
           >
            {" "}Signin
          </Text>
         </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    iconContainer: { padding: 10 },
      container: {
        flexGrow: 1,
        backgroundColor: "#f5f5f5",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      },
      header: {
        width: "100%",
        paddingVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
      headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
      },
  
      imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor:"#FFFFFF",
      },
      logo: { 
        width: 80,
        height: 80,
        resizeMode: "contain",
        marginBottom: 10,
        borderColor: "#4CAF50",
        backgroundColor:"#FFFFFF",
        borderWidth: 2, // Adds a visible border
        borderRadius: 40, // Half of width & height for a perfect circle
        overflow: "hidden", // Ensures the image stays within the rounded shape
      },
      
      companyName: {
        fontSize: 22, 
        fontWeight: "700", 
        color: "#FFF", 
        textAlign: "center",
        marginBottom: 15,
        textTransform: "uppercase", 
        letterSpacing: 1.5, 
        lineHeight: 26, // Converted to a number
        paddingVertical: 8, // Instead of "8px"
        paddingHorizontal: 12, // Instead of "12px"
        backgroundColor: "rgba(255, 255, 255, 0.1)", 
        borderRadius: 6, 
        fontFamily: "Poppins-SemiBold", // Adjusted for React Native
        textShadowColor: "rgba(0, 0, 0, 0.5)", 
        textShadowOffset: { width: 2, height: 2 }, 
        textShadowRadius: 5, 
      },    
      formContainer: {
        width: "100%",
        marginTop: 20,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
      },
      input: {
        height: 50,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
      },
      passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingHorizontal: 10,
      },
      // iconContainer: {
      //   padding: 10,
      // },
      datePicker: {
        height: 50,
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
      },
      dateText: {
        color: "#555",
      },
      signupButton: {
        height: 50,
        backgroundColor: "#6C00B1",
        // backgroundColor: "#4CAF50",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginTop: 20,
      },
      signupButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
      },
      signinText: {
        marginTop: 25,
        fontSize: 14,
        color: "#666",
      },
      signinLink: {
        color: "#4CAF50",
        fontWeight: "bold",
      },
      errorText: {
        color: "red",
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
      },
    });
    
export default signUpScreen;


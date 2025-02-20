// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   ScrollView,
//   Alert,
//   Dimensions,
//   StyleSheet,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";
// import { useAuth } from "../context/AuthContext";
// import Toast from "react-native-toast-message";
// import Spinner from "react-native-loading-spinner-overlay";

// const { width } = Dimensions.get("window");

// const SignInScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { onLogin } = useAuth();
//   const router = useRouter();

//   // Sign In function
//   const onSignInPress = async () => {
//       if (!onLogin) {
//             Alert.alert("Error", "Login function is not available.");
//             return;
//         }
    
//     setLoading(true);
//     try {
//       await onLogin(email, password);

//       // Show success toast
//       Toast.show({
//         type: "success",
//         text1: "Login Successful!",
//         text2: "Welcome back to Ludo Consult Smart Meet.",
//       });

//       // Navigate to dashboard or home screen
//       router.replace("/dashboard");
//     } catch (e) {
//       Alert.alert("Error", "Invalid email or password. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       {/* Header with Curved Background */}
//       <LinearGradient colors={["#4CAF50", "#4CAF50"]} style={styles.header}>
//         <Text style={styles.headerText}>Welcome Back to</Text>
//         <Text style={styles.headerTextBold}>Ludo Consult Smart Meet</Text>
//       </LinearGradient>

//       {/* Sign In Form */}
//       <View style={styles.formContainer}>
//         <Text style={styles.signinTitle}>Sign In</Text>
//         <Text style={styles.subText}>Enter your credentials to continue</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           keyboardType="email-address"
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           value={password}
//           onChangeText={setPassword}
//         />

//         {/* Sign In Button */}
//         <TouchableOpacity style={styles.signinButton} onPress={onSignInPress} disabled={loading}>
//           <Text style={styles.signinButtonText}>{loading ? "Signing In..." : "Sign In"}</Text>
//         </TouchableOpacity>

//         {/* Navigate to Signup */}
//         <Text style={styles.signupText}>
//           Don't have an account?{" "}
//           <Text style={styles.signupLink} onPress={() => router.replace("/signup")}>
//             Sign Up
//           </Text>
//         </Text>
//       </View>

//       {/* Loading Spinner */}
//       <Spinner visible={loading} textContent="Signing in..." textStyle={{ color: "#fff" }} />

//       {/* Toast Message */}
//       <Toast />
//     </ScrollView>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     backgroundColor: "#ffffff",
//   },
//   header: {
//     width: "100%",
//     height: 150,
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 18,
//     color: "#fff",
//   },
//   headerTextBold: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   formContainer: {
//     flex: 1,
//     alignItems: "center",
//     paddingTop: 30,
//   },
//   signinTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#4CAF50",
//     marginBottom: 5,
//   },
//   subText: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 20,
//     textAlign: "center",
//     width: width * 0.9,
//   },
//   input: {
//     width: width * 0.85,
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 15,
//   },
//   signinButton: {
//     width: width * 0.85,
//     height: 50,
//     backgroundColor: "#4CAF50",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   signinButtonText: {
//     fontSize: 18,
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   signupText: {
//     marginTop: 20,
//     fontSize: 14,
//     color: "#666",
//   },
//   signupLink: {
//     color: "#4CAF50",
//     fontWeight: "bold",
//   },
// });

// export default SignInScreen;



// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
//   ActivityIndicator,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { LinearGradient } from "expo-linear-gradient";
// import { useAuth } from "../context/AuthContext"; // Import AuthContext

// const { width } = Dimensions.get("window");

// const signInScreen = () => {
//   const router = useRouter();
//   const { onLogin } = useAuth(); // Get login function from AuthContext
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     if (!form.email || !form.password) {
//       setError("Email and Password are required!");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await onLogin?.(form.email, form.password);
//       if (response?.error) {
//         setError(response.msg || "Invalid credentials!");
//       } else {
//         router.replace("/(inside)/index");
//       }
//     } catch (err) {
//       setError("Something went wrong. Try again!");
//     }

//     setLoading(false);
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header with Curved Background */}
//       <LinearGradient colors={["#4CAF50", "#4CAF50"]} style={styles.header}>
//         <Text style={styles.headerText}>Welcome Back to</Text>
//         <Text style={styles.headerTextBold}>Ludo Consult Smart Meet</Text>
//       </LinearGradient>

//       {/* Sign In Form */}
//       <View style={styles.formContainer}>
//         <Text style={styles.signinTitle}>Sign In</Text>
//         <Text style={styles.subText}>Enter your credentials to continue</Text>

//         {error ? <Text style={styles.errorText}>{error}</Text> : null}

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="#888"
//           keyboardType="email-address"
//           value={form.email}
//           onChangeText={(text) => setForm({ ...form, email: text })}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="#888"
//           secureTextEntry
//           value={form.password}
//           onChangeText={(text) => setForm({ ...form, password: text })}
//         />

//         {/* Sign In Button */}
//         <TouchableOpacity style={styles.signinButton} onPress={handleLogin} disabled={loading}>
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.signinButtonText}>Sign In</Text>
//           )}
//         </TouchableOpacity>

//         {/* Signup Redirect */}
//         <Text style={styles.signupText}>
//           Don't have an account?
//           <Text
//             style={styles.signupLink}
//             onPress={() => router.replace("/signUpScreen")}
//           >
//             {" "} Signup
//           </Text>
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
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
//     flex: 1,
//     alignItems: "center",
//     paddingTop: 30,
//   },
//   signinTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#4CAF50",
//     marginBottom: 5,
//   },
//   subText: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 20,
//   },
//   errorText: {
//     color: "red",
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   input: {
//     width: width * 0.85,
//     height: 50,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     marginBottom: 15,
//   },
//   signinButton: {
//     width: width * 0.85,
//     height: 50,
//     backgroundColor: "#4CAF50",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 10,
//   },
//   signinButtonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   signupText: {
//     marginTop: 15,
//     fontSize: 14,
//     color: "#666",
//   },
//   signupLink: {
//     color: "#4CAF50",
//     fontWeight: "bold",
//   },
// });

// export default signInScreen;





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
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const signInScreen = () => {
  const router = useRouter();
  const { onLogin } = useAuth(); // Get login function from AuthContext
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      setError("Email and Password are required!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await onLogin?.(form.email, form.password);
      if (response?.error) {
        setError(response.msg || "Invalid credentials!");
      } else {
        router.replace("/(inside)/index");
      }
    } catch (err) {
      setError("Something went wrong. Try again!");
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Header with Curved Background */}
      <LinearGradient colors={["#6D00B3", "#6C00B1"]} style={styles.header}>
        <View style={{backgroundColor:"#FFFFFF", borderRadius:40,}}>
          <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} />
        </View>
        <Text style={styles.headerText}>Welcome Back to</Text>
        <Text style={styles.headerTextBold}>BornwithWealth</Text>
      </LinearGradient>

      {/* Sign In Form */}
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

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signinButton} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.signinButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        {/* Signup Redirect */}
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
    color: "#666",
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

export default signInScreen;


// import { View, Text, Button } from 'react-native';
// import { useRouter } from 'expo-router';

// export default function signInScreen() {
//   const router = useRouter();

//   return (
//     <View>
//       <Text>Sign In</Text>
//       <Button title="Verify Account" onPress={() => router.push('/VerificationScreen')} />
//     </View>
//   );
// }

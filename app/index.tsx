// import React, { ReactNode } from "react";

// import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
// import Onboarding from "react-native-onboarding-swiper";
// import { LinearGradient } from "expo-linear-gradient";
// import { useRouter } from "expo-router";

// const { width, height } = Dimensions.get("window");

// const onboardingScreen = () => {
//   const router = useRouter();

//   return (
//     <Onboarding
//       onSkip={() => router.replace("./signInScreen")}
//       onDone={() => router.replace("./signInScreen")}
//       containerStyles={{ backgroundColor: "#FFF" }}
//       titleStyles={styles.title}
//       subTitleStyles={styles.subtitle}
//       bottomBarColor="transparent"
//       pages={[
//         {
//           // backgroundColor: "#FFFFFF",
//           backgroundColor: "#6D00B3",

//           image: (
//             <GradientContainer>
//               <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} />
              
//               <Text style={styles.companyName}>Born With Wealth</Text>
            
//               <Image source={require("../assets/images/vid.jpg")} style={styles.image} />
//             </GradientContainer>
//           ),
//           title: "Welcome to Ludo Consult",
//           subtitle: "Smart and seamless video conferencing for modern collaboration.",
//         },
//         {
//           backgroundColor: "#6C00B1",
//           image: (
//             <GradientContainer>
//                 <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} />
//               <Text style={styles.companyName}>Born With Wealth</Text>
            
//               <Image source={require("../assets/images/vid2.jpg")} style={styles.image} />
//             </GradientContainer>
//           ),
//           title: "Effortless Screen Sharing",
//           subtitle: "Share your screen and collaborate in real time.",
//         },
//         {
//           backgroundColor: "#6D00B3",
//           image: (
//             <GradientContainer>
//                 <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} />

//               <Text style={styles.companyName}>Born With Wealth</Text>
        
//               <Image source={require("../assets/images/vid.jpg")} style={styles.image} />
//             </GradientContainer>
//           ),
//           title: "Empower Your Meetings",
//           subtitle: "Connect, collaborate, and create smarter solutions together.",
//         },
//       ]}
//     />
//   );
// };


// const GradientContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
//   <LinearGradient colors={["#FFFFFF", "#E3F2FD"]} style={styles.imageContainer}>
//     {children}
//   </LinearGradient>
// );


// const styles = StyleSheet.create({
//   imageContainer: {
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 20,
//     padding: 15,
//     width: width * 0.75,
//   },
//   logo: {
//     width: 90,
//     height: 90,
//     resizeMode: "contain",
//     marginBottom: 10,
//   },
//   companyName: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#6D00B3",
//     textAlign: "center",
//     marginBottom: 15,
//   },
//   image: {
//     width: width * 0.7,
//     height: height * 0.38,
//     resizeMode: "contain",
//     borderRadius: 10,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: "bold",
//     color: "#6C00B1",
//     textAlign: "center",
//     paddingHorizontal: 20,
//   },
//   subtitle: {
//     fontSize: 18,
//     color: "#616161",
//     textAlign: "center",
//     paddingHorizontal: 30,
//     marginTop: 10,
//     paddingBottom:30,
//     marginBottom:20,
//   },
// });

// export default onboardingScreen;







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
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const onboardingScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSendOTP = async () => {
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        "http://52.14.158.219:5000/api/auth/send-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const result = await response.json();

      if (response.ok && result.success) {
        Alert.alert("Success", "OTP sent successfully.");
        router.push({ pathname: "/resetPassword", params: { email } });
      } else {
        Alert.alert("Error", result.msg || "Failed to send OTP.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#6D00B3", "#6C00B1"]} style={styles.header}>
        <Text style={styles.headerText}>Send OTP</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
          <Text style={styles.buttonText}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 160,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  formContainer: {
    width: "90%",
    alignItems: "center",
    paddingTop: 30,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: "#333",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#6D00B3",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Adds slight shadow on Android
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default onboardingScreen;

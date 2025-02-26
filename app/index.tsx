import React, { ReactNode } from "react";

import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

const onboardingScreen = () => {
  const router = useRouter();

  return (
    <Onboarding
      onSkip={() => router.replace("./signInScreen")}
      onDone={() => router.replace("./signInScreen")}
      containerStyles={{ backgroundColor: "#FFF" }}
      titleStyles={styles.title}
      subTitleStyles={styles.subtitle}
      bottomBarColor="transparent"
      pages={[
        {
          // backgroundColor: "#FFFFFF",
          backgroundColor: "#6D00B3",

          image: (
            <GradientContainer>
              <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} />
              {/* <Image source={require("../assets/images/born.jpeg")} style={styles.logo} /> */}
              <Text style={styles.companyName}>Born With Wealth</Text>
              {/* <Text style={styles.companyName}>Ludo Consult</Text> */}
              <Image source={require("../assets/images/vid.jpg")} style={styles.image} />
            </GradientContainer>
          ),
          title: "Welcome to Ludo Consult",
          subtitle: "Smart and seamless video conferencing for modern collaboration.",
        },
        {
          backgroundColor: "#6C00B1",
          image: (
            <GradientContainer>
                <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} />
              <Text style={styles.companyName}>Born With Wealth</Text>
            
              <Image source={require("../assets/images/vid2.jpg")} style={styles.image} />
            </GradientContainer>
          ),
          title: "Effortless Screen Sharing",
          subtitle: "Share your screen and collaborate in real time.",
        },
        {
          backgroundColor: "#6D00B3",
          image: (
            <GradientContainer>
                <Image source={require("../assets/images/logo.jpeg")} style={styles.logo} />

              <Text style={styles.companyName}>Born With Wealth</Text>
        
              <Image source={require("../assets/images/vid.jpg")} style={styles.image} />
            </GradientContainer>
          ),
          title: "Empower Your Meetings",
          subtitle: "Connect, collaborate, and create smarter solutions together.",
        },
      ]}
    />
  );
};


const GradientContainer: React.FC<{ children: ReactNode }> = ({ children }) => (
  <LinearGradient colors={["#FFFFFF", "#E3F2FD"]} style={styles.imageContainer}>
    {children}
  </LinearGradient>
);


const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 15,
    width: width * 0.75,
  },
  logo: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 10,
  },
  companyName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#6D00B3",
    textAlign: "center",
    marginBottom: 15,
  },
  image: {
    width: width * 0.7,
    height: height * 0.38,
    resizeMode: "contain",
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6C00B1",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "#616161",
    textAlign: "center",
    paddingHorizontal: 30,
    marginTop: 10,
    paddingBottom:30,
    marginBottom:20,
  },
});

export default onboardingScreen;


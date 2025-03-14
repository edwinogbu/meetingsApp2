import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Feather, AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";

const CustomDrawerContent = (props: any) => {
  const pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
  }, [pathname]);

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      {/* User Info Section */}
      <View style={styles.userInfoWrapper}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/women/26.jpg" }}
          style={styles.userImg}
        />
        <View style={styles.userDetailsWrapper}>
          <Text style={styles.userName}>Engr Eddy</Text>
          <Text style={styles.userEmail}>eddy@email.com</Text>
        </View>
      </View>

      {/* Navigation Items */}
      <View style={styles.navSection}>
        <View style={styles.navItemWrapper}>
          <DrawerItem
            icon={({ size }) => <Feather name="list" size={size} color={pathname === "/home" ? "#FFFFFF" : "#1A1A36"} />}
            label="Home"
            labelStyle={pathname === "/home" ? styles.activeNavItemLabel : styles.inactiveNavItemLabel}
            style={pathname === "/home" ? styles.activeNavItem : styles.inactiveNavItem}
            onPress={() => router.push("/(drawer)/(inside)/home")}
          />
        </View>

        <View style={styles.navItemWrapper}>
          <DrawerItem
            icon={({ size }) => <AntDesign name="user" size={size} color={pathname === "/profileScreen" ? "#FFFFFF" : "#1A1A36"} />}
            label="Profile"
            labelStyle={pathname === "/profileScreen" ? styles.activeNavItemLabel : styles.inactiveNavItemLabel}
            style={pathname === "/profileScreen" ? styles.activeNavItem : styles.inactiveNavItem}
            onPress={() => router.push("/(drawer)/(inside)/profileScreen")}
          />
        </View>

        <View style={styles.navItemWrapper}>
          <DrawerItem
            icon={({ size }) => <Ionicons name="settings-outline" size={size} color={pathname === "/settings" ? "#FFFFFF" : "#1A1A36"} />}
            label="Settings"
            labelStyle={pathname === "/settings" ? styles.activeNavItemLabel : styles.inactiveNavItemLabel}
            style={pathname === "/settings" ? styles.activeNavItem : styles.inactiveNavItem}
            onPress={() => router.push("/settings")}
          />
        </View>

        <View style={styles.navItemWrapper}>
          <DrawerItem
            icon={({ size }) => <AntDesign name="lock" size={size} color={pathname === "/changePasswordScreen" ? "#FFFFFF" : "#1A1A36"} />}
            label="change Password"
            labelStyle={pathname === "/changePasswordScreen" ? styles.activeNavItemLabel : styles.inactiveNavItemLabel}
            style={pathname === "/changePasswordScreen" ? styles.activeNavItem : styles.inactiveNavItem}
            onPress={() => router.push("/changePasswordScreen")}
          />
        </View>
      </View>

      {/* Footer Section with Logout Button */}
      <View style={styles.footerSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => console.log("Logout Pressed")}>
          <MaterialIcons name="logout" size={22} color="#FF8A00" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />} screenOptions={{ headerShown: false }}>
        <Drawer.Screen name="favourites" options={{ headerShown: true }} />
        <Drawer.Screen name="settings" options={{ headerShown: true }} />
        <Drawer.Screen name="changePasswordScreen" options={{ headerShown: true }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    backgroundColor: "#1A1A36",
    flex: 1,
    paddingVertical: 10,
  },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#FF8A00",
  },
  userImg: {
    width: 65,
    height: 65,
    borderRadius: 50,
  },
  userDetailsWrapper: {
    marginLeft: 15,
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#FF8A00",
  },

  /* Navigation Section */
  navSection: {
    marginTop: 25,
    paddingBottom: 20,
  },

  /* Navigation Item Wrapper (Fixes Margin Issue) */
  navItemWrapper: {
    marginHorizontal: 16,
    marginVertical: 10, // Adds spacing
    borderRadius: 12,
    overflow: "hidden",
  },

  /* Active & Inactive Styles */
  activeNavItem: {
    backgroundColor: "#FF8A00",
    borderRadius: 10,
  },
  inactiveNavItem: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
  },
  activeNavItemLabel: {
    color: "#FFFFFF",
  },
  inactiveNavItemLabel: {
    color: "#1A1A36",
  },

  /* Footer Section */
  footerSection: {
    marginTop: "auto",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#FF8A00",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "#1A1A36",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FF8A00",
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#FF8A00",
  },
});
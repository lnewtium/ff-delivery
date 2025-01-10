import { Redirect, Tabs } from "expo-router";
import { PlatformColor } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { RootStateType } from "@/src/utils/store";
import React from "react";

const TabsLayout = () => {
  const authSession = useSelector(
    (state: RootStateType) => state.auth.authSession,
  );

  if (!authSession) return <Redirect href={"(auth)"} />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PlatformColor("systemBlue") as unknown as string,
        headerShown: false,
      }}
      initialRouteName={"index"}
    >
      <Tabs.Screen
        name={"index"}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name={"home"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={"cart"}
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name={"shopping-cart"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name={"(profile)"}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name={"user-circle"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

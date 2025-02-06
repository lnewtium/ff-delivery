import { Redirect, Stack } from "expo-router";
import React from "react";
import { useAppSelector } from "@/src/utils/reactTools";

const TabsLayout = () => {
  const authSession = useAppSelector((state) => state.auth.authSession);

  if (!authSession) return <Redirect href={"(auth)"} />;

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Stack.Screen
        name={"index"}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="addressModal"
        options={{
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen
        name={"product/[id]"}
        options={{
          presentation: "containedModal",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={"cart"}
        options={{ presentation: "containedModal", headerShown: false }}
      />
      <Stack.Screen name={"profile"} options={{ title: "Profile" }} />
      <Stack.Screen name={"license"} options={{ title: "License" }} />
    </Stack>
  );
};

export default TabsLayout;

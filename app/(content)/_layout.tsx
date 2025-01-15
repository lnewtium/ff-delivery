import { Redirect, Stack } from "expo-router";
import { useSelector } from "react-redux";
import { RootStateType } from "@/src/utils/store";
import React from "react";

const TabsLayout = () => {
  const authSession = useSelector(
    (state: RootStateType) => state.auth.authSession,
  );

  if (!authSession) return <Redirect href={"(auth)"} />;

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: "#FFF" },
      }}
    >
      <Stack.Screen name={"index"}  options={{title: "", headerShown: false}}/>
      <Stack.Screen name={"profile"} options={{ title: "Profile" }} />
      <Stack.Screen
        name="addressModal"
        options={{
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen name={"product/[id]"} options={{
        presentation: "transparentModal",
        headerShown: false
      }}/>
      <Stack.Screen name={"license"} options={{ title: "License" }} />
    </Stack>
  );
};

export default TabsLayout;

import { Redirect, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useAppSelector } from "@/src/utils/reactTools";

const AuthLayout = () => {
  const authSession = useAppSelector((state) => state.auth.authSession);

  if (authSession) {
    return <Redirect href={"(content)"} />;
  }

  return (
    <SafeAreaView className={"flex-1 justify-start m-2"}>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#FFF" },
        }}
      >
        <Stack.Screen
          name={"index"}
          options={{ headerShown: false, title: "" }}
        />
        <Stack.Screen name={"signin"} options={{ title: "Sign In" }} />
        <Stack.Screen name={"signup"} options={{ title: "Sign Up" }} />
      </Stack>
    </SafeAreaView>
  );
};

export default AuthLayout;

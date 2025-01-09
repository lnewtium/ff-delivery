import { Redirect, Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useSelector } from "react-redux";
import { RootStateType } from "@/src/utils/store";

const AuthLayout = () => {
  const authSession = useSelector(
    (state: RootStateType) => state.auth.authSession,
  );

  if (authSession) {
    return <Redirect href={"(tabs)"} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className={"flex-1 justify-start m-2"}>
        <Stack>
          <Stack.Screen
            name={"index"}
            options={{ headerShown: false, title: "" }}
          />
          <Stack.Screen name={"signin"} options={{ title: "Sign In" }} />
          <Stack.Screen name={"signup"} options={{ title: "Sign Up" }} />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default AuthLayout;

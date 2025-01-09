import { Image, PlatformColor } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { useNavigation } from "expo-router";
import { WhiteBG } from "@/src/components/WhiteBG";

const AuthPage = () => {
  const navigation = useNavigation();

  return (
    <WhiteBG className={"flex-1 justify-center items-center gap-4"}>
      <Image
        className={"size-40 rounded-full mb-8"}
        source={require("@/assets/logo.png")}
      />
      <Button
        title={"Sign in"}
        containerStyle={{ minWidth: 300 }}
        onPress={() => {
          // @ts-ignore
          navigation.navigate("signin");
        }}
      />
      <Button
        title={"Don't have an account?"}
        containerStyle={{ minWidth: 300 }}
        buttonStyle={{ backgroundColor: PlatformColor("systemFill") }}
        titleStyle={{ color: PlatformColor("darkText") }}
        onPress={() => {
          // @ts-ignore
          navigation.navigate("signup");
        }}
      />
    </WhiteBG>
  );
};

export default AuthPage;

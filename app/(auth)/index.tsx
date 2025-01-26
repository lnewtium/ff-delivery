import { Image, View } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { useNavigation } from "expo-router";
import { COLORS } from "@/src/utils/theme";

const AuthPage = () => {
  const navigation = useNavigation();

  return (
    <View className={"flex-1 justify-center items-center gap-4"}>
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
        buttonStyle={{ backgroundColor: "#BABABA" }}
        titleStyle={{ color: COLORS.text }}
        onPress={() => {
          // @ts-ignore
          navigation.navigate("signup");
        }}
      />
    </View>
  );
};

export default AuthPage;

import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View } from "react-native";

const LoadingPage = () => {
  return (
    <View className={"items-center justify-center size-full"}>
      <FontAwesome name={"spinner"} size={20} className={"animate-spin"} />
    </View>
  );
};

export default LoadingPage;

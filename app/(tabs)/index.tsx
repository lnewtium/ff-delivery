import React from "react";
import { View, Text, PlatformColor } from "react-native";
import { WhiteBG } from "@/src/components/WhiteBG";

const HomePage = () => {
  return (
    <WhiteBG className={"p-1"}>
      <View
        style={{ backgroundColor: PlatformColor("systemFill") }}
        className={"rounded-3xl"}
      >
        <Text
          style={{
            flex: 1,
            fontFamily: "Inter_400Regular",
            fontSize: 30,
          }}
        >
          Home
        </Text>
      </View>
    </WhiteBG>
  );
};

export default HomePage;

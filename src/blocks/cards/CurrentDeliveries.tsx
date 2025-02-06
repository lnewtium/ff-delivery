import { Card } from "@rneui/themed";
import {Image, View, Text, Pressable} from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
  withDelay,
} from "react-native-reanimated";
import {COLORS} from "@/src/utils/theme";

const CurrentDeliveries = () => {
  const opacityNextVal = useSharedValue(1);

  React.useEffect(() => {
    opacityNextVal.value = withRepeat(
      withSequence(
        withDelay(
          200,
          withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) }),
        ),
        withDelay(
          200,
          withTiming(0.5, { duration: 200, easing: Easing.inOut(Easing.ease) }),
        ),
      ),
      -1,
    );
  }, []);

  const nextAnimStyle = useAnimatedStyle(() => {
    return {
      opacity: opacityNextVal.value,
    };
  });

  return (
    <Card>
      <Card.Title>Current deliveries</Card.Title>
      <Card.Divider />
      <View className={"flex-row gap-5"}>
        <View className={"justify-center"}>
          <Image
            source={require("@/assets/delivery-bike.png")}
            className={"size-32"}
          />
        </View>
        <Animated.View
          className={"flex-1 justify-center items-center"}
          style={nextAnimStyle}
        >
          <Image source={require("@/assets/next.png")} className={"size-24"} />
        </Animated.View>
        <View className={""}>
          <Image source={require("@/assets/house.png")} className={"size-32"} />
        </View>
      </View>
      <View className={"mt-4"}>
        <Text>Current delivery</Text>
        <View className={"flex-row mt-2"}>
          <Text className={"text-xl"}>Estimate: </Text>
          <Text className={"text-xl color-red-500"}>28</Text>
          <Text className={"text-xl"}> minutes</Text>
        </View>
        <View className={"flex-row justify-between items-stretch"}>
          <View className={"flex-row items-center"}>
            <Text className={"text-xl"}>Distance: </Text>
            <Text className={"text-xl color-red-500"}>5</Text>
            <Text className={"text-xl"}> km</Text>
          </View>
          <Pressable className={"bg-red-500 rounded-def p-2"}>
            <Text className={"text-xl color-white"}>View order</Text>
          </Pressable>
        </View>
      </View>
    </Card>
  );
};

export default CurrentDeliveries;

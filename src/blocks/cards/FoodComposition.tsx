import { Card } from "@rneui/themed";
import { Image, View, Text } from "react-native";
import React from "react";

const texts = [
  [
    "Crust",
    "Golden-brown hand-tossed crust, lightly brushed with garlic butter",
  ],
  [
    "Sauce",
    "Rich, tangy tomato base made with fresh herbs and a hint of garlic",
  ],
  ["Cheese", "Melted mozzarella cheese blanket for a gooey, stretchy bite"],
  [
    "Pepperoni",
    "Generous layers of premium, smoky pepperoni slices covering every inch",
  ],
];

export const FoodComposition = () => {
  return (
    <Card containerStyle={{ marginHorizontal: 8 }}>
      <View className={"flex-row gap-5 items-center"}>
        <Image source={require("@/assets/recipe.png")} className={"size-24"} />
        <View className={"flex-col flex-1 h-full"}>
          <Text className={"text-2xl"}>Food Composition</Text>
          {texts.map((item, index) => (
            <View key={index}>
              <View className={"flex-row"}>
                <Text className={"text-xl"}>{"\u2022 "}</Text>
                <Text className={"text-xl color-red-500"}>{item[0]}</Text>
              </View>
              <Text className={"text-xl ml-4"}>{item[1]}</Text>
            </View>
          ))}
        </View>
      </View>
    </Card>
  );
};

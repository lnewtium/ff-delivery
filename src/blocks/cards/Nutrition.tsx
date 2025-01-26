import { Card } from "@rneui/themed";
import { Image, Text, View } from "react-native";
import React from "react";

const PointedText = ({ text, sub }: { text: string; sub?: boolean }) => {
  return (
    <Text className={`text-xl ${sub ? "ml-3" : ""}`}>{`\u2022 ${text}`}</Text>
  );
};

export const Nutrition = () => {
  return (
    <Card containerStyle={{ marginHorizontal: 8 }}>
      <View className={"flex-row gap-5 items-center"}>
        <Image source={require("@/assets/list.png")} className={"size-24"} />
        <View className={"flex-col flex-1 h-full"}>
          <Text className={"text-2xl"}>Nutrition per Slice (1/8)</Text>
          <PointedText text={"Fats: 12g"} />
          <PointedText text={"Saturated fats: 5g"} sub={true}/>
          <PointedText text={"Sugars: 3g"} />
          <PointedText text={"Proteins: 10g"} />
          <PointedText text={"Carbohydrates: 30g"} />
          <PointedText text={"Fiber: 2g"} sub={true}/>
          <PointedText text={"Energy: ~285 kcal"} />
        </View>
      </View>
    </Card>
  );
};

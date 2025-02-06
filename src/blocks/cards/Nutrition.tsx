import { Card } from "@rneui/themed";
import { Image, Text, View } from "react-native";
import React from "react";

const PointedText = ({ text, sub }: { text: string; sub?: boolean }) => {
  return (
    <Text className={`text-xl ${sub ? "ml-3" : ""}`}>{`\u2022 ${text}`}</Text>
  );
};

const getNutritionData = (id: string) => {
  switch (id) {
    case "6":
      return (
        <>
          <Text className={"text-2xl"}>Nutrition per Slice (1/8)</Text>
          <PointedText text={"Fats: 12g"} />
          <PointedText text={"Saturated fats: 5g"} sub={true} />
          <PointedText text={"Sugars: 3g"} />
          <PointedText text={"Proteins: 10g"} />
          <PointedText text={"Carbohydrates: 30g"} />
          <PointedText text={"Fiber: 2g"} sub={true} />
          <PointedText text={"Energy: 285 kcal"} />
        </>
      );
    case "17":
      return (
        <>
          <Text className={"text-2xl"}>Nutrition</Text>
          <PointedText text={"Fats: 28g"} />
          <PointedText text={"Saturated fats: 10g"} sub={true} />
          <PointedText text={"Sugars: 9g"} />
          <PointedText text={"Proteins: 22g"} />
          <PointedText text={"Carbohydrates: 45g"} />
          <PointedText text={"Fiber: 4g"} sub={true} />
          <PointedText text={"Energy: 620 kcal"} />
        </>
      );
    case "15":
      return (
        <>
          <Text className={"text-2xl"}>Nutrition (355 ml)</Text>
          <PointedText text={"Fats: 1g"} />
          <PointedText text={"Saturated fats: 0g"} sub={true} />
          <PointedText text={"Sugars: 32g"} />
          <PointedText text={"Proteins: 3g"} />
          <PointedText text={"Carbohydrates: 42g"} />
          <PointedText text={"Fiber: 5g"} sub={true} />
          <PointedText text={"Energy: 180 kcal"} />
        </>
      );
    default:
      return <></>;
  }
};

export const Nutrition = ({ id }: { id: string }) => {
  return (
    <Card containerStyle={{ marginHorizontal: 8 }}>
      <View className={"flex-row gap-5 items-center"}>
        <Image source={require("@/assets/list.png")} className={"size-24"} />
        <View className={"flex-col flex-1 h-full"}>{getNutritionData(id)}</View>
      </View>
    </Card>
  );
};

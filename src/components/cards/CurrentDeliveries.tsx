import { Card } from "@rneui/themed";
import { Image, Text, View } from "react-native";
import React from "react";
import { cn } from "@/src/utils/classTools";

const CardText = (props: React.ComponentPropsWithoutRef<typeof Text>) => {
  const { className, ...rest } = props;
  return <Text className={cn("text-center", className)} {...rest} />;
};

const CurrentDeliveries = () => {
  return (
    <Card>
      <Card.Title>Current deliveries</Card.Title>
      <Card.Divider />
      <View className={"flex-row gap-5"}>
        <View className={"justify-center flex-1"}>
          <Image source={require("@/assets/delivery-bike.png")} />
        </View>
        <View className={"flex-1 justify-center items-stretch"}>
          <CardText>Empty delivery</CardText>
        </View>
      </View>
    </Card>
  );
};

export default CurrentDeliveries;

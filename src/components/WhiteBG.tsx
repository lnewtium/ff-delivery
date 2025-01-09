import React from "react";
import { View } from "react-native";
import { cn } from "@/src/utils/classTools";

type propsType = React.ComponentPropsWithoutRef<typeof View>;

// Stack.Screen component uses gray as background color by default
// This wrapper is used to change the background to white
export const WhiteBG = (props: propsType) => {
  const { className, ...rest } = props;
  return (
    <View
      className={cn("justify-start bg-white size-full", className)}
      {...rest}
    />
  );
};

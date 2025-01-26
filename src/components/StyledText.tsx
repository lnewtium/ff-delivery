import { Text } from "react-native";
import React from "react";
import { cn } from "@/src/utils/classTools";

type propsType = React.ComponentPropsWithoutRef<typeof Text>;
export const StyledText = (props: propsType) => {
  const { className, ...rest } = props;
  return <Text className={cn("font-bold", className)} {...rest} />;
};

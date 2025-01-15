import React, {PropsWithChildren} from "react";
import {ScrollView} from "react-native";

const HorizontalScroll = ({ children }: PropsWithChildren) => {
  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={{ gap: 16 }}
      showsHorizontalScrollIndicator={false}
      contentOffset={{ x: -16, y: 0 }}
      contentInset={{ left: 16, right: 16 }}
    >
      {children}
    </ScrollView>
  );
};

export default HorizontalScroll
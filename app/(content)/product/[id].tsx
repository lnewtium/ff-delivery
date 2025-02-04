import { useLocalSearchParams } from "expo-router";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useGetProductByIdQuery } from "@/src/services/product";
import LoadingPage from "@/src/blocks/LoadingPage";
import React from "react";
import {SafeAreaView, useSafeAreaInsets} from "react-native-safe-area-context";
import { DynamicHeader } from "@/src/blocks/DynamicHeader";
import { AddToCart } from "@/src/blocks/cards/AddToCart";
import { Nutrition } from "@/src/blocks/cards/Nutrition";
import { Text } from "react-native";
import {FoodComposition} from "@/src/blocks/cards/FoodComposition";
import {ViewCart} from "@/src/blocks/ViewCart";

const ProductModal = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data, isFetching } = useGetProductByIdQuery({ id });
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);
  const scrollEvent = useAnimatedScrollHandler(
    (event) => (scrollOffset.value = event.contentOffset.y),
  );

  if (isFetching) return <LoadingPage />;

  return (
    <SafeAreaView edges={["top"]}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        className={"h-full"}
        contentContainerStyle={{ gap: 16, alignItems: "center", paddingBottom: insets.bottom + 80 }}
        onScroll={scrollEvent}
      >
        <DynamicHeader product={data!} val={scrollOffset} />
        <Text className={"text-lg mx-2"}>{data!.desc}</Text>
        <AddToCart data={data!} />
        <Nutrition />
        <FoodComposition />
      </Animated.ScrollView>
      <ViewCart/>
    </SafeAreaView>
  );
};

export default ProductModal;

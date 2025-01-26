import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootStateType } from "@/src/utils/store";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { COLORS } from "@/src/utils/theme";
import { useRouter } from "expo-router";
import { Card } from "@rneui/themed";
import { getProductUrl } from "@/src/utils/imageTools";
import { useGetProductByIdQuery } from "@/src/services/product";
import { getUsd } from "@/src/utils/priceTools";
import AntDesign from "@expo/vector-icons/AntDesign";

const ProductCardInCart = ({ id, count }: { id: string; count: number }) => {
  const { data } = useGetProductByIdQuery({ id });
  return (
    <Card
      containerStyle={{ margin: 8 }}
      wrapperStyle={{ flexDirection: "row", gap: 8 }}
    >
      <Image
        source={getProductUrl(data!.img, true)}
        style={{ width: 150, height: 150, borderRadius: 10 }}
      />
      <View className={"justify-between flex-1"}>
        <View>
          <View className={"flex-row items-center"}>
            <Text className={"font-semibold text-2xl color-red-500"}>
              {count}
            </Text>
            <Text className={"font-semibold text-lg"}> x</Text>
          </View>
          <Text className={"font-semibold text-lg"}>{data!.text}</Text>
        </View>
        <View className={"flex-row justify-between items-center"}>
          <Text className={"font-semibold text-2xl"}>
            {getUsd(data!.price * count)}
          </Text>

          <TouchableOpacity
            onPress={() => {}}
            className={
              "rounded-full bg-red-500 size-8 items-center justify-center"
            }
          >
            <AntDesign name="minus" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );
};

const Cart = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cartContent = useSelector(
    (state: RootStateType) => state.cart.products,
  );

  return (
    <SafeAreaView className={"p-2 h-full"}>
      <View className={"flex-row justify-between z-10"}>
        <View className={"flex-1 flex-row justify-start"}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className={"flex-1 flex-row items-center justify-center"}>
          <Text className={"text-2xl font-bold"}>Cart</Text>
        </View>
        <View className={"flex-1"}></View>
      </View>
      {Object.keys(cartContent).map((item) => (
        <ProductCardInCart id={item} count={cartContent[item]} key={item} />
      ))}
      <View
        className={"absolute bottom-0 m-8 left-0 right-0 gap-2"}
        style={{ marginBottom: insets.bottom + 4 }}
      >
        <View className={"flex-row"}>
          <Text className={"text-xl"}>Total: </Text>
          <Text className={"text-xl"}>
            {getUsd(
              Object.keys(cartContent).reduce(
                (acc, cur) =>
                  acc +
                  cartContent[cur] *
                    useGetProductByIdQuery({ id: cur }).data!.price,
                0,
              ),
            )}
          </Text>
        </View>
        <TouchableOpacity
          className={"self-stretch bg-red-500 p-2 rounded-def items-center"}
        >
          <Text className={"text-2xl"}>Place order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: "#FFFFFFD4",
    padding: 8,
    borderRadius: 9999,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.2,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 4 },
    borderColor: COLORS.border,
    borderWidth: 1,
    borderStyle: "solid",
    elevation: 8,
    marginTop: 1,
  },
});

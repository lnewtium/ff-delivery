import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { COLORS } from "@/src/utils/theme";
import { useRouter } from "expo-router";
import { Button, Card, CheckBox } from "@rneui/themed";
import { getProductUrl } from "@/src/utils/imageTools";
import { useGetProductByIdQuery } from "@/src/services/product";
import { getUsd } from "@/src/utils/priceTools";
import { useAppDispatch, useAppSelector } from "@/src/utils/reactTools";
import Animated, { FadeOut, SlideInDown } from "react-native-reanimated";
import Entypo from "@expo/vector-icons/Entypo";
import { clearCart } from "@/src/reducers/cartReducer";

const ProductCardInCart = ({
  id,
  count,
  showRemoveButton,
}: {
  id: string;
  count: number;
  showRemoveButton: boolean;
}) => {
  const { data } = useGetProductByIdQuery({ id });
  const AnimatedTouchableOpacity =
    Animated.createAnimatedComponent(TouchableOpacity);
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
          {showRemoveButton && (
            <AnimatedTouchableOpacity
              exiting={FadeOut}
              onPress={() => {}}
              className={
                "rounded-full bg-red-500 size-8 items-center justify-center"
              }
            >
              <AntDesign name="minus" size={20} color="black" />
            </AnimatedTouchableOpacity>
          )}
        </View>
      </View>
    </Card>
  );
};

const Cart = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cartContent = useAppSelector((state) => state.cart.products);
  const dispatch = useAppDispatch();
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const [uiStage, setUiStage] = React.useState(0);
  const [stage2loading, setStage2Loading] = React.useState(false);

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
        <ProductCardInCart
          id={item}
          count={cartContent[item]}
          key={item}
          showRemoveButton={uiStage === 0}
        />
      ))}
      <View
        className={"absolute bottom-0 m-8 left-0 right-0"}
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
        <AnimatedPressable
          className={`self-stretch bg-red-500 p-2 rounded-def items-center ${uiStage > 0 ? "hidden" : ""}`}
          exiting={FadeOut.duration(200)}
          onPress={() => {
            setUiStage(1);
          }}
        >
          <Text className={"text-2xl"}>Place order</Text>
        </AnimatedPressable>
        <Animated.View
          className={`self-stretch items-stretch gap-1 ${uiStage >= 1 ? "" : "hidden"}`}
          entering={SlideInDown.delay(100).duration(300)}
        >
          <View className={"items-center flex-row"}>
            <Entypo
              name="location-pin"
              size={32}
              color="black"
              className="mx-1.5"
            />
            <Text className={"text-2xl ml-9"}>J. H. ***76</Text>
          </View>
          <View className={"items-center flex-row mt-4"}>
            <View className="flex-1 flex-row items-center">
              <CheckBox
                checkedIcon="dot-circle-o"
                checked
                checkedColor={"#000000"}
                containerStyle={{ padding: 0 }}
              />
              <Image
                source={require("@/assets/credit-card.png")}
                className="ml-8"
              />
            </View>
            <Text className={"text-2xl"}>**** **** **** 2487</Text>
          </View>
          <View className={"items-center flex-row"}>
            <Entypo name="plus" size={32} color="black" className="mx-1.5" />
            <Text className={"text-2xl ml-8"}>Add new card</Text>
          </View>
          <View className={"items-stretch flex-row gap-2 mt-2"}>
            <Pressable
              className={
                "bg-red-500 p-2 rounded-def items-center justify-center"
              }
            >
              <Ionicons name="caret-back" size={24} color="black" />
            </Pressable>
            <Button
              containerStyle={{
                backgroundColor: "#ef4444",
                borderRadius: 10,
                alignItems: "center",
                flex: 1,
              }}
              title={uiStage === 1 ? "Confirm order" : "Successful"}
              titleStyle={{ color: "black" }}
              buttonStyle={{ backgroundColor: "transparent" }}
              loadingStyle={{
                // @ts-ignore
                color: "black",
              }}
              loading={stage2loading}
              onPress={() => {
                setStage2Loading(true);
                setTimeout(() => {
                  setStage2Loading(false);
                  setUiStage(2);
                  setTimeout(() => {
                    dispatch(clearCart());
                    router.dismissAll();
                    router.push("profile");
                  }, 1000);
                }, 3000);
              }}
            />
          </View>
        </Animated.View>
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

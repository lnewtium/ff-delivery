import { Card } from "@rneui/themed";
import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { addToCart } from "@/src/reducers/cartReducer";
import { Tables } from "@/supabase/supabase";
import { getUsd } from "@/src/utils/priceTools";
import { useAppDispatch, useAppSelector } from "@/src/utils/reactTools";
import { usePrefetch } from "@/src/services/product";

type propsType = {
  countValue: number;
  data: Tables<"products">;
  setCountValue: React.Dispatch<React.SetStateAction<number>>;
};

const AddBlock = ({ countValue, setCountValue, data }: propsType) => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.products);
  const prefetchProduct = usePrefetch("getProductById");
  const alreadyInCart: boolean = !!cart[data.id];
  const activeStateStyle = alreadyInCart
    ? "bg-green-500 opacity-50"
    : "bg-red-500";

  return (
    <View className={"flex-row items-center justify-between"}>
      <View className={"flex-row items-center gap-4"}>
        <TouchableOpacity
          onPress={() => setCountValue(Math.max(1, countValue - 1))}
          disabled={alreadyInCart}
          className={`rounded-full size-8 items-center justify-center ${activeStateStyle}`}
        >
          <AntDesign name="minus" size={20} color="black" />
        </TouchableOpacity>
        <Text className={`text-2xl ${alreadyInCart ? "opacity-50" : ""}`}>
          {countValue}
        </Text>
        <TouchableOpacity
          onPress={() => setCountValue(Math.min(9, countValue + 1))}
          disabled={alreadyInCart}
          className={`rounded-full size-8 items-center justify-center ${activeStateStyle}`}
        >
          <AntDesign name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className={`p-2 rounded-def flex-row items-center ${activeStateStyle}`}
        disabled={alreadyInCart}
        onPress={() => {
          prefetchProduct({ id: String(data!.id) });
          dispatch(addToCart({ id: data!.id, count: countValue }));
        }}
      >
        <Text className={"text-xl text-center"}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export const AddToCart = ({ data }: { data: Tables<"products"> }) => {
  const cart = useAppSelector((state) => state.cart.products);
  const [countValue, setCountValue] = useState(cart[data.id] || 1);

  return (
    <Card containerStyle={{ marginHorizontal: 8 }}>
      <View className={"flex-row gap-5 items-center"}>
        <Image
          source={require("@/assets/add-to-cart.png")}
          className={"size-24"}
        />
        <View className={"flex-col flex-1"}>
          <View className={"items-stretch"}>
            <Text className={"text-2xl"}>Add To Cart</Text>
            <Text className={"text-xl"}>We'll deliver in</Text>
            <View className={"flex-row"}>
              <Text className={"text-xl color-red-500"}>29</Text>
              <Text className={"text-xl"}> minutes</Text>
            </View>
          </View>
          <Text className={"text-xl font-light self-end mb-1 mr-2"}>
            {getUsd(data!.price * countValue)}
          </Text>
          <AddBlock
            countValue={countValue}
            data={data}
            setCountValue={setCountValue}
          />
        </View>
      </View>
    </Card>
  );
};

import { Card } from "@rneui/themed";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { getProductUrl } from "@/src/utils/imageTools";
import { getUsd } from "@/src/utils/priceTools";

type propsType = {
  product: { id: number; img: string; text: string; price: number };
};

const ProductCard = ({ product }: propsType) => {
  const router = useRouter();

  return (
    <Card containerStyle={styles.card}>
      <TouchableOpacity
        onPress={() => router.push("product/" + product.id)}
        delayPressIn={100}
      >
        <Card.Image
          source={getProductUrl(product.img, true)}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text className={"font-semibold text-lg"}>{product.text}</Text>
          <Text className={"font-semibold text-lg"}>
            {getUsd(product.price)}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
export default ProductCard;

const styles = StyleSheet.create({
  image: {
    height: 190,
    width: 240,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  card: {
    width: 240,
    padding: 0,
  },
  textContainer: {
    height: 50,
    paddingHorizontal: 4,
    justifyContent: "center",
  },
});

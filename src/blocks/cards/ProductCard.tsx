import { Card } from "@rneui/themed";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { getProductUrl } from "@/src/utils/imageTools";

type propsType = {
  product: {
    desc: string;
    id: number;
    img: string;
    price: number;
    special_offer: boolean;
    text: string;
  };
};

const ProductCard = ({ product }: propsType) => {
  const router = useRouter();

  return (
    <Card containerStyle={styles.card}>
      <TouchableOpacity
        onPress={() => router.push("product/" + product.id)}
        delayPressIn={100}
      >
        <Card.Image source={getProductUrl(product.img, true)} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{product.text}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
export default ProductCard;

const styles = StyleSheet.create({
  image: {
    height: 190,
    width: 220,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  card: {
    width: 220,
    padding: 0,
  },
  textContainer: {
    height: 30,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

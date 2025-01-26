import { useRouter } from "expo-router";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getProductUrl } from "@/src/utils/imageTools";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { getUsd } from "@/src/utils/priceTools";
import React from "react";
import { Tables } from "@/supabase/supabase";
import { Blurhash } from "react-native-blurhash";
import { BlurView } from "expo-blur";
import { COLORS } from "@/src/utils/theme";

type dynHeaderProps = {
  product: Tables<"products">;
  val: SharedValue<number>;
};

const HEADER_MIN = 60;
// make square
const HEADER_MAX = Dimensions.get("screen").width;
const SCROLL_DISTANCE = HEADER_MAX - HEADER_MIN;

const AnimatedBlurhash = Animated.createAnimatedComponent(Blurhash);
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

export const DynamicHeader = ({ product, val }: dynHeaderProps) => {
  const router = useRouter();
  const imageLoadingOpacity = useSharedValue(0);

  const onLoadEnd = () => {
    imageLoadingOpacity.value = withTiming(1, { duration: 400 });
  };

  const imageAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(val.value, [-40, 0], [1.05, 1], {
          extrapolateLeft: "extend",
          extrapolateRight: "clamp",
        }),
      },
      {
        translateY: interpolate(
          val.value,
          [-1, 0, SCROLL_DISTANCE],
          [-0.5, 0, SCROLL_DISTANCE],
          Extrapolation.EXTEND,
        ),
      },
    ],
    height: interpolate(
      val.value,
      [0, SCROLL_DISTANCE],
      [HEADER_MAX, HEADER_MIN],
      Extrapolation.CLAMP,
    ),
  }));

  const overlayAnimStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: val.value,
      },
    ],
    height: interpolate(
      val.value,
      [0, SCROLL_DISTANCE],
      [HEADER_MAX, HEADER_MIN],
      Extrapolation.CLAMP,
    ),
    opacity: interpolate(val.value, [-80, 0], [0, 1], Extrapolation.CLAMP),
  }));

  const lowerOverlayStyle = useAnimatedStyle(() => ({
    transform: [
      {
        // Center Elements
        translateY: interpolate(
          val.value,
          [SCROLL_DISTANCE - 42, SCROLL_DISTANCE],
          [0, -42],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const moveName = useAnimatedStyle(() => ({
    transform: [
      {
        // Center Elements
        translateX: interpolate(
          val.value,
          [SCROLL_DISTANCE - 100, SCROLL_DISTANCE],
          [0, 64],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const blurOpacityAnimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      val.value,
      [0, SCROLL_DISTANCE],
      [0, 1],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <>
      <Animated.View
        style={{
          width: HEADER_MAX,
          height: HEADER_MAX,
        }}
      />
      {/* Empty block for scroll offset*/}
      <AnimatedBlurhash
        blurhash={product.blurhash}
        decodeAsync={true}
        decodeHeight={64}
        decodeWidth={64}
        style={[styles.blurhash, imageAnimStyle]}
      />
      <Animated.Image
        source={getProductUrl(product.img, false)}
        style={[styles.image, imageAnimStyle]}
        onLoadEnd={onLoadEnd}
      />
      <AnimatedBlurView
        intensity={10}
        style={[styles.blurOverlay, imageAnimStyle, blurOpacityAnimStyle]}
      />
      {/* Overlay */}
      <Animated.View style={[styles.overlay, overlayAnimStyle]}>
        <View className={"flex-row justify-between z-10"}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => router.back()}
            className={"justify-center"}
          >
            <EvilIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Animated.View
          className={"flex-row justify-between"}
          style={lowerOverlayStyle}
        >
          <Animated.View style={[styles.nameContainer, moveName]}>
            <Text className={"text-2xl font-medium text-black"}>
              {product.text}
            </Text>
          </Animated.View>
          <View style={styles.priceContainer}>
            <Text className={"text-2xl font-medium text-black"}>
              {getUsd(product.price)}
            </Text>
          </View>
        </Animated.View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 2,
    padding: 8,
    justifyContent: "space-between",
    width: HEADER_MAX,
  },
  blurOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    width: HEADER_MAX,
    backgroundColor: "transparent",
  },
  closeButton: {
    backgroundColor: "#FFFFFFD4",
    paddingVertical: 10,
    paddingHorizontal: 8,
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
  blurhash: {
    width: HEADER_MAX,
    height: HEADER_MAX,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 0,
  },
  image: {
    width: HEADER_MAX,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  },
  nameContainer: {
    backgroundColor: "#f54a4ed4",
    padding: 8,
    borderRadius: 10,
  },
  priceContainer: {
    backgroundColor: "#00a3e2d4",
    padding: 8,
    borderRadius: 10,
  },
});

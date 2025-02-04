import { Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, {
  FadeIn,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import Feather from "@expo/vector-icons/Feather";
import { COLORS } from "@/src/utils/theme";
import { Badge } from "@rneui/base";
import { useAppSelector } from "@/src/utils/reactTools";

export const ViewCart = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cart = useAppSelector((state) => state.cart.products);
  const count = Object.keys(cart).length;

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    count > 0 && (
      <AnimatedPressable
        onPress={() => router.push("/cart")}
        className={
          "h-20 bg-red-500 items-center justify-center rounded-3xl absolute bottom-0 right-0 mx-4 flex flex-row pl-5 pr-6"
        }
        style={[{ marginBottom: insets.bottom }, styles.cartButton]}
        entering={FadeIn.delay(100)}
      >
        <Feather name="shopping-cart" size={32} />
        <Badge
          badgeStyle={{ backgroundColor: "#ef4444" }}
          value={count}
          containerStyle={{ position: "absolute", top: 8, left: 44 }}
        />
      </AnimatedPressable>
    )
  );
};

const styles = StyleSheet.create({
  cartButton: {
    backgroundColor: "#FFFFFF",
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

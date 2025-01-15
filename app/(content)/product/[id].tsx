import {
  Animated,
  ScrollView, Text,
  useAnimatedValue,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { Button } from "@rneui/themed";
import { COLORS } from "@/src/utils/theme";

const HEADER_MIN_HEIGHT = 120;
const HEADER_MAX_HEIGHT = 240;
const SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

type dynHeaderProps = {
  id: string | string[];
  val: Animated.Value;
};

const DynamicHeader = ({ id, val }: dynHeaderProps) => {
  const dynamicHeight = val.interpolate({
    inputRange: [0, SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={{ backgroundColor: "#000", height: dynamicHeight, justifyContent: "center", alignItems: "center" }}>
      <Text>Header</Text>
    </Animated.View>
  );
};

const ProductModal = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  const dynamicVal = useAnimatedValue(0);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          title={"Back"}
          onPress={() => navigation.goBack()}
          buttonStyle={{ backgroundColor: "transparent" }}
          titleStyle={{ color: COLORS.primary }}
        />
      ),
    });
  }, []);

  return (
    <BlurView intensity={30} className={"size-full h-40"}>
      <ScrollView
        scrollEventThrottle={5}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: dynamicVal } } }],
          { useNativeDriver: false },)}
      >
        <DynamicHeader id={id} val={dynamicVal} />
        {[...Array(16).keys()].map((_, i) => (
          <View key={i} className={"h-32 bg-yellow-400 m-4"}>
            <Text className={"text-2xl font-bold ml-2 mb-2"}>{i}</Text>
          </View>
        ))}
      </ScrollView>
    </BlurView>
  );
};

export default ProductModal;

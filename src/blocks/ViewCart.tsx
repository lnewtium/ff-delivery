import { Pressable, Text } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ViewCart = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <Pressable
      onPress={() => router.push("/cart")}
      className={
        "h-8 w-32 bg-red-500 items-center justify-center rounded-def absolute bottom-0 left-0"
      }
      style={{ marginBottom: insets.bottom }}
    >
      <Text>View cart</Text>
    </Pressable>
  );
};

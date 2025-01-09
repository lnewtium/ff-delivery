import { createTheme } from "@rneui/themed";
import { PlatformColor } from "react-native";

export const theme = createTheme({
  components: {
    Button: {
      containerStyle: {
        borderRadius: 10,
      },
      titleStyle: {
        fontFamily: "Inter_400Regular",
      },
    },
    Input: {
      inputStyle: {
        fontFamily: "Inter_400Regular",
      },
      errorStyle: {
        fontFamily: "Inter_400Regular",
        color: PlatformColor("systemRed"),
      },
      labelStyle: {
        fontFamily: "Inter_400Regular",
      },
    },
    Card: {
      containerStyle: {
        borderRadius: 10,
        backgroundColor: PlatformColor("systemFill"),
        margin: 15
      },
    },
  },
});

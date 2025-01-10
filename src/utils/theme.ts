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
        alignSelf: "stretch",
        margin: 0
      },
    },
    CardTitle: {
      style: {
        fontFamily: "Inter_400Regular",
        color: PlatformColor("darkText"),
      }
    },
    CardDivider: {
      color: PlatformColor("darkText") as unknown as string,
    }
  },
});

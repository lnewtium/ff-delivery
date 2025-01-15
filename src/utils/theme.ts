import { createTheme } from "@rneui/themed";
import { PlatformColor } from "react-native";

export const COLORS = {
  primary: PlatformColor("systemBlue"),
  secondary: PlatformColor("systemGray"),
  red: PlatformColor("systemRed"),
  green: PlatformColor("systemGreen"),
  container: "#ffffffaf",
  secondaryContainer: PlatformColor("secondaryLabel"),
  text: PlatformColor("darkText"),
  border: "#0000004c",
  shadow: "#0000009a"
}

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
        color: COLORS.red,
      },
      labelStyle: {
        fontFamily: "Inter_400Regular",
      },
    },
    Card: {
      containerStyle: {
        borderRadius: 10,
        backgroundColor: COLORS.container,
        alignSelf: "stretch",
        margin: 0,
        shadowColor: COLORS.shadow,
        shadowOpacity: 0.2,
        shadowRadius: 30,
        shadowOffset: { width: 0, height: 4 },
        borderColor: COLORS.border,
        borderWidth: 1,
        borderStyle: "solid",
        elevation: 8,
      },
    },
    CardImage: {
      style: {
        borderRadius: 10,
      }
    },
    CardTitle: {
      style: {
        fontFamily: "Inter_400Regular",
        color: COLORS.text,
      }
    },
    CardDivider: {
      color: COLORS.text as unknown as string,
    },
    SearchBar: {
      containerStyle: {
        borderRadius: 10,
        flex: 1,
        backgroundColor: "transparent"
      },
    },
    Divider: {
      color: COLORS.text as unknown as string
    }
  },
});

import { Linking, TouchableOpacity, View } from "react-native";
import { StyledText } from "@/src/components/StyledText";

const LicensePage = () => {
  return (
    <View className={"items-center p-2 pt-8 gap-4"}>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.flaticon.com/free-icons/motorcycle")
        }
      >
        <StyledText>
          Motorcycle icons created by kliwir art - Flaticon
        </StyledText>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.flaticon.com/free-icons/address")
        }
      >
        <StyledText>
          Address icons created by Vector Valley - Flaticon
        </StyledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.flaticon.com/free-icons/user")
        }
      >
        <StyledText>User icons created by Freepik - Flaticon</StyledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.flaticon.com/free-icons/add-to-cart")
        }
      >
        <StyledText>
          Add to cart icons created by Edi Prast - Flaticon
        </StyledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.flaticon.com/free-icons/list")
        }
      >
        <StyledText>List icons created by Freepik - Flaticon</StyledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://freeicons.io/bakery-icon-set-32829/book-cook-cookbook-cooking-recipe-icon-1250224",
          )
        }
      >
        <StyledText>Icon by Pexelpy on freeicons.io</StyledText>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.flaticon.com/free-icons/credit-card")
        }
      >
        <StyledText>Credit-card icons created by Freepik - Flaticon</StyledText>
      </TouchableOpacity>
    </View>
  );
};

export default LicensePage;

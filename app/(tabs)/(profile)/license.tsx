import { Linking, TouchableOpacity } from "react-native";
import { StyledText } from "@/src/components/StyledText";
import { WhiteBG } from "@/src/components/WhiteBG";

const LicensePage = () => {
  return (
    <WhiteBG className={"items-center p-2 pt-8 gap-4"}>
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
    </WhiteBG>
  );
};

export default LicensePage;

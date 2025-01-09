import { Linking, TouchableOpacity } from "react-native";
import { StyledText } from "@/src/components/StyledText";
import { WhiteBG } from "@/src/components/WhiteBG";

const LicensePage = () => {
  return (
    <WhiteBG className={"items-center pt-8"}>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL("https://www.flaticon.com/free-icons/motorcycle")
        }
      >
        <StyledText>
          Motorcycle icons created by kliwir art - Flaticon
        </StyledText>
      </TouchableOpacity>
    </WhiteBG>
  );
};

export default LicensePage;

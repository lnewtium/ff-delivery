import { WhiteBG } from "@/src/components/WhiteBG";
import { Button } from "@rneui/themed";
import { supabase } from "@/src/utils/supabase";
import { Link } from "expo-router";
import { PlatformColor } from "react-native";
import React from "react";
import DeliveryAddress from "@/src/components/cards/DeliveryAddress";
import CurrentDeliveries from "@/src/components/cards/CurrentDeliveries";

const ProfilePage = () => {
  return (
    <WhiteBG className={"items-center gap-5 p-4"}>
      <DeliveryAddress/>
      <CurrentDeliveries/>
      <Button
        containerStyle={{ alignSelf: "stretch" }}
        buttonStyle={{ backgroundColor: PlatformColor("secondaryLabel") }}
        title={"Sign out"}
        onPress={() => supabase.auth.signOut()}
      />
      <Link href={"(tabs)/(profile)/license"}>Legal</Link>
    </WhiteBG>
  );
};

export default ProfilePage;

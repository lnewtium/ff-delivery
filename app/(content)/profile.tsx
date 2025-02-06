import { Button } from "@rneui/themed";
import { supabase } from "@/src/utils/supabase";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import React from "react";
import DeliveryAddress from "@/src/blocks/cards/DeliveryAddress";
import CurrentDeliveries from "@/src/blocks/cards/CurrentDeliveries";
import { COLORS } from "@/src/utils/theme";

const ProfilePage = () => {
  return (
    <ScrollView
      contentContainerClassName={"items-center gap-5 p-2 h-full"}
      showsVerticalScrollIndicator={false}
    >
      <CurrentDeliveries />
      <DeliveryAddress />
      <Button
        containerStyle={{ alignSelf: "stretch" }}
        buttonStyle={{ backgroundColor: COLORS.secondaryContainer }}
        title={"Sign out"}
        onPress={() => supabase.auth.signOut()}
      />
      <Link href={"(content)/license"}>Legal</Link>
    </ScrollView>
  );
};

export default ProfilePage;

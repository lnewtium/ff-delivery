import { Button } from "@rneui/themed";
import { supabase } from "@/src/utils/supabase";
import { Link } from "expo-router";
import { ScrollView } from "react-native";
import React from "react";
import DeliveryAddress from "@/src/blocks/cards/DeliveryAddress";
import CurrentDeliveries from "@/src/blocks/cards/CurrentDeliveries";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/src/utils/theme";

const ProfilePage = () => {
  return (
    <SafeAreaView edges={["bottom"]}>
      <ScrollView
        contentContainerClassName={"items-center gap-5 p-1"}
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
    </SafeAreaView>
  );
};

export default ProfilePage;

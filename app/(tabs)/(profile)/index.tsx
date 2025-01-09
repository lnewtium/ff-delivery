import { WhiteBG } from "@/src/components/WhiteBG";
import { Button, Card } from "@rneui/themed";
import { supabase } from "@/src/utils/supabase";
import { Link, useNavigation } from "expo-router";
import { View, Image, PlatformColor, Alert } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import {
  useGetProfileQuery,
  useSetProfileMutation,
} from "@/src/services/profile";
import LoadingPage from "@/src/components/LoadingPage";
import { useSelector } from "react-redux";
import { RootStateType } from "@/src/utils/store";

const ProfilePage = () => {
  const navigation = useNavigation();
  const session = useSelector((state: RootStateType) => state.auth.authSession);
  const { data, isFetching } = useGetProfileQuery();
  const [updateProfile] = useSetProfileMutation();

  if (isFetching) return <LoadingPage />;

  const deleteHandle = () => {
    Alert.alert(
      "Delete address",
      "Are you sure you want to delete this address?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            updateProfile({
              full_name: null,
              address: null,
              city: null,
              state: null,
              zip: null,
              id: session!.user.id,
            });
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <WhiteBG className={"items-center gap-5"}>
      <Card containerStyle={{ alignSelf: "stretch" }}>
        <Card.Title>Edit delivery address</Card.Title>
        <Card.Divider />
        <View className={"flex-row gap-5"}>
          <View className={"justify-center"}>
            <Image source={require("@/assets/delivery-bike.png")} />
          </View>
          <View className={"flex-1 justify-center items-stretch"}>
            {data?.address && (
              <>
                <Card.Title>Name: {data?.full_name}</Card.Title>
                <Card.Title>Address: {data?.address}</Card.Title>
                <Card.Title>City: {data?.city}</Card.Title>
                <Card.Title>State: {data?.state}</Card.Title>
                <Card.Title>Zip: {data?.zip}</Card.Title>
              </>
            )}
            <Button
              title={data?.address ? "Change address" : "Add address"}
              buttonStyle={{ backgroundColor: "#eb494b" }}
              onPress={() => {
                // @ts-ignore
                navigation.navigate("addressModal");
              }}
              icon={
                <FontAwesome
                  size={28}
                  name={data?.address ? "pencil" : "plus-circle"}
                  color={"#fbd879"}
                  className={"mr-1"}
                />
              }
            />
            {data?.address && (
              <Button
                title={"Delete address"}
                buttonStyle={{
                  backgroundColor: PlatformColor("secondaryLabel"),
                }}
                containerStyle={{ marginTop: 10 }}
                onPress={deleteHandle}
                icon={
                  <FontAwesome
                    size={28}
                    name={"trash"}
                    color={"#fbd879"}
                    className={"mr-1"}
                  />
                }
              />
            )}
          </View>
        </View>
      </Card>
      <Button
        containerStyle={{ margin: 15, alignSelf: "stretch" }}
        buttonStyle={{ backgroundColor: PlatformColor("secondaryLabel") }}
        title={"Sign out"}
        onPress={() => supabase.auth.signOut()}
      />
      <Link href={"(tabs)/(profile)/license"}>Legal</Link>
    </WhiteBG>
  );
};

export default ProfilePage;

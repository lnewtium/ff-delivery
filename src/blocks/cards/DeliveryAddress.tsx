import { Button, Card } from "@rneui/themed";
import { Alert, Text, Image, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import LoadingPage from "@/src/blocks/LoadingPage";
import {
  useGetProfileQuery,
  useSetProfileMutation,
} from "@/src/services/profile";
import { useNavigation } from "expo-router";
import { COLORS } from "@/src/utils/theme";
import { useAppSelector } from "@/src/utils/reactTools";

const CardText = (props: React.ComponentPropsWithoutRef<typeof Text>) => {
  const { className, ...rest } = props;
  return <Text className={className} {...rest} />;
};

const DeliveryAddress = () => {
  const navigation = useNavigation();
  const session = useAppSelector((state) => state.auth.authSession);
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
    <Card>
      <Card.Title>Edit delivery address</Card.Title>
      <Card.Divider />
      <View className={"flex-row gap-5"}>
        <View className={"justify-center"}>
          <Image source={require("@/assets/location-pin.png")} />
        </View>
        <View className={"flex-1 justify-center items-stretch"}>
          {data?.address && (
            <View className={"gap-1 mb-2"}>
              <CardText>Name: {data?.full_name}</CardText>
              <CardText>Address: {data?.address}</CardText>
              <CardText>City: {data?.city}</CardText>
              <CardText>State: {data?.state}</CardText>
              <CardText>Zip: {data?.zip}</CardText>
            </View>
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
              titleStyle={{color: "white"}}
              buttonStyle={{
                backgroundColor: COLORS.secondaryContainer,
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
  );
};

export default DeliveryAddress;

import { View } from "react-native";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Button } from "@rneui/themed";
import { StyledInput } from "@/src/components/StyledInput";
import {
  useSetProfileMutation,
  useGetProfileQuery,
} from "@/src/services/profile";
import LoadingPage from "@/src/blocks/LoadingPage";
import {
  errorsType,
  validateAddress,
  valuesType,
} from "@/src/utils/addressTools";
import { COLORS } from "@/src/utils/theme";
import { useAppSelector } from "@/src/utils/reactTools";

const AddressModal = () => {
  const navigation = useNavigation();
  const session = useAppSelector((state) => state.auth.authSession);
  const { data, isLoading } = useGetProfileQuery();
  const [updateProfile] = useSetProfileMutation();

  if (isLoading) return <LoadingPage />;

  const initialValues: valuesType = data!;

  const [values, setValues] = useState<valuesType>(initialValues);
  const [errors, setErrors] = useState<errorsType>({});

  const save = () => {
    const newErrors = validateAddress(values);
    const hasErrors = Object.keys(newErrors).length > 0;
    setErrors(newErrors);
    if (!hasErrors) {
      updateProfile({ ...values, id: session!.user.id });
      navigation.goBack();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title={"Save"}
          onPress={save}
          disabled={initialValues === values}
          buttonStyle={{ backgroundColor: "transparent" }}
          titleStyle={{ color: COLORS.primary }}
          disabledStyle={{ backgroundColor: "transparent" }}
        />
      ),
      headerLeft: () => (
        <Button
          title={"Back"}
          onPress={() => navigation.goBack()}
          buttonStyle={{ backgroundColor: "transparent" }}
          titleStyle={{ color: COLORS.primary }}
        />
      ),
      title: data?.address ? "Change address" : "Add address",
    });
  }, [navigation, values]);

  return (
    <View className={"pt-4"}>
      <StyledInput
        placeholder={"Full Name"}
        errorMessage={errors.full_name}
        value={values.full_name || undefined}
        onChangeText={(text) => setValues({ ...values, full_name: text })}
      />
      <StyledInput
        placeholder={"Address"}
        errorMessage={errors.address}
        value={values.address || undefined}
        onChangeText={(text) => setValues({ ...values, address: text })}
      />
      <StyledInput
        placeholder={"City"}
        errorMessage={errors.city}
        value={values.city || undefined}
        onChangeText={(text) => setValues({ ...values, city: text })}
      />
      <StyledInput
        placeholder={"State"}
        errorMessage={errors.state}
        value={values.state || undefined}
        onChangeText={(text) => setValues({ ...values, state: text })}
      />
      <StyledInput
        placeholder={"Zip code"}
        errorMessage={errors.zip}
        value={values.zip || undefined}
        onChangeText={(text) => setValues({ ...values, zip: text })}
      />
    </View>
  );
};

export default AddressModal;

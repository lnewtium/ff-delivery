import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack>
      <Stack.Screen name={"index"} options={{ title: "Profile" }} />
      <Stack.Screen
        name="addressModal"
        options={{
          presentation: "fullScreenModal",
        }}
      />
      <Stack.Screen name={"license"} options={{ title: "License" }} />
    </Stack>
  );
};

export default ProfileLayout;

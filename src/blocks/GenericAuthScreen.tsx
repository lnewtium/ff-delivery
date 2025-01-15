import { useState } from "react";
import { StyledInput } from "@/src/components/StyledInput";
import { Button } from "@rneui/themed";
import { StyledText } from "@/src/components/StyledText";
import { View } from "react-native";

type propsType = {
  type: "signin" | "signup";
  handle: (email: string, password: string) => Promise<string | undefined>;
};

export const GenericAuthScreen = ({ type, handle }: propsType) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const updateEmailError = () => {
    const emailError = !validateEmail(email) || email.length === 0;
    setEmailError(emailError ? "Invalid email" : "");
    return emailError;
  };

  const updatePasswordError = () => {
    const passwordError = password.length < 8 || password.length > 32;
    setError(
      passwordError
        ? type === "signup"
          ? "Password must be between 8 and 32 characters"
          : "Invalid password"
        : "",
    );
    return passwordError;
  };

  const handleWrapper = async () => {
    if (updateEmailError() || updatePasswordError()) return;
    setIsLoading(true);
    const res = await handle(email, password);
    setIsLoading(false);
    setError(res ?? "");
  };

  return (
    <View className={"flex-1 items-center justify-center gap-2"}>
      <StyledText className={"text-2xl font-bold mb-8"}>
        {type === "signin" ? "Sign In" : "Sign Up"}
      </StyledText>
      <StyledInput
        value={email}
        placeholder={"Email"}
        autoComplete={"email"}
        errorStyle={{
          fontSize: 15,
        }}
        errorMessage={emailError}
        onBlur={() => {
          updateEmailError();
        }}
        onChange={(e) => setEmail(e.nativeEvent.text)}
      />
      <StyledInput
        value={password}
        placeholder={"Password"}
        autoComplete={type === "signin" ? "password" : "new-password"}
        errorStyle={{
          fontSize: 15,
        }}
        errorMessage={error}
        onBlur={() => {
          updatePasswordError();
        }}
        secureTextEntry={true}
        onChange={(e) => setPassword(e.nativeEvent.text)}
      />
      <Button
        containerStyle={{ minWidth: 200 }}
        loading={isLoading}
        title={type === "signin" ? "Login" : "Register account"}
        onPress={handleWrapper}
      />
    </View>
  );
};

import { SplashScreen, Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  useFonts,
  Inter_700Bold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import "../global.css";
import { supabase } from "@/src/utils/supabase";
import { setSession } from "@/src/reducers/authReducer";
import { Provider } from "react-redux";
import { appStore } from "@/src/utils/store";
import { ThemeProvider } from "@rneui/themed";
import { theme } from "@/src/utils/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SystemUI from "expo-system-ui";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useAppDispatch } from "@/src/utils/reactTools";

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("white");
// @ts-ignore
const publishableKey = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;

// Wrap RootLayout to initialize store before running useAppDispatch
const RootLayoutWrapper = () => {
  return (
    <StripeProvider publishableKey={publishableKey} urlScheme={"ffdelivery"}>
      <Provider store={appStore}>
        <ThemeProvider theme={theme}>
          <GestureHandlerRootView>
            <RootLayout />
          </GestureHandlerRootView>
          <StatusBar style={"dark"} />
        </ThemeProvider>
      </Provider>
    </StripeProvider>
  );
};

const RootLayout = () => {
  const dispatch = useAppDispatch();

  const [fontsLoaded, fontsError] = useFonts({
    Inter_400Regular,
    Inter_700Bold,
  });
  const [loadSession, setLoadSession] = React.useState(true);

  useEffect(() => {
    if (fontsLoaded && !fontsError && !loadSession) {
      SplashScreen.hideAsync(); // Hide splash screen when fonts and session are loaded
    }
  }, [fontsLoaded, fontsError, loadSession]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      setLoadSession(false);
      if (error) dispatch(setSession(null));
      else dispatch(setSession(session)); // Work if user is already signed in
    });
    supabase.auth.onAuthStateChange((_, session) => {
      dispatch(setSession(session)); // Sync react and supabase auth changes
    });
  }, []);

  // If session is not loaded
  if (loadSession) {
    return null;
  }
  // If fonts are not loaded
  if (!fontsLoaded && !fontsError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Slot />
    </SafeAreaProvider>
  );
};

export default RootLayoutWrapper;

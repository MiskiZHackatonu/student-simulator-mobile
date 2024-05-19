import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Gesture, GestureDetector, GestureHandlerRootView} from 'react-native-gesture-handler'

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const load = async () => {
      if (loaded) {
        // If nick is not set, we have to show onboarding screen
        const storedNick = await AsyncStorage.getItem("nick");

        if (storedNick) {
          router.replace({
            pathname: "/games",
            params: {
              nick: storedNick,
            },
          });
        } else {
          router.replace("/onboarding");
        }

        SplashScreen.hideAsync();
      }
    };

    load();
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
